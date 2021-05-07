import Dep from './Dep';

// 处理数组
const arrayproto  = Array.prototype;
const newArrayProto = Object.create(arrayproto);

['push','pop','shift','unshift','splice','slice'].forEach((method)=>{
  const origin = newArrayProto[method];

  def(newArrayProto,method,function(){
    const ob = this.__ob__;
    let inserted = '';
    switch(method){
      case 'push':
      case 'unshift':
        inserted = arguments;
        break;
      case 'splice':
        inserted = arguments.slice(2);
        break;
      default:
        break;
    }
    if(inserted){
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    const result = origin.call(this,...arguments);
    return result;
  },false);
});

class Observer {
  constructor(value) {
    this.dep = new Dep();
    def(value,'__ob__',this,false);
    if(Array.isArray(value)){
      Object.setPrototypeOf(value,newArrayProto);
      this.observeArray(value);
    }else{
      this.walk(value);
    }
    
  }
  walk(value){
    Object.keys(value).forEach(v=>{
      defineReactive(value,v);
    });
  }
  observeArray(arr){
    for(let i = 0,len = arr.length;i<len;i++){
      observe(arr[i]);
    }
  }
}

function def(obj,key,value,enumerable){
  Object.defineProperty(obj,key,{
    enumerable,
    value,
    writable:true,
    configurable:true
  });
}

function observe(value) {
  if (typeof value !== 'object') return;

  let ob;
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

function defineReactive(data,key,value=data[key]){
  const dep = new Dep();
  let childOb = observe(value);
  Object.defineProperty(data,key,{
    // 可枚举
    enumerable:true,
    // 可配置
    configurable:true,
    get(){
      if(Dep.target){
        dep.depend();
        if(childOb){
          childOb.dep.depend();
        }
      }
      return value;
    },
    set(newValue){
      if(value === newValue)return;
      observe(newValue);
      value = newValue;
      dep.notify();
    }
  });
}

export default observe;