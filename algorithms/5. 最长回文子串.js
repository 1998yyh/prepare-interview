// 给你一个字符串 s，找到 s 中最长的回文子串。

/**
 * @param {string} s
 * @return {string}
 */
 const longestPalindrome = function(s) {
  const dp = [];
  // 缓存字符串长度
  const len = s.length
  // 初始化状态二维数组
  for (let i = 0; i < len; i ++) {
      dp[i] = [];
  };
  
  // 初始化最长回文子串的两个端点值
  let st = 0, end=0
  // 初始化最长回文子串的初始值为1
  for(let i=0;i<len;i++) {
      dp[i][i] = 1
  }
  // 这里为了降低题目的复杂度，我们预先对悬念比较小的 s[i][i+1] 也做了处理
  for(let i=0;i<len-1;i++){
      if(s[i]===s[i+1]) {
          dp[i][i+1] = 1
          st = i 
          end = i+1
      }
  }
  
  // n 代表子串的长度，从3开始递增
  for(let n=3;n<=len;n++) {
      // 下面的两层循环，用来实现状态转移方程
      for(let i=0;i<=len-n;i++) {
          let j = i+n-1
          if(dp[i+1][j-1]) {
              if(s[i]===s[j]){
                  // 若定位到更长的回文子串，则更新目标子串端点的索引值
                  dp[i][j] = 1
                  st = i 
                  end = j
              }
          }
      }
  }
  // 最后依据端点值把子串截取出来即可
  return s.substring(st,end+1);
}