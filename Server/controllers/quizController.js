

const QuizResult = require('../models/quizResults');
const { sendWelcomeEmail, sendAdminNotification } = require('./emailController');

// Save quiz result and trigger welcome email
const saveQuizResult = async (req, res) => {
  try {
    const { studentEmail, fullName, score, level, wiseUrl, answers } = req.body;

    console.log('🎯 Saving quiz result for:', studentEmail);

    // Validate required fields
    if (!studentEmail || !fullName || score === undefined || !level || !wiseUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: studentEmail, fullName, score, level, wiseUrl'
      });
    }

    // Create new quiz result
    const quizResult = new QuizResult({
      studentEmail,
      fullName,
      score,
      level,
      wiseUrl,
      answers: answers || []
    });

    // Save to database
    await quizResult.save();
    console.log('💾 Quiz result saved with ID:', quizResult._id);

    // Send welcome email to student AND admin notification (non-blocking)
    sendWelcomeEmailAsync({
      studentEmail,
      fullName,
      level,
      wiseUrl,
      score,
      quizResultId: quizResult._id
    });

    // Send admin notification
    sendAdminNotificationAsync({
      studentEmail,
      fullName,
      level,
      score,
      quizResultId: quizResult._id,
      totalQuestions: 8 // Since you have 8 questions
    });

    res.status(201).json({
      success: true,
      message: 'Quiz result saved successfully',
      quizResultId: quizResult._id,
      data: {
        id: quizResult._id,
        level,
        score,
        wiseUrl
      }
    });

  } catch (error) {
    console.error('❌ Error saving quiz result:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to save quiz result'
    });
  }
};

// Non-blocking email sending to student
const sendWelcomeEmailAsync = async (data) => {
  try {
    await sendWelcomeEmail(data);
    console.log('✅ Welcome email sent successfully to:', data.studentEmail);
    
    // Update quiz result to mark email as sent
    await QuizResult.findByIdAndUpdate(data.quizResultId, { emailSent: true });
  } catch (emailError) {
    console.error('❌ Failed to send welcome email:', emailError);
    // Don't throw error - quiz result is already saved
  }
};

// Non-blocking email sending to admin
const sendAdminNotificationAsync = async (data) => {
  try {
    await sendAdminNotification(data);
    console.log('✅ Admin notification sent for:', data.studentEmail);
  } catch (emailError) {
    console.error('❌ Failed to send admin notification:', emailError);
    // Don't throw error - quiz result is already saved
  }
};

// Get quiz analytics
const getQuizAnalytics = async (req, res) => {
  try {
    const levelDistribution = await QuizResult.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSubmissions = await QuizResult.countDocuments();
    const averageScore = await QuizResult.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: '$score' }
        }
      }
    ]);

    const recentSubmissions = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('studentEmail level score createdAt emailSent');

    res.json({
      success: true,
      data: {
        levelDistribution,
        totalSubmissions,
        averageScore: averageScore[0]?.average || 0,
        recentSubmissions
      }
    });

  } catch (error) {
    console.error('❌ Error fetching quiz analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
};

module.exports = {
  saveQuizResult,
  getQuizAnalytics
};