### Navigator
window.navigator.onLine

#### video api
video.error // null正常
video.error.code // 1用户终止 2网络错误 3解码错误 4URL无效 
video.currentTime // 当前播放的位置，赋值可改变位置 
video.duration // 当前资源长度，流返回无限 
video.paused // 是否暂停 
video.ended // 是否结束 
video.autoPlay // 是否自动播放 
loadstart // 客户端开始请求数据 
error // 请求数据时遇到错误（可以通过上一页的属性video.error.code查看具体错误原因） 
play // 开始播放时触发 
pause // 暂停时触发 
loadeddata // 数据已加载 
waiting // 等待数据，并非错误 
playing // play触发后执行一次 
canplaythrough // 可以播放，已加载好 
timeupdate // 播放时间改变 
durationchange // 资源长度改变

#### window.open
```javascript
window.open(URL, name, features, replace);
```

| 参数 | 语法 |
| --- | --- |
| URL | 一个可选的字符串，声明了要在新窗口中显示的文档的 URL。如果省略了这个参数，或者它的值是空字符串，那么新窗口就不会显示任何文档。 |
| name | 一个可选的字符串，该字符串是一个由逗号分隔的特征列表，其中包括数字、字母和下划线，该字符声明了新窗口的名称。这个名称可以用作标记 <a> 和 <form> 的属性 target 的值。如果该参数指定了一个已经存在的窗口，那么 open() 方法就不再创建一个新窗口，而只是返回对指定窗口的引用。在这种情况下，features 将被忽略。  |
| features  | 一个可选的字符串，声明了新窗口要显示的标准浏览器的特征。如果省略该参数，新窗口将具有所有标准特征。在窗口特征这个表格中，我们对该字符串的格式进行了详细的说明。 |
| replace | 一个可选的布尔值。规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：true - URL 替换浏览历史中的当前条目。false - URL 在浏览历史中创建新的条目。 |
