const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{
    res.send("用户登录");
})

module.exports = router;