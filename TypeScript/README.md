# Typescript
1. 安装ts
```shell
npm install typescript -g
```

2. 初始化ts
```shell
tsc --init
```
## strictNullChecks
1. undefined null 两个空类型设计，使用上不方便
2. 通过 strictNullChecks 严格校验，让代码更加安全

## moduleResolution
1. 指的是ts在编译的过程中使用的编译器
2. node 和 classic 两种模式选择
3. node 模式是去 node_modules 的模块中去查找的
4. classis 模式会在 同级目录去查找，如果查找不到会到父级目录查找，直到跟目录为止
5. classis 模式一般用于老项目中使用

## JSX 设置
1. jsx 配置项目 有 'preserve', 'react-native', or 'react' 三个配置
2. preserve 输出的文件后缀是 jsx react 输出的文件后缀是 js react-native 输出的文件后缀是 js
3. react 是输出的是 React.createElement('div')

## esModuleInterop
1. esModuleInterop 是针对module.exports 导出的时候 ts 语法需要 module.exports.default 在配置后面添加default
2. 如果导入的时候需要default属性，他会自动加入default属性
3. 判断导入的模块是否是esmodule模块 如果是加入 default属性 如果不是，就不加

参考代码
```js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
```

## noImplicitAny
1. true 不能存在隐式的any类型的赋值，不然就会报错了
2. false 允许代码里面有隐式转换的any类型

## target
1. ECMAScript target version 输出的es版本类型 比如说是 es6 就是es6版本的语法
2. 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'
3. ES5 和 ES2015 之间差异很大 可以通过设置两个版本 看到细节
4. 一般设置成ES5就可以了