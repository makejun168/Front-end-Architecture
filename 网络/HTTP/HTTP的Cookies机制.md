### Cookie

由于 HTTP 是“无状态”的，服务器处理完请求就会像“失忆”一样，不记得之前的用户是谁
HTTP 的 Cookie 机制，想等于服务器给客户端贴上小纸条，上面写了一些只有服务器才能理解的数据，需要的时候客户端把这些信息发给服务器，服务器看到 Cookie，就能认出对方是谁

Cookie 的工作过程 使用两个字段：响应头字段 Set-Cookie 和 请求头字段 Cookie

用户通过浏览器第一次访问服务器的时候，服务器不知道他的身份，所以创建一个独特的身份标识数据，
格式是“key=value”，然后放进 Set-Cookie 字段里，随着响应报文一同发给浏览器

浏览器收到响应报文，看到 Set-Cookie，知道是服务器给的身份标识，于是保存起来，下次请求时候自动把值放进 Cookie 字段里发给服务器

第二次请求服务器时，有了 Cookie 字段，服务器就能拿出 Cookie 的值识别用户的身份，提供个性化服务

有时，服务器需要响应头里添加多个 Set-Cookie，存储多个“key=vale”，
以获取更多样的身份信息，但浏览器不需要使用多个 Cookie 字段，只要在一行里用 “;” 隔开就行

![](../picture/cookies.jpg)

### Cookies 属性
1. Cookie 的有效期

Cookie 可以用 Expires 和 Max-Age 两个属性来设置

Expires，俗称“过期时间”，用的是绝对时间，可以理解为“截止日期”（deadline）

Max-Age，用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间

Expires 和 Max-Age 可以同时存在，失效时间可以一致，也可以不一致，浏览器优先采用 Max-Age 计算失效时间

2. Cookie 的作用域
   用 Domain 和 Path 指定 Cookie 所属的域名和路径，浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，对比 Cookie 的属性，如果不满足，就不会在请求头里发送 Cookie
3. Cookie 的安全性
   1. Cookie 可以通过 Javascript 脚本用 document.domain 来读写 Cookie 数据，这就带来了隐患，可能导致“跨站脚本（XSS）”攻击窃取数据 “HttpOnly”属性会告诉浏览器，此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 就会禁用 document.cookie
   2. “SameSite”属性可以防范“跨站请求伪造（CSRF）”攻击，设置成“SameSite=Strict”可以严格规定 Cookie 不能随着跳转链接跨站发送，而“SameSite=Lax”则相对宽松，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送
   3. “Secure”属性，表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送，但在浏览器里 Cookie 还是以明文形式存在

   
### Cookie 的应用

* 身份识别 即保存用户的登录信息，实现会话事务 比如，电商网站登录成功后，通过 Cookie 记录你的 ID，在请求时，
* 浏览器会自动把你的 ID 发送到服务器，这样一来，免去了重复登录的麻烦，二来服务器能够记录浏览记录 
* 广告跟踪 广告商会用一些“第三方 Cookie”对你进行分析、并推送广告 为了防止滥用 Cookie 搜集用户隐私，互联网组织相机提出 DNT（Do Not Track）和 P3P（Platform for Privacy Preferences Project），但实际作用不大

### 小结

* Cookie 是服务器委托浏览器存储的一些数据，让服务器有了“记忆能力”
* 响应报文使用 Set-Cookie 字段发送“key=value”形式的 Cookie 值
* 请求报文里使用 Cookie 字段发送多个 Cookie 值
* 为了保护 Cookie，还要给它设置有效期、作用域等属性，常用的有 Max-Age、Expires、Domain、HttpOnly 等
* Cookie 最基本的用户是身份识别，实现有状态的会话事务


### 问题

1. 如果 Cookie 的 Max-Age 属性设置为 0，会有什么效果呢？
服务器 0 秒后就让 Cookie 失效，服务器不存 Cookie，但在浏览器会话期间可用 cookie 记录用户信息
2. Cookie 的好处已经清楚了，缺点是什么呢？ 
   1. 不安全 会被黑客获取到一些信息，还可能会被恶意攻击 
   2. 有大小限制 大小限制为 4K
   3. 会增加传输成本 因为 Cookie 会根据设置的属性，自动添加到请求头并发送到服务器，即使 API 不需要也会这么做，就增加了传输的数据量

