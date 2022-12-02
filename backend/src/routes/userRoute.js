/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

// Import user Controller
const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);

// Get a User using a userId
router.get('/:userId', userController.getUserByUserId);

router.post('/updateUser', userController.updateUser);

module.exports = router;
