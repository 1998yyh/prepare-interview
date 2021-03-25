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
