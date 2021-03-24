/**
 * loader 本质是一个函数
 * 
 */

module.exports = function (content, map, meta) {
  console.log(222);

  return content;
};

module.exports.pitch = function(){
  console.log('pitch 222');
};