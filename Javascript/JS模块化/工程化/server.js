const http = require('http')

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end()
}).listen(8099, '127.0.0.1')