// 输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。


/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let i = 0,
    len = s.length,
    j = 0,
    arr = [];

  // 先去除字符串前面或后面的多余空格
  s = s.trim();

  while (j < len) {
    // j 指针找到第一个空格为止
    while (j < len && s[j] !== ' ')
      j++;
    arr.unshift(s.slice(i, j));
    // j 指针找到第一个非空格字符为止
    while (j < len && s[j] === ' ')
      j++;
    i = j;
  }
  return arr.join(' ');
};