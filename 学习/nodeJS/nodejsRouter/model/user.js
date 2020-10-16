const mongoose = require('./db');

mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true  });
var UserSchema = mongoose.Schema({
    name:String,
    pwd:{
        type:String,
        default:'123'
    },
    age:Number
})

module.exports = mongoose.model('User',UserSchema,'user');