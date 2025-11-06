const nodemailer = require('nodemailer');

// Configure Mailtrap transporter
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
        ],
        color: "from-green-400 to-blue-400"
      },
      Middle: {
        title: "Middle Yoruba Class",
        description: "Great! You have some Yoruba knowledge. We'll build on your foundation with more complex conversations and grammar.",
        features: [
          "Everyday conversations",
          "Complex sentence structures",
          "Yoruba grammar rules",
          "Reading and writing practice",
          "Cultural proverbs and stories"
        ],
        color: "from-blue-400 to-purple-400"
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
        ],
        color: "from-purple-400 to-indigo-400"
      }
    };

    const levelInfo = levelDescriptions[level] || levelDescriptions.beginner;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .level-card { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 25px; border-radius: 12px; margin-bottom: 30px; }
          .cta-button { background: #4f46e5; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; }
          .features { margin-bottom: 30px; }
          .next-steps { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
              <h1 style="color: #4f46e5; margin: 0;">Welcome to Roote!</h1>
              <p style="color: #6b7280; font-size: 18px; margin: 10px 0 0 0;">Your Yoruba learning journey begins now</p>
            </div>

            <div class="level-card">
              <h2 style="margin: 0 0 10px 0;">${levelInfo.title}</h2>
              <p style="margin: 0; opacity: 0.9;">${levelInfo.description}</p>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Score: ${score}/8</p>
            </div>

            <div class="features">
              <h3 style="color: #4f46e5;">What You'll Learn:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                ${levelInfo.features.map(feature => `<li style="margin-bottom: 8px;">✅ ${feature}</li>`).join('')}
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${wiseUrl}" class="cta-button">
                Create Your Account on Wise.live
              </a>
            </div>

            <div class="next-steps">
              <h4 style="color: #4f46e5; margin-top: 0;">Next Steps:</h4>
              <ol style="color: #374151; line-height: 1.6;">
                <li>Click the button above to create your Wise.live account</li>
                <li>Complete your profile setup</li>
                <li>Access your class materials and schedule</li>
                <li>Start your first Yoruba lesson!</li>
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

module.exports = {
  sendWelcomeEmail
};
