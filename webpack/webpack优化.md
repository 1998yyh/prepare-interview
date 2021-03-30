# webpack 优化

## 缩短解析时间
1. exclude include 二选一，有些资源不需要打包
2. 多进程打包 thread-loader
3. 加缓存 cache-loader  babel-loader开启缓存

如果同时出现了 cache-loader 和 thread-loader
他们的顺序应该是[cache-loader,thread-loader]，在调用pitch函数时候，缓存里有就不会走后面的流程

## plugins优化
