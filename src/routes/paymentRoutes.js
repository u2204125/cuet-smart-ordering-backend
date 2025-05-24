// Payment routes
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/initiate', paymentController.initiatePayment);
router.post('/callback', paymentController.paymentCallback);

// Payment success and failure routes
router.post('/success', paymentController.paymentSuccess);
router.post('/fail', paymentController.paymentFail);

module.exports = router;
