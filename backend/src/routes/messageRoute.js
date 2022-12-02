/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

// Import match Controller
const messageController = require('../controllers/messageController');

// Get all matches
// router.get('/', matchController.getAllMatches);

// Get all messages for a userId
router.get('/:userId', messageController.getMessagesByUserId);

// Create message
router.post('/', messageController.createMessage);

// Get last message from sender using sender receiver id combos e,g, last message from A to B using A and B ids
router.get('/last/:comboId', messageController.getLastMessagesBySenderReceiverComboId);


// Get all messages from sender using sender receiver id combos e,g, all messages from A to B using A and B ids
router.get('/all/:comboId', messageController.getAllMessagesBySenderReceiverComboId);
module.exports = router;
