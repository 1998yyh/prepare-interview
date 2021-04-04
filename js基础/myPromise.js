//明天看一下手写promise 
// https://juejin.cn/post/6945319439772434469#heading-31

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 状态
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;
  // 存储成功回调函数
  // onFulfilledCallback = null;
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  // onRejectedCallback = null;
  onRejectedCallbacks = [];

  constructor(executor) {
    // 传入一个执行器
    // 处理异常
    try {
      executor(this.resolve, this.reject);

    } catch (e) {
      this.reject(e);
    }

  }

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象

  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  }
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // this.onRejectedCallback && this.onRejectedCallback(reason);
      while (this.onRejectedCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onRejectedCallbacks.shift()(reason);
      }

    }
  }

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason;
    };
    const _promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 创建微任务
        queueMicrotask(() => {
          // 错误处理
          try {
            const x = onFulfilled(this.value);
            resolvePromise(_promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }

        });
      } else if (this.status === REJECTED) {
        // 创建微任务
        queueMicrotask(() => {
          // 错误处理
          try {
            const x = onRejected(this.reason);
            resolvePromise(_promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            // 错误处理
            try {
              const x = onFulfilled(this.value);
              resolvePromise(_promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            // 错误处理
            try {
              const x = onRejected(this.reason);
              resolvePromise(_promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return _promise;
  }

  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(list){
    return new MyPromise((resolve,reject)=>{
      let count = 0;
      let results = [];
      for(let i = 0 , len = list.length;i<len;i++){
        list[i].then((result)=>{
          count++;
          results[i] = result;
          if(count === list.length){
            resolve(results);
          }
        },(e)=>{
          reject(e);
        });
      }
    });
  }

  static race(list){
    return new MyPromise((resolve,reject)=>{
      for(let i =0,len = list.length;i<len;i++){
        list[i].then((result)=>{
          resolve(result);
        },(e)=>{
          reject(e);
        });
      }
    });
  }
}

function resolvePromise(_promise, x, resolve, reject) {
  if (_promise === x) {
    return reject(new TypeError(''));
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;