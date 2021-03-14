function _new(fn, ...args) {
  // new.target es6新增  指向的是构造函数
  _new.target = fn ;
  
  // 创建一个空对象
  const obj = Object.create(fn.prototype);
  
  // 参数this指向不改变
  const res = fn.apply(obj, args);
  // 正常规定,如何fn返回的是null或undefined(也就是不返回内容)
  var isObject = typeof res === 'object' && res !== null;
  var isFunction = typeof res === 'function';
  if(isObject || isFunction){
      return res;
  }
  return obj;
}