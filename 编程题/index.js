/**
 * 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 */

function mySetInterVal(fn, a, b) {
  this.a = a;
  this.b = b;
  this.index = 0;
  this.timer = -1;
  this.start = function(){
    this.timer = setTimeout(() => {
      fn();
      this.index ++ ;
      this.start();
    }, this.a + this.index * this.b);
  }
  this.stop = function(){
    clearTimeout(this.timer)
    this.index = 0;
  }
}

/**
 * 2.合并二维有序数组成一维有序数组，归并排序的思路
 */

function mergeSort(array){
  const stack = [...array];
  const result = [];
  while(stack.length > 0){
    const node = stack.shift();
    mergeArr()
  }
}

function mergeArr(arr1,arr2){
  const len1 = arr1;
  const len2 = arr2;
  let l1 = 0;
  let l2 = 0;
  while(l1<len1 && l2<len2){
    
  }
}