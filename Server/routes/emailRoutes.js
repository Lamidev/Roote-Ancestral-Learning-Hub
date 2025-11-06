const express = require('express');
const { sendWelcomeEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/welcome', sendWelcomeEmail);

module.exports = router;