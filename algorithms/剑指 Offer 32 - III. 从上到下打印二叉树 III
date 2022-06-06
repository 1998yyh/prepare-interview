// 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  if(root === null) return [];

  const result =  [];
  const currnet = [root]
  let level = 0;

  while(currnet.length){
    const len = currnet.length;
    const _arr = [];
    for(let i = 0;i<len;i++){
      const node =  currnet.shift();
      if(level % 2 === 0){
        _arr.push(node.val);
      }else{
        _arr.unshift(node.val);
      }

      node.left && currnet.push(node.left)
      node.right && currnet.push(node.right)
    }
    level++;
    result.push(_arr)
  }
  return result
  
};