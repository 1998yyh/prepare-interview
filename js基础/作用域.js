// 作用域问题1 
var a = 1;
if(true){
  a = 2;
  console.log(a,window.a);
  function a(){};
  a = 3;
  console.log(a,window.a)
}
console.log(a)