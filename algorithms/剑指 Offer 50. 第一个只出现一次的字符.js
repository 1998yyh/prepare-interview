// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  let i = 0;
  let map = {};
  while(i < s.length){
    if(map[s.substr(i,1)]){
      map[s.substr(i,1)] +=1;
    }else{
      map[s.substr(i,1)] = 1;
    }
    i++
  }

  const letter = Object.entries(map).find(item=>item[1] === 1)
  if(letter){
    return letter[0]
  }else{
    return ' '
  }
};