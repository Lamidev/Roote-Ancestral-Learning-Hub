

const QuizResult = require('../models/quizResults'); 
const { sendWelcomeEmail, sendAdminNotification } = require('./emailController');

let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
  console.log('⚠️ STRIPE_SECRET_KEY not found - Stripe functionality disabled');
}

const getDefaultCourseId = (level) => {
  const courseIds = {
    beginner: "643218529",
    middle: "968954470", 
    advanced: "179756668"
  };
  return courseIds[level] || courseIds.beginner;
};

const createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: 'Stripe not configured',
        message: 'STRIPE_SECRET_KEY is missing from environment variables'
      });
    }

    const {
      studentEmail,
      studentName,
      level,
      courseId,
      amount,
      currency,
      successUrl,
      cancelUrl
    } = req.body;

    const validatedCourseId = courseId || getDefaultCourseId(level);
    const baseFrontendUrl = process.env.FRONTEND_URL || `http://localhost:5173`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'cad',
            product_data: {
              name: `Yoruba ${level.charAt(0).toUpperCase() + level.slice(1)} Level Course`,
              description: `Roote Ancestral Learning - Course ID: ${validatedCourseId}`,
              metadata: {
                course_level: level,
                course_id: validatedCourseId,
                student_email: studentEmail
              }
            },
            unit_amount: amount || 10000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseFrontendUrl}/payment-return?status=success&session_id={CHECKOUT_SESSION_ID}&student_email=${encodeURIComponent(studentEmail)}`,
      cancel_url: `${baseFrontendUrl}/payment-return?status=cancelled&student_email=${encodeURIComponent(studentEmail)}`,
      customer_email: studentEmail,
      metadata: {
        student_email: studentEmail,
        student_name: studentName,
        course_level: level,
        course_id: validatedCourseId
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

    res.json({
      id: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      url: session.url
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to create payment session',
      message: error.message
    });
  }
};

const verifyPaymentStatus = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        error: 'Stripe not configured'
      });
    }

    const { sessionId, email } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID required'
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const studentEmail = email || session.customer_email;
      const quizResult = await QuizResult.findOne({ 
        studentEmail: studentEmail.toLowerCase().trim(),
        paymentStatus: 'completed'
      });

      return res.json({
        success: true,
        paid: true,
        session: {
          id: session.id,
          payment_status: session.payment_status,
          customer_email: session.customer_email,
          amount_total: session.amount_total / 100
        },
        student: quizResult ? {
          email: quizResult.studentEmail,
          courseId: quizResult.courseId,
          level: quizResult.level
        } : null
      });
    }

    res.json({
      success: true,
      paid: false,
      session: {
        id: session.id,
        payment_status: session.payment_status
      }
    });

  } catch (error) {
    console.error('❌ Error verifying payment status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment status'
    });
  }
};

const handlePaymentWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`❌ Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('💰 Stripe Webhook Received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await processStripePayment(session);
      return res.json({ received: true, processed: true });
    }

    res.json({ received: true });

  } catch (error) {
    console.error('❌ Error processing Stripe webhook:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

const processStripePayment = async (session) => {
  try {
    const studentEmail = session.customer_email;
    const studentName = session.metadata.student_name;
    const transactionId = session.id;
    const amount = session.amount_total / 100;
    const currency = session.currency;

    console.log('🔍 Processing Stripe payment:', {
      studentEmail,
      studentName,
      transactionId,
      amount,
      currency
    });

    if (!studentEmail) {
      throw new Error('Student email required');
    }

    //  Find the MOST RECENT quiz record for this email
    let quizResult = await QuizResult.findOne({ 
      studentEmail: studentEmail.toLowerCase().trim() 
    }).sort({ createdAt: -1 }); // Get the newest record

    if (!quizResult) {
      console.log('⚠️ No quiz record found, creating from payment metadata.');
      const levelFromStripe = session.metadata.course_level || 'beginner';
      const courseIdFromStripe = session.metadata.course_id || getDefaultCourseId(levelFromStripe);
      
      quizResult = new QuizResult({
        studentEmail: studentEmail.toLowerCase().trim(),
        fullName: studentName || 'Student',
        score: 0,
        level: levelFromStripe,
        wiseUrl: 'https://roote-ancestral-learning.wise.live/download',
        courseId: courseIdFromStripe,
        instituteCode: 'roote-ancestral-learning',
        answers: [],
        paymentStatus: 'completed',
        transactionId: transactionId,
        paidAt: new Date(),
        emailSent: false
      });
      await quizResult.save();
      console.log('✅ Created new student record from Stripe payment. Level:', quizResult.level, 'CourseID:', quizResult.courseId);
    } else {
      console.log('✅ Updating existing quiz record. Original Level:', quizResult.level, 'Original CourseID:', quizResult.courseId, 'Original Score:', quizResult.score, 'Created At:', quizResult.createdAt);
      
      quizResult.paymentStatus = 'completed';
      quizResult.transactionId = transactionId;
      quizResult.paidAt = new Date();
      
      await quizResult.save();
      console.log('✅ Stripe payment confirmed. Preserved Level:', quizResult.level, 'Preserved CourseID:', quizResult.courseId, 'Preserved Score:', quizResult.score);
    }

    try {
      await sendWelcomeEmail({
        studentEmail: quizResult.studentEmail,
        fullName: quizResult.fullName,
        level: quizResult.level,
        wiseUrl: quizResult.wiseUrl,
        score: quizResult.score,
        courseId: quizResult.courseId,
        instituteCode: quizResult.instituteCode,
        quizResultId: quizResult._id,
        paymentConfirmed: true
      });
      
      await QuizResult.findByIdAndUpdate(quizResult._id, { emailSent: true });
      console.log('✅ Welcome email sent. Level:', quizResult.level, 'CourseID:', quizResult.courseId, 'Score:', quizResult.score);
    } catch (emailError) {
      console.error('❌ Failed to send welcome email after payment:', emailError);
    }

    try {
      await sendAdminNotification({
        studentEmail: quizResult.studentEmail,
        fullName: quizResult.fullName,
        level: quizResult.level,
        score: quizResult.score,
        courseId: quizResult.courseId,
        instituteCode: quizResult.instituteCode,
        quizResultId: quizResult._id,
        totalQuestions: 8,
        paymentStatus: 'completed',
        transactionId: transactionId,
        amount: amount,
        currency: currency
      });
      console.log('✅ Admin notification sent. Level:', quizResult.level, 'Score:', quizResult.score);
    } catch (adminEmailError) {
      console.error('❌ Failed to send admin notification:', adminEmailError);
    }

    console.log('🎉 Stripe payment processed successfully. Student:', studentEmail, 'Level:', quizResult.level, 'CourseID:', quizResult.courseId, 'Score:', quizResult.score);

  } catch (error) {
    console.error('❌ Error processing Stripe payment:', error);
    throw error;
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { studentEmail, paymentStatus, transactionId, amount, currency } = req.body;
    
    const quizResult = await QuizResult.findOneAndUpdate(
      { studentEmail: studentEmail.toLowerCase().trim() },
      { 
        paymentStatus: paymentStatus || 'completed',
        transactionId: transactionId,
        paidAt: paymentStatus === 'completed' ? new Date() : null
      },
      { new: true }
    );

    if (!quizResult) {
      return res.status(404).json({
        success: false,
        error: 'Quiz result not found for this email'
      });
    }

    if (paymentStatus === 'completed' && !quizResult.emailSent) {
      await sendWelcomeEmail({
        studentEmail: quizResult.studentEmail,
        fullName: quizResult.fullName,
        level: quizResult.level,
        wiseUrl: quizResult.wiseUrl,
        score: quizResult.score,
        courseId: quizResult.courseId,
        instituteCode: quizResult.instituteCode,
        quizResultId: quizResult._id,
        paymentConfirmed: true
      });

      await QuizResult.findByIdAndUpdate(quizResult._id, { emailSent: true });

      await sendAdminNotification({
        studentEmail: quizResult.studentEmail,
        fullName: quizResult.fullName,
        level: quizResult.level,
        score: quizResult.score,
        courseId: quizResult.courseId,
        instituteCode: quizResult.instituteCode,
        quizResultId: quizResult._id,
        totalQuestions: 8,
        paymentStatus: 'completed',
        transactionId: transactionId,
        amount: amount,
        currency: currency
      });
    }

    res.json({ success: true, message: 'Payment status updated successfully', data: quizResult });

  } catch (error) {
    console.error('❌ Error updating payment status:', error);
    res.status(500).json({ success: false, error: 'Failed to update payment status' });
  }
};

const checkEmailStatus = async (req, res) => {
  try {
    const { session_id, email } = req.query;
    
    const quizResult = await QuizResult.findOne({
      $or: [
        { transactionId: session_id },
        { studentEmail: email?.toLowerCase().trim() }
      ]
    });

    res.json({
      success: true,
      emailSent: quizResult?.emailSent || false,
      paymentStatus: quizResult?.paymentStatus || 'unknown',
      enrolled: quizResult?.enrolled || false
    });
  } catch (error) {
    console.error('❌ Error checking email status:', error);
    res.status(500).json({ success: false, error: 'Failed to check email status' });
  }
};

module.exports = {
  createCheckoutSession,
  verifyPaymentStatus,
  handlePaymentWebhook,
  updatePaymentStatus,
  checkEmailStatus
};