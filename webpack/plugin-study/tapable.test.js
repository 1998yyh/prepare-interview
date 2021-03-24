const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook
} = require('tapable');

/**
 * SyncHook 正常同步钩子
 * 
 * SyncBailHook 一旦有返回值就会退出
 */
class Lesson {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      go: new SyncBailHook(['address']),
      // 异步钩子 
      // AsyncParallelHook 异步并行
      // leave:new AsyncParallelHook(['name','age'])

      // AsyncParallelHook 异步串行
      leave:new AsyncSeriesHook(['name','age'])

    };
  }

  tap() {
    // 往hooks容器中注册事件
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318', address);
      return 111;
    });
    this.hooks.go.tap('class0410', (address) => {
      console.log('class0410', address);
    });

    this.hooks.leave.tapAsync('0510', (name,age,callback) => {
      setTimeout(()=>{
        console.log('0510', name,age);
        callback();
      },1000);
    });
    this.hooks.leave.tapPromise('0510', (name,age,callback) => {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('0610', name,age);
          resolve();
        },2000);
      });
    });
  }

  start(){
    // 触发钩子
    this.hooks.go.call('c318');
    this.hooks.leave.callAsync('jack',18,function(){
      // 所有leave容器理的狗子全触发完
      console.log('end');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();