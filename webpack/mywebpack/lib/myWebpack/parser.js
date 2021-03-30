const fs = require('fs');
const babelParser = require('@babel/parser');
const {
  transformFromAst
} = require('@babel/core');
const traverse = require('@babel/traverse').default;
const path = require('path');

const parser = {
  // 将文件解析成抽象语法树
  getAst(filePath) {
    // 1.读取入口文件内容
    const file = fs.readFileSync(filePath, 'utf-8');

    // 2.解析成AST抽象语法树
    const ast = babelParser.parse(file, {
      sourceType: 'module'
    });

    return ast;
  },
  getDeps(ast, filePath) {
    const deps = {};
    // 3.收集依赖
    const dirname = path.dirname(filePath);
    traverse(ast, {
      // 内部会遍历ast中 program.body 判断里面语句类型
      // 如果type ：ImportDeclaration 触发当前函数
      ImportDeclaration({
        node
      }) {
        // 文件的相对路径  './add.js'
        // 需要转化为绝对路径
        const relativePath = node.source.value;
        const absolutePath = path.resolve(dirname, relativePath);
        // 添加依赖
        deps[relativePath] = absolutePath;
      }
    });

    return deps;
  },
  getCode(ast) {
    // 编译代码
    const result = transformFromAst(ast, null, {
      // 预设
      presets: ['@babel/preset-env']
    });

    return result.code;
  }
};

module.exports = parser;