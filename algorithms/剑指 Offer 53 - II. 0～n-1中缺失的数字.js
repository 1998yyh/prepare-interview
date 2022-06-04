// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。


/**
 * @param {number[]} nums
 * @return {number}
 */
// var missingNumber = function (nums) {
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== i) {
//       return i
//     }
//   }

//   return nums[nums.length - 1] + 1;
// };

var missingNumber = function (nums) {
  let i = 0,j = nums.length - 1;
  while (i <= j) {
    const m = Math.floor((i + j) / 2);
    console.log(m)
    if(nums[m] === m) i = m +1
    else j = m - 1;
  }
  return i
};

missingNumber([0,1,3])