# Vue

### 基础模版

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

### 模版语法

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

### 计算属性

应用场景：具有依赖关系的数据监听

```html
computed: { b: function() { return this.money - this.a } }
```

### 样式

```html
<p :class="[a1 ,a2]"></p>
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

### 事件

#### 事件冒泡修饰符号

```javascript
@click.stop: handleClick //  阻止事件冒泡

@click: handleClick(params, $event); // 第一个参数是传递参数，可以添加修饰符号$event 传递事件Event
```

### 组件语法

#### 组件的参数传递

```javascript
export default {
  name: "Test",
  props: {
    age: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    handleClick(params) {
      console.log(Math.random());
      // console.log(e);
      this.$emit('getData', params);
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
  <h1 slot="a">kobe & gigi</h1>
  <h2 slot="b">slot B</h2>
</Test>
```

```html
<template>
  <div>
    <slot name="b"></slot>
    <button @click="handleClick('s', $event)">test</button>
    <div>{{this.age}}</div>
    <slot name="a"></slot>
  </div>
</template>
```

自定义事件

### 路由

#### 路由基础

定义路由文件，返回实例化以后的路由对象，配置 routes

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import pageA from "../pages/a.vue";
import pageB from "../pages/b.vue";

// 使用插件 挂载到同一个上下文中
Vue.use(VueRouter);

// 定义路由路径
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
// 实例化路由
export default new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});
```

### Vuex 基础使用

### Vuex 高级用例
