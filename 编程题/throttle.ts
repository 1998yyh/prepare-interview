// 节流

function _throttle(fn,timeout = 300){

  let timer = null;

  return function(...args){
    
    if(timer){ return}

    timer = setTimeout(() => {
      fn.apply(this,args)
      timer  = null;
    }, timeout);
  }

}