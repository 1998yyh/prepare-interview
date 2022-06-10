// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

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