// Student routes
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// All student actions require authentication
router.use(authMiddleware);

// Get all menu items (with filters)
router.get('/menu-items', studentController.getAllMenuItems);

router.post('/order', studentController.placeOrder);
router.get('/orders', studentController.getOrderHistory);

// Purchase items (order creation)
router.post('/purchase', studentController.purchaseItems);

// Review a menu item
router.post('/review', studentController.reviewMenuItem);

module.exports = router;
