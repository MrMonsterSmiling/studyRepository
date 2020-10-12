const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//配置cookieParser中间件
app.use(cookieParser());
//静态web目录设置
app.use(express.static('../static'));
//ejs文件后缀名和目录设置
app.engine('html',ejs.__express);
app.set('view engine','html');
app.set('views','../views');
//post参数解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/login',(req,res)=>{
    if(req.cookies){
        console.log('cookies值',req.cookies);
    }
    let content = '账号:<input type="text" name="account"><br>密码:<input type="test" name="pwd"><br><input type="submit" value="登录">';
    res.render('login',{content});
})
app.post('/doLogin',(req,res)=>{
    let body = req.body;
    console.log('传值',body);
    if(body){
        res.cookie("account",body.account,{maxAge:1000*60*60});
        res.cookie("pwd",body.pwd,{maxAge:1000*60*60});
        if(body.account == '张三' && body.pwd == '123'){
            res.render('index',{});
        }else{
            res.send('账号密码错误');
        }
    }
})
app.listen(3000);
console.log("运行于3000端口")