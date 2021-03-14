import vnode from './vnode';

// 创建dom元素
const createElement = function (vnode) {
  let domNode = document.createElement(vnode.sel);
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 纯文本节点
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      const ch = vnode.children[i];
      const chDom = createElement(ch);
      domNode.appendChild(chDom);
    }
  }
  vnode.elm = domNode;
  return vnode.elm;
};

export default function (oldVnode, newVnode) {
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }

  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log('是同一个节点');
    // 判断新旧节点是否相同
    if(oldVnode=== newVnode)return;
    // 新节点有text属性，且没有children
    if(newVnode.text !== undefined && (vnode.children === undefined || vnode.children.length === 0)){
      console.log('新节点有text属性');
      if(newVnode.text !== oldVnode.text){
        oldVnode.elm.innerText = newVnode.text;
      }
    } else{
      console.log('新节点没有text属性');
    }
  } else {
    console.log('不是同一个节点');
    const domNode = createElement(newVnode);
    if (oldVnode.elm.parentNode && domNode) {
      oldVnode.elm.parentNode.insertBefore(domNode, oldVnode.elm);
    }
  }
}