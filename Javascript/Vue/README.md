# Vue

| 目录 |
| -- |
| 基础模版 |
| 模版语法 |
| 计算属性 |
| 样式 |
| 事件 |
| 组件语法 |
| 路由 |
| Vuex 基础使用 |
| Vuex 高级用例 |


### 1.1 基础模版

```html
<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    props: {
      msg: String,
    },
    data() {
      return {
        num: 1,
      };
    },
  };
</script>

<style>
  .h1 {
    font-size: 16px;
  }
</style>
```

### 1.2 模版语法

1. 变量绑定 & 运算符

```html
<span>Message:{{msg}}</span>
// 原始的HTML
<span v-html="html"></span>
// 表达式
<div>{{num + 1}}{{ok ? 'yes' : 'NO'}}</div>
```

2. 指令

```html
<div v-if="isShow">HelloWorld</div>
<div :click="handleClick" @click="handleClick">Click</div>

// 循环指令
<div v-for="(item, index) in list" :key="index">{{item}}</div>
```

3. 自定义指令

```javascript
import Vue from "vue";
Vue.directive("n", {
  bind: function (el, binding) {
    el.textContent = Math.pow(binding.value, 2);
  },
  update: function (el, binding) {
    el.textContent = Math.pow(binding.value, 2);
  },
});
```

4. 修饰符

```html
<form @submit.prevent="onSubmit">...</form>
// prevent 阻止默认submit的跳转
```

***

### 1.3 计算属性

应用场景：具有依赖关系的数据监听

```html
computed: { b: function() { return this.money - this.a } }
```

***

### 1.4 样式

```html
<p :class="[a1 ,a2]"></p>
<script>
  export default {
    data() {
      return {
        a1: "test1",
        a2: "test2",
      };
    },
  };
</script>
<style>
  .test1 {
  }
  .test2 {
  }
</style>
```

***

### 1.5 事件

#### 事件冒泡修饰符号

```javascript
@click.stop: handleClick //  阻止事件冒泡

@click: handleClick(params, $event); // 第一个参数是传递参数，可以添加修饰符号$event 传递事件Event
```

***

### 1.6 组件语法

#### 组件的参数传递

```javascript
export default {
  name: "Test",
  props: {
    age: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    handleClick(params) {
      console.log(Math.random());
      // console.log(e);
      this.$emit('getData', params);
    },
  },
};
</script>
```

```html
<Test @getData="getMyData" :age="'18'"></Test>
```

#### slot

组件中嵌套动态组件插件，组件灵活使用

```html
<Test @getData="getMyData" :age="'18'">
  <h1 slot="a">kobe & gigi</h1>
  <h2 slot="b">slot B</h2>
</Test>
```

```html
<template>
  <div>
    <slot name="b"></slot>
    <button @click="handleClick('s', $event)">test</button>
    <div>{{this.age}}</div>
    <slot name="a"></slot>
  </div>
</template>
```

***

### 2 路由

#### 2.1 路由基础

定义路由文件，返回实例化以后的路由对象，配置 routes

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import pageA from "../pages/a.vue";
import pageB from "../pages/b.vue";

// 使用插件 挂载到同一个上下文中
Vue.use(VueRouter);

// 定义路由路径
const routes = [
  {
    path: "/",
    name: "test",
    component: pageA,
  },
  {
    path: "/test",
    name: "test2",
    component: pageB,
  },
];
// 实例化路由
export default new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});
```

***

### 3. Vuex 基础使用

1. 定义 store

```javascript
import Vue from "vue";
import Vuex from "vuex";
// 挂载到全局Vue的 上下文中
Vue.use(Vuex);
// 1， 定义 state
const state = {
  count: 1,
};
// 2. 定义 mutations
const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
};
// 3. 定义 actions
const actions = {
  increment: ({ commit }) => {
    commit("incrememt");
  },
  decrement: ({ commit }) => {
    commit("decrement");
  },
};
// 实例化 Vuex 对象 分别传入 state mutation actions
export default new Vuex.Store({ state, mutations, actions });
```

2. 将 store 传入到 Vue 实例化中

```javascript
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
Vue.use(Vuex);
new Vue({
  router,
  store, // 传入 store
}).$mount("#app");
```

3. 使用 vuex 中的数据

```javascript
<template>
  <div>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <div>{{ this.count }}</div>
    <button @click="getData()">getData</button>
    <!-- <div>{this}</div> -->
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "vuex",
  computed: {
    ...mapState({ count: state => state.count }),
  },
  methods: {
    ...mapActions(["increment", "decrement"]),
    getData() {
      console.log(12313213);
    }
  },
};
</script>
```

### 4. Vuex 高级用例

1. 高级用例是指分开多个 modules

```javascript
import Vue from "vue";
import Vuex from "vuex";
// 定义多个 modules
import money from "./modules/a";
import count from "./modules/b";
Vue.use(Vuex);
// 传入 modules 的对象中 获取
export default new Vuex.Store({
  modules: {
    money,
    count,
  },
});
```

2. 单个 modules 定义方法

```javascript
// 定义 单独的 A modules
const state = {
  money: 10,
};

const mutations = {
  add(state, param) {
    state.money += param;
  },
  decrement(state) {
    state.money--;
  },
};

const actions = {
  add: ({ commit }, param) => {
    commit("add", param);
  },
  decrement: ({ commit }) => {
    commit("decrement");
  },
};

export default { namespaced: true, state, mutations, actions };
```

3. 使用 Vuex

```javascript
<template>
  <div>
    <div>A page</div>
    <div>money: {{ money }}</div>
    <button @click="add(2)">添加</button>
    <button @click="decrement">减少</button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "a",
  computed: {
    ...mapState({
      money: (state) => state.money.money,// money 是模块名称
    }),
  },
  methods: {
    ...mapActions("money", ["add", "decrement"]),
  }
};
</script>
```

4. Vuex 数据流 项目结构 复杂一点的项目

```javascript
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```
