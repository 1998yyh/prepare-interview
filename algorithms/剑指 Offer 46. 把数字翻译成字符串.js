// 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

/**
 * @param {number} num
 * @return {number}
 */


const translateNum = (num) => {
  const str = num.toString();

  const dfs = (str, pointer) => { // 随着dfs向下，pointer右移
    if (pointer >= str.length - 1) return 1; // 指针抵达边界和超出边界都返回1

    const temp = Number(str[pointer] + str[pointer + 1]); // 考察该2位数

    if (temp >= 10 && temp <= 25) {
      return dfs(str, pointer + 1) + dfs(str, pointer + 2); // 2个分支的结果相加
    } else {
      return dfs(str, pointer + 1); // 返回1个分支的结果
    }
  }

  return dfs(str, 0);
}



const dpTranslateNum = (num) => {
  const str = num.toString();

  const dp = []
  dp[0] = 1;

  for (let i = 1; i < str.length; i++) {
    const temp = str[i - 1] + str[i]

    if(temp > 9 && temp < 26){
      if(i===1){
        dp[i] = 2;
      }else{
        dp[i] = dp[i - 1] + dp[i-2]
      }
    }else{
      dp[i] = dp[i-1]
    }
  }

  return dp[dp.length-1]
}