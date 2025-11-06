const express = require('express');
const { saveQuizResult, getQuizAnalytics } = require('../controllers/quizController');

const router = express.Router();

router.post('/results', saveQuizResult);
router.get('/analytics', getQuizAnalytics);

module.exports = router;