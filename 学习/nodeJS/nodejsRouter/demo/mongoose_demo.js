// const UserModel = require('../model/user.js');
//关联查询可以只要这个model
//const NewsModel = require('../model/news');

const ArticleCateModel = require('../model/articlecate');
const ArticleModel = require('../model/article');
const UserModel = require('../model/user');
const { json } = require('body-parser');

//用populate实现三表连接查询
ArticleModel.find({}).populate('cid').populate('author_id').exec(function(err,docs){
    if(err)return console.log(err);
    console.log(JSON.stringify(docs));
})


//用两次关联实现3表连接查询，只需引入ArticleModel
// ArticleModel.aggregate([
//     {
//         $lookup:{
//             from:"user",
//             localField:"author_id",
//             foreignField:"_id",
//             as:'author'
//         }
//     },
//     {
//         $lookup:{
//             from:'articleCate',
//             localField:"cid",
//             foreignField:"_id",
//             as:'articleCate'
//         }
//     }
// ],(err,docs)=>{
//     if(err)return console.log(err);
//     console.log(JSON.stringify(docs));
// })



//插入一条三表关联数据
// new ArticleCateModel({
//     title:"分类1",
//     description:"分类1",
//     status:"A"
// }).save((err,docs)=>{
//     if(err)return console.log(err);
//     var articleCateId = docs._id;
//     new UserModel({
//         name:"李四",
//         age:24
//     }).save((err,docs)=>{
//             if(err)return console.log(err);
//             var userId = docs._id;
//             var userName = docs.name;
//             new ArticleModel({
//                 title:"文章标题1",
//                 cid:articleCateId,
//                 author_id:userId,
//                 author_name:userName,
//                 description:"文章描述1",
//                 content:"文章内容1"
//             }).save((err,docs)=>{
//                 if(err)return console.log(err);
//                 console.log("插入成功",docs);
//             })
//         }
//     )
// })



// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true  });
// //定义表结构，但不具备操作功能（模式，图解，概要）
// var UserSchema = mongoose.Schema({
//     name:String,
//     pwd:{
//         type:String,
//         default:'123'
//     },
//     age:Number
// })
// //参数：1.首字母大写,默认和数据库的集合名称复数(加s)对应;2.使用的schema;3.映射的集合名称(省略即默认)
// var User = mongoose.model("User",UserSchema,'user');

// //查询
// User.find({},(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })
// //增加
// var u = new User({
//     name:'李四',
//     age:20,
//     pwd:'sdsdfasdfad'
// })
// u.save((err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("增加数据成功");
// })
// //更新(参数:1.条件;2.更新的数据)
// User.updateOne({"_id":'5f890db09d2fd243f8819e55'},{name:"lisi"},(err,doc)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(doc);
// })
// //删除
// User.deleteOne({},(err,doc)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(doc);
// })