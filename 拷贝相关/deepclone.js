function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // weakmap = new weakMap;
  // weakmap是否是更好一点
  // =============
  const root = Object.prototype.toString.call(x) === '[object Array]' ? [] : {};
  // 循环数组
  const loopList = [{
    parent: root,
    key: undefined,
    data: x,
  }];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = Object.prototype.toString.call(parent[key]) === '[object Array]' ? [] : {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
    // =============

    Object.keys(data).forEach((k) => {
      if (typeof data[k] === 'object') {
        // 下一次循环
        loopList.push({
          parent: res,
          key: k,
          data: data[k],
        });
      } else {
        res[k] = data[k];
      }
    });
  }

  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}