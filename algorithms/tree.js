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

function permute(nums) {
  // 存储当前数组
  const curr = [];
  // 结果数组
  const result = []
  // 记录是否在数组中 或者被访问过
  const visited = {}

  function dfs(nth) {
    if (nth === nums.length) {
      result.push(curr.slice())
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1;
        curr.push(nums[i]);
        dfs(nth + 1);
        curr.pop()
        visited[nums[i]] = 0
      }
    }
  }

  dfs(0)
  // console.log(result)
  return result
}

// permute([1,2,3])


// 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。

function subsets(nums) {
  // 初始化结果数组
  const res = []
  // 缓存数组长度
  const len = nums.length
  // 初始化组合数组
  const subset = []
  // 进入 dfs
  dfs(0)
  // 定义 dfs 函数，入参是 nums 中的数字索引
  function dfs(index) {
    // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
    res.push(subset.slice())
    // 从当前数字的索引开始，遍历 nums
    for (let i = index; i < len; i++) {
      // 这是当前数字存在于组合中的情况
      subset.push(nums[i])
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1)
      // 这是当前数字不存在与组合中的情况
      subset.pop()
    }
  }
  // 返回结果数组
  return res
}
subsets([1, 2, 3])
// 上题同类题
// 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

function fn(n, k) {
  const cur = [];
  const result = [];

  function dfs(index) {
    result.push(cur.slice())
    for (let i = index; i <= k; i++) {
      cur.push(i);
      dfs(i + 1);
      cur.pop()
    }
  }
  dfs(n)
  return result;
}


// 前  =》 栈
function preorderTraversal(root) {
  const stack = [];
  stack.push(root);

  while (stack) {

  }
}

function postorderTraversal() {

}