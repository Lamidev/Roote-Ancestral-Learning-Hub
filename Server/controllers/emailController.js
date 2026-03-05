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
      subject = `🎉 Free Class Access - ${levelInfo.title} (Jan 31st, 2026 at 12 PM CST)`;
      statusMessage = "You have been granted free access to the January 31st, 2026 Yoruba Class.";
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
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${freePeriodActive ? 'Free Class Access' : 'Welcome to Roote'}</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7fa; padding-bottom: 40px; padding-top: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 60px 40px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; line-height: 1.2; }
        .header p { margin: 15px 0 0; font-size: 18px; opacity: 0.9; }
        .score-badge { display: inline-block; background: rgba(255, 255, 255, 0.2); padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: 600; margin-top: 20px; }
        .content { padding: 50px 40px; color: #374151; font-size: 16px; line-height: 1.6; }
        .status-box { background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 20px; padding: 30px; margin-bottom: 40px; position: relative; }
        .status-box h2 { margin: 0 0 10px; color: #111827; font-size: 20px; font-weight: 700; display: flex; align-items: center; }
        .status-box p { margin: 0; color: #4b5563; }
        .btn-container { text-align: center; margin-top: 20px; margin-bottom: 20px; }
        .button { display: inline-block; padding: 18px 36px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; border-radius: 16px; font-weight: 700; font-size: 18px; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); transition: transform 0.2s; }
        .steps { margin-top: 40px; border-top: 1px solid #f3f4f6; padding-top: 40px; }
        .steps h3 { margin: 0 0 20px; color: #111827; font-size: 18px; font-weight: 700; }
        .step-item { display: flex; margin-bottom: 20px; align-items: flex-start; }
        .step-number { background: #e0e7ff; color: #4f46e5; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; margin-right: 15px; flex-shrink: 0; margin-top: 2px; }
        .footer { padding: 40px; border-top: 1px solid #f3f4f6; text-align: center; }
        .footer p { margin: 5px 0; font-size: 14px; color: #9ca3af; }
        .footer .social { margin-top: 20px; }
        .footer .social a { text-decoration: none; color: #6b7280; font-weight: 600; margin: 0 10px; }
        @media screen and (max-width: 600px) {
          .header, .content, .footer { padding-left: 20px; padding-right: 20px; }
          .header h1 { font-size: 26px; }
          .status-box { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main">
          <div class="header">
            <h1>${freePeriodActive ? '🎉 Space Reserved!' : (paymentConfirmed ? '🎉 Welcome Aboard!' : '🚀 Almost Ready!')}</h1>
            <p>${fullName}, you've been placed in <br><strong>${levelInfo.title}</strong></p>
            <div class="score-badge">Assessment Score: ${score}/8</div>
          </div>
          
          <div class="content">
            <div class="status-box">
              <h2>${freePeriodActive ? '✅ Free Class Confirmed' : (paymentConfirmed ? '✅ Level Activated' : '💳 Pending Activation')}</h2>
              <p>${statusMessage}</p>
              ${freePeriodActive ? '<div style="margin-top:15px; font-weight:700; color:#4f46e5;">🗓️ January 31st, 2026 at 12 PM CST</div>' : ''}
            </div>

            <p style="margin-bottom: 30px;">
              ${freePeriodActive || paymentConfirmed 
                ? "Your space is ready in our virtual classroom. Click the button below to join the community and start your Yoruba journey!" 
                : "To finalize your enrollment and unlock all materials, please complete your payment of CAD 100."}
            </p>

            <div class="btn-container">
              <a href="${ctaUrl}" class="button">${ctaText}</a>
            </div>

            <div class="steps">
              <h3>Next Steps for You:</h3>
              
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td width="40" valign="top" style="padding-top: 2px;">
                    <div style="background-color: #e0e7ff; color: #4f46e5; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700;">1</div>
                  </td>
                  <td style="padding-left: 10px; color: #374151; font-size: 16px; line-height: 1.6;">
                    ${paymentConfirmed || freePeriodActive ? 'Access your classroom platform using the link above' : 'Complete your course payment safely online'}
                  </td>
                </tr>
              </table>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td width="40" valign="top" style="padding-top: 2px;">
                    <div style="background-color: #e0e7ff; color: #4f46e5; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700;">2</div>
                  </td>
                  <td style="padding-left: 10px; color: #374151; font-size: 16px; line-height: 1.6;">
                    ${paymentConfirmed || freePeriodActive ? `Log in with <strong>${studentEmail}</strong> if requested` : 'Receive your instant activation email'}
                  </td>
                </tr>
              </table>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td width="40" valign="top" style="padding-top: 2px;">
                    <div style="background-color: #e0e7ff; color: #4f46e5; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700;">3</div>
                  </td>
                  <td style="padding-left: 10px; color: #374151; font-size: 16px; line-height: 1.6;">
                    Connect with teachers and say "Kaabo" (Welcome) to the class!
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="footer">
            <p><strong>Roote Ancestral Learning Hub</strong></p>
            <p>Winnipeg, Manitoba, Canada</p>
            <p style="margin-top: 20px;">Questions? Simply reply to this email.</p>
            <div class="social">
              <a href="https://rooteancestrallearninghub.com" style="text-decoration: none; color: #6b7280; font-weight: 600; margin: 0 10px;">Website</a>
              <a href="mailto:admin@rooteancestrallearninghub.com" style="text-decoration: none; color: #6b7280; font-weight: 600; margin: 0 10px;">Support</a>
            </div>
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
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Notification: ${fullName}</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .container { padding: 40px 20px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .header { background-color: #1e293b; padding: 24px; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .content { padding: 32px; color: #334155; }
        .section { margin-bottom: 24px; }
        .section-title { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
        .data-row { margin-bottom: 8px; font-size: 15px; }
        .data-label { font-weight: 600; color: #475569; width: 120px; display: inline-block; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .badge-indigo { background-color: #e0e7ff; color: #4338ca; }
        .badge-green { background-color: #dcfce7; color: #15803d; }
        .badge-amber { background-color: #fef3c7; color: #92400e; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; }
        .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="main">
          <div class="header">
            <h1>${enrollmentType === 'free_period' ? '🎁 Free Class Registration' : '📢 Course Enrollment Update'}</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Student Details</div>
              <div class="data-row"><span class="data-label">Name:</span> ${fullName}</div>
              <div class="data-row"><span class="data-label">Email:</span> ${studentEmail}</div>
              <div class="data-row"><span class="data-label">Phone:</span> ${phoneNumber || 'N/A'}</div>
              <div class="data-row"><span class="data-label">Location:</span> ${data.country || 'N/A'}</div>
            </div>

            <div class="section">
              <div class="section-title">Academic Info</div>
              <div class="data-row"><span class="data-label">Placement:</span> <span class="badge badge-indigo">${level} Level</span></div>
              <div class="data-row"><span class="data-label">Quiz Score:</span> ${score}/${totalQuestions}</div>
              <div class="data-row"><span class="data-label">Time:</span> ${formattedDate}</div>
            </div>

            <div class="section">
              <div class="section-title">Financial Status</div>
              <div class="data-row"><span class="data-label">Type:</span> ${enrollmentType === 'free_period' ? 'Free Access' : 'Paid Enrollment'}</div>
              <div class="data-row"><span class="data-label">Status:</span> 
                <span class="badge ${paymentStatus === 'completed' ? 'badge-green' : 'badge-amber'}">
                  ${paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                </span>
              </div>
              ${amount ? `<div class="data-row"><span class="data-label">Amount:</span> ${amount} ${currency}</div>` : ''}
              ${transactionId ? `<div class="data-row" style="font-size:12px; color:#94a3b8;"><span class="data-label">TX ID:</span> ${transactionId}</div>` : ''}
            </div>
            
            <div style="background-color:#eff6ff; border-radius:8px; padding:16px; font-size:14px; color:#1d4ed8;">
              ℹ️ Welcome email has been triggered to the student.
            </div>
          </div>
          <div class="footer">
            <p>Roote Ancestral Analytics System • ${new Date().getFullYear()}</p>
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