// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  const dp = [];
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;
  for(let i = 3;i<=n;i++){
    dp[i] = dp[i-1]+dp[i-2]
    dp[i] %= 1000000007
  }
  return dp[n]
};