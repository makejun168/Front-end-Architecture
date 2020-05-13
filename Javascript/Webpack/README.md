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

### url-loader 与 file-loader 对比
|  | url-loader | file-loader |
| --- | --- | --- |
| 定义 | Loads files as base64 encoded URL | Instructs webpack to emit the required object as file and to return its public URL |
| 用法 | 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL | 生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名 |
| 最佳实践 | 小图标使用url-loader返回 base64位等DataSource | 先使用 url-loader 过滤 再使用file-loader 添加hash值和公共路径 |

### file-loader 占位符

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| [ext] | String | file.extname | 资源的拓展名  |
| [name]  | String | file.basename | 资源的基本名称 |
| [path] | String | file.dirname | 资源相对于 context 的路径 |
| [hash] | String | md5 | 内容的哈希值，下面的hasdes配置中有更多信息 |
| [N] | Number |  | 当前文件名按照查询参数 regExp 匹配后获得到第 N个匹配结果 |


### 项目引入 字体文件 使用 file-loader
```javascript
module: {
    rules: [
        {
            test: /\.(eot|ttf|svg|woff)$/,
            include: path.resolve(__dirname, './src/font'),
            use: [{
                loader: 'file-loader'
            }]
        },
    ]
}
```

### 使用webpack 打包 css代码的 优缺点

使用 webpack 打包 CSS 有许多优点，在开发环境，可以通过 hashed urls 或 模块热替换(HMR) 引用图片和字体资源。而在线上环境，使样式依赖 JS 执行环境并不是一个好的实践。渲染会被推迟，甚至会出现 FOUC，因此在最终线上环境构建时，最好还是能够将 CSS 放在单独的文件中。

* extract-loader 针对 css-loader 的输出
* extract-text-webpack-plugin

### css 加载 loader 用法 比较

| 名称 | 用法 | 插件用法 | 最佳实践 |
| --- | --- | --- | --- |
| css-loader | css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们 | {loader: "css-loader"} | 集合使用 css-loader 与 style-loader 将样式存放在 style tag中 |
| style-loader | Adds CSS to the DOM by injecting a \<style\> tag | { loader: "style-loader" },{ loader: "css-loader" } | style-loader 与 css-loader 结合使用 |
| less-loader | Compiles Less to CSS | {loader: "style-loader" // creates style nodes from JS strings}, {loader: "css-loader" // translates CSS into CommonJS}, {loader: "less-loader" // compiles Less to CSS} | 使用插件 ExtractTextPlugin 提取样式到独立的css文件专业不需要依赖js |
| sass-loader | Loads a SASS/SCSS file and compiles it to CSS. | {loader: "style-loader" // creates style nodes from JS strings}, {loader: "css-loader" // translates CSS into CommonJS}, {loader: "less-loader" // compiles Sass to css | 使用插件 ExtractTextPlugin 提取样式到独立的css文件专业不需要依赖js |
| postcss-loader | Loader for webpack to process CSS with PostCSS css的预处理 新建 postcss.config.js | 如果需要使用到@import 引入css 代码的话 需要 在css-loader中 添加 importLoaders: 前置需要用到的loader数 | 在根目录设置postcss.config.js css-loader 和 style-loader 之后 在 less/sass-loader 之后 |