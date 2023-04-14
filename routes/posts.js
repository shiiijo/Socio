const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controller');
//  middle ware checks if user logged in or not , if not he should not able to create post
router.post('/create',passport.checkAuthentication,postController.create)
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy)

module.exports = router;