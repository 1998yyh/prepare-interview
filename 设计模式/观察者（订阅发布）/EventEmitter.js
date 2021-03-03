class EventEmitter {
  constructor() {
    this.handles = {};
  }

  on(eventName,cb){
    if(!this.handles[eventName]){
      this.handles[eventName] = []
    }
    this.handles[eventName].push(cb)

  }

  emit(eventName,...args){
    if(this.handles[eventName]){
      this.handles[eveventNameent].forEach(cb=>{
        cb(...args)
      })
    }
  }

  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (~index) {
      callbacks.splice(index, 1)
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}