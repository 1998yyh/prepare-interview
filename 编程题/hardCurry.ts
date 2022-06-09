//  add(1)
//  add(1)(2,3)
//  add(1)(2,3)(5,6)


function add2(...args){
  const nums = Array.from(args)
  const fn = function(...args) {
    const fn_nums = Array.from(args)
    return add2.apply(null,nums.concat(fn_nums))
  }
  
  fn.valueOf = function(){
    return args.reduce((a,b)=>a+b)
  }

  return fn
}