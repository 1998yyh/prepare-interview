let sleep = s => {
  let time1 = Date.now();
  while (Date.now() - time1 < s) {}
  console.log('a', `end sleep ${s}ms`);
};

let async1 = async () => {
  // await 1;
  await async2();
  console.log("B", 'async1 end');
};

let async2 = async () => {
  console.log("c", "async2 start");
  await Promise.resolve();
  console.log("D", 'async2 end');
  // return new Promise((res)=>{
  //   setTimeout(() => {
  //     res();
  //   }, 0);
  // });
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

// '3', 'promise1'
// "c", "async2 start"
// 'a', `end sleep ${s}ms`
// '4', 'promise2'
// "D", 'async2 end'
// "B", 'async1 end'
// console.log('1', 'settimeout  1');

