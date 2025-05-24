// User-related routes (common, not auth-specific)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

// Get user by Mongo ObjectId
router.get('/:id', userController.getUserById);

// Get all users
router.get('/', userController.getAllUsers);

module.exports = router;
