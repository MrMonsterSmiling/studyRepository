//连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true  });

module.exports = mongoose;