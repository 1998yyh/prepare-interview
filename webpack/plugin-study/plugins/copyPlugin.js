const globby = require('globby');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {
  promisify
} = require('util');

const {
  RawSource
} = webpack.sources;
const readFile = promisify(fs.readFile);
class CopyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CopyPlugin', (compilation) => {
      compilation.hooks.additionalAssets.tapAsync('CopyPlugin', async (cb) => {
        const {
          from,
          to,
          ignore
        } = this.options;
        // 获取绝对路径
        // const context = compiler.options.context;
        // const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);
        // 过滤文件
        // 不知道为啥不需要绝对路径了
        const paths = await globby(from, {
          ignore
        });
        // 读取文件
        const files = await Promise.all(
          paths.map(async (_path) => {
            const data = await readFile(_path);
            // 获取文件名称
            let fileName = path.basename(_path);

            // 如果有to
            if (to) {
              fileName = path.join(to, fileName);
            }
            return {
              data,
              fileName
            };
          })
        );

        const assets = files.map((file) => {
          const source = new RawSource(file.data);
          return {
            source,
            fileName: file.fileName
          };
        });

        assets.forEach((asset) => {
          compilation.emitAsset(asset.fileName, asset.source);
        });

        cb();
      });
    });
  }
}

module.exports = CopyPlugin;