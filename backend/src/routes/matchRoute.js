/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

// Import match Controller
const matchController = require('../controllers/matchController');

// Get all matches
// router.get('/', matchController.getAllMatches);

// Get all matches for a userId
router.get('/:userId', matchController.getMatchesByUserId);

// Create match
router.post('/', matchController.createMatch);

module.exports = router;
