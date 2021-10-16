### 核心概念

Vue2 是响应式原理基于 Object.defineProperty 方法重定义对象的 getter
与 setter，vue3 则基于 Proxy 代理对象，拦截对象属性的访问与赋值过程。差异在于，前
者并不能对诸如数组长度变化、增删元素操作、对象新增属性进行感知，在 vue 层面不得不
重写一些数组方法（push、pop、unshift、shift 等），动态添加响应式属性，也要使用 $set
方法等。而 Proxy 则完美地从根上解决了这些问题，不过对于不支持 Proxy 对象的浏览器（如
IE），如果要使用 vue3 依然要进行降级兼容

```js
// 假设我们在 data 函数中返回的数据为 initData
const initData = { value: 1 };

// 基于 initData 创建响应式对象 data
const data = {};

Object.keys(initData).forEach(key => {
    Object.defineProperty(data, key, {
        get() {
            // 此处依赖收集
            console.log('访问了', key);
            return initData[key];
        },
        set(v) {
            // 此处执行回调更新
            console.log('访问了', key);
            initData[key] = v;
        }
    });
});
```
从这里可以看出，initData 动态添加的属性，并不能被观测到，这也是 Vue.$set 存在的原因


#### Proxy

```js
const initData = { value: 1 };// 基于 initData 创建响应式对象 data


const proxy = new Proxy(initData,
    {
        get(target, key) {
        // 此处依赖收集 
        console.log('访问了', key); 
        return target[key];
    },
    set(target, key, value) {
        // 此处执行回调更新 
        console.log('修改了', key); 
        return Reflect.set(target, key, value);
    }
}); // Proxy 可以观测到动态添加的属性
```

### 安装
```cmd
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev 或者
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

