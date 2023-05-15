为支持这一特性，我们需要搭建一套使用的工程化环境，将 JSX 及 React 组件转换为能够在浏览器上运行的 JavaScript 代码。本文将递进介绍使用 Webpack 搭建 React 应用开发环境的主要方法，包括：

* 如何使用 `Babel` 处理JSX文件？ 
* 如何使用 `html-webpack-plugin`、`webpack-dev-server` 运行 `React` 应用？ 
* 如何在 React 中复用 `TypeScript`、Less 等编译工具？ 
* 如何搭建 React SSR 环境？ 
* 如何使用 `Create React App`？

### 使用 Babel 加载 JSX 文件

绝大多数情况下，我们都会使用 JSX 方式编写 React 组件，但问题在于浏览器并不支持这种代码，为此我们首先需要借助构建工具将 JSX 等价转化为标准 JavaScript 代码。

在 Webpack 中可以借助 `babel-loader`，并使用 React 预设规则集 `@babel/preset-react` ，完成 JSX 到 JavaScript 的转换，具体步骤：

```
yarn add -D webpack webpack-cli babel-loader @babel/core @babel/preset-react
```

