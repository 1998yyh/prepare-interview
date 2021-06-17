# vuex

vuex是专为vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 应用场景

处理多个视图依赖同一个状态
处理来自不同视图的行为需要变更同一个状态
把各个组件都需要依赖的同一个状态抽取出来，在全局使用单例模式进行管理。
在这种模式下，任何组件都可以直接访问到这个状态，或者当状态发生改变时，所有的组件都获得更新。

## store

1. 定义

``` javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        name: '张三',
        number: 0,
        list: [{
                id: 1,
                name: '111'
            },
            {
                id: 2,
                name: '222'
            },
            {
                id: 3,
                name: '333'
            },
        ]
    },
});
export default store;
```

2. 使用

官方建议1：
可以使用 this.$store.state.name 访问到我们定义在store中name的值
官方建议我们以上操作this.$store.state. XXX最好放在计算属性中

官方建议2：

``` javascript
< script >
    import {
        mapState
    } from 'vuex'; // 从vuex中导入mapState
export default {
    mounted() {
        console.log(this.name);
    },
    computed: {
        ...mapState(['name']), // 经过解构后，自动就添加到了计算属性中，此时就可以直接像访问计算属性一样访问它

        // ...mapState({ aliasName: 'name' }),  // 赋别名的话，这里接收对象，而不是数组
    },
} <
/script>
```

## Getter(修饰器)

场景：已经将store的name展示到页面上了，而且很多都展示了，此时如果需要将所有的name前面增加'hello' 

1. 定义

``` javascript
const store = new Vuex.Store({
    state: {
        name: 111
    },
    // 在store对象中增加getters属性
    getters: {
        getMessage(state) { // 获取修饰后的name，第一个参数state为必要参数，必须写在形参上
            return `hello${state.name}`;
        }
    },
});
```

2. 使用

同store一样，可以使用this.$store.getters.getMessage去访问
也可以通过mapGetters去访问

## Mutation(修改值)

错误示范：this.$store.state. XXX = XXX; 
正确操作

``` javascript
const store = new Vuex.Store({
    state: {
        name: 111
    },
    mutations: { // 增加mutations属性
        setNumber(state) { // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
            state.number = 5;
        },
        setNumberIsWhat(state, number) { // 增加一个带参数的mutations方法
            state.number = number;
        },
        setNumberIsWhat2(state, payload) { // 增加一个带参数的mutations方法，并且官方建议payload为一个对象
            state.number = payload.number;
        },
    },
});
```

调用：

``` javascript
this.$store.commit('setNumber');
// 传参
this.$store.commit('setNumberIsWhat', 666);
// 上面的这种传参的方式虽然可以达到目的，但是并不推荐，官方建议传递一个对象进去，这样看起来更美观，对象的名字你可以随意命名，但我们一般命名为payload
this.$store.commit('setNumberIsWhat2', {
    number: 666
}); // 调用的时候也需要传递一个对象

// 官方建议 mapMutations
methods: { // 注意，mapMutations是解构到methods里面的，而不是计算属性了
    ...mapMutations(['setNumberIsWhat']),
}
mounted() {
    this.setNumberIsWhat({
        number: 999
    });
}
```

### 重要原则：Mutations里面的函数必须是同步操作，不能包含异步操作！

### 重要原则：Mutations里面的函数必须是同步操作，不能包含异步操作！

### 重要原则：Mutations里面的函数必须是同步操作，不能包含异步操作！

## Actions(异步操作)

``` javascript
actions: { // 增加actions属性
    setNum({
        commit
    }) { // 增加setNum方法，默认第一个参数是content，其值是复制的一份store
        return new Promise(resolve => { // 我们模拟一个异步操作，1秒后修改number为888
            setTimeout(() => {
                commit('setNumberIsWhat', {
                    number: 888
                });
                // action就是去提交mutation的，什么异步操作都在action中消化了，最后再去提交mutation的。
                resolve();
            }, 1000);
        });
    }
}
```

调用：

``` javascript
async mounted() {
    console.log(`旧值：${this.$store.state.number}`);
    await this.$store.dispatch('setNum', {
        number: 611
    });
    console.log(`新值：${this.$store.state.number}`);
}
// 官方推荐使用mapActions
methods: {
        ...mapActions['steNum']
    },
    async mounted() {
        await this.setNum({
            number: 123
        })
    }
```


中文翻译可能有些偏差（不是我翻的）。区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。

