const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const classUrls = {
  beginner: "https://learning.rooteancestrallearninghub.com/communities/groups/beginner/home?invite=695d46543289ed25c07b1f56",
  middle: "https://learning.rooteancestrallearninghub.com/communities/groups/middle-class/home?invite=695d46ad3289ed25c07bbd0e",
  advanced: "https://learning.rooteancestrallearninghub.com/communities/groups/advanced-class/home?invite=695d46cf92dffd120de3ccb5"
};

const sendWelcomeEmail = async (data) => {
  try {
    const { studentEmail, fullName, level, score, freePeriodActive = false, paymentConfirmed } = data;

    const levelInfo = {
      beginner: {
        title: "Yoruba Beginner Level",
        description: "Perfect for starting your Yoruba journey with basic greetings and vocabulary"
      },
      middle: {
        title: "Yoruba Middle Level",
        description: "Build on your foundation with more complex conversations and grammar"
      },
      advanced: {
        title: "Yoruba Advanced Level",
        description: "Master Yoruba with advanced cultural context, idioms, and fluent conversations"
      }
    }[level] || {
      title: "Yoruba Beginner Level",
      description: "Perfect for starting your Yoruba journey with basic greetings and vocabulary"
    };

    const classUrl = classUrls[level] || classUrls.beginner;

    // Determine email subject and status
    let subject, statusMessage, ctaText, ctaUrl, primaryButtonColor;

    if (freePeriodActive) {
      subject = `🎉 Free Class Access - ${levelInfo.title} (Jan 24th, 2026 at 12 PM CST)`;
      statusMessage = "You have been granted free access to the January 24th, 2026 Yoruba Class.";
      ctaText = "🎯 Join Your Class Now";
      ctaUrl = classUrl;
      primaryButtonColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    } else if (paymentConfirmed) {
      subject = `🎉 Welcome to Roote! Your ${levelInfo.title} is Activated`;
      statusMessage = "Your payment has been processed successfully. Your course access is now activated!";
      ctaText = "🚀 Start Learning Now";
      ctaUrl = classUrl;
      primaryButtonColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    } else {
      subject = `🎉 Complete Payment for ${levelInfo.title} - Roote Ancestral`;
      statusMessage = "Complete your payment of CAD 100 to access your course.";
      ctaText = "💳 Pay CAD 100 Now";
      ctaUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment`;
      primaryButtonColor = "#f59e0b";
    }

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background: #f8fafc; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 10px 10px 0 0; 
        }
        .content { 
          background: white; 
          padding: 30px; 
          border-radius: 0 0 10px 10px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        .cta-button { 
          display: block; 
          width: 100%; 
          padding: 16px; 
          background: ${primaryButtonColor}; 
          color: white !important; 
          text-decoration: none; 
          text-align: center; 
          border-radius: 8px; 
          font-weight: bold; 
          font-size: 18px; 
          margin: 25px 0; 
          border: none;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .highlight { 
          background: #ecfdf5; 
          border-left: 4px solid #10b981; 
          padding: 15px; 
          margin: 20px 0; 
        }
        @media only screen and (max-width: 600px) {
          .container { padding: 10px; }
          .header, .content { padding: 20px; }
          .cta-button { font-size: 16px; padding: 14px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; color:white;">${freePeriodActive ? '🎉 Free Class Access!' : (paymentConfirmed ? '🎉 Welcome to Roote!' : '📝 Almost There!')}</h1>
          <p style="margin:10px 0 0 0; color:white; font-size:18px;">${fullName}, you're placed in ${levelInfo.title}</p>
          <p style="margin:5px 0 0 0; color:white; opacity:0.9;">Assessment Score: ${score}/8</p>
        </div>
        
        <div class="content">
          ${freePeriodActive || paymentConfirmed ? `
            <div class="highlight">
              <h3 style="margin:0 0 10px 0; color:#065f46;">✅ ${statusMessage}</h3>
              ${freePeriodActive ? '<p style="margin:0; color:#065f46;"><strong>Date:</strong> January 24th, 2026 at 12 PM CST</p>' : ''}
            </div>
          ` : ''}
          
          <h2 style="color:#4f46e5; margin-top:0;">${levelInfo.title}</h2>
          <p style="color:#666; font-size:16px;">${levelInfo.description}</p>
          
          <a href="${ctaUrl}" class="cta-button" style="color:white !important; text-decoration:none;">
            ${ctaText}
          </a>
          
          <h3 style="color:#4f46e5;">Next Steps:</h3>
          <ol style="color:#666; padding-left:20px;">
            ${paymentConfirmed || freePeriodActive ? `
              <li style="margin-bottom:10px;">Click the button above to access your class directly</li>
              <li style="margin-bottom:10px;">Use email <strong>${studentEmail}</strong> if prompted to log in</li>
              <li style="margin-bottom:10px;">Access your class anytime from any device</li>
            ` : `
              <li style="margin-bottom:10px;">Complete payment using the button above (CAD 100)</li>
              <li style="margin-bottom:10px;">You'll receive your class link immediately after payment confirmation</li>
              <li style="margin-bottom:10px;">Start your Yoruba learning journey today!</li>
            `}
          </ol>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px;">
            <p style="margin:5px 0;">Need help? Reply to this email or contact admin@rooteancestrallearninghub.com</p>
            <p style="margin:5px 0;">Roote Ancestral Learning Hub • Winnipeg, Manitoba, Canada</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;



    const { data: emailData, error } = await resend.emails.send({
      from: 'Roote Ancestral Learning Hub <contact@updates.rooteancestrallearninghub.com>',
      to: studentEmail,
      reply_to: 'admin@rooteancestrallearninghub.com',
      subject: subject,
      html: emailHtml,
      tags: [
        { name: 'category', value: 'welcome_email' },
        { name: 'student_level', value: level },
        { name: 'payment_status', value: paymentConfirmed ? 'paid' : (freePeriodActive ? 'free' : 'pending') }
      ]
    });

    if (error) {
      console.error('❌ Resend API Error (Student Welcome):', error);
      throw error;
    }

    return { success: true, emailId: emailData?.id };

  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error);
    throw error;
  }
};

const sendAdminNotification = async (data) => {
  try {
    const {
      studentEmail,
      fullName,
      level,
      score,
      totalQuestions = 8,
      paymentStatus,
      transactionId,
      amount,
      currency = 'CAD',
      enrollmentType,
      quizResultId,
      phoneNumber
    } = data;

    const subject = enrollmentType === 'free_period'
      ? `🎉 Free Class: ${fullName} - ${level} Level`
      : paymentStatus === 'completed'
        ? `✅ Paid: ${fullName} - ${level} Level`
        : `📊 New Quiz: ${fullName} - ${level} Level`;

    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #374151; 
          margin: 0; 
          padding: 0; 
          background: #f9fafb; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .card { 
          background: white; 
          border-radius: 8px; 
          padding: 25px; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        }
        .header { 
          border-bottom: 2px solid #e5e7eb; 
          padding-bottom: 15px; 
          margin-bottom: 20px; 
        }
        .info-section { 
          margin: 20px 0; 
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin: 5px 0;
        }
        .highlight-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
        }
        @media only screen and (max-width: 600px) {
          .container { padding: 10px; }
          .card { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 style="color:#4f46e5; margin:0 0 10px 0; font-size:24px;">${subject}</h1>
            <p style="color:#6b7280; margin:0; font-size:14px;">${formattedDate}</p>
          </div>
          
          <div class="info-section">
            <h3 style="color:#4f46e5; margin:0 0 10px 0; font-size:18px;">👤 Student Information</h3>
            <p style="margin:8px 0;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin:8px 0;"><strong>Email:</strong> ${studentEmail}</p>
            <p style="margin:8px 0;"><strong>Level:</strong> ${level.charAt(0).toUpperCase() + level.slice(1)}</p>
            <p style="margin:8px 0;"><strong>Phone:</strong> ${phoneNumber || 'Not provided'}</p>
            ${quizResultId ? `<p style="margin:8px 0;"><strong>Assessment ID:</strong> ${quizResultId}</p>` : ''}
          </div>
          
          <div class="info-section">
            <h3 style="color:#4f46e5; margin:0 0 10px 0; font-size:18px;">🎯 Assessment Results</h3>
            <p style="margin:8px 0;"><strong>Score:</strong> ${score}/${totalQuestions} (${Math.round((score / totalQuestions) * 100)}%)</p>
            <div class="status-badge" style="background:#${level === 'beginner' ? '3b82f6' : level === 'middle' ? '8b5cf6' : '7c3aed'}; color:white;">
              ${level.charAt(0).toUpperCase() + level.slice(1)} Level
            </div>
          </div>
          
          <div class="info-section">
            <h3 style="color:#4f46e5; margin:0 0 10px 0; font-size:18px;">💰 Payment Status</h3>
            ${enrollmentType === 'free_period' ? `
            <div class="highlight-box">
                <p style="margin:0; color:#065f46;"><strong>🎉 Free Class Enrollment</strong></p>
                <p style="margin:5px 0 0 0; color:#065f46; font-size:14px;">Date: January 24, 2026 • Time: 12:00 PM CST</p>
              </div>
            ` : paymentStatus === 'completed' ? `
              <div class="highlight-box">
                <p style="margin:0; color:#065f46;"><strong>✅ Payment Completed</strong></p>
                <p style="margin:5px 0 0 0; color:#065f46; font-size:14px;">Amount: ${amount} ${currency}</p>
                ${transactionId ? `<p style="margin:5px 0 0 0; color:#065f46; font-size:14px;">Transaction: ${transactionId}</p>` : ''}
              </div>
            ` : `
              <p style="margin:8px 0; color:#92400e;">⏳ Payment Pending - Awaiting completion</p>
            `}
          </div>
          
          <div class="info-section">
            <h3 style="color:#4f46e5; margin:0 0 10px 0; font-size:18px;">📋 Summary</h3>
            <ul style="color:#374151; margin:0; padding-left:20px;">
              <li>Welcome email sent to student</li>
              <li>Assessment completed and scored</li>
              ${enrollmentType === 'free_period'
        ? '<li>Free class access granted</li>'
        : paymentStatus === 'completed'
          ? '<li>Payment processed successfully</li><li>Course access activated</li>'
          : '<li>Payment link sent to student</li>'
      }
              <li>Student record saved to database</li>
            </ul>
          </div>
          
          <div style="margin-top:25px; padding-top:15px; border-top:1px solid #e5e7eb;">
            <p style="color:#6b7280; margin:0; font-size:14px; text-align:center;">
              Roote Assessment System • Auto-generated notification
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Roote Ancestral Learning Hub <contact@updates.rooteancestrallearninghub.com>',
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      html: emailHtml
    });

    if (error) {
      console.error('❌ Resend API Error (Admin Notification):', error);
      throw error;
    }

  } catch (error) {
    console.error('❌ Error in sendAdminNotification:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification
};