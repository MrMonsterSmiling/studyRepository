const express = require('express');
const app = express();
const admin = require('./routes/admin');
const api = require('./routes/api');
const index = require('./routes/index');

app.use('/',index);
app.use('/admin',admin);
app.use('/api',api);

app.listen(3000);