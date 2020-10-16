const mongoose = require('./db');
//预定义模式修饰符:trim,lowercase,uppercase，自定义模式修饰符:set:新增数据时，get:获取model数据时
let NewsSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        index:true,//配置普通索引,unique(唯一索引)
    },
    author:{
        type:String,
        set(params){//增加时对数据进行处理,返回值就是处理后的数据
            if(!params){
                return '';
            }else{
                if(params.indexOf('http://')!=0 && params.indexOf('https://')!=0){
                    return "http://"+params;
                }else{
                    return  params;
                }
            }
        },
        //通过model对象获取值才有用，基本没用
        get(params){
            return "作者:"+params;
        }
    },
    createTime:{
        type:Date,
        default:Date.now()
    },
    content:String,
    name:String
})

module.exports = mongoose.model('News',NewsSchema,'news');