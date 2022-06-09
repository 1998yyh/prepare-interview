// 先打印 Happy 3S后打印 new 再 3s后打印 year

class Foo {
  #promise = Promise.resolve();
  
  wait(time:number){
    this.#promise = this.#promise.then(()=> new Promise((resolve)=>setTimeout(resolve,time)))
    return this
  }

  print(...args){
    this.#promise = this.#promise.then(()=>console.log(...args))
  }
}

