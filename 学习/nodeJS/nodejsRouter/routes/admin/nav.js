const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
    res.send("nav");
})
router.get('/add',(req,res)=>{
    res.render('admin/nav/add');
})
router.post('/doAdd',(req,res)=>{
    //获取表单传过来的数据
    let body = req.body;
    res.send(body)
})

module.exports = router;