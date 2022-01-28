// 客户端请求
// 发送方

const net = require('net');

const HOST = "127.0.0.1";
const PORT = 8090;

const client = new net.Socket();
const SERVER_NAME = `${HOST}:${PORT}`
let count = 0;

client.connect(PORT, HOST, () => {
    console.log(`成功连接到 ${SERVER_NAME}`);

    const timer = setInterval(() => {
        if (count > 10) {
            client.write(`close`);
            clearInterval(timer);
            return;
        }
        client.write(`马冬梅 ${count++}`)
    }, 1000);
});

client.on('data', (data) => {
    console.log(`${SERVER_NAME} - ${data}`);
});

client.on('close', (data) => {
    console.log(`${SERVER_NAME} close`);
});
