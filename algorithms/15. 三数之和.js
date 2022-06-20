/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const len = nums.length;
  const res = [];

  if (len < 3) return res;

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res;
    if (i > 0 && nums[i] === nums[i - 1]) continue
    const node = nums[i];

    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = nums[left] + nums[right] + node;
      if (sum > 0) {
        right--
      }

      if (sum < 0) {
        left++
      }

      if (sum === 0) {
        res.push([node, nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      }
    }
  }


  return res;
};