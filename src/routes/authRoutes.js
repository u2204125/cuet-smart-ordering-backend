// Auth routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register user after Firebase registration
router.post('/register', authController.registerUser);

// Login route (if implemented)
if (authController.login) {
  router.post('/login', authController.login);
}

module.exports = router;
