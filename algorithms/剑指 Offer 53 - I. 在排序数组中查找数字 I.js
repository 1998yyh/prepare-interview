// 统计一个数字在排序数组中出现的次数。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function (nums, target) {
  const index = nums.indexOf(target)
  const endIndex = nums.lastIndexOf(target)
  if(index !== -1){
    return endIndex - index + 1;
  }
  return 0
};
