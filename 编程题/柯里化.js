function curry(fn){
  const arg = [...arguments].slice(1);
  return function(){
    if(arguments.length === 0){
      return fn.apply(this,arg);
    }else{
      [].push.apply(arg,arguments);
      return arguments.callee;
    }
  }
}