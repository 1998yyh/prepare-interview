// 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const dp = [];
  dp[0] = 0;
  dp[1] = 1;
  for(let i = 2;i<=n;i++){
    dp[i] = dp[i-1]+dp[i-2]
    dp[i] %= 1000000007
  }
  return dp[n]
};