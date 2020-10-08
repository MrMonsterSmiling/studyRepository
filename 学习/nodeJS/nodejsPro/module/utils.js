const fs = require('fs')
exports.utils = {
    getFileMime:function(extname){
        return new Promise((resolve,reject)=>{
            fs.readFile('./static/json/mime.json',(error,data)=>{
                if(error){
                    reject(error)
                    return;
                }
                let mime = JSON.parse(data.toString())[extname];
                resolve(mime);
            })
        })
    }
}
