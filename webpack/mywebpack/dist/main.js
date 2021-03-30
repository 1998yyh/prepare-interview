
      (function (depsGraph){
        // 加载入口文件
        function require(module){
          // 模块内部的require函数
          function localRequire(relativePath){
            // 为了找到当前模块的绝对路径  再通过require加载回来
            return require(depsGraph[module].deps[relativePath])
          }

          // 模块要暴露的对象都会在这里面
          var exports = {};
          (function (require,exports,code){
            eval(code);
          })(localRequire,exports,depsGraph[module].code)
          // 作为require函数的返回值返回去
          // 后面的require函数能得到暴露出去的内容
          return exports
        }
        require('./src/index.js')
      })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_add[\"default\"]);\nconsole.log(_count[\"default\"]);","deps":{"./add.js":"C:\\Users\\admin\\Desktop\\prepare-interview\\webpack\\mywebpack\\src\\add.js","./count.js":"C:\\Users\\admin\\Desktop\\prepare-interview\\webpack\\mywebpack\\src\\count.js"}},"C:\\Users\\admin\\Desktop\\prepare-interview\\webpack\\mywebpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{}},"C:\\Users\\admin\\Desktop\\prepare-interview\\webpack\\mywebpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})
    