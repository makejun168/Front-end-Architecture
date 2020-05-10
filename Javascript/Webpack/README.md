# Webpack
核心定义是一个模块打包工具 模块化

> 使用最简单的 webpack 打包 JS文件
```shell
npx webpack index.js
```
index.js
```javascript
import Header from './header.js';
import SideBar from './sideBar.js';
import Content from './content.js';
// 实例化
new Header();
new SideBar();
new Content();
```