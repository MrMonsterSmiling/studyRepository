const fs = require('fs');
const utils = require('./utils.js');
const path = require('path');
const url = require('url');
const ejs = require('ejs');
const querystring = require('querystring');
let app = {
    initServer:function(request,response,staticpath){
        return new Promise(function (resolve,reject) {
             let pathname = url.parse(request.url).pathname;//获取静态资源路径，以及去掉参数(?后面的)
             pathname = pathname == '/'?"/index.html" : pathname;//默认访问index.html
             let extname = path.extname(pathname);//获取请求资源的后缀名
             if(pathname!='/favicon.ico'){
                try {
                 fs.readFile(staticpath+''+pathname,async (error,data)=>{
                     //设置路由，就不能找不到文件报错了
                     // if(error){
                     //     response.writeHead(404,{'content-type':'text/html;charset="utf-8"'});
                     //     response.end("404")
                     //     console.log(error);
                     //     return;
                     // }
                     if(!error){
                         let mime = await utils.utils.getFileMime(extname);//设置返回头，还不完整
                         console.log("响应类型",mime);
                         response.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'});
                         response.end(data);
                     }else{
                        response.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'});
                        response.end(error);
                     }
                     resolve('执行成功');
                 })
                } catch (error) {
                     reject(error);
                }
             }
         })
     },
     login:(req,res)=>{
        let msg = "绑定的数据";
        let list = ['1','2','3'];
        ejs.renderFile('./views/login.ejs',{msg,list},(error,data)=>{
            res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
            res.end(data);
        })
     },
     doLogin:(req,res)=>{
         //加true能使query变成对象,适用于GET传参
        // let query = url.parse(request.url,true).query;
        // console.log(query);
        let query = "";
        //获取post传值
        req.on('data',(chunk)=>{
            query+=chunk;
        })
        req.on('end',()=>{
            let queryObj = querystring.parse(query,'&','=',1000);
            if(queryObj && queryObj.account == '1' && queryObj.password == '1'){
                console.log('post传来的数据',queryObj);
                res.writeHead(302,{'Location':'/index.html'});
                res.end();
            }else{
                res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
                res.end('账号密码错误');
            }
        })
     },
     notFound:(req,res)=>{
         res.end('404,not found');
     },
     error:(req,res,msg)=>{
         res.end(msg);
     }
}
module.exports = app;