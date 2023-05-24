# 构建性能优化技巧

### 使用最新版本

始终使用最新 `Webpack` 版本，这算的上是性价比最高的优化手段之一了！从 `Webpack` V3，到 V4，再到最新的 V5 版本，虽然构建功能在不断叠加增强，但性能反而不断得到优化提升，这得益于 Webpack 开发团队始终重视构建性能，在各个大版本之间不厌其烦地重构核心实现，例如：


* V3 到 V4 重写 `Chunk` 依赖逻辑，将原来的父子树状关系调整为 ChunkGroup 表达的有序图关系，提升代码分包效率；
* V4 到 V5 引入 `cache` 功能，支持将模块、模块关系图、产物等核心要素持久化缓存到硬盘，减少重复工作。

其次，新版本通常还会引入更多性能工具，例如 Webpack5 的 [cache](https://webpack.js.org/configuration/cache/) (持久化缓存)、[lazyCompilation](https://webpack.js.org/configuration/experiments/#experimentslazycompilation) （按需编译，下面展开介绍） 等。因此，开发者应该保持时刻更新 Webpack 以及 Node、NPM or Yarn 等基础环境，尽量使用最新稳定版本完成构建工作。



### 使用 `lazyCompilation`

Webpack 5.17.0 之后引入实验特性 [lazyCompilation](https://webpack.js.org/configuration/experiments/#experimentslazycompilation) ， 用于实现 entry 或异步引用模块的按需编译，这是一个非常实用的新特性！

试想一个场景，你的项目中有一个入口（entry）文件及若干按路由划分的异步模块，Webpack 启动后会立即将这些入口与异步模块全部一次性构建好 —— 即使页面启动后实际上只是访问了其中一两个异步模块， 这些花在异步模块构建的时间着实是一种浪费！lazyCompilation 的出现正是为了解决这一问题。用法很简单：


```js
// webpack.config.js
module.exports = {
  // ...
  experiments: {
    lazyCompilation: true,
  },
};
```

启动 `lazyCompilation` 后，代码中通过异步引用语句如 `import('./xxx')` 导入的模块（以及未被访问到的 `entry` ）都不会被立即编译，而是直到页面正式请求该模块资源（例如切换到该路由）时才开始构建，效果与 `Vite` 相似，能够极大提升冷启速度。

此外，lazyCompilation 支持如下参数：

* backend： 设置后端服务信息，一般保持默认值即可； 
* entries：设置是否对 entry 启动按需编译特性； 
* imports：设置是否对异步模块启动按需编译特性； 
* test：支持正则表达式，用于声明对那些异步模块启动按需编译特性。

不过，`lazyCompilation` 还处于实验阶段，无法保证稳定性，接口形态也可能发生变更，建议只在开发环境使用。

### 约束 Loader 执行范围

`Loader` 组件用于将各式文件资源转换为可被 Webpack 理解、构建的标准 JavaScript 代码，正是这一特性支撑起 Webpack 强大的资源处理能力。不过，Loader 在执行内容转换的过程中可能需要比较密集的 CPU 运算，如 `babel-loader`、`eslint-loader`、`vue-loader` 等，需要反复执行代码到 `AST`，`AST` 到代码的转换。

因此开发者可以根据实际场景，使用 `module.rules.include`、`module.rules.exclude` 等配置项，限定 Loader 的执行范围 —— 通常可以排除 node_module 文件夹，如：

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
    ],
  },
};
```

配置 `exclude: /node_modules/` 属性后，Webpack 在处理 `node_modules` 中的 js 文件时会直接跳过这个 `rule` 项，不会为这些文件执行 Loader 逻辑。

此外，`exclude` 与 `include` 还支持类似 `MongoDB` 参数风格的值，也就是通过 `and/not/or` 属性配置组合过滤逻辑，如：

```js
const path = require("path");
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.js$/,
      exclude: {
        and: [/node_modules/],
        not: [/node_modules\/lodash/]
      },
      use: ["babel-loader", "eslint-loader"]
    }],
  }
};
```

> 详细查阅 [官网](https://webpack.js.org/configuration/module/#condition)

上述配置的逻辑是：过滤 `node_modules` 文件夹中除 `lodash` 外的所有文件。使用这种能力，我们可以适当将部分需要转译处理的 NPM 包（例如代码中包含 ES6 语法）纳入 `Loader` 处理范围中。

### 使用 `noParse` 跳过文件编译

有不少 NPM 库已经提前做好打包处理（文件合并、Polyfill、ESM 转 CJS 等），不需要二次编译就可以直接放在浏览器上运行，例如：


* `Vue2` 的 node_modules/vue/dist/vue.runtime.esm.js 文件； 
* `React` 的 node_modules/react/umd/react.production.min.js 文件； 
* `Lodash` 的 node_modules/lodash/lodash.js 文件。

对我们来说，这些资源文件都是独立、内聚的代码片段，没必要重复做代码解析、依赖分析、转译等操作，此时可以使用 `module.noParse` 配置项跳过这些资源，例如：


```js
// webpack.config.js
module.exports = {
  //...
  module: {
    noParse: /lodash|react/,
  },
};
```

配置后，所有匹配该正则的文件都会跳过前置的构建、分析动作，直接将内容合并进 `Chunk`，从而提升构建速度。不过，使用 `noParse` 时需要注意：

* 由于跳过了前置的 `AST` 分析动作，构建过程无法发现文件中可能存在的语法错误，需要到运行（或 `Terser` 做压缩）时才能发现问题，所以必须确保 `noParse` 的文件内容正确性； 
* 由于跳过了依赖分析的过程，所以文件中，建议不要包含 `import/export/require/define` 等模块导入导出语句 —— 换句话说，`noParse` 文件不能存在对其它文件的依赖，除非运行环境支持这种模块化方案； 
* 由于跳过了内容分析过程，`Webpack` 无法标记该文件的导出值，也就无法实现 `Tree-shaking`。

综上，建议在使用 `noParse` 配置 NPM 库前，先检查 NPM 库默认导出的资源满足要求，例如 `React@18` 默认定义的导出文件是 `index.js`：

```js
// react package.json
{
  "name": "react",
  // ...
  "main": "index.js"
}
```

但 `node_module/react/index.js` 文件包含了模块导入语句 `require`：

```js
// node_module/react/index.js
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
```

此时，真正有效的代码被包含在 `react.development.js`（或 `react.production.min.js`）中，但 `Webpack` 只会打包这段 `index.js` 内容，也就造成了产物中实际上并没有真正包含 `React`。

针对这个问题，我们可以先找到适用的代码文件，然后用 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias) 配置项重定向到该文件：

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    noParse: /react|lodash/,
  },
  resolve: {
    alias: {
      react: path.join(
        __dirname,
        process.env.NODE_ENV === "production"
          ? "./node_modules/react/cjs/react.production.min.js"
          : "./node_modules/react/cjs/react.development.js"
      ),
    },
  },
};
```

> 使用 [externals](https://webpack.js.org/configuration/externals/) 也能将部分依赖放到构建体系之外，实现与 `noParse` 类似的效果，详情可查阅 [官网](https://webpack.js.org/configuration/externals/) 。


### 开发模式禁用产物优化























