const fs = require('fs');
const utils = require('./utils.js');
const path = require('path');
const url = require('url');
exports.initServer = function(request,response,staticpath){
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
                    response.writeHead(200, {'Content-Type':''+mime+';charset="utf-8"'});
                    response.end(data);
                }
                resolve('执行成功');
            })
           } catch (error) {
                reject(error);
           }
        }
    })
}