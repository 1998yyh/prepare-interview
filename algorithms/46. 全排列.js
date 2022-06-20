/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const visit = {};
  const cur = [];

  function dfs(index){

    if(index >= nums.length){
      res.push(cur.slice())
      return;
    }

    for(let i = 0;i<nums.length;i++){
      if(!visit[nums[i]]){
        visit[nums[i]] = 1;
        cur.push(nums[i])

        dfs(index +1);
        cur.pop();
        visit[nums[i]] = 0;
      }
    }
  }

  dfs(0);

  return res
};