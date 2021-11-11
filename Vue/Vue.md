# Vue2 源码分析
文件目录架构

* compiler 编译相关
* core Vue 核心代码组成
* platforms 跨平台代码
* server 服务器端渲染
* sfc .vue 文件的解析器
* shared 共享工具方法

### 思考
* vue 脚手架 新建项目的时候 runtime only  or runtime + compiler
  到底有什么区别？
* Vue 为啥是一个 Function 呢 而不是 Class 配置 prototype 在上面写方法


### 生成 DOM 树

* template
* render 方法

compiler 文件夹中有 特别算法优化 template 转化为 render 方法


### 初始化

* initMixin
    * init
        * lifeCycle
        * events
        * render
        * beforeCreate
        * inject
        * state
        * provide
        * created

* stateMixin
    * $set
    * $delete
    * $watch
        * 依赖收集
        * new watcher
    * $data
    * $props

* eventsMixin
    * $emit
    * $on
    * $off
    * $once

* LifeCycleMixin
    * $forceUpdate
    * $destroy
    * _update

* renderMixin
    * installRenderHelper
    * $nextTick
    * _render



### 数据更新
initMixin 方法中 挂载节点 $mount 完成生成了虚拟DOM

* 数据更新
* vm.\$mount(vm.$options.el) 实例挂载
    * 根节点校验
    * 判断是否存在 render方法
        * 是 render 转化为 compileToFunction
        * 否 调用 $mount 方法 mountComponent
            * call beforeMount
            * new Watcher
                * pushTarget 把自身实例放入全局 Target
                * updateComponent
                    * vm.\_update 虚拟DOM更新真实的 DOM
                        * vm.\_\_patch__
                            * createPatchFunction
                                * patchVnode
                                * createElm
                                * native createELement 生成实际DOM
                                * createChildren 遍历子节点
                                    * 调用 createElm
                            * invokeCreateHooks
                    * vm.\_render 实例生成虚拟DOM（vNode）
                        * createElement
                            * normalizeChildren 统一为 vNode 类型
                            * new vNode
                                * tag 为字符串
                                    * parsePlatformTagName
                                    * createComponent
                                    * 未知节点
                                * tag 是 Component 类型 createComponent
                                    * 返回也是虚拟节点
            * call mounted


### 组件化

* 组件渲染
    * createComponent
        * new vNode
    * initInteralComponent
    * /src/core
* 组件配置
    * initInteralComponent
    *  /src/core/util/options
    *  mergeOptions


### 响应式原理

initState 初始化状态

* 依赖收集
    * initState => initProps, initData
        * new Dep
        * observe = new Observe (检测数据变化)
            * pushTarget 把自身的实例放入全局 Target
            * depend => addDep
                * this 挂载 到 dep的 sub 列表中
                    * traverse
    * defineReactive
        * new Dep Dep 就是 Watcher 管理者
        * notify
            * 执行 sub 中 每一个依赖中的 update 方法
                * run()
                * queueWatcher
                    * nextTick 更新数据


### DOM Dif 算法
关键核心点

* 双指针 两头生成双指针
* 两头开始往中间各迈一步
* 替换的情况，先前再后
* 新增节点会在 oldChild 遍历寻找

#### 核心逻辑
* 优先找到对应
* 优先处理特殊场景
* 再考虑原地复用





