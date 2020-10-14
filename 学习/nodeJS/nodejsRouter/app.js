const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const admin = require('./routes/admin');
const api = require('./routes/api');
const index = require('./routes/index');

const app = express();
//设置模板存放目录，__dirname表示当前目录
app.set('views',__dirname+'/views');
//配置模板引擎
app.engine("html",ejs.__express);
app.set("view engine","html");
//配置静态web目录
app.use(express.static("static"));
//配置第三方中间件获取post提交的数据
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/admin',admin);
app.use('/api',api);
app.use('/',index);

app.listen(3000);