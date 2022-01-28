const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, remote) => {
    console.log(`${remote.address}:${remote.port} - ${msg}`);

    server.send(`copy that ${remote.address}: ${remote.port}`, remote.port, remote.address);
})

server.on('listening', (msg, remote) => {
    const address = server.address();

    console.log(`Server Listening on ${address.address}:${address.port}`);
})

server.bind(44444);