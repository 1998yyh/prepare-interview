const {
  getOptions
} = require('loader-utils');
const {
  validate
} = require('schema-utils');

const schema = require('./babelschema.json');
const util = require('util');

const babel = require('@babel/core');

const transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
  const callback = this.async();
  const options = getOptions(this);

  validate(options, schema, {
    name: 'babel loader'
  });

  transform(content, options)
    .then(({
      code,
      map
    }) => {
      console.log(options,code);
      callback(null, code, map, meta);
    })
    .catch(e => {
      callback(e);
    });

};