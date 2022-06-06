// 给定圆的半径和圆心的位置，实现函数 randPoint ，在圆中产生均匀随机点。

// 实现 Solution 类:

// Solution(double radius, double x_center, double y_center) 用圆的半径 radius 和圆心的位置 (x_center, y_center) 初始化对象
// randPoint() 返回圆内的一个随机点。圆周上的一点被认为在圆内。答案作为数组返回 [x, y] 。

/**
 * @param {number} radius
 * @param {number} x_center
 * @param {number} y_center
 */
 var Solution = function(radius, x_center, y_center) {
  this.xc = x_center;
  this.yc = y_center;
  this.r = radius;
};

Solution.prototype.randPoint = function() {
  while(true){
    const x = Math.random() * (this.r * 2) - this.r;

    const y = Math.random() * (this.r * 2) - this.r;

    if(x*x + y * y <= this.r * this.r){
      return [this.xc + x,this.yc + y]
    }
  }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(radius, x_center, y_center)
 * var param_1 = obj.randPoint()
 */