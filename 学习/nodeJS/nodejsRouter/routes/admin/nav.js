const express = require('express');
const tools = require('../../model/tools');

const upload = tools.multer();
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("nav");
})
router.get('/add',(req,res)=>{
    res.render('admin/nav/add');
})
//single,array,fields
router.post('/doAdd',upload.fields([{name:'file',maxCount:1},{name:'files',maxCount:12}]),(req,res)=>{
    //获取表单传过来的数据
    let body = req.body;
    res.send({
        body:body,
        files:req.files
    })
})

module.exports = router;