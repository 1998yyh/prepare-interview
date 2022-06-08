// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

var mirrorTree = function(root) {
  if(!root) {
    return null
  }

  const right = mirrorTree(root.right);
  const left = mirrorTree(root.left);

  root.left = right;
  root.right = left;
  return root
};