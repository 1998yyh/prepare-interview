/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var movingCount = function (m, n, k) {
  // visited 用来记录走过的格子，避免重复
  const visited = Array(m).fill(0).map(_ => Array(n).fill(false));

  // 辅助函数，计算位数和
  function sum(n) {
      let res = 0;
      while (n) {
          res += n % 10;
          n = Math.floor(n / 10)
      }
      return res;
  }
  // dfs
  function dfs(x, y) {
      // 对应开头所说的三个终止条件，超过k值、到达边界、走过的格子
      if (sum(x) + sum(y) > k || x >= m || y >= n || visited[x][y]) return 0;
      else {
          // 记录当前格子已经走过，返回当前计数 1 + 后续其他两个方向的总和
          visited[x][y] = true
          return 1 + dfs(x + 1, y) + dfs(x, y + 1);
      }
  }
  
  return dfs(0, 0);
};

