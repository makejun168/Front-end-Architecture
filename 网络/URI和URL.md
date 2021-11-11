### URI 的格式
URI 本质上是一个字符串，作用是唯一地标记资源的位置或名字
URL 是统一资源定位符

常见形式由 scheme、host:port、path 和 query 组成 URI的格式
![avatar](./picture/uri.jpeg)

### URI 的完整格式
![avatar](./picture/完整uri.jpeg)

```
http://user:pass@www.example.com:80/dir/index.html?uid=1#ch1
# scheme          是 http
# user:pass@      是 身份信息
# www.example.com 是 服务器地址
# 80              是 端口号
# /dir/index.html 是 文件路径
# uid=1           是 查询参数
# ch1             是 片段标识符，定位的资源内部的“锚点”（仅客户端使用，服务器不处理）

```

### URI 的编码
对于 ASCII 码意外的字符集和特殊字符做了一个特殊的操作，在 RFC 规范里成为“escape”和“unescape”，也就是“转义”

URI 转义规则，直接把非 ASCII 码或特殊字符转换成十六进制字节值，然后再前面加上”%“

例如，空格被转义成“%20”，“?”被转义成“%3F”。而中文、日文等则通常使用 UTF-8 编码后再转义，例如“银河”会被转义成“%E9%93%B6%E6%B2%B3”

### 小结
1. URI 是用来唯一标记服务器上资源的一个字符串，通常成为 URL
2. URI 通常由 scheme、host:port、path 和 query 四个部分组成，有的可以省略
3. scheme 叫“协议名”，表示资源应该使用哪种协议来访问
4. host:port，表示资源所在的主机名和端口号
5. path，标记资源所在的位置（文件路径）
6. query，对资源附加的额外参数
7. 在 URI 里对“@&/”等特殊字符和汉字都必须做编码，否则服务器收到 HTTP 报文后无法正确地处理

### 问题
1. HTTP 协议允许在请求行里使用完整的 URI，但为什么浏览器没有这么做呢？
不需要重复写，因为 HEAD 信息里面会有
2. URI 的查询参数和头字段两者形式很相近，query 是 key-value，头字段也是 key-value，它们有什么区别，在发送请求时应该如何正确地使用它们？
头字段针对的是本次请求，而 query 参数是针对 URI 表示资源两者作用域不同，时效性也不同

