const http = require('http');
const server = require('./module/server.js');
const url = require('url');
//获取请求方式用request.method
http.createServer(async function (request, response) {
    await server.initServer(request,response,'./static')
    let pathname = url.parse(request.url).pathname.replace('/','');
    console.log('路径',pathname)
    try {
        server[pathname](request,response);
    } catch (error) {
        server.error(request,response,error.toString());
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');