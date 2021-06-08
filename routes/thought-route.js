const router = require("express").Router();

const {
    getAllTheThought,
    getThoughtById,
    createNewThought,
    updateUserThought,
    deleteUserThought,
    addUserReaction,
    removeUserReaction
} = require('../controllers/thought-controller');

router
    .route('/')
    .get(getAllTheThought)
    .post(createNewThought)

//by id
router
 .route('/:id')
 .get(getThoughtById)
 .put(updateUserThought)
.delete(deleteUserThought)

//routes for reaction

router
    .route("/:thoughtId/reactions")
    .post(addUserReaction)
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeUserReaction)

/*router.get("/",(req,res)=>{
    res.send("you are now using the thought route")
})*/

module.exports = router