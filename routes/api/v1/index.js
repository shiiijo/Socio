const express = require('express');

const router = express.Router();

// all endpoints will be prefixed with/posts which are in ./posts folder
router.use('/posts',require('./posts'))
router.use('/users',require('./users'))


module.exports = router;