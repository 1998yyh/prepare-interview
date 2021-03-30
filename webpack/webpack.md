# webpack

## loader
1.loader本质是一个函数,接受三个参数（1）content文件内容（2）map source-map映射信息（3）meta元信息
2.loader的执行顺序是从后往前，pitch方法是从前往后，而且是先执行pitch
3.loader有同步loader和异步loader。
同步：1. 直接return 处理好的content 2.调用this.callback(null,content,map,meta)

异步：const callback = this.async();当异步执行完成，调用callback(null,content)

4.loader的options获取需要用到loader-utils里的一个getOptions方法。

5.loader的参数校验需要用到schema-utils的validate方法，并且需要配置一个schema.json

schema.json设置了type(类型,object,array等),properties(属性),additionalProperties(属性是否可添加);
如果properties里只写了name属性，但是传入的加了age属性且additionalProperties为false，就会报错。


## plugins
plugin本质是一个类,webpack调用的时候调用的是plugin的apply方法
最重要的两个钩子 1.compiler 2.compilation 
compiler 扩展自Tapable


### Tapable
有以下几个钩子
  SyncHook, //同步钩子
	SyncBailHook, //一旦有返回值就会退出
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook, // 异步并行钩子
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook


在class的constructor 里初始化钩子容器
```javascript
class Lesson{
  constructor(){
    this.hooks = {
      // 同步钩子
      go: new SyncHook(['address']),
      // 异步钩子
      leave:new AsyncSeriesHook(['name','age'])

    }
  },
  tap(){
    // 往hooks容器中注册事件
    this.hooks.go.tap('class0318',(address)=>{console.log(address)})
    // 也可以添加多个
    this.hooks.go.tap('class0319',(address)=>{console.log(address)})
    // tapAsync 有callback
    this.hooks.leave.tapAsync('0510', (name,age,callback) => {
      setTimeout(()=>{
        console.log('0510', name,age);
        callback();
      },1000);
    });
    // tapPromise 没有callback
    this.hooks.leave.tapPromise('0510', (name,age,callback) => {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('0610', name,age);
          resolve();
        },2000);
      });
    });
  }，
  start(){
    // 在start里触发
    // 同步钩子调用call方法
    this.hooks.go.call('c318')
    //异步钩子调用callAsync();
    this.hooks.leave.callAsync('jack',18,function(){
      // 所有leave容器理的钩子全触发完
      console.log('end');
    });
  }
}
```


### compiler钩子
我们不需要像 Tapable 中去添加初始化钩子,
webpack已经初始化好钩子给我们,并且每个钩子对应的tapable中的也已经说明,比如:
emit -> AsyncSeriesHook
done  -> AsyncSeriesHook

我们只需要在apply中去注册事件,等执行时调用就可以.


### compilation 
compilation 是 compiler钩子中回调函数的参数.
帮助我们对资源做修改，

比如 buildModule  钩子 在模块构建开始之前触发，可以用来修改模块。
比如 additionalAssets 钩子 用来创建额外资源  

```javascript
class Plugins2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('Plugins2', (compilation) => {
      // 异步钩子使用tapAsync
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        // 普通方法需要我们知道需要的内容和 比较死板
        const content = 'hello';
        compilation.assets['a.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          }
        };
        const data = await readFile(path.resolve(__dirname, 'b.txt'));
        // webpack 4的方法
        // compilation.assets['b.txt'] = new RawSource(data);
        // webpack 5的方法
        compilation.emitAsset('b.txt', new RawSource(data));
        // 执行完成
        cb();
      });
    });
  }
}
```


### myWebpack
手撕一个简单的webpack

webpack本质是一个Compiler的实例，Compiler类上有一个run方法启动打包；

Compiler是一个类，接收options对象。

run方法执行步骤：
1.读取入口文件内容。
2.解析成AST语法树,使用babel的babelParser来生成ast语法树
3.根据asy语法树body的 ImportDeclaration 来收集依赖  babel中的 traverse 来收集依赖
4.编译代码   babel中的 transformFromAst 来收集依赖
5.遍历所有依赖 执行2-4步
6.生成bundle  



## 热更新原理
热更新 webpack-dev-server 主要是启动服务器，连接websocket服务。
核心的更新原理 是 webpack-dev-middleware 库。


步骤
1.启动webpack，生成compiler实例
2.使用express框架启动本地server，让浏览器可以请求本地的静态资源。
3.本地server启动之后，再去启动websocket服务，建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码
4.会修改入口文件，将clientEntry(websocket客户端代码)和 hotEntry (热更新代码) 添加到配置的入口之前
5.注册监听事件的，监听每次webpack编译完成即监听 done 钩子触发  然后调用websocket 发送消息

6.执行compiler.watch()方法 
 webpack监听文件变化
 1. 首先对本地文件代码进行编译打包，也就是webpack的一系列编译流程。
 2. 其次编译结束后，开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。
7.执行setFs方法,依赖memory-fs库，将输出的文件写在内存中，访问内存中文件更快。
8.浏览器如何收到消息
``` javascript
// webpack-dev-server/client/index.js
var socket = require('./socket');
var onSocketMessage = {
    hash: function hash(_hash) {
        // 更新currentHash值
        status.currentHash = _hash;
    },
    ok: function ok() {
        sendMessage('Ok');
        // 进行更新检查等操作
        reloadApp(options, status);
    },
};
// 连接服务地址socketUrl，?http://localhost:8080，本地服务地址
socket(socketUrl, onSocketMessage);

function reloadApp() {
	if (hot) {
        log.info('[WDS] App hot update...');
        
        // hotEmitter其实就是EventEmitter的实例
        var hotEmitter = require('webpack/hot/emitter');
        hotEmitter.emit('webpackHotUpdate', currentHash);
    } 
}
/**
 * 
 * 热更新检查事件是调用reloadApp方法。比较奇怪的是，这个方法又利用node.js的EventEmitter，发出webpackHotUpdate消息。这是为什么？为什么不直接进行检查更新呢？
  个人理解就是为了更好的维护代码，以及职责划分的更明确。websocket仅仅用于客户端（浏览器）和服务端进行通信。而真正做事情的活还是交回给了webpack。  
/
```
webpack收到 webpackHotUpdate后的操作
``` javascript 

// node_modules/webpack/hot/dev-server.js
var check = function check() {
    module.hot.check(true)
        .then(function(updatedModules) {
            // 容错，直接刷新页面
            if (!updatedModules) {
                window.location.reload();
                return;
            }
            // 热更新结束，打印信息
            if (upToDate()) {
                log("info", "[HMR] App is up to date.");
            }
    })
        .catch(function(err) {
            window.location.reload();
        });
};
var hotEmitter = require("./emitter");
hotEmitter.on("webpackHotUpdate", function(currentHash) {
    lastHash = currentHash;
    check();
});
// 这里webpack监听到了webpackHotUpdate事件，并获取最新了最新的hash值，然后终于进行检查更新了
```

9.module.hot.check -> HotModuleReplacementPlugin
上一步监听到 webpackHotUpdate 后调用了 module.hot.check方法。