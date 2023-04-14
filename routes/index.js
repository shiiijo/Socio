const express = require("express");

const router = express.Router();

const homeController = require('../controllers/home_controller')


router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comment'))
router.use('/likes',require('./likes'))

// this is tell to use all apis from api directory we defined
// all endpoints will be prefixed with /api which are in ./api folder
router.use('/api',require('./api'))


module.exports = router;