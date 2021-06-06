const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("you are now using the thought route")
})

module.exports = router