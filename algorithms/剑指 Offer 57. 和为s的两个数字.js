/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = new Map();
    const result = [];
    for(let i = 0;i<nums.length;i++){
      
      const item = target - nums[i]

      if(map.has(item)){
        return [item,nums[i]]
      }else{
        map.set(nums[i],nums[i])
      }
    }

    return result
};