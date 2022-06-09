// 输入 aaabbbbcc

// 输出 3b4b2c


function replaceStr(str:string):string{
  return str.replace(/(.)\1*/g,({length},char)=>length+char)
}