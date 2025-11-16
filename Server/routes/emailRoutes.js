

const express = require('express');
const { sendWelcomeEmail, sendAdminNotification } = require('../controllers/emailController');

const router = express.Router();

router.post('/welcome', sendWelcomeEmail);
router.post('/admin-notification', sendAdminNotification); 

module.exports = router;

