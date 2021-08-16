# CSS

大部分HTML元素都有系统提供的样式，但有以下问题

* 不同浏览器显示样式不一致样式过于简单，
* 显示效果不美观
* 难按照设计稿完全呈现显示效果

### 样式声明
可以通过多种方式定义样式表。

### 外部样式

使用 link 标签引入外部样式文件，需要注意以下几点。

* link 标签放在 head 标签内部
* 样式文件要以 .css 为扩展名
* 一个页面往往可以引入多个样式文件


| 属性 | 说明 |
| --- | --- |
| rel | 定义当前文档与被链接文档之间的关系 |
| href | 外部样式文件 |
| type | 文档类型 |

```html
<link rel="stylesheet" href="houdunren.css" type="text/css">
```

### 嵌入样式
使用 style 标签可以在文档内部定义样式规则。

<style>
        body {
                background: red;
        }
</style>

### 其他细节
#### 空白
在样式规则中可以随意使用空白，空白只是看不见但同样占用空间，所以可以结合其他工具如 webpack 等将css 压缩为一行。
#### 注释
注释是对定义样式规则的说明，便于后期维护理解。
```css
/* ... */
body {
	/* 这是注释的使用 */
	background: red;
}
/* ... */
```
#### 错误
样式规则如果存在错误，解析器会选择忽略，并不会影响其他样式规则。以下代码的houdunren:red 是无效样式但不影响后面的 font-size:100px; 规则使用。
```css
h1 {
    houdunren: red;
    font-size: 100px;
}
```


## 选择器

样式是做用在元素标签上的，通过本章将可以随意查找元素来应用样式。

### 基本选择器

| 选择器 | 实例 | 描述 |
| --- | --- | --- |
| .class | .container | 选择class="container"所有元素 |
| #id | #test | 选择id="test"的唯一元素 |
| * | *  | 所有的元素 |
| element | p | 选择所有元素 |
| element,element | div,p | 选择所有元素和所有元素 |
| element element | div p | 选择元素  |
| element>element  | div > p  | 选择父元素为所有的元素 |
| element+element | div+p  | 选择紧接在元素之后的所有元素 |


### 结构选择器

| 选择器 | 实例 | 描述 |
| --- | --- | --- |
| element element | div p | 选择元素  |
| element>element  | div > p  | 选择父元素为所有的元素 |
| element+element | div+p  | 选择紧接在元素之后的一个元素 |
| element1~element2 | p~ul | 选择前面有元素的每个元素 |

### 属性选择器
根据属性来为元素设置样式也是常用的场景。


| 选择器 | 实例 | 描述 |
| --- | --- | --- |
| [attribute] | [target] | 带有 target 属性所有元素 |
| [attribute=value] | [target=\_blank]  | targe 属性 等于"\_blank" 的所有元素 |
| [attribute~=value] | [title~=houdunren] |  title 属性包含单词 "houdunren" 的所有元素 |
| [attribute|=value] | [title|=hd] | title 属性值为 "hd"的单词，或hd-cms 以-连接的的独立单词 |
| [attribute*=value] | a[src*="hdcms"] | src 属性中包含 "hdcms" 子串的每个 元素 |
| [attribute^=value] | a[src^="https"] | src 属性值以 "https" 开头的每个 元素  |
| [attribute$=value]  | a[src$=".jpeg"] | src 属性以 ".jpeg" 结尾的所有 元素 |
