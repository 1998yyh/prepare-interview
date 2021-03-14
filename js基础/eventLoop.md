# 事件循环

先搞一个题看看
```javascript
let sleep = s => {
  let time1 = Date.now();
  while (Date.now() - time1 < s) {}
  console.log('a', `end sleep ${s}ms`);
};

let async1 = async () => {
  await async2();
  console.log("B", 'async1 end');
};

let async2 = async () => {
  console.log("c", "async2 start");
  await Promise.resolve();
  console.log("D", 'async2 end');
};

setTimeout(() => {
  console.log('1', 'settimeout  1');
});

new Promise((resolve, reject) => {
  reject();
  console.log('3', 'promise1');
}).catch(() => {
  console.log('4', 'promise2');
});

async1();
sleep(2000);
```

这个题的最终输出是
1. '3', 'promise1'
2. "c", "async2 start"
3. 'a', 'end sleep 2000ms'
4. '4', 'promise2'
5. "D", 'async2 end'
6. "B", 'async1 end'
7. console.log('1', 'settimeout  1');


栈 [main]
宏任务 [console.log('1', 'settimeout  1')]
微任务 []
我们从上往下分析这个代码，sleep async1 async2声明函数，不调用不会执行，timeout直接进宏任务队列排着去，然后到了new promise，promise的构造函数是宏任务哦，同步执行，先输出了(1),然后遇到了then(),then里的代码是异步执行的且是微任务，我们往微任务队列里可以push catch的console了

微任务 [console.log('4', 'promise2')]

然后我们执行 async1,它的第一行 await async2(),遇到了await 不管async2返回值是什么下面的任务都是异步的了，且是微任务。看async2执行，第一行同步代码，直接输出(2),然后又是await Promise.resolve();遇到个这么情况，他后面的也是异步微任务了，将其推到微任务队列里

微任务 [console.log('4', 'promise2')，console.log("D", 'async2 end')]

然后这个函数没有返回值，那undefined , await undefined === await Promise.resolve(undefined); 也不用多说，微任务进

微任务 [console.log('4', 'promise2')，console.log("D", 'async2 end')，console.log("D", 'async2 end')]

async1就执行完了，我们执行sleep，while循环是个同步的，所以等着，然后输出(3),至此，执行栈应该是空的，所有的都执行完了。然后开始跟着它的微任务，(4)(5)(6)挨着走，最后下一个宏任务(7)结束。


