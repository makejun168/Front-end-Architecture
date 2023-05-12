使用 Webpack 搭建 Vue 应用开发环境的主要方法，包括：

* 如何使用 `vue-loader` 处理 Vue SFC 文件？
* 如何使用 `html-webpack-plugin`、`webpack-dev-server` 运行 Vue 应用？
* 如何在 Vue SFC 中复用 TypeScript、Less、Pug 等编译工具？
* 如何搭建 Vue SSR 环境？
* 如何使用 Vue CLI？

### 使用 Vue-loader 处理 SFC 代码

形态上，Vue SFC(Single File Component) 文件(*.vue)是使用类 HTML 语法描述 Vue 组件的自定义文件格式，文件由四种类型的顶层语法块组成：

* `<template\>`：用于指定 Vue 组件模板内容，支持类 HTML、Pug 等语法，其内容会被预编译为 JavaScript 渲染函数；
* `<script\>`：用于定义组件选项对象，在 Vue2 版本支持导出普通对象或 defineComponent 值；Vue3 之后还支持 <script setup\> 方式定义组件的 setup() 函数；
* `<style\>`：用于定义组件样式，通过配置适当 Loader 可实现 Less、Sass、Stylus 等预处理器语法支持；也可通过添加 scoped、module 属性将样式封装在当前组件内； 
* `Custom Block`：用于满足领域特定需求而预留的 SFC 扩展模块，例如 <docs\>；Custom Block 通常需要搭配特定工具使用，详情可参考 Custom Blocks | Vue Loader 。

原生 Webpack 并不能处理这种内容格式的文件，为此我们需要引入专用于 Vue SFC 的加载器：vue-loader。首先，依然是安装依赖：

```
yarn add -D webpack webpack-cli vue-loader

```
