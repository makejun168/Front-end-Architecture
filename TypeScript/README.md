# Typescript

1. 安装 ts

```shell
npm install typescript -g
```

2. 初始化 ts

```shell
tsc --init
```

## strictNullChecks

### 总结

1. undefined null 两个空类型设计，使用上不方便
2. 通过 strictNullChecks 严格校验，让代码更加安全

## moduleResolution

1. 指的是 ts 在编译的过程中使用的编译器
2. node 和 classic 两种模式选择
3. node 模式是去 node_modules 的模块中去查找的
4. classis 模式会在 同级目录去查找，如果查找不到会到父级目录查找，直到跟目录为止
5. classis 模式一般用于老项目中使用

## JSX 设置

1. jsx 配置项目 有 'preserve', 'react-native', or 'react' 三个配置
2. preserve 输出的文件后缀是 jsx react 输出的文件后缀是 js react-native 输出的文件后缀是 js
3. react 是输出的是 React.createElement('div')
