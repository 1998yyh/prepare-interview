// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。


/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = new Array(nums.length).fill(1);
  let res = Number.MIN_VALUE
  for(let i = 1;i<nums.length;i++){
    for(let j = 0;j<i;j++){
      if(nums[j] > nums[i]){
        dp[i] = Math.max(dp[i],dp[j] + 1);
      }
    }

    res = Math.max(res,dp[i])
  }

  return res
};