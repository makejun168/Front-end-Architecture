# HTML

* 先分析布局 再开发
* 分析页面布局 画出简单的组件分布图
* 组件命名 例如 Nav SearchBar TopBar eg
* CSS样式归类 不同模块引用不同Scss 样式按照模块分类


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