// User-related routes (common, not auth-specific)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

// Get user by Firebase UID
router.get('/:uid', userController.getUserByUid);

// Get all users (admin only)
router.get('/', authMiddleware, authorize('admin'), userController.getAllUsers);

module.exports = router;
