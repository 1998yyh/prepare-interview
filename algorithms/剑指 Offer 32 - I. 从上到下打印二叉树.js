// 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function (root) {
  if(root === null) return [];
  const arr = [];
  const cur = [root]

  while (cur.length) {
    const len = cur.length;
    for (let i = 0; i < len; i++) {
      const node = cur.shift();
      arr.push(node.val)
      node.left && cur.push(node.left);
      node.right && cur.push(node.right)
    }
  }

  return arr
};