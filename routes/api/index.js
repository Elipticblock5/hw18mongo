const router = require('express').Router();

const thoughtRoutes = require('./thought-route');
const userRoutes = require('./user-route');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);


module.exports = router;