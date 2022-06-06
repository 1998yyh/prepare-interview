// 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

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

  while(currnet.length){
    const len = currnet.length;
    const _arr = [];
    for(let i = 0;i<len;i++){
      const node = currnet.shift();
      _arr.push(node.val);
      node.left && currnet.push(node.left)
      node.right && currnet.push(node.right)
    }

    result.push(_arr)
  }
  return result
  
};