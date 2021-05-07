const arrayProto = Array.prototype;
const newArrayProto = Object.create(arrayProto);

['push','pop','shift','unshift','splice','slice'].forEach(method=>{
  newArrayProto[method] = function(){
    console.log('更新视图');
    arrayProto[method].call(this,...arguments);
  };
});

export default function observe(taget) {
  if (typeof taget !== 'object' || taget === null) {
    return taget;
  }

  // 处理数组
  if(Array.isArray(taget)){
    taget.__proto__ = newArrayProto;
  }

  for (let key in taget) {
    defineReactive(taget, key, taget[key]);
  }
}

function defineReactive(taget, key, value) {
  // 深度监听
  observe(value);
  Object.defineProperty(taget, key, {
    get() {
      return value;
    },
    set(newValue) {
      // 防止从基本类型变为对象监听丢失。
      observe(newValue);
      if (newValue !== value) {
        value = newValue;
        console.log('更新视图');
      }
    }
  });

}

class Observer {
  constructor(value){
    this.value = value;
    this.walk()
  }

  walk(){
    Object.keys.
  }
}