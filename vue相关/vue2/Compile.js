import Watcher from './Watcher';

export default class Compile{
  constructor(el,vue){
    this.$vue =  vue;
    this.$el = document.querySelector(el);
    if(this.$el){
      // 调用函数，让节点变为fragment  真实是AST
      let fragment = this.node2Fragment(this.$el);
      this.compile(fragment);
      this.$el.appendChild(fragment);
    }
  }

  node2Fragment(el){
    var fragment = document.createDocumentFragment();

    var child ;
    while(child = el.firstChild){
      fragment.appendChild(child);
    }

    return fragment;
  }
  
  compile(el){
    let childNodes = el.childNodes;
    
    const self = this;
    const reg = /\{\{(.*)\}\}/;
    childNodes.forEach(node=>{
      let word = node.textContent;
      if(node.nodeType === 1){
        self.compileElement(node);
      }else if(node.nodeType === 3 && reg.test(word)){
        const name = word.match(reg)[1];
        self.compileText(node,name);
      }
    });
  }

  compileElement(node){
    let nodeAttrs = node.attributes;
    Array.prototype.slice.call(nodeAttrs).forEach((attr)=>{
      let attrName = attr.name;
      let value = attr.value;
      let dir = attrName.substring(2);
      if(attrName.indexOf('v-') === 0){
        // console.log(1111);
      }
    });
  }

  compileText(node,name){
    node.textContent = this.getVueVal(this.$vue,name);
    new Watcher(this.$vue._data,name,newVal=>{
      node.textContent = newVal;
    });
    
  }

  getVueVal(vue,exp){
    var val = vue;
    exp = exp.split('.');
    exp.forEach(k =>{
      val = val[k];
    });
    return val;
  }
}