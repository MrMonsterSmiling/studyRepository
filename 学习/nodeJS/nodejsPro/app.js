const http = require('http');
// const server = require('./module/server.js');
const url = require('url');
const { get } = require('./module/express_server');
const app = require('./module/express_server');
const ejs = require('ejs');
const querystring = require('querystring');
//获取请求方式用request.method
http.createServer(
//     async function (request, response) {
//     await server.initServer(request,response,'./static')
//     let pathname = url.parse(request.url).pathname.replace('/','');
//     console.log('路径',pathname)
//     try {
//         server[pathname](request,response);
//     } catch (error) {
//         server.error(request,response,error.toString());
//     }
// }
    app
).listen(8081);

app.get('/login',(req,res)=>{
    ejs.renderFile('./views/login.ejs',{},(error,data)=>{
        if(!error){
            res.send(200,data);
        }else{
            res.send(500,error.toString());
        }
    })
})

app.post('/doLogin',(req,res)=>{
    try {
        let queryObj = querystring.parse(req.body,'&','=',1000);
        if(queryObj.account=='1' && queryObj.password == '1'){
            res.writeHead(302,{'Location':'/index.html'});
            res.end();
        }else{
            res.send(200,'账号密码错误');
        }
    } catch (error) {
        res.send(500,erro.toString());
    }
})
console.log('Server running at http://127.0.0.1:8081/');