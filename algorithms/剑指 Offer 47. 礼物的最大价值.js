// 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？




/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = JSON.parse(JSON.stringify(grid));
  let max = Number.MIN_VALUE;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const topValue = i ? dp[i - 1][j] : 0;
      const leftValue = j ? dp[i][j - 1] : 0;
      dp[i][j] = Math.max(topValue, leftValue) + grid[i][j]
      max = Math.max(max,dp[i][j])
    }
  }

  return max

};