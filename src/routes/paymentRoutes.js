// Payment routes
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/initiate', paymentController.initiatePayment);
router.post('/callback', paymentController.paymentCallback);

module.exports = router;
