//  add(1)
//  add(1)(2,3)
//  add(1)(2,3)(5,6)

const add = (...nums) => {
  let acc = 0;
  const fn = (...nums) => (acc = nums.reduce((acc, cur) => acc + cur, acc), fn)
  fn[Symbol.toPrimitive] = () => acc;
  return fn(...nums)
}