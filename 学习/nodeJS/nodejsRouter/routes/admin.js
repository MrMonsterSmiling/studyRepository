const express = require('express');
const nav = require('./admin/nav');
const router = express.Router();

router.use("/nav",nav);
router.get('/',(req,res)=>{
    res.send("admin");
})
module.exports = router;