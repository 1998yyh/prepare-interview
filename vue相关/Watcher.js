import Dep from './Dep';

var uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();

  }
  update() {
    this.run();
  }

  get() {
    // 进入依赖手机
    Dep.target = this;
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }

  run(){
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb){
    const value = this.get();
    if(this.value !== value || typeof value === 'object'){
      const oldValue = this.value;
      this.value = value;
      cb(this.target,value,oldValue);
    }
  }

}

function parsePath(expression) {
  const segments = expression.split('.');
  return function (obj) {
    return segments.reduce((pre, cur) => {
      return pre[cur];
    }, obj);
  };
}