// 防抖

function _debounce(fn,timeout = 300){
  let timer = null;

  return function(...args){
    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      const res = fn.apply(this,args)
      timer = null;
    }, timeout);
  }
}