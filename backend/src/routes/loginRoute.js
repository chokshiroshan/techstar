const express = require('express');

const router = express.Router();

// Import match Controller
const login = require('../controllers/login');

router.post('/', login);

module.exports = router;
