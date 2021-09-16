const fs = require('fs');
const http = require('http');
const path = require('path');

const resolvePath = require('resolve-path');

http.createServer(function (req, res) {
    try {
        const rootDir = path.join(__dirname, 'static');
        const file = path.join(rootDir, req.url);

        fs.readFile(file, function (err, data) {
            if (err) {
                throw err;
            }

            res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"})
            res.end(data)
        })
    } catch (err) {
        console.log(err);
        res.writeHead(404, {"Content-Type": "text/plain;charset=utf-8"})
        res.end('找不到对应资源')
    }

}).listen(8080);

console.log('server is Listening 8080')