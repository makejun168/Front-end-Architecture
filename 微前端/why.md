#### 目前前端所存在的一些问题

    1.   在目前所流行的主流框架vue，react等，他都是将属于一个单页面应用。在开发，部署等会存在较大的不遍。比如在开发的过程中，随着业务的深入和复杂，将会带来逻辑定位问题、打包速度问题、部署上线问题。往往我们可能只是更改了一行JS代码，到最后发布的时候，整个项目却要整个重新打包编译发布。
       2.   公司可能之前的系统使用的是JQ或者其他框架进行开发，这个时候，我们想要追赶一下潮流。使用react或者vue进行开发。这个时候，我们就不得不对之前的项目使用新技术进行开发。
       3.   在如今的单页面应用里，所有的JS到最后都打包到一个`Bundle.js`文件里，这就会导致线上用户第一次进入的时长比较长，对于前端性能统计中的`FP,FCP,TTI`等一系列指标产生重大影响。虽然我们可以使用懒加载的形式去对代码进行拆分下载，但是依然会导致上述问题，因为懒加载是在路由发生变化的时候去加载的，此时此刻当你路由切换了，需要经过DNS解析，三次握手，然后传输，代码解析等等步骤，这其中也会耗费一些时间。

#### 我们需要一个什么样的技术去解决上述问题

我们希望可以有这么一种技术或者架构：

1. 它能够使各个子模块或者子系统进行隔离。这样我们在更新一个子模块的时候，我们只需要对这个子模块进行打包，发布上线。不会影响到其他模块。并且因为各个子系统之间相互隔离，项目就会拆分的轻量化，打包速度，前端性能等也会上去。并且因为各个子系统之前的相互隔离，这样就不会受限于技术栈的影响，你们各自系统只要能实现功能就行。
2. 它能够使各个子系统进行数据共享。例如用户信息。
3. 他能够对 JS，css 等进行相互隔离，防止出现污染问题。

#### 微前端

有了之前的铺垫，相信大家大概都能猜出微前端主要的功能是什么。微前端（Micro-FrontEnds）是一种类似于微服务的架构，它将微服务的理念应用于前端，即将 Web 应用由单一的单页面应用转变为多个小型前端应用聚合为一的应用。然后各个前端应用还可以独立运行、独立开发、独立部署。

#### 实现微前端的方案

1. 路由转发。当前的单页面应用的路由控制都是在前端进行。这就导致我们必须使用同一的技术栈，要不然`react-dom-router`他指挥不了 vue 路由，`vue-router`也指挥不了 react。这也会导致我们的项目必须在一个同一的项目里进行开发，因为跨项目的话，就算技术栈一样，A 也指挥不了 B 里面的路由跳转。但是如果我们将路由跳转交给服务端，当我们访问一个路由的时候，后端进行重定向等操作，这样就会将我们的应用`隔离`开。例如： `http://www.xxxx.com/a`与`http://wwww.xxxx.com/b`，当后端收到 a 路由的时候，指向一个系统，当收到 b 路由的时候指向另外一个系统，这样我的系统开发所采用的技术栈就可以进行隔离。如果要分享用户信息等，可以通过 cookie 等技术进行分享。因为每次路由匹配到的话，都会进行刷新，因此也防止了 JS，css 的污染问题

   > 缺点：每次跳转都相当于重新刷新了一次页面，不是页面内进行跳转。影响体验。
   >
   > 优点： 简单，可快速配置。

2. iframe 嵌套。通过创建一个父程序，在父程序中监听路由的变化，卸载或加载相应的子程序 iframe。因每一个 iframe 就相当于一个单独的页面，所以 iframe 具有天然的 JS 和 css 隔离。在信息共享方面，我们可以使用 postMessage 或者 contentWindow 的方式进行。

   > 缺点： iframe 样式兼容问题。分别为功能性兼容性以及业务性兼容性的问题。可能会存在一些安全问题。postmessage 可以试出来。
   >
   > - 主应用劫持快捷键操作
   > - 事件无法冒泡顶层，针对整个应用统一处理时效
   > - iframe 内元素会被限制在文档树中，视窗宽高限制问题
   > - 无法共享基础库进一步减少包体积
   > - 事件通信繁琐且限制多（https://blog.csdn.net/willspace/article/details/49003963）
   >
   > 优点：实现起来简单，自带沙盒特性

3. 纯[web components](https://www.ruanyifeng.com/blog/2019/08/web_components.html)开发。将每个子应用采用 web components 进行开发。纯 web-components 相当于自定义了一个 html 标签，我们就可以在任何的框架中进行使用此标签。例如：

   ```javascript
   <template id="userInfo">
   	<div class="user-box">
   		<p class="user-name">byeL</p>
   		<p class="user-sex">男</p>
   	</div>
   </template>;
   class UserInfo extends HTMLElement {
   	constructor() {
   		super();

   		var templateElem = document.getElementById("userInfo");
   		var content = templateElem.content.cloneNode(true);
   		this.appendChild(content);
   	}
   }
   window.customElements.define("user-info", UserCard);
   ```

   使用

   ```html
   // 直接在html中使用
   <body>
   	<link rel="import" href="./UserInfo.js" />
   </body>

   // 在vue中使用 // a.vue // 需要在入口的main中引入userInfo
   <template>
   	<user-info></user-info>
   </template>
   // 需要在入口的main中引入userInfo // 在react中使用 class HelloMessage extends
   React.Component { render() { return
   <div><user-info></user-info></div>
   ; } }
   ```

   > 优点： 每个子应用拥有独立的 script 和 css，也可单独部署
   >
   > 缺点：需要对之前的子系统都要进行改造，并且通信方面较为复杂

   4. 组合式应用路由分发。每个子应用单独的打包，部署和运行。不过需要基于父应用进行路由管理。例如：有子应用 A 的路由是/testA，子应用 B 的路由是/testB，那么父应用在监听到/testA 的时候，如果此时处于/testB，那么首先会进行一个子应用 B 的卸载。完成之后，在去加载子应用 A。

   > 优点：纯前端改造，相比于路由式，无刷新，体验感良好。
   >
   > 缺点：需要解决样式冲突，JS 污染问题，通信技术等。

#### 目前采用的方案

目前的微前端采用的技术方案是`组合是应用路由开发`。那么我们都知道，他的缺点是需要自行解决 JS 的沙盒环境、css 的样式重叠或冲突问题、通信技术问题。

> css 冲突解决方案：

相比于 JS 的沙盒环境来说，css 的解决冲突的方案有很多，并且实现起来不是很复杂。

1. 类似于 vue 的 scoped。在打包的时候，对 css 选择器加上响应的属性，属性的 key 值是一些不重复的 hash 值，然后在选择的时候，使用属性选择器进行选择。
2. 可以自定义前缀。在开发子模块之前，需要确定一个全局唯一的 css 前缀，然后在书写的过程中同一添加此前缀，或在根 root 上添加此前缀，使用 less 或 sass 作用域嵌套即可解。例如：

```javascript
<div class='rootA'>
	<span class='rootA-span'></span>
</div>
<style>
.root{
  .rootA-span{
    // 书写你的css
  }
}
</style>
```

JS 的沙盒环境：

首先我们需要明确的是，如果采用组合式应用路由开发，对于 JS 上下文有什么影响？我们做个例子：

假如我有个 a 子应用，会给 window 上挂在一个函数，函数名是`hello`，然后我父应用上也有一个函数名是`hello`，那么在子应用进行加载的时候，就会覆盖父类上的方法。

```javascript
// 子应用A
window.hello = () => {
	alert("我是子应用A");
};
// 父应用
window.hello = () => {
	alert("我是父应用");
};
```

基于上面的例子，我们大致就可以看出，沙盒环境最主要做的就是一个 js 作用域、属性等的隔离。那么在实际的应用中，基本采用以下原理进行隔离：

1. diff 方法。当我们的子页面加载到父类的基座中的时候，我们可以生成一个 map 的散列表。在页面渲染之前，我们先把当前的 window 上的变量等都存储在这个 map 中。当页面卸载的时候，我们在遍历这个 map，将其数据在替换回去。

   ```javascript
   class Sandbox {
   	constructor() {
   		this.cacheMy = {}; // 存放修改的属性
   		this.cacheBeforeWindow = {};
   	}
   	showPage() {
   		this.cacheBeforeWindow = {};
   		for (const item in window) {
   			this.cacheBeforeWindow[item] = window[item];
   		}

   		Object.keys(this.cacheMy).forEach((p) => {
   			window[p] = this.cacheMy[p];
   		});
   	}

   	hidePage() {
   		for (const item in window) {
   			if (this.cacheBeforeWindow[item] !== window[item]) {
   				// 记录变更
   				this.cacheMy[item] = window[item];
   				// 还原window
   				window[item] = this.cacheBeforeWindow[item];
   			}
   		}
   	}
   }

   const diffSandbox = new Sandbox();
   // 模拟页面激活
   diffSandbox.showPage(); // 激活沙箱
   window.info = "我是子应用";
   console.log("页面激活，子应用对应的值", window.info);
   // 模拟页面卸载
   diffSandbox.hidePage();
   // 模拟页面激活
   console.log("页面卸载后，子应用的对应的值", window.info);
   diffSandbox.showPage(); // 重新激活
   console.log("页面激活，子应用对应的值", window.info);
   ```

2. 使用代理的形式。在这里需要介绍一个 es6 的新特性：`proxy`，他的详细介绍请查看 MDN:[点击查看 proxy 的介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。原理大致是，监听 get 和 set 方法，针对当前路由进行 window 的属性或方法的存取

   ```javascript
   const windowMap = new Map();
   const resertWindow = {};

   let routerUrl = "";
   const handler = {
   	get: function (obj, prop) {
   		const tempWindow = windowMap.get(routerUrl);
   		console.log(windowMap, routerUrl);
   		return tempWindow[prop];
   	},
   	set: function (obj, prop, value) {
   		if (!windowMap.has(routerUrl)) {
   			windowMap.set(routerUrl, JSON.parse(JSON.stringify(resertWindow)));
   		}
   		const tempWindow = windowMap.get(routerUrl);
   		tempWindow[prop] = value;
   		// console.log(obj, prop, value);
   	},
   };

   let proxyWindow = new Proxy(resertWindow, handler);
   // 首先是父类的啊属性.
   proxyWindow.a = "我是父类的a属性的值";

   // 改变路由到子类
   routerUrl = "routeA";
   proxyWindow.a = "我是routerA的a属性的值";

   // 改变路由到父类
   routerUrl = "";
   console.log(proxyWindow.a);

   // 改变路由到子类
   routerUrl = "routeA";
   console.log(proxyWindow.a);
   ```

3. iframe 自带 css 和 js 沙盒隔离。
