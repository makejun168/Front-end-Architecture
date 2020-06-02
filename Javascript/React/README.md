# React

## React + React-Router + Antd4

#### 技术栈

- React @16.13.1
- React-Redux @7.2.0
- React-Router @5.1.2
- Redux @3.7.2
- webpack @4.42.0
- antd @4.1.4
- 百度地图 sdk
- Echarts

* React
  - Declarative （声明式编码）
  - Component-Based (组件化编码)
  - DOM Diff 算法
  - 单向的数据流
* React-Router
* Redux
* Mobx
* Axios
* Babel
* Webpack

#### 项目启动

- yarn install  安装依赖
- yarn start  启动开发环境
- yarn build  项目打包

#### 代码提交规范

- husky  提交代码  git commit -m  触发钩子
- commitlint  配置  commintlint.config.js  设置配置
- docs,chore,feat,fix,merge,perf,refactor,revert,style,test

#### 学习目标

- [x] React  生命周期
- [x]  熟悉了解  React  周边生态  React-Router-Dom Antd babel-plugin-import
- [x] webpack loader  配置
- [x]  配置路由配置架构
- [x]  引入百度地图依赖，开发地图组件
- [x] React  中引用  Antd  基础组件
- [ ] jsonp  跨域调用   百度天气 API
- [ ] React-Router 灵活使用
- [x] React  引用  Echarts  组件渲染图表等
- [x] React React-Redux Redux  状态管理
- [x]  学习使用  husky + commitLint  约束提交时候的命令规范
- [x]  提交的时候自动格式化代码
- [ ] TypeScript + React
- [ ] React Hooks 让函数组件具有类组件能力的功能
- [ ] PostCSS CSS 预处理问题

#### yarn

- 速度快
- 安装版本统一，更加安全
- 语法简洁

#### yarn 语法

- yarn init
- yarn add
- yarn remove
- yarn install

#### 初始化项目

- create-react-app@3.4.1
- yarn eject 将 webpack 的配置等等 暴露出来
- yarn eject 需要提交当前修改再进行 eject
- create-react-app 特点将 webpack 配置等等隐藏起来
- 注意点 方法的时候 让方法指向到当前的 React 组件 使用 bind 或者 方法写成箭头函数
- style 使用是 对象的形式存入外层是对象 里面层次也是一个对象
- antd-design 基于 less 开发 所以需要引入 less loader

#### React 生命周期

- getDefaultProps
- getInitialState
- componentWillMount 初始化接口
- render 必须有 UI 界面渲染
- componentDidMount 组件更新以后
- componentWillReceiveProps 接收父组件方法，属性等
- shouldComponentUpdate
- componentWillUpdate
- componentWillMount (新版本中的 react 将不会继续使用)

#### 生命周期的分类

- Initial render 初始化阶段

  - constructor()
  - componentWillMount() 组件挂载之前
  - render()
  - componentDidMount()

- 存在期
  - componentWillReceiveProps() 接收父组件传过来的参数和方法
  - shouldComponentUpdate() this.setState 触发
  - componentWillUpdate() this.forceUpdate 触发
  - render()
  - componentDidUpdate()
- 销毁期
  - componentWillUnmout() 销毁挂载以后执行

#### React-Router

- React-Router-Dom Router Switch Link HashRouter HistoryRouter Route 组件
- HashRouter 哈希路由
- Histrory 历史记录路由
- Router mode history hash
- Switch  只会匹配   适合第一个 当碰到合适的第一个就会进行匹配
- Route 中的 属性 extra  是精准匹配 外层路由不使用 extra 精准匹配 子路由可以使用精准匹配
- 如果需要嵌套路由的话，父组件路由不能使用 extra 精准匹配
- Switch 搭配 Route 的 extra 精准匹配一起使用 Switch 匹配到一个路由以后就不会继续匹配
- 路由嵌套的时候 父路由组件不能使用精准匹配 无法进入子路由
- 子路由多 一般会使用 Switch 配合 Route 一起使用
- this.props.match.params.value 获取父路由传入的值

#### Antd Design 组件

- Button
- Card
- Modal
- Loading
- Tabs TabPane
- Row gutter 间距
- Col md span
- Card 瀑布流布局
- Carousel
- message
- notification
- Transfer
- Tree
- Table 组件封装
- Form Form.Item
- Input
- Select
- Select.Option
- DatePicker
- CheckBox
-

> 方法函数都是小写，组件类是大写

#### 项目工程化 UI 组件化

封装 Form 表单，通过父组件获取 封装表单中的值

```javascript
<MyForm  {...gforms}   {wrappedComponentRef = {ref => { this.gf = ref }}}/>

this.gf.props.form.方法（）引用方式
```

#### 富文本编辑器的引入和使用

```javascript

import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Editors extends React.Component {
    state = {
        text: "",
        contentState: '',
        editorState: EditorState.createEmpty(),
    };

    onEditorChange = (content) => {
        this.setState({
            contentState: content,
        });
    };

    render() {
        return (
        <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
          <div>
            {draftToHtml(this.state.contentState)}
          </div>
        )
    }
}
```

#### 引用 antd design 组件库 按需加载

- yarn add antd // 包管理工具引入 antd UI 组件库
- import {Button} from 'antd'; // import 按需引入组件代码
- yarn add babel-plugin-import // 按需引入相关 UI 代码 只会引用 Button 的代码
- 项目引用组件库时候调用到函数 webpack loader 配置
- React antd Row Col 一行有 24 列组成

```javascript
plugins: [
    ['import', [{
        libraryName: "antd",
        style: true
    }]]
]

{
    test:  /\.less$/,
    // use: ['style-loader', 'postcss-loader', 'less-loader']
    use: [
        {
            loader: require.resolve('less-loader'),
            options: {
                modules: false,
                javascriptEnabled: true,
                modifyVars: {
                    "@primary-color": "#f9c700"
                }
          }
        }
      ]
},

```
