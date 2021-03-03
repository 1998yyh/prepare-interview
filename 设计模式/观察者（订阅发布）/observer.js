class Publisher {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer)
  }

  remove(observer) {
    this.observers.forEach((v, i) => {
      if (v === observer) {
        this.observers.splice(i, 1)
      }
    })
  }

  notify() {
    this.observers.forEach(v => {
      v.update(this);
    })
  }
}

class Observer {
  constructor() {
    console.log('observe constructor')
  }

  update() {
    console.log('observer base update')
  }
}

class PrdPublisher extends Publisher {
  constructor() {
    super();
    this.prd = null;
    this.observers = [];
  }
  getState() {
    return this.prd
  }

  setState(_prd) {
    this.prd = _prd;
    this.notify();
  }
}

class DeveloperObserver extends Observer {
  constructor() {
    super();
    this.prd = null;
  }

  update(publisher) {
    this.prd = publisher.getState();
    this.work();

  }

  work() {
    if (!this.prd) return;
    console.log('this.prd',this.prd)
  }
}
