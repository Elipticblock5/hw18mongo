const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("you are now using the auth route")
})

module.exports = router