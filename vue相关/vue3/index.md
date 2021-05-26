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

## 为什么引入组合式API

### optionAPI存在的问题
* 不利于服用
* 潜在的命名冲突
* 上下文丢失
* 有限的类型支持
* 按API类型组织
### compositionAPI提供的能力
* 极易复用（原始js函数）
* 可灵活组织（生命周期钩子函数可多次使用）
* 提供更好的上下文支持
* 更好的TypeScript 类型支持
* 按功能逻辑组合
* 可独立Vue组件使用


### 建立“连结”
Vue的setup 只会在组件建立的时候执行一次，并建立数据与逻辑之间的连结。
* 建立输入 -> 输出的 连接
* 输出会自动根据输入的改变而改变


### 什么时候调用ref reactive
#### pros
ref显示调用，类型检查 相比reactive局限更少
reactive unwrap 不需要.value

#### cons
ref 需要多个value
reactive类型上和一般对象没有区别，使用ES6结构会使响应式丢失，需要箭头函数包装才能使用watch


### Ref自动解包
目的减少.value的使用
watch 直接接受ref作为监听对象，并在回调函数里返回解包后的值
ref 在模板中自动解包
使用reactive解包嵌套的ref
``` javascript
const foo = ref('bar');
const data = reactive({foo,id:10})
data.foo //bar
```

### unref - ref的反操作
传入一个ref 返回其值
否则原样返回

### 接受ref作为函数参数
接受ref作为参数，返回一个响应式结果
``` javascript
function add(a,b){
  return computed(()=>a.value + b.value)
}
```
同时接收传入值和Ref
``` javascript
function add(a,b){
  return computed(()=>unref(a) + unref(b))
}
const a = ref(1);
const c = add(a,5);
c.value // 6
```

### 让函数变得更灵活

``` javascript 
// 不绑定 每次都需要创建一个title
const title = useTitle();
title.value = 'hello world'
// 绑定一个现有的ref
const name = ref('hellow');
const title = computed(()=>{
  return `${name.value} - word`
})

useTitle(title);

name.value = 'hi'
``` 
