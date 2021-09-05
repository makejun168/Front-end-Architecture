// 实现一个 sea.js 库 
// define use的时候 调用 
const modules = {};
const exports = {};

sj = {};

// 地址 拼接方法 'http://xxx/xx/x/a.js'
const __getUrl = (dep) => {
  const p = location.pathname;
  return p.slice(0, p.lastIndexOf('/')) + '/' + dep + '.js';
}

// 加资源拼接加载到 HTML 上
const __load = url => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const node = document.createElement('script');
    node.type = 'text/javascript'

    node.src = url;
    node.async = true;
    node.onload = resolve;
    node.onerror = reject;
    head.appendChild(node);
  })
}

// 状态机的实现的方式 将函数转化为 字符串
// 遍历字符串 当字符串是 r 的时候 入栈，e的时候 入栈
// 最后 拼接完成以后 通过指针获取 require 中的 内容是什么

// 获取依赖的正则
const getDepsFromFn = (fn) => {
  let matches = [];
  // require('a ')
  // 1. (?:require\() -> require( -> (?:) 非捕获性分组
  // 2. (?:['"]) -> require('
  // 3. (^['"]+) 匹配到的是 a
  let reg = /(?:require\()(?:['"])(^['"]+)/g;
  let r = null;

  // 返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
  while(r = reg.exec(fn.toString()) !== null) {
    reg.lastIndex
    matches.push(r[1]); // 下标返回的是 一个 从 1开始
  }
}

// 依赖是写在 函数里面的
// 依赖提取 1 正则表达式 2 状态机
define = (id, factory) => {
  const url = __getUrl(id);
  let deps = getDepsFromFn(factory);
  if (!modules[id]) {
    modules[id] = {url, id, factory, deps};
    // 依赖是写在 函数里面的
  }
}

const __module = this;

// export 方法等于说 是将 函数变量 挂载到一个 全局对象中，其他地方可以访问
const __export = (id) => exports[id] || (exports[id] = {})

// 按需加载 加载模块的地方
const __require = (id) => {
  return __load(__getUrl(id)).then(() => {
    // 加载成功以后
    const { factory, deps } = modules[id];

    // 判断当前有没有依赖
    if (!deps || deps.length === 0) {
      factory(__require, __export(id), __module)
      return __export(id);
    }

    // 递归
    return sj.use(deps, factory);
  })
}

// sj use 方法
sj.use = (mods, callback) => {
  mods = Array.isArray(mods) ? mods : [mods]

  return new Promise((resolve, reject) => {
    Promise.all(mods.map(mod => {
      return __load(__getUrl(mod)).then(() => {
        const {factory} = modules[mod];
        return factory(__require, __export(mod), __module); // 直接执行了 factory 函数
      })
    })).then(resolve, reject)
  }).then(instances => callback && callback(instances))
}