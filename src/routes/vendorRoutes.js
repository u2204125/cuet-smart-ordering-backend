// Vendor routes
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

// All vendor menu item routes require authentication
router.use(authMiddleware);

// Create a new menu item
router.post('/menu-items', vendorController.createMenuItem);

// Get all menu items for the logged-in vendor
router.get('/menu-items', vendorController.getVendorMenuItems);

// Update a menu item by ID (must belong to the vendor)
router.put('/menu-items/:id', vendorController.updateMenuItem);

// Delete a menu item by ID (must belong to the vendor)
router.delete('/menu-items/:id', vendorController.deleteMenuItem);

module.exports = router;
