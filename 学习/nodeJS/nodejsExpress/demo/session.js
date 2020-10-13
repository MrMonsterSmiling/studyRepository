const express = require('express');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const app = express();
//配置session的中间件
app.use(session({
    secret:'keyboard cat',//服务器端生成session的签名
    name:"123",//修改session对应cookie的名称
    resave:false,//强制存储session即使没有变化
    saveUninitialized:true,//强制将未初始化的session存储
    cookie:{
        maxAge:1000*60,
        secure:false //true表示只有https协议才能访问cookie
    },
    rolling:true,//有访问就刷新过期时间
    //持久化到数据库
    store:new MongoStore({
        url:'mongodb://localhost:27017/session',
        touchAfter:24 * 3600,//24小时内只更新一次session,除非修改了session
    })
}))

app.get("/",(req,res)=>{
    //获取session
    if(req.session.username){
        res.send(req.session.username+'-已登录');
        return;
    }
    res.send("没有登录");
})
app.get("/login",(req,res)=>{
    //设置session
   req.session.username='张三';
   res.send("登录");
})
app.get("/destroySession",(req,res)=>{
    //1.设置过期时间为0
    // req.session.cookie.maxAge = 0;
    //2.销毁指定session
    // req.session.username="";
    //3.销毁session destroy
    req.session.destroy((err)=>{

    })
})
app.listen(3000);