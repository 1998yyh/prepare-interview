// 先序遍历
// 中 左 右
function preorder(root) {
  if (!root) {
    return;
  }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)

}

// 中序遍历
// 左 中 右
function inorder(root) {
  if (!root) {
    return;
  }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}

// 后序遍历
// 左 右 中
function postorder(root) {
  if (!root) {
    return;
  }
  postorder(root.left);
  postorder(root.right);
  console.log(root.val)
}


// 层序遍历
function bfsRoot(root) {
  const stack = [];

  stack.push(root);
  while (stack.length) {
    const node = stack.shift();
    console.log(node.val);

    if (node.left) {
      stack.push(node.left)
    }

    if (node.right) {
      stack.push(stack.right);
    }
  }
}


// 全排列问题
// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
// 输入: [1,2,3]

function permute(nums){
  const length = nums.length;
  const curr = [];
}