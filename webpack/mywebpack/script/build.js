const myWebpack = require('../lib/myWebpack/index.js');

const config = require('../config/webpack.config.js');

const compiler = myWebpack(config);

compiler.run();