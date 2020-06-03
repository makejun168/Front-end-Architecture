# Koa

### Koa-generator
1. npm install -g koa-generator
2. koa2 0e koa-learn 使用e.js 的模版新建项目
3. cd koa-learn npm install
4. npm start 启动项目

### nodemon
1. 监听重新服务，如果服务修改，马上开始重新启动服务
2. 为了开发做准备的依赖，devDependencies
3. npx nodemon bin/www 开发node项目必须要有的功能

### koa 异步 async/await
```javascript
const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  const a = await A;
  const b = await B;
  const c = await C;
  // 同步的写法，模仿异步的功能
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
```
学习例子
```javascript
const router = require('koa-router')()
router.get("/testAsync", async (ctx) => {
  console.log("start", new Date().getTime());
  // 等待了一秒时间
  const a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('async a', new Date().getTime());
      resolve("a");
    }, 1000);
  });
  
// await 后面不是Promise 对象的话 会把 它转化为 Promise 对象
  const b = await 12;
  // network 等待时间会是 1秒
  ctx.body = {
    a: a,
    b
  }
});
```

### koa 中间件的原理
#### 洋葱头
1. Request
2. 中间件 （进入的时候会经常过一次， 离开的时候也会经过一次）
3. 中间件是异步的函数 然后 使用next() 使用下一步
4. Response
5. 形成一个闭环的洋葱 

```javascript
pv /
m1 start
m1 /
m2 start
m2 /
m3 start
m3 /
Get 请求
m3 end
m2 end
m1 end
```

### 自定义 koa中间件
1. 中间件本质上是 异步函数
```javascript
function pv(ctx) {
  // 当前的执行路径
  console.log('pv', ctx.path);
}
// 中间件是函数 异步的函数
module.exports = function() {
  return async function(ctx, next) {
    // 处理过程
    pv(ctx);
    // 异步处理 进入下一个洋葱圈
    await next();
  }
}
```
2. 处理完成异步操作 通过next 执行下一个中间件
3. 实际应用的场景是，自定义中间件满足需求 第一个执行的中间件 永远在 next() 方法后面都会重新执行多一次

### koa 路由 API
koa [文档参考地址](
https://github.com/ZijianHe/koa-router)

### koa cookies & session
koa 官方文档地址 [地址](
https://koa.bootcss.com/#request)
1. 写入 cookies
```javascript
const router = require("koa-router")();
// render 方法可以直接渲染 到 html 中的 代码
router.get("/", async (ctx, next) => {
  ctx.cookies.set('pvid', Math.random);
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});
```

2. 读取 cookies
```javascript
const router = require("koa-router")();
router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
    cookies: ctx.cookies.get('pvid')
  };
});
```