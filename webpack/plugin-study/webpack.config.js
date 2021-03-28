// const Plugins1 = require('./plugins/Plugin1')
// const Plugins2 = require('./plugins/Plugin2');
const CopyPlugin = require('./plugins/copyPlugin');
const path = require('path');

module.exports = {
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'main.js'
  },
  plugins:[
    new CopyPlugin({
      from:'./public',
      to:'.',
      ignore:['**/index.html']
    })
  ]
};