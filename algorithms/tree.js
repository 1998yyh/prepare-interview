// 先序遍历
// 中 左 右
function preorder(root) {
  if (!root) {
    return;
  }
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);

}

// 中序遍历
// 左 中 右
function inorder(root) {
  if (!root) {
    return;
  }
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

// 后序遍历
// 左 右 中
function postorder(root) {
  if (!root) {
    return;
  }
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}

// 层序遍历
function bfsRoot(root) {
  const stack = [];

  stack.push(root);
  while (stack.length) {
    const node = stack.shift();
    console.log(node.val);

    if (node.left) {
      stack.push(node.left);
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
  const result = [];
  // 记录是否在数组中 或者被访问过
  const visited = {};

  function dfs(nth) {
    if (nth === nums.length) {
      result.push(curr.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1;
        curr.push(nums[i]);
        dfs(nth + 1);
        curr.pop();
        visited[nums[i]] = 0;
      }
    }
  }

  dfs(0);
  // console.log(result)
  return result;
}

// permute([1,2,3])

// 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。

function subsets(nums) {
  // 初始化结果数组
  const res = [];
  // 缓存数组长度
  const len = nums.length;
  // 初始化组合数组
  const subset = [];
  // 进入 dfs
  dfs(0);
  // 定义 dfs 函数，入参是 nums 中的数字索引
  function dfs(index) {
    // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
    res.push(subset.slice());
    // 从当前数字的索引开始，遍历 nums
    for (let i = index; i < len; i++) {
      // 这是当前数字存在于组合中的情况
      subset.push(nums[i]);
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1);
      // 这是当前数字不存在与组合中的情况
      subset.pop();
    }
  }
  // 返回结果数组
  return res;
}
subsets([1, 2, 3]);
// 上题同类题
// 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

function fn(n, k) {
  const cur = [];
  const result = [];

  function dfs(index) {
    result.push(cur.slice());
    for (let i = index; i <= k; i++) {
      cur.push(i);
      dfs(i + 1);
      cur.pop();
    }
  }
  dfs(n);
  return result;
}

// 前  =》 栈
function preorderTraversal(root) {
  const stack = [];
  const result = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
  return result;
}

// 后续
function postorderTraversal(root) {
  const stack = [];
  const result = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val);

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }

  }
  return result;
}

// 中序遍历  a b c
function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let cur = root;

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    result.push(cur.val);
    cur = cur.right;
  }

  return result;
}

// 按层返回节点值
function levelOrder(root) {
  const stack = [];
  const result = [];
  stack.push(root);
  while (stack.length) {
    const quee = [];
    for (let i = 0, len = stack.length; i < len; i++) {
      const node = stack.shift();
      quee.push(node.val);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }
    result.push(quee);
  }
  return result;
}

// 递归 翻转二叉树 
function invertTree(root) {
  if (!root) {
    return root;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

// 栈 翻转二叉树 
// 本质还是个对象 利用对象引用类型
function invertTree2(root) {
  if (!root) {
    return;
  }
  const stack = [];
  stack.push(root);

  while (stack.length) {
    const cur = stack.pop();
    [cur.left, cur.right] = [cur.right, cur.left];
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  return root;
}

// 查找数据域为某一特定值的结点 
// 二叉搜索树

function search(root, target) {
  if (root.val === target) {
    return true;
  }

  if (root.val > target && root.left) {
    search(root.left, target);
  } else if (root.val < target && root.right) {
    search(root.right, target);
  }
  return false;
}

// 在二叉搜索树中插入节点

function insertIntoBST(root, n) {
  // 如果当前是一个空节点
  if (!root) {
    root = new TreeNode(n);
    return;
  }

  if (root.val > n) {
    insertIntoBST(root.right);
  } else {
    insertIntoBST(root.left);
  }
}

// 删除指定结点  

function deleteNode(root, n) {
  if (!root) {
    return root;
  }

  // 如果正好相同
  if (root.val === n) {
    // 如果没有左右子树
    if(!root.left && !root.right){
      root = null;
    }else if(root.left){
      // 如果存在左子树
      const max = findMax(root.left);
      root.val = max.val;
      deleteNode(root.left,max.val);
    }else{
      // 如果存在右子树
      const min = findMin(root.right);
      root.val = min.val;
      deleteNode(root.right,min.val);
    }
  } else if (root.val > n) {
    root.left = deleteNode(root.left, n);
  } else {
    root.right = deleteNode(root.right, n);
  }
  
}

function findMax(root){
  while(root.right){
    root = root.right;
  }
  return root;
}

function findMin(root){
  while(root.left){
    root = root.left;
  }
  return root;
}

// 将排序数组转化为二叉搜索树
// [-10,-3,0,5,9]

function sortedArrayToBST(nums){
  if(!nums.length){
    return null;
  }
  const len = nums.length;

  function buildBST(low,high){
    if(low > high) {
      return null;
  }
    const mid = Math.floor(low+(high-low)/2);
    const node = new TreeNode(nums[mid]);
    node.left = buildBST(low,mid - 1);
    node.right = buildBST(mid+1,high);
    return node;
  }

  return buildBST(0,len-1);
}

// 二叉搜索树的验证
function isValidBST(root){
  function dfs(node,maxVal,minVal){
    if(!node){
      return true;
    }
    if(root.val <= minValue || root.val >= maxValue) return false;
    return dfs(node.left,minVal,node.val) && dfs(node.right,node.val,maxVal);
  }
  dfs(root,Infinity,-Infinity);
}