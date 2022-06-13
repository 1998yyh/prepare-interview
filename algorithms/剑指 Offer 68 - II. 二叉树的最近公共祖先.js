/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
  if(root === null) return null
  if(root === p || root === q) return root;
  const lson = lowestCommonAncestor(root.left,p,q);
  const rson = lowestCommonAncestor(root.right,p,q);
  if(lson && rson) return root;
  if(lson) return lson
  if(rson) return rson
};

