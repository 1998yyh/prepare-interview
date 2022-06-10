// 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

// 要求时间复杂度为O(n)。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0];
  const len = nums.length;

  const dp = [nums[0]];

  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    max = Math.max(dp[i],max)
  }
  return max
};

console.log(maxSubArray([-2,-1]));