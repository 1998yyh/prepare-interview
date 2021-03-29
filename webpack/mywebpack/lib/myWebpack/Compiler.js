const {getAst,getCode,getDeps}  = require('./parser');
const fs = require('fs');
const path = require('path');

class Compiler {
  constructor(options = {}) {

    this.options = options;
    this.modules = [];
  }

  // 启动webpack打包的方法
  run() {
    const filePath = this.options.entry;
    // 第一次购机那获取文件信息
    const fileInfo = this.build(filePath);
    this.modules.push(fileInfo);
    // 遍历所有依赖
    this.modules.forEach((_fileInfo)=>{
      /**
        {
          './add.js': "C:\\Users\\1998y'y'h\\Desktop\\study\\mywebpack\\src\\add.js",
          './count.js': "C:\\Users\\1998y'y'h\\Desktop\\study\\mywebpack\\src\\count.js"
        }
       */
      const deps  = _fileInfo.deps;
      // 取出所有依赖
      for(const relativePath in deps){
        
        const absolutePath = deps[relativePath];
        const fileInfo = this.build(absolutePath);
        this.modules.push(fileInfo);
      }
    });
    console.log(this.modules.length);
    const depsGraph = this.modules.reduce((pre,cur)=>{
      console.log(cur);
      return {
        ...pre,
        [cur.filePath]:{
          code:cur.code,
          deps:cur.deps
        }
      };
    },{});

    console.log(depsGraph);
    this.generate(depsGraph);
  }

  build(filePath){
    // 文件解析ast
    const ast = getAst(filePath);
    // 收集依赖
    const deps = getDeps(ast,filePath);
    // 转码
    const code = getCode(ast);
    return {
      filePath,ast,deps,code
    };
  }

  generate(depsGraph){
    /**
     '"use strict";\n' +
        '\n' +
        'var _add = _interopRequireDefault(require("./add.js"));\n' + 
        '\n' +
        'var _count = _interopRequireDefault(require("./count.js"));\n' +
        '\n' +
        'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
        '\n' +
        'console.log(_add["default"]);\n' +
        'console.log(_count["default"]);'
     */
    const bundle = `
      (function (depsGraph){
        // 加载入口文件
        function require(module){
          // 模块内部的require函数
          function localRequire(relativePath){
            // 为了找到当前模块的绝对路径  再通过require加载回来
            return require(depsGraph[module].deps[relativePath])
          }

          // 模块要暴露的对象都会在这里面
          var exports = {}
          (function (require,exports,code){
            eval(code);
          })(localRequire,exports,depsGraph[module].code)
          // 作为require函数的返回值返回去
          // 后面的require函数能得到暴露出去的内容
          return exports
        }
        require('${this.options.entry}')
      })(${JSON.stringify(depsGraph)})
    `;

    // 生成文件路径
    const filePath = path.resolve(this.options.output.path,this.options.output.filename);
    // 写文件
    fs.writeFileSync(filePath,bundle,'utf-8');
  }

}

module.exports = Compiler;