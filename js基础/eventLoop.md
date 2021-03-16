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


### 补充
今天做一道题发现个问题。
```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});
new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});
process.nextTick(() => {
  console.log(6);
});
setTimeout(() => {
  console.log(9);
  process.nextTick(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(12);
  });
});
```
此段代码在node 11以下的环境中和node 11以上的环境中输出的结果不相同。
现在node11在timer阶段的setTimeout,setInterval...和在check阶段的immediate都在node11里面都修改为一旦执行一个阶段里的一个任务就立刻执行微任务队列。为了和浏览器更加趋同.

### nodejs Eventloop
#### Node.js中的EventLoop执行宏队列的回调任务有6个阶段
1.timers阶段：这个阶段执行setTimeout和setInterval预定的callback
2.I/O callback阶段：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
3.idle, prepare阶段：仅node内部使用
4.poll阶段：获取新的I/O事件，适当的条件下node将阻塞在这里
5.check阶段：执行setImmediate()设定的callbacks
6.close callbacks阶段：执行socket.on('close', ....)这些callbacks

#### NodeJs中宏队列主要有4个
1.Timers Queue
2.IO Callbacks Queue
3.Check Queue
4.Close Callbacks Queue
这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。


#### NodeJS中微队列主要有2个
1.Next Tick Queue：是放置process.nextTick(callback)的回调任务的
2.Other Micro Queue：放置其他microtask，比如Promise等


#### Node.js中的EventLoop过程
1.执行全局Script的同步代码
2.执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3.开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
4.Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
5.这就是Node的Event Loop
