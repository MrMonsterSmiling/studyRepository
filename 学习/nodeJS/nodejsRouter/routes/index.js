const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index/index',{name:'name'},(err,html)=>{
        res.send(html);
    })
})
module.exports = router;