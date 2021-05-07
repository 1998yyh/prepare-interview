import Compile from './Compile.js';
import observe from './observe';
import Watcher from './Watcher';

export default class _vue {
  constructor(options){
    this.$options = options || {};
    this._data = options.data || undefined;
    observe(this._data);
    this._initData();
    this._initWatch();
    this._initComputed();
    new Compile(options.el,this);

  }

  _initData(){
    const self  = this;
    Object.keys(this._data).forEach((key)=>{
      Object.defineProperty(self,key,{
        get(){
          return self._data[key];
        },
        set(newVal){
          self._data[key] = newVal;

        }
      });
    });
  }

  _initComputed(){

  }

  _initWatch(){
    const self = this;
    const watch = this.$options.watch;
    Object.keys(watch).forEach(key =>{
      new Watcher(self,key,watch[key]);
    });
  }
}
