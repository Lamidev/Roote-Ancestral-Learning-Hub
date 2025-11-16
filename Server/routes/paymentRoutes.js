const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Parse JSON for all regular payment routes
router.use(express.json());

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.post('/verify-payment', paymentController.verifyPaymentStatus);
router.post('/update-status', paymentController.updatePaymentStatus);
router.get('/check-email-status', paymentController.checkEmailStatus);

module.exports = router;
