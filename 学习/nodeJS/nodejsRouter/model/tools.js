const multer = require('multer');
//目录必须存在,这种方法设置无法设置文件名
//const upload = multer({dest:'static/upload'});
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
const fs = require('fs');

let tools={
    multer(){
        const storage = multer.diskStorage({
             //配置上传目录
            destination: async (req,file,cb)=>{
                let now = new Date();
                let year = sd.format(now,'YYYY');
                let month = sd.format(now,'MM');
                let day = sd.format(now,'DD');
                let dir = path.join('static/upload',year,month,day);
                await mkdirp(dir);
                cb(null,dir);
            },
            //修改上传后的文件名
            filename:(req,file,cb)=>{
                cb(null,Date.now()+path.extname(file.originalname));
            }
        })
        var upload = multer({storage:storage});
        return upload;
    }
}
module.exports = tools;