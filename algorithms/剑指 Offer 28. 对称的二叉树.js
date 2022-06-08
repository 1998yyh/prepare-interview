// 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if(!root){return true}

  const fn = (left,right)=>{
    if(!left && !right) return true
    if(!left || !right) return false 

    return left.val === right.val && fn(left.left,right.right) && fn(left.right,right.left)
  } 


  return fn(root.left,root.right)
};