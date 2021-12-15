### 环境搭建

[地址](https://time.geekbang.org/column/article/100124)

### 小结

显示的网络环境太复杂，有很多干扰因素，搭建“最小化”的环境可以快速抓住重点，掌握 HTTP 的本质

选择 Wireshark 作为抓包工具，捕获在 TCP/IP 协议栈中传输的所有流量

选择 Chrome 或 Firefox 浏览器作为 HTTP 协议中的 user agent

选择 OpenResty 作为 Web 服务器，它是一个 Nginx 的“强化包”，功能非常丰富

Telnet 是一个命令行工具，可用来登录主机模拟浏览器操作