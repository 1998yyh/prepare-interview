// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
function testStr(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const s = str[i];
    if (s === '(') {
      stack.push(')')
    } else if (s === '{') {
      stack.push('}')
    } else if (s === '[') {
      stack.push(']')
    } else {
      const _pop = stack.pop();
      if (s !== _pop) {
        return false
      }
    }
  }

  return true;
}


// 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。


function dailyTemperatures(list) {
  const stack = [];
  const len = list.length;
  const res = new Array(len).fill(0);
  for (let index = 0; index < len; index++) {
    while (stack.length && list[index] > list[stack[stack.length - 1]]) {
      const top = stack.pop()
      res[top] = index - top;
    }
    // 记录第几天
    stack.push(index)
  }
  return res;
}


// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); --> 返回 -3.
// minStack.pop();
// minStack.top(); --> 返回 0.
// minStack.getMin(); --> 返回 -2.
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(num) {
    this.stack.push(num)
    // 如果小栈的长度是0或者 栈顶的数字大小大于push的数字，则往minstack里push一个
    if (!this.minStack.length || this.minStack[this.minStack.length - 1] >= num) {
      this.minStack.push(num)
    }
  }

  pop() {
    const popNum = this.stack.pop();
    if (popNum === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }

  }

  getMin() {
    return this.minStack[this.minStack.length - 1]
  }
  top() {
    if (this.stack.length) {
      return;
    }
    return this.stack[this.stack.length - 1]
  }
}

// 题目描述：使用栈实现队列的下列操作：
// push(x) -- 将一个元素放入队列的尾部。
// pop() -- 从队列首部移除元素。
// peek() -- 返回队列首部的元素。
// empty() -- 返回队列是否为空。

class Queue {
  constructor() {
    this.stack = [];
    this.restack = [];
  }

  push(x) {
    this.stack.push(x)
  }

  pop() {
    if (!this.restack.length) {
      while (this.stack.length) {
        this.restack.push(this.stack.pop())
      }
    }
  }

  peek() {
    if (this.rstack.length === 0) {
      while (this.stack.length !== 0) {
        this.rstack.push(this.stack.pop())
      }
    }
    return this.rstack[this.rstack.length - 1];
  }

  empty() {
    return this.stack.length === 0 && this.rstack.length === 0;
  }

}


// 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

function sl(nums, k) {
  const result = [];
  for (let i = 0; i < nums.length + 1 - k; i++) {
    let left = i;
    let right = i + k - 1;
    let max = nums[left]
    while (left < right) {
      left++;
      max = Math.max(nums[left], max)
    }

    result.push(max);

  }
  return result;
}
// 解法2
// 思路分析：双端队列法
const sl2 = function (nums, k) {
  const len = nums.length;

  let quee = [];
  let res = [];

  for (let i = 0; i < len; i++) {
    // 举个例子 [1,3,-1,-3,5,3,6,7]
    /**
     *  i = 0 ; quee = [0];
     *  i = 1 ; quee = [1] 此时走循环 会将0push出去
     *  i = 2 ; quee = [1,2];
     *  i = 3 ; quee = [1,2,3];
     *  i = 4 ; quee  = [4] 此时 5> -3 将 -3 pop  5>-1 将 - 1pop
     */
    while (quee.length && nums[i] > nums[quee[quee.length - 1]]) {
      quee.pop();
    }
    quee.push(i)

    while (quee.length && quee[0] < i + 1 - k) {
      quee.shift();
    }
    if (i >= k - 1) {
      res.push(nums[quee[0]])
    }
  }
  console.log(res)
}