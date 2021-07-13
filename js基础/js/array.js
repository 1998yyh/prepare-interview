Array.prototype.myMap = function(callback){
  var newArr = []
  for(var i = 0; i<this.length; i++) {  // this 是arr
    // 当前循环的元素放到自定义的函数中 进行运行并且 吧返回的结果放到新数组的对应索引
    newArr[i] = callback(this[i], i, this) // this[i]是当前的元素  i是当前的索引  
    console.log('callback', newArr)
  }
  return newArr  // 吧新的arr返回
}
// var arr = ["a","b","c","d","e"];
// var x = arr.myMap((value,index,arr) => {
//   if (value === 'a') {
//     return 'dd'
//   }
//   return value
// })

// console.log('x', x)


Array.prototype.myEvery = function(callback){
  var falg = true  // 设置一个flag 只有一个是false就改为false
  if (this.length === 0) {
    // console.log('this', this) // 如果为空就直接返回true
    return true
  }
  for(var i = 0; i<this.length; i++) {  // this 是arr
    var every = callback(this[i])
    if (!every) { // 如果在自定义函数中有返回值为false 的就直接返回
      falg = false
      return false
    }
  }
  if (falg) { // falg为false就是不返回true  falg为true就是说明都是符合要求就直接返回true 
    return true
  } 
}

// var arr = [32, 33, 88, 40];
// var x = arr.myEvery((age) => {
//   return age >= 88;
// })
// console.log('x', x)


Array.prototype.mySome = function(callback){
  var falg = false  // 设置一个flag 只有一个是true就改为true
  if (this.length === 0) {
    // console.log('this', this) // 如果为空就直接返回true
    return true
  }
  for(var i = 0; i<this.length; i++) {  // this 是arr
    var every = callback(this[i])
    if (every) { // 如果在自定义函数中有返回值为true 的就直接返回
      falg = true
      return true
    }
  }
  if (!falg) { // falg为true就是说明都是不符合要求的
    return false
  } 
}

// var arr = [32, 33, 7, 40];
// var x = arr.mySome((age) => {
//   console.log('age', age)
//   return age >= 88;
// })
// console.log('x', x)


Array.prototype.myReduce = function(callback){
  if (this.length === 0) {
    // console.log('this', this) // 如果为空就直接返回true
    return true
  }
  var total = 0
  for(var i = 0; i<this.length; i++) {  // this 是arr
    var total = callback(total ,this[i])
  }
  return total
}

// var numbers = [65, 44, 12, 4];
// var x = numbers.myReduce((total, num) => {
//   console.log(total, num)
//   return total + num;
// })
// console.log('x', x)


Array.prototype.myFind = function(callback){
  var falg = false  // 设置一个flag 只有一个是true就改为true
  if (this.length === 0) {
    // console.log('this', this) // 如果为空就直接返回true
    return true
  }
  for(var i = 0; i<this.length; i++) {  // this 是arr
    var every = callback(this[i])
    if (every) { // 如果在自定义函数中有返回值为true 的就直接返回当前元素
      falg = true
      return this[i]
    }
  }
  if (!falg) { // falg为true就是说明都是不符合要求的
    return -1
  } 
}

var arr = [32, 33, 88, 40];
var x = arr.myFind((age) => {
  return age >= 33;
})
console.log('x', x)