const fs = require('fs');
const util = require("util");
const path = require('path');
const readFile = util.promisify(fs.readFile);

const webpack = require('webpack');

// webpack4中 将sources放到了webpack中 不需要单独引入
// RawSource是webpack帮我们编译好的文件
const {
  RawSource
} = webpack.sources;

class Plugins2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('Plugins2', (compilation) => {
      // debugger;
      // console.log(compilation);
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        const content = 'hello';
        compilation.assets['a.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          }
        };

        const data = await readFile(path.resolve(__dirname, 'b.txt'));

        // console.log();

        // webpack 4的方法
        // compilation.assets['b.txt'] = new RawSource(data);

        // webpack 5的方法
        compilation.emitAsset('b.txt', new RawSource(data));

        // 执行完成
        cb();

      });

    });
  }
}

module.exports = Plugins2;