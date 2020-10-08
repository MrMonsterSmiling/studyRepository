const http = require('http');
const server = require('./module/server.js');
const url = require('url');
const ejs = require('ejs');
http.createServer(async function (request, response) {
    await server.initServer(request,response,'./static')
    let pathname = url.parse(request.url).pathname;
    console.log('路径',pathname)
    switch(pathname){
        case '/login':
            let msg = "绑定的数据";
            let list = ['1','2','3'];
            ejs.renderFile('./views/login.ejs',{msg,list},(error,data)=>{
                response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
                response.end(data);
            })
            break;
        case '/register':
            response.writeHead(200,"text/html;charset=utf-8");
            response.end("register");
            break;
        default:
            response.writeHead(404,{"content-type":"text/html;charset=utf-8"});
            response.end("404,无路由");
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');