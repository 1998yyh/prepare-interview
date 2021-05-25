# Vue3
Performance 性能比Vue2.x快 1.2 - 2倍；
- Tree shaking support: 按需编译 体积比Vue2.x更小
- Composition API 组合API
- Better TypeScript support
- Custom Renderer API 暴露了自定义渲染API
- Fragment,Teleport(Protal) Suspense:更先进的组件

2.Vue3.0 如何变快的
- diff方法优化
  + vue2.0中虚拟dom进行全量的比较
  + Vue3新增了静态标记PatchFlag 只比较带有PatchFlag的节点
    并且可以通过flag的信息得知要比较的内容
- hoistStatic 静态提升
  + Vue2中无论元素是否参与更新，每次都会重新创建
  + Vue3中对于不参与更新的元素，会做静态提升，只会创建一次，在渲染的时候直接复用即可。

