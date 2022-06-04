// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let right = 1;
  const arr = [];

  while(right < s.length){
    const node = s.substring(left,right);
    if(arr.includes(node)){
      continue;
    }else{
      while(){
        right++;
      }
   
    }
  }
};
