/**
 * 手写call
 * 注意点：第一个参数是undefined 和 null 时候 this是window
 */


Function.prototype.myCall = function (context) {
  if (context === undefined || context === null) {
    context = window;
  }

  context.fn = this;
  const arg = [...arguments].slice(1);
  const result = context.fn(...arg);
  delete context.fn;
  return result;
}

/**
 * 
 * @param {}} context 
 * @returns 
 * 
 * 手写apply
 *  注意点 ： 参数的处理不一样
 */

Function.prototype.myApply = function (context) {
  if (context === undefined || context === null) {
    context = window;
  }

  context.fn = this;
  const arg = arguments[1];
  let result;
  if (arg) {
    result = context.fn(arg);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}


/**
 * 手写bind
 * 
 * 注意点：对于函数来说有两种方式调用，一种是直接调用，一种是通过new的方式，我们先来说直接调用的方式
 */

Function.prototype.myBind = function (context) {
  if (typeof context !== 'function') {
    throw new Error('非函数');
  }

  const _this = this;
  const arg = [...arguments].slice(1);

  return function F() {
    if (this instanceof F) {
      return new _this(...arg, ...arguments)
    }
    return _this.apply(context, arg.concat(...arguments))
  }
}

/**
 * 顺便手写一个new
 * 注意点：new的时候做了哪些事情， 1,new.taget 指向this 2. 将构造函数的作用域赋给对象 3. 执行函数 4. 根据返回值返回不同的结果
 */


const myNew = function (fn, ...arg) {
  myNew.target = this;

  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, arg)
  if (typeof result === 'object' && result !== null) {
    return result
  }

  if (typeof result === 'function') {
    return result
  }
  return obj
}