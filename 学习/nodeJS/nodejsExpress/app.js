const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const app = new express();

//配置第三方中间件,转换post传值和json值
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//配置静态web目录(可指定多个/次),虚拟静态目录:app.use('/static',express.static('public'))，
//将访问static...的资源指向public并且路径中需要static
//内置中间件
app.use(express.static("static"));
//应用级中间件,常用于权限判断
app.use((req,res,next)=>{
    console.log(new Date());
    //若是不使用，则不会向下匹配
    next();
})


// 设置ejs文件后缀名
const ejs = require('ejs');
app.engine("html",ejs.__express);
//上面完全是为了设置后缀名,默认可以不需要

//配置模板引擎，不需要require引入模块，下面的html表示后缀名
app.set('view engine',"html");
//设置模板存放目录，__dirname表示当前目录
app.set('views',__dirname+'/views');



app.get('/',(req,res)=>{
    let content = '账号:<input type="text"><br>密码:<input type="test"><br><input type="submit" value="登录">';
    res.render('login',{
       content
    })
})

//主要用于显示数据
app.get('/getUser',(req,res)=>{
    res.send("getUser");
})
//主要用于增加数据
app.post('/addUser',(req,res)=>{
    let body = req.body;
    console.log('参数',body);
    res.send("addUser");
})
//put主要于修改数据
app.put('/editUser',(req,res)=>{
    res.send("editUser");
})
//delete主要于删除数据
app.delete('/delUser',(req,res)=>{
    res.send("delUser");
})

//动态路由,id变成了参数名，api后面有值就能匹配上,restful风格
//http://localhost:8081/api/张三/123
//路由级中间件
app.get('/api/:name',(req,res,next)=>{
    res.send('动态路由'+req.params['name']);
    next();
})
app.get('/api/name',(req,res)=>{
    console.log('再一次匹配');
})


//获取get传值
app.get('/getValue',(req,res)=>{
    let query = req.query;
    console.log("query",query);
    res.send("getValue");
})

//错误处理中间件
app.use((req,res,next)=>{
    res.status(404).send('404');
})
app.listen(8081);