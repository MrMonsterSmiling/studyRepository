//模仿express框架设置路由和静态资源访问控制
const url = require('url');
const path = require('path');
const fs = require('fs');
const utils = require('../module/utils');
let GS = {};
let PS = {};
let staticpath = './static';

function resAddsend(res){
    res.send = (status,data)=>{
        res.writeHead(status,{'content-type':'text/html;charset=utf-8'});
        res.end(data);
    }
}
//事实证明尽量用同步方法
async function initStatic(req,res,staticPath){
    let pathname = url.parse(req.url).pathname;
    pathname = pathname == '/'?'/index.html':pathname;
    let extname = path.extname(pathname);
    if(pathname != '/favicon.ico'){
       try {
            let data = fs.readFileSync(staticPath+''+pathname);
            if(data){
                let mime = await utils.utils.getFileMime(extname);
                res.writeHead(200,{'content-type':''+mime+';charset=utf-8'});
                res.end(data);
            }
       } catch (error) {
           
       }
    }
}



let app = async function(req,res){
    resAddsend(res);
    await initStatic(req,res,staticpath);
    try {
        let pathname = url.parse(req.url).pathname;
        if(req.method == 'GET' ){
            if(GS[pathname]){
                GS[pathname](req,res);
            }else{
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"})
                res.end('无路由');
            }
        }else{
            if(PS[pathname]){
                let postData = '';
                req.on('data',(chunk)=>{
                    postData += chunk;
                });
                req.on('end',()=>{
                    req.body = postData;
                    PS[pathname](req,res);
                });
               
            }else{
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"})
                res.end('无路由');
            }
        }
    } catch (error) {
        res.writeHead(500,{"content-type":"text/html;charset=utf-8"})
        res.end(error.toString());
    }
}
app.get = function(path,func){
    GS[path] = func;
}
app.post = function(path,func){
    PS[path] = func;
}
//配置静态web服务目录
app.static = function(staticPath){
    staticpath = staticPath;
}

module.exports = app;