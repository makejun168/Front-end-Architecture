> 该文档记录学习进度
## flex布局容器属性
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### 1.1 flex-direction
> flex-direction属性决定主轴的方向（即项目的排列方向）
``` javascript
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

### 1.2 flex-wrap属性
``` javascript
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
- nowrap（默认）：不换行。
- wrap：换行，第一行在上方。
- wrap-reverse：换行，第一行在下方。

### 1.3 flex-flow
> flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
``` javascript
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### 1.4 justify-content属性
> justify-content属性定义了项目在主轴上的对齐方式。
``` javascript
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 1.5 align-items属性
> align-items属性定义项目在交叉轴上如何对齐。
``` javascript
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 1.6 align-content属性
> align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
``` javascript
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的終点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。
