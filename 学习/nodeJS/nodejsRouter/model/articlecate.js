const db = require('./db');

var ArticlecateSchema = db.Schema({
    title:{type:String,unique:true},
    description:String,
    status:{
        type:String,
        enum:['A','B']
    }
})

module.exports = db.model('ArticleCate',ArticlecateSchema,'articleCate');