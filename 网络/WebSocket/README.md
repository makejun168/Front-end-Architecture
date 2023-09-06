WebSocket 是一种用于在客户端和服务器之间进行全双工通信的协议，它建立在 HTTP 协议之上，通过持久化连接来实现实时数据传输。WebSocket 的连接原理可以简要描述如下：

1. 客户端发起连接：客户端通过发送 HTTP 请求（通常是一个特殊的 WebSocket 握手请求）来与服务器建立 WebSocket 连接。这个请求包含了一些特殊的头部，表明客户端希望建立 WebSocket 连接。

2. 服务器响应：如果服务器支持 WebSocket 协议并接受了客户端的请求，它将回应一个包含特殊头部的 HTTP 响应，表示连接成功建立。

3. 建立 WebSocket 连接：一旦连接建立，客户端和服务器之间就可以通过这个连接进行全双工通信，而不再需要通过传统的 HTTP 请求-响应往返。

以下是一个使用 JavaScript 的简单示例，演示如何在客户端和服务器之间建立 WebSocket 连接：

**服务器端示例（Node.js）：**

```javascript
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('客户端已连接');

  // 监听客户端消息
  ws.on('message', (message) => {
    console.log(`接收到消息：${message}`);
    
    // 发送消息给客户端
    ws.send(`服务器收到消息：${message}`);
  });
});

server.listen(8080, () => {
  console.log('服务器已启动，监听端口 8080');
});
```

**客户端示例（浏览器）：**

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket 示例</title>
</head>
<body>
  <h1>WebSocket 示例</h1>
  <input type="text" id="messageInput" placeholder="输入消息">
  <button onclick="sendMessage()">发送消息</button>
  <div id="output"></div>

  <script>
    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', (event) => {
      console.log('连接已建立');
    });

    socket.addEventListener('message', (event) => {
      const output = document.getElementById('output');
      output.innerHTML = `接收到消息：${event.data}`;
    });

    function sendMessage() {
      const messageInput = document.getElementById('messageInput');
      const message = messageInput.value;
      socket.send(message);
    }
  </script>
</body>
</html>
```

在这个示例中，服务器使用 Node.js 和 `ws` 库创建 WebSocket 服务器，而客户端使用浏览器的 JavaScript 代码来建立 WebSocket 连接，并实现了简单的消息收发功能。当客户端发送消息时，服务器会接收并回应。这演示了 WebSocket 连接的基本原理。

