const express = require('express');

const router = express.Router();

// all endpoints will be prefixed with /v1 which are in ./v1 folder
router.use('/v1',require('./v1'))

module.exports = router;