# Webpack
核心定义是一个模块打包工具 模块化

* ES2015 import 语句
* CommonJS require() 语句
* AMD define 和 require 语句
* css/sass/less 文件中的 @import 语句。
* 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

1. ES module 模块引入方式
```shell
npx webpack index.js
```

```javascript
// index.js
import Header from './header.js';
import SideBar from './sideBar.js';
import Content from './content.js';
// 实例化
new Header();
new SideBar();
new Content();
```

```javascript
export default function Header(){}
export default function SideBar(){}
export default function Content(){}
```


2. CommonJS 模块引入方式
```javascript
const Header = require('./header.js');
const SideBar = require('./sideBar.js');
const Content = require('./content.js');

new Header();
new SideBar();
new Content();
```

```javascript
function Content() {}
function SideBar() {}
function Header() {}
module.exports = Content;
module.exports = SideBar;
module.exports = Header;
```
