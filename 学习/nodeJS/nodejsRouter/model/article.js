const { Schema } = require('mongoose');
const db = require('./db');

var ArticleSchema = db.Schema({
    title:{type:String,unique:true},
    cid:{
        type:Schema.Types.ObjectId,
        ref:"ArticleCate"//文章分类表的model名称
    },
    author_id:{
        type:Schema.Types.ObjectId,
        ref:"User"//用户表的model
    },
    author_name:{type:String},
    description:String,
    content:String
})

module.exports = db.model('Article',ArticleSchema,'article')