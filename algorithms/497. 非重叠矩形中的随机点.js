// 给定一个由非重叠的轴对齐矩形的数组 rects ，其中 rects[i] = [ai, bi, xi, yi] 表示 (ai, bi) 是第 i 个矩形的左下角点，(xi, yi) 是第 i 个矩形的右上角角点。设计一个算法来随机挑选一个被某一矩形覆盖的整数点。矩形周长上的点也算做是被矩形覆盖。所有满足要求的点必须等概率被返回。

// 在一个给定的矩形覆盖的空间内任何整数点都有可能被返回。

// 请注意 ，整数点是具有整数坐标的点。

// 输入: 
// ["Solution","pick","pick","pick","pick","pick"]
// [[[[-2,-2,-1,-1],[1,0,3,0]]],[],[],[],[],[]]
// 输出: 
// [null,[-1,-2],[2,0],[-2,-1],[3,0],[-2,-2]

// 解释：
// Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
// solution.pick(); // 返回 [1, -2]
// solution.pick(); // 返回 [1, -1]
// solution.pick(); // 返回 [-1, -2]
// solution.pick(); // 返回 [-2, -2]
// solution.pick(); // 返回 [0, 0]

var Solution = function(rects) {
  this.arr = [0];
  this.rects = rects;
  for (const rect of rects) {
      const a = rect[0], b = rect[1], x = rect[2], y = rect[3];
      this.arr.push(this.arr[this.arr.length - 1] + (x - a + 1) * (y - b + 1));
  }
};

Solution.prototype.pick = function() {
  let k = Math.floor(Math.random() * this.arr[this.arr.length - 1]);
  const rectIndex = binarySearch(this.arr, k + 1) - 1;
  k -= this.arr[rectIndex];
  const rect = this.rects[rectIndex];
  const a = rect[0], b = rect[1], y = rect[3];
  const col = y - b + 1;
  const da = Math.floor(k / col);
  const db = k - col * da;
  return [a + da, b + db];
};

const binarySearch = (arr, target) => {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
      const mid = Math.floor((high - low) / 2) + low;
      const num = arr[mid];
      if (num === target) {
          return mid;
      } else if (num > target) {
          high = mid - 1;
      } else {
          low = mid + 1;
      }
  }
  return low;
}
