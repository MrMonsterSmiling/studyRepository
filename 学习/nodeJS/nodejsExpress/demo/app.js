const express = require('express');
const login = require('./routes/login');
const app = express();
//挂在路由模块
app.use('/login',login);

app.listen(3000);