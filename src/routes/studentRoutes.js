// Student routes
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// All student actions require authentication
router.use(authMiddleware);

// Purchase items (order creation + payment)
router.post('/purchase', studentController.purchaseItems);

module.exports = router;
