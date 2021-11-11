const net = require('net');

const HOST = "127.0.0.1";
const PORT = 8090;

// 创建一个 TCP 服务器实例，调用listen 函数监听指定端口和 ip
// net.createServer 有一个参数，是监听连接建立的回调
net.createServer((socket) => {
    const remoteName = `${socket.remoteAddress}: ${socket.remotePort}`

    console.log('remoteName', remoteName);

    // 接收数据
    socket.on('data', data => {
        console.log(`${remoteName} - ${data}`);

        socket.write(`刚刚说的是 ${data}`); // 客户端发送消息
    })

    socket.on('close', data => {
        console.log(`${remoteName} 连接关闭`);
    })

}).listen(PORT, HOST);

console.log(`Server listening on ${HOST}:${PORT}`);

