### 微前端
微前端类似于微服务一样，将一个单页面应用 分成多个小的前端小项目，各个前端项目，独立开发，独立部署，独立管理


#### 实现方案
1. 通过路由区分 路由转发
2. iframe 嵌套的方式
3. 纯 web component 开发


#### 优点
1. 实现了 数据共享
2. js css 之间互相隔离开 vue 和 react 应用隔离，请求的路由地址不同，返回的html 不同
3. 子模块与子模块之间 相互隔离开

### 方法
组合式应用路由分发

1. 样式冲突
2. js 全局污染
3. 通信技术问题