
import vnode from './vnode.js';

const h = function (sel, data, c) {
  if (arguments.length !== 3) {
    return new Error('参数缺少');
  }

  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    let children = [];
    for(let i = 0;i<c.length;i++){
      if(!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))){
        throw new Error('数组中参数h');
      }
      children.push(c[i]);
    }

    return vnode(sel, data, children, c, undefined);
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    let children = [c];
    return vnode(sel, data, children, c, undefined);
  } else {
    throw new Error('参数不对');
  }
};

export default h;