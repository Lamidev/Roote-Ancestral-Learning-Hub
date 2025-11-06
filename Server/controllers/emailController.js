

const nodemailer = require('nodemailer');

// Configure Gmail transporter (requires app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,  
    pass: process.env.GMAIL_APP_PASSWORD   
  }
});

const sendWelcomeEmail = async (data) => {
  try {
    const { studentEmail, fullName, level, wiseUrl, score } = data;

    const levelDescriptions = {
      beginner: {
        title: "Beginner Yoruba Class",
        description: "Perfect for starting your Yoruba journey! You'll learn basic greetings, vocabulary, and simple sentences.",
        features: [
          "Basic greetings and introductions",
          "Essential vocabulary (200+ words)", 
          "Simple sentence structures",
          "Yoruba alphabet and pronunciation",
          "Cultural basics and etiquette"
        ]
      },
      middle: {
        title: "Middle Yoruba Class",
        description: "Great! You have some Yoruba knowledge. We'll build on your foundation with more complex conversations and grammar.",
        features: [
          "Everyday conversations",
          "Complex sentence structures",
          "Yoruba grammar rules",
          "Reading and writing practice",
          "Cultural proverbs and stories"
        ]
      },
      advanced: {
        title: "Advanced Yoruba Class", 
        description: "Excellent! You're ready to master Yoruba with advanced cultural context, idioms, and fluent conversations.",
        features: [
          "Fluent conversations",
          "Advanced grammar and idioms",
          "Yoruba literature and poetry", 
          "Cultural context and history",
          "Teaching methodologies"
        ]
      }
    };

    const levelInfo = levelDescriptions[level] || levelDescriptions.beginner;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Inter', Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-font-smoothing: antialiased;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .card { 
            background: white; 
            border-radius: 16px; 
            padding: 40px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
          }
          .level-card { 
            background: linear-gradient(135deg, #4f46e5, #7c3aed); 
            color: white; 
            padding: 25px; 
            border-radius: 12px; 
            margin-bottom: 30px; 
          }
          .cta-button { 
            background: #4f46e5; 
            color: white; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            display: inline-block;
            font-size: 16px;
            text-align: center;
            border: none;
            cursor: pointer;
            width: 100%;
            max-width: 300px;
            box-sizing: border-box;
          }
          .features { 
            margin-bottom: 30px; 
          }
          .next-steps { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 30px; 
          }
          @media only screen and (max-width: 600px) {
            .container {
              padding: 10px;
            }
            .card {
              padding: 20px;
            }
            .cta-button {
              padding: 14px 24px;
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
              <h1 style="color: #4f46e5; margin: 0; font-size: 28px;">Welcome to Roote!</h1>
              <p style="color: #6b7280; font-size: 18px; margin: 10px 0 0 0;">Your Yoruba learning journey begins now</p>
            </div>

            <div class="level-card">
              <h2 style="margin: 0 0 10px 0; font-size: 24px;">${levelInfo.title}</h2>
              <p style="margin: 0; opacity: 0.9; font-size: 16px;">${levelInfo.description}</p>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Score: ${score}/8</p>
            </div>

            <div class="features">
              <h3 style="color: #4f46e5; margin-bottom: 15px;">What You'll Learn:</h3>
              <ul style="color: #374151; line-height: 1.6; padding-left: 20px;">
                ${levelInfo.features.map(feature => `<li style="margin-bottom: 8px; font-size: 14px;">✅ ${feature}</li>`).join('')}
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${wiseUrl}" class="cta-button" style="color: white; text-decoration: none;">
                Create Your Account on Wise.live
              </a>
            </div>

            <div class="next-steps">
              <h4 style="color: #4f46e5; margin-top: 0; margin-bottom: 15px;">Next Steps:</h4>
              <ol style="color: #374151; line-height: 1.6; padding-left: 20px;">
                <li style="margin-bottom: 8px; font-size: 14px;">Click the button above to create your Wise.live account</li>
                <li style="margin-bottom: 8px; font-size: 14px;">Complete your profile setup</li>
                <li style="margin-bottom: 8px; font-size: 14px;">Access your class materials and schedule</li>
                <li style="margin-bottom: 8px; font-size: 14px;">Start your first Yoruba lesson!</li>
              </ol>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>Need help? Reply to this email or contact us at info@rooteancestrallearninghub.com</p>
              <p style="margin-top: 20px;">We're excited to have you in our community! 🌍</p>
            </div>

            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px;">
                Roote Ancestral Learning Hub<br>
                Winnipeg, Manitoba, Canada
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"Roote Ancestral Learning Hub" <welcome@rooteancestrallearninghub.com>',
      to: studentEmail,
      subject: `🎉 Welcome to Roote! You've been placed in ${levelInfo.title}`,
      html: emailHtml
    });

    return { success: true };

  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error);
    throw error;
  }
};

const sendAdminNotification = async (data) => {
  try {
    const { studentEmail, fullName, level, score, quizResultId, totalQuestions } = data;

    const adminEmail = process.env.ADMIN_EMAIL || 'info@rooteancestrallearninghub.com';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 25px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
          .info-card { background: #f0f9ff; border-left: 4px solid #4f46e5; padding: 20px; margin-bottom: 25px; }
          .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
          .stat-item { background: #f8fafc; padding: 15px; border-radius: 8px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <h1 style="color: #4f46e5; margin: 0; font-size: 24px;">📊 New Quiz Submission</h1>
              <p style="color: #6b7280; margin: 10px 0 0 0;">A student has completed the Yoruba placement assessment</p>
            </div>

            <div class="info-card">
              <h3 style="color: #4f46e5; margin-top: 0;">Student Information</h3>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${studentEmail}</p>
              <p><strong>Assessment ID:</strong> ${quizResultId}</p>
            </div>

            <div class="stats">
              <div class="stat-item">
                <div style="font-size: 24px; color: #4f46e5; font-weight: bold;">${score}/${totalQuestions}</div>
                <div style="color: #6b7280; font-size: 14px;">Final Score</div>
              </div>
              <div class="stat-item">
                <div style="font-size: 24px; color: #4f46e5; font-weight: bold; text-transform: capitalize;">${level}</div>
                <div style="color: #6b7280; font-size: 14px;">Placement Level</div>
              </div>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px;">
              <h4 style="color: #166534; margin-top: 0;">✅ Next Steps Completed:</h4>
              <ul style="color: #166534; margin-bottom: 0;">
                <li>Welcome email sent to student</li>
                <li>Student directed to Wise.live platform</li>
                <li>Quiz result saved to database</li>
              </ul>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; text-align: center;">
                This notification was automatically generated by the Roote Assessment System<br>
                Time: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"Roote Assessment System" <notifications@rooteancestrallearninghub.com>',
      to: adminEmail,
      subject: `📊 New Quiz Submission: ${fullName} - ${level} Level`,
      html: emailHtml
    });

    return { success: true };

  } catch (error) {
    console.error('❌ Error in sendAdminNotification:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification
};