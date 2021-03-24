/**
 * loader 本质是一个函数
 * 
 */

module.exports = function (content, map, meta) {
  // 同步写法 1
  // return content;
  // 同步写法2
  // this.callback(null,content,map,meta)
  // 异步写法
  const callback = this.async();
  setTimeout(() => {
    console.log(1111);
    callback(null,content);
  }, 1000);
};

module.exports.pitch = function(){
  console.log('pitch 1111');
};