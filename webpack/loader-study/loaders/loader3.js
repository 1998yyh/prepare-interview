// 获取loader配置的
const {
  getOptions
} = require('loader-utils');
// 校验loader配置
const {
  validate 
} = require('schema-utils');

const schema = require('./schema.json');

module.exports = function (content, map, meta) {
  // 获取options
  const options = getOptions(this);
  console.log(333, options);

  console.log(typeof validate);
  console.log(validate);
  // 校验options 是否合法

  // schema.json
  /**
   * schema 规则
   * options 内容
   * 当前loader名字
   */

   /**
    * additionalProperties 是否可以追加属性
    */
  validate(schema, options, {
    name: 'loader3'
  });

  return content;
};

module.exports.pitch = function () {
  console.log('pitch 333');
};