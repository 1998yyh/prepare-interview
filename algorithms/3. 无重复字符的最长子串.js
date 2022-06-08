// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set();

  const l = s.length;

  let rk = -1;
  let res = 0;

  for (let i = 0; i < l; i++) {
    if (i !== 0) {
      set.delete(s.charAt(i - 1))
    }

    while (rk + 1 < l && !set.has(s.charAt(rk + 1))) {
      set.add(s.charAt(rk + 1))
      rk++
    }

    res = Math.max(res,rk - i + 1)
  }

  return res
};