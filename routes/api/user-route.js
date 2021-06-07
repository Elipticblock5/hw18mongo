const userControllers = require("../controllers/user-controller");

const router = require("express").Router();


router.route("/").post(userControllers.makeUser);

router.get("/",(req,res)=>{
    res.send("you are now using the user route")
})

module.exports = router