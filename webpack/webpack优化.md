# webpack 优化

## 缩短解析时间
1. exclude include 二选一，有些资源不需要打包
2. 多进程打包 thread-loader
3. 加缓存 cache-loader  babel-loader开启缓存

如果同时出现了 cache-loader 和 thread-loader
他们的顺序应该是[cache-loader,thread-loader]，在调用pitch函数时候，缓存里有就不会走后面的流程

cache-loader 和 babel-loader的原理是否相同？
cache-loader是根据modifytime来进行判断，babel-loader是根据文件内容进行判断
## 缩短搜索时间
1. resolve.module
2. resolve.alias
3. resolve.extension

## 分包

## plugins优化

## 资源优化
1. image-webpack-loader 压缩图片
2. 使用DataURL 即 base64
3. Tree shaking  在 optimization 配置useExports：true   模块内未使用的部分不进行导出