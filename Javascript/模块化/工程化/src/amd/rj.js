const def = new Map();

// AMD mini import
const defaultOptions = {
  paths: ''
}

// From CDN
const __import = (url) => {
  return new Promise((resolve, reject) => {
    System.import(url).then(resolve, reject)
  })
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

rj = {};

rj.config = (options) => Object.assign(defaultOptions, options); // 最后需要使用的 是 DefaultOptions

// 定义模块,触发时机 是在 require 时候 所以 -> 收集
rjDefine = (name, deps, factory) => {
  // todo 参数之间判断 互换等等
  def.set(name, { name, deps, factory }); // 存在一个 map 结构的对象中
}

// dep -> a -> a.js -> 'http://xxx/xx/x/a.js'
const __getUrl = (dep) => {
  const p = location.pathname;
  return p.slice(0, p.lastIndexOf('/')) + '/' + dep + '.js';
}

// 触发加载的地方
rjRequire = (deps, factory) => {
  return new Promise((resolve, reject) => {
    Promise.all(deps.map(dep => {
      // 加载依赖 判断当前的依赖是否来自于 CDN的
      if (defaultOptions.paths[dep]) {
        console.log(defaultOptions.paths[dep])
        return __import(defaultOptions.paths[dep]);
      }

      return __load(__getUrl(dep)).then(() => {
        const { deps, factory } = def.get(dep);
        if (deps.length === 0) {
          return factory(null); // 如果获取依赖的时候 他没有依赖其他的库
        }
        // 如果他依赖了其他的库 define的时候 依赖了 其他的库
        // 执行递归
        return rjRequire(deps, factory)
      });
    })).then(resolve, reject)
  }).then(instances => factory(...instances))
}

