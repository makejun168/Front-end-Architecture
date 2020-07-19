# 认证和授权

### 互联网认证逻辑

* 用户名密码代表一个用户
* 身份证代表一个人
* 手机号码确认一个人
* 用户名密码登录
* 邮箱发送登录链接
* 手机接收验证码

### 问题
* 用户设置高强度的密码
* 密码存储进行加密
* 客户端和服务器端进行安全通行，防止密码被中间人获取
* 面膜保存在安全数据库中
* 忘记密码的用户提供回复密码功能
* 更进一步的安全，实施两部验证（流程复杂）


# OAuth
* 解决 认证逻辑
* 解决上述的问题

### 授权
* 登录操作系统，会有权限授予
* 安装手机应用的时候会询问权限
* 同理在OAuth，被授权方会收货一定的权限

### 授权不一定要先认证
* 有要是就能开门
* 有优惠券就可以优惠
* one driver中分享的图片，只有链接就可以访问

### OAuth 通过token 授予权限
* 获取token 就可以知道是已经授权允许操作权限

### OAuth
行业标准的授权方法
### 版本
* 1.x
* 2.x

### 角色
* 客户端 浏览器
* 服务器端 Java NodeJS
* 授权服务器 github QQ 微信

### 客户端和服务器端可以看作是被授权方

### 授权方法
* Authorization Code
* Refresh Token
* Device Code 智能TV
* Password （安全问题和信用问题，不会提供第三方）
* Implicit
* Client Credentials （客户端专用的权限，不涉及到特定的用户）

###  Authorization Code 流程
1. 浏览器 redirect with client_id to github
2. github redirect code to 服务器
3. 服务器 返回 code + secret 请求token
4. 浏览器端 拿到token 实现用户的一些操作


### Refresh Token
* 服务器 通过 refresh token 换取新的 token

### Password
* 浏览器端输入用户名和密码
* 请求github 登录 拿到token 然后使用
* 