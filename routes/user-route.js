//used askBCS ticket to assist with userControllers routing

//const userControllers = require("../controllers/user-controller");

const router = require("express").Router();


const {
    getAlltheUsers,
    getUserID,
    makeUser,
    updateTheUser,
    deleteTheUser,
    addTheFriend,
    deleteTheFriend

}  = require("../controllers/user-controller");

router
    .route('/')
    .get(getAlltheUsers)
    .post(makeUser);

//by id
router  
    .route('/:id')
    .get(getUserID)
    .put(updateTheUser)
    .delete(deleteTheUser);

//friends
router
    .route('/:userId/friends/:friendId')
    .post(addTheFriend)
    .delete(deleteTheFriend);

/*router.get("/",(req,res)=>{
    res.send("you are now using the user route")
})*/

module.exports = router