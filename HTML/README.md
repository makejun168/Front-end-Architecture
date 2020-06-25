
# HTML
* 先分析布局 再开发
* 分析页面布局 画出简单的组件分布图
* 组件命名 例如 Nav SearchBar TopBar eg
* CSS样式归类 不同模块引用不同Scss 样式按照模块分类


# 页面结构
## 语义标签
HTML标签都有具体语义，非然技术上可以使用div标签表示大部分内容，但选择清晰的语义标签更容易让人看明白。比如 h1表示标题、p标签表示内容、强调内容使用em标签。
```html
<article>
  <h1>poloma</h1>
  <p>在线学习平台</p>
</article>
```


## 嵌套关系
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

## 基本结构
下面是HTML文档的基本组成部分
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="keyword" content="Mysql,Laravel,Javascript,HTML,CSS,ES6,TYPESCRIPT,keyworkds" />
    <meta name="description" content="description" />
    <title>poloma</title>
</head>
<body>
   <div></div>
</body>
</html>
```

| 标签 | 说明 |
| --- | --- |
| DOCTYPE | 声明HTML文档 |
| html | lang:网页的语言，如en/zh等，非必选项目 |
| head | 文档说明部分，对搜索引擎提供信息或加载CSS、JS等 |
| title | 网页标题 |
| keyword | 向搜索引擎说明你的网页的关键词 |
| description | 向搜索引擎描述网页内容的摘要信息 |
| body | 页面主体内容 |

## 内容标题
标题使用 **h1 ~ h6** 来定义，用于突出显示文档内容。

* 从 h1到h6对搜索引擎来说权重会越来越小
* 页面中最好只有一个h1标签
* 标题最好不要嵌套如 h1内部包含 h2

```html
<h1>kobe&gigi</h1>
<h2>houdunren.com</h2>
<h3>hdcms.com</h3>
<h4>houdunwang.com</h4>
<h5>doc.houdunren.com</h5>
<h6>www.hdcms.com</h6>
```

### 页眉页脚
#### header
**header** 标签用于定义文档的页眉，下图中的红色区域都可以使用header标签构建。
```html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="">系统学习</a></li>
                <li><a href="">视频库</a></li>
            </ul>
        </nav>
    </header>
    <article>
        <h2>例子</h2>
        <ul>
            <li><a href="">完成签到 开心每一天</a></li>
            <li><a href="">完成签到 来了，老铁</a></li>
        </ul>
    </article>
        ...
</body>
```

#### footer
**footer** 标签定义文档或节的页脚，页脚通常包含文档的作者、版权信息、使用条款链接、联系信息等等。
```html
<body>
    ...
    <article>
        <ul>
            <li><a href="">完成签到 开心每一天</a></li>
            <li><a href="">完成签到 来了，老铁</a></li>
        </ul>
    </article>
    <footer>
        <p>
            我们的使命：传播互联网前沿技术，帮助更多的人实现梦想
        </p>
    </footer>
</body>
```

### 导航元素
在HTML中使用 **nav** 设置导航链接。
```html
<header>
        <nav>
            <ul>
                <li>
                    <a href="">系统学习</a>
                </li>
                <li>
                    <a href="">视频库</a>
                </li>
            </ul>
        </nav>
</header>
```

### 主要区域
HTML5中使用 **main** 标签表示页面主要区域，一个页面中main元素最好只出现一次。
```html
<body>
    ...
    <main>
        <article>
            <h2>网站动态</h2>
            <ul>
                <li><a href="">完成签到 开心每一天</a></li>
                <li><a href="">完成签到 来了，老铁</a></li>
            </ul>
        </article>
    </main>
    ...
</body>
```

### 内容区域
使用 **article** 标签规定独立的自包含内容区域。不要被单词的表面意义所局限，article 标签表示一个独立的内容容器。
```html
<main>
	<article>
        <h2>后盾人网站动态</h2>
        <ul>
            <li><a href="">完成签到 开心每一天</a></li>
            <li><a href="">完成签到 来了，老铁</a></li>
        </ul>
	</article>
</main>
```

### 区块的定义
使用 **section** 定义一个区块，一般是一组相似内容的排列组合。
```html
<main>
   <article>
     <section>
       <h2>锁机制</h2>
     </section>
     <section>
      <h2>事物处理</h2>
     </section>
   </article>
</main>
```

### 附加区域
使用 **aside** 用于设置与主要区域无关的内容，比如侧面栏的广告等。
```html
<body>
  <main>
    <article>
      ...
    </article>
  </main>
    <aside>
      <h2>社区</h2>
      <p>poloma是一个主张友好、分享、自由的技术交流社区。</p>
    </aside>
  </main>
</body>
```

### 通用容器
**div** 通用容器标签是较早出现的，也是被大多数程序员使用最多的容器。不过我们应该更倾向于使用有语义的标签如article/section/aside/nav 等。有些区域这些有语义的容器不好表达，这时可以采用div容器，比如轮播图效果中的内容。

```html
<div>
  <header>
    <nav>
      <ul>
        <li><a href="">poloma</a></li>
        <li><a href="">系统课程</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <section>
        <h2>事物处理</h2>
      </section>
    </article>
    <aside>
      <h2>社区小贴</h2>
      <p>自由的技术交流社区。</p>
    </aside>
  </main>
  
  <footer>
    <p>
        我们的使命：传播互联网前沿技术，帮助更多的人实现梦想
    </p>
  </footer>
</div>
```

# 文本相关
## 基本标签
### p
p 标签标记了一个段落内容。
```html
<p>
    一段很长的话语
</p>
```

### pre
原样显示文本内容包括空白、换行等。
```html
<pre>
        这是pre标签的显示效果
            这是换行后的内容，空白和换行都会保留
</pre>
```

### br
在html 中回车是忽略的，使用 br 标签可以实现换行效果。

### span
span 标签与 div 标签都是没有语义的，span 常用于对某些文本特殊控制，但该文本又没有适合的语义标签。例如一些小块的 文本等

## 描述文本

### small
用于设置描述、声明等文本。
```html
<small> 半年付 </small>
```

### time
标签定义日期或时间，或者两者。

### abbr
abbr标签用于描述一个缩写内容
```html
在WWW上，每一信息资源都有统一的且在网上唯一的地址，该地址就叫 <abbr title="Uniform Resource Locator">URL</abbr> 统一资源定位符。
```

### sub
用于数字的下标内容
```html
水的化学式为H<sub>2</sub>O
```

### sup 

用于数字的上标内容
```html
请计算5<sup>2</sup>平方
```

### del
del 标签表示删除的内容，ins 一般与 del 标签配合使用描述更新与修正。
```html
原价 <del>200元</del> 现价 <ins>100元</ins>
```

### s
s 标签显示效果与 del 相似，但语义用来定义那些不正确、不准确或没有用的文本。
```html
<s>A 太阳是方的</s> <br>
B 地球是圆的
```

### code
用于显示代码块内容，一般需要代码格式化插件完成。

### progress
用于表示完成任务的进度，当游览器不支持时显示内容。
```html
<progress value="60" max="100">完成60%</progress>
```

## 强调文本
### strong
strong 标签和 em 一样，用于强调文本，但是它们的强调程度不同。
strong 是加粗 em 是加粗和斜体
```html
<strong>poloma</strong>专注WEB开发技术，不断更新<em>文本代码</em>
```

### mark
用于突出显示文本内容，类似我们生活中使用的马克笔。
```html
请认真学习以下语言 <mark>PHP</mark>、<mark>JavaScript</mark>
```

## 引用标签
### cite
ite 标签通常表示它所包含的文本对某个参考文献的引用，或文章作者的名子。

### blockquote
blockquote 用来定义摘自另一个源的块引用
```html
下而是来自某一个大叔，对失败的认知
<blockquote cite="https://www.makejun168.com">
        在坚持的人面前，失败终将被踏过。
</blockquote>
```

### q
q 用于表示行内引用文本，在大部分浏览器中会加上引号。

```html
最新课程 <q>HTML开启WEB征途</q> 已经发布了
```

## 联系信息
### address
用于设置联系地址等信息，一般将address 放在footer 标签中。
```html
<address>
    感谢您提交建议到 873800030@qq.com
</address>
```

# 链接与图片标签
### 使用图片
在网页中使用 img 标签展示图片，图片的大小、边框、倒角效果使用css处理。
```html
<img src="poloma.png" alt="poloma"/>
```


| 属性 | 说明  |
| --- | --- |
| src | 图片地址  |
| alt | 打开异常时候使用的照片 |


## 网页链接
### a
不能通过一个页面展示网站的所有功能，需要在不同页面中跳转，这就是链接所起到的功能。
```html
<a href="http://douban.com" target="_blank" title="文档库">后盾人文档库</a>
```

| 选项 | 说明 |
| --- | --- |
| href | 跳转地址 |
| target  | \_blank 新窗口打开 \_self 当前窗口打开 |
| title | 链接提示文本 |


### 打开窗口
下面设置 target 属性在指定窗口打开。
```html
<a href="https://www.douban.com" target="hdcms">
    在IFRAME中打开
</a>
<script>
    window.open('https://www.douban.com', 'hdcms');
</script>
```

### 锚点链接
锚点可以设置跳转到页面中的某个部分。
* 为元素添加id 属性来设置锚点
* 设置 a 标签的 href 属性

```html
<a href="#comment-1">跳转到评论区</a>
<div style="height: 1000px;"></div>
<div id="comment-1" style="background: green;">
        这是后盾人评论内容区
</div>
```
* 也可以跳转到不同页面的锚点

```html
<a href="article.html#comment-1">跳转到评论区</a>
```

### 邮箱链接
除了页面跳转外可以指定其他链接。使用以下方式也有缺点，邮箱可能会被恶意用户采集到，所以有些用户使用 houdunren#qq.com 然后提示用户 请将#改为@后发邮件的提示形式。

```html
<a href="mailto:2300071698@qq.com">给后盾人发送邮件</a>
```

### 拨打电话
点击以下链接后，手机会询问用户是否拨打电话。

```html
<a href="tel:99999999999">联系客服</a>
```

### 下载文件
默认情况下使用链接可以下载浏览器无法处理的文件，如果下载图片需要后台语言告之浏览器mime类型（可查看后盾人PHP）相关课程。

```html
<a href="https://www.hdcms.com/HDCMS-201905072207.zip">下载HDCMS</a>
```

# 表单
表单是服务器收集用户数据的方式。
### FORM
一般情况下表单项要放在 FORM 内提交。
```html
<form action="hd.php" method="POST">
        <fieldset>
                <legend>测试</legend>
                <input type="text">
        </fieldset>
</form>
```



### 鼠标Hover的时候，获取内容的详细信息
```html
<div title={content}>{content}</div>
```

### 兄弟 dom 节点处理菜单关系
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

