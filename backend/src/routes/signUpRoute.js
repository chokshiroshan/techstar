const express = require('express');

const router = express.Router();

// Import match Controller
const signUp = require('../controllers/signUp');

router.post('/', signUp);

module.exports = router;
