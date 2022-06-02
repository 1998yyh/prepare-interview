// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

/**
 * initialize your data structure here.
 */
 var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  // 注意这个地方需要加一个等于 否则如果最小值出现相同的 会出问题
  if(this.minStack.length === 0 || this.minStack[this.minStack.length - 1] >= x){
    this.minStack.push(x)
  }

};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const val  = this.stack.pop();

  if(val === this.minStack[this.minStack.length - 1]){
    this.minStack.pop();
  }

  return val;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if(this.stack.length){
    return this.stack[this.stack.length -1 ]
  }
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  if(this.minStack.length){
    return this.minStack[this.minStack.length -1 ]
  }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */