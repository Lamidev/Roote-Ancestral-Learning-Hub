

// const QuizResult = require('../models/quizResults');
// const { sendAdminNotification, sendWelcomeEmail } = require('./emailController');

// const saveQuizResult = async (req, res) => {
//   try {
//     const { studentEmail, fullName, score, level, wiseUrl, answers, courseId } = req.body;

//     console.log('📥 Received quiz submission:', { studentEmail, fullName, score, level, courseId });

//     if (!studentEmail || !fullName || score === undefined || !level || !wiseUrl || !courseId) {
//       return res.status(400).json({
//         success: false,
//         error: 'Missing required fields: studentEmail, fullName, score, level, wiseUrl, courseId'
//       });
//     }

//     const validatedCourseId = courseId;

//     if (!validatedCourseId) {
//       console.error('❌ No courseId provided:', courseId);
//       return res.status(400).json({
//         success: false,
//         error: 'Course ID is required'
//       });
//     }

//     console.log('🎯 Using course ID from frontend:', validatedCourseId, 'for level:', level);

//     const validatedAnswers = Array.isArray(answers) 
//       ? answers.map((answer, index) => ({
//           questionId: answer.questionId || index + 1,
//           answerId: answer.answerId || "",
//           score: answer.score || 0,
//         }))
//       : [];

//     const quizResult = new QuizResult({
//       studentEmail: studentEmail.toLowerCase().trim(),
//       fullName: fullName.trim(),
//       score: Math.max(0, Math.min(8, score)),
//       level: level,
//       wiseUrl: wiseUrl,
//       courseId: validatedCourseId,
//       instituteCode: instituteCode,
//       answers: validatedAnswers,
//       paymentStatus: 'pending',
//       emailSent: false
//     });

//     await quizResult.save();
//     console.log('✅ Quiz result saved to database. Level:', level, 'CourseID:', validatedCourseId, 'Score:', score);

//     try {
//       await sendWelcomeEmail({
//         studentEmail: studentEmail,
//         fullName: fullName,
//         level: level,
//         wiseUrl: wiseUrl,
//         score: score,
//         courseId: validatedCourseId,
//         instituteCode: instituteCode,
//         quizResultId: quizResult._id,
//         paymentConfirmed: false
//       });
//       console.log('✅ Welcome email sent to student after quiz:', studentEmail);
//     } catch (emailError) {
//       console.error('❌ Failed to send welcome email after quiz:', emailError);
//     }

//     sendAdminNotificationAsync({
//       studentEmail: studentEmail,
//       fullName: fullName,
//       level: level,
//       score: score,
//       courseId: validatedCourseId,
//       instituteCode: instituteCode,
//       quizResultId: quizResult._id,
//       totalQuestions: 8,
//       paymentStatus: 'pending'
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Quiz result saved successfully - Complete payment to receive course access',
//       quizResultId: quizResult._id,
//       paymentRequired: true,
//       paymentUrl: wiseUrl,
//       data: { 
//         id: quizResult._id, 
//         level, 
//         score, 
//         paymentUrl: wiseUrl,
//         courseId: validatedCourseId,
//         instituteCode
//       }
//     });

//   } catch (error) {
//     console.error('❌ Error saving quiz result:', error);

//     if (error.name === 'ValidationError') {
//       console.error('Validation errors:', Object.keys(error.errors).map(key => ({
//         field: key,
//         message: error.errors[key].message
//       })));
//     }

//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to save quiz result',
//       details: error.message 
//     });
//   }
// };

// const sendAdminNotificationAsync = async (data) => {
//   try {
//     await sendAdminNotification(data);
//     console.log('✅ Admin notification sent for:', data.studentEmail);
//   } catch (error) {
//     console.error('❌ Failed to send admin notification:', error);
//   }
// };

// const getQuizAnalytics = async (req, res) => {
//   try {
//     const levelDistribution = await QuizResult.aggregate([
//       { $group: { _id: '$level', count: { $sum: 1 } } }
//     ]);

//     const totalSubmissions = await QuizResult.countDocuments();
//     const averageScore = await QuizResult.aggregate([
//       { $group: { _id: null, average: { $avg: '$score' } } }
//     ]);

//     const paymentStats = await QuizResult.aggregate([
//       { $group: { _id: '$paymentStatus', count: { $sum: 1 } } }
//     ]);

//     const recentSubmissions = await QuizResult.find()
//       .sort({ createdAt: -1 })
//       .limit(10)
//       .select('studentEmail level score createdAt emailSent courseId instituteCode paymentStatus');

//     res.json({
//       success: true,
//       data: { 
//         levelDistribution, 
//         totalSubmissions, 
//         averageScore: averageScore[0]?.average || 0, 
//         paymentStats,
//         recentSubmissions 
//       }
//     });

//   } catch (error) {
//     console.error('❌ Error fetching quiz analytics:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
//   }
// };

// module.exports = {
//   saveQuizResult,
//   getQuizAnalytics
// };


const QuizResult = require('../models/quizResults');
const { sendAdminNotification, sendWelcomeEmail } = require('./emailController');
const { isFreePeriodActive } = require('./freeDayController');

const saveQuizResult = async (req, res) => {
  try {
    const { studentEmail, fullName, phoneNumber, score, level, classUrl, answers } = req.body;

    if (!studentEmail || !fullName || score === undefined || !level || !classUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: studentEmail, fullName, score, level, classUrl'
      });
    }

    const validatedAnswers = Array.isArray(answers)
      ? answers.map((answer, index) => ({
        questionId: answer.questionId || index + 1,
        answerId: answer.answerId || "",
        score: answer.score || 0,
      }))
      : [];

    const freePeriodActive = isFreePeriodActive();

    const cleanedEmail = studentEmail.toLowerCase().trim();

    const quizResult = new QuizResult({
      studentEmail: cleanedEmail,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber,
      score: Math.max(0, Math.min(8, score)),
      level: level,
      classUrl: classUrl,
      answers: validatedAnswers,
      paymentStatus: freePeriodActive ? 'completed' : 'pending',
      transactionId: freePeriodActive ? `FREE_PERIOD_${Date.now()}` : null,
      paidAt: freePeriodActive ? new Date() : null,
      emailSent: false,
      enrollmentType: freePeriodActive ? 'free_period' : 'regular'
    });

    await quizResult.save();

    // Respond immediately to the client to make the UI feel instant
    res.status(201).json({
      success: true,
      message: freePeriodActive
        ? 'Quiz result saved successfully - Welcome to your free class!'
        : 'Quiz result saved successfully - Complete payment to receive course access',
      quizResultId: quizResult._id,
      isFreePeriodActive: freePeriodActive,
      paymentRequired: !freePeriodActive,
      classUrl: classUrl,
      data: {
        id: quizResult._id,
        level,
        score,
        classUrl: classUrl,
        isFreePeriodActive: freePeriodActive,
        paymentStatus: quizResult.paymentStatus
      }
    });

    // Fire off emails in the background
    (async () => {
      try {
        await sendWelcomeEmail({
          studentEmail: cleanedEmail,
          fullName: fullName,
          level: level,
          score: score,
          quizResultId: quizResult._id,
          paymentConfirmed: freePeriodActive,
          freePeriodActive: freePeriodActive
        });

        if (freePeriodActive) {
          await QuizResult.findByIdAndUpdate(quizResult._id, { emailSent: true });
        }

        await sendAdminNotification({
          studentEmail: cleanedEmail,
          fullName: fullName,
          level: level,
          score: score,
          phoneNumber: phoneNumber,
          quizResultId: quizResult._id,
          totalQuestions: 8,
          paymentStatus: freePeriodActive ? 'completed' : 'pending',
          enrollmentType: freePeriodActive ? 'free_period' : 'regular'
        });
      } catch (backgroundError) {
        console.error('❌ Error processing background tasks:', backgroundError);
      }
    })();

  } catch (error) {
    console.error('❌ Error saving quiz result:', error);

    if (error.name === 'ValidationError') {
      console.error('Validation errors:', Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })));
    }

    res.status(500).json({
      success: false,
      error: 'Failed to save quiz result',
      details: error.message
    });
  }
};

const sendAdminNotificationAsync = async (data) => {
  try {
    await sendAdminNotification(data);
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
  }
};

const getQuizAnalytics = async (req, res) => {
  try {
    const levelDistribution = await QuizResult.aggregate([
      { $group: { _id: '$level', count: { $sum: 1 } } }
    ]);

    const totalSubmissions = await QuizResult.countDocuments();
    const averageScore = await QuizResult.aggregate([
      { $group: { _id: null, average: { $avg: '$score' } } }
    ]);

    const paymentStats = await QuizResult.aggregate([
      { $group: { _id: '$paymentStatus', count: { $sum: 1 } } }
    ]);

    const enrollmentStats = await QuizResult.aggregate([
      { $group: { _id: '$enrollmentType', count: { $sum: 1 } } }
    ]);

    const recentSubmissions = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('studentEmail level score createdAt emailSent courseId instituteCode paymentStatus enrollmentType');

    res.json({
      success: true,
      data: {
        levelDistribution,
        totalSubmissions,
        averageScore: averageScore[0]?.average || 0,
        paymentStats,
        enrollmentStats,
        recentSubmissions
      }
    });

  } catch (error) {
    console.error('❌ Error fetching quiz analytics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
};

module.exports = {
  saveQuizResult,
  getQuizAnalytics
};