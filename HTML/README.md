# HTML

* 先分析布局 再开发
* 分析页面布局 画出简单的组件分布图
* 组件命名 例如 Nav SearchBar TopBar eg
* CSS样式归类 不同模块引用不同Scss 样式按照模块分类


## 页面结构

### 语义标签
HTML标签都有具体语义，非然技术上可以使用div标签表示大部分内容，但选择清晰的语义标签更容易让人看明白。比如 h1表示标题、p标签表示内容、强调内容使用em标签。
```html
<article>
	<h1>poloma</h1>
	<p>在线学习平台</p>
</article>
```

### 嵌套关系
元素可以互相嵌套包裹，即元素存在父子级关系。
```html
<article>
  <h1>poloma</h1>
  <div>
    <p>在线学习平台</p>
    <span>makejun168.com</span>
  </div>
</article>
```


### 鼠标Hover的时候，获取内容的详细信息
```html
<div title={content}>{content}</div>
```

### 兄弟 dom 节点处理菜单关系
```javascript
mouseleave: function() {
  this._timer = setTimeout(() => {
    this.kind = "";
  }, 150);
},
enter: function(e) {
  this.kind = e.target.querySelector("i").className;
},
// 进入的时候把 上面定时器清空
// 并列的dom 节点
sover: function() {
  clearTimeout(this._timer);
},
sout: function() {
  this.kind = "";
}
```