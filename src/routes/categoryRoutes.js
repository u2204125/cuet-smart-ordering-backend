const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// All category routes require authentication (could be admin or vendor)
router.use(authMiddleware);

// Remove all category-related route logic

module.exports = router;
