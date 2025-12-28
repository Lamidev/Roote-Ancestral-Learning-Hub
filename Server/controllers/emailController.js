

// const { Resend } = require('resend');
// const resend = new Resend(process.env.RESEND_API_KEY);

// const courseIds = {
//   beginner: "643218529",
//   middle: "968954470", 
//   advanced: "179756668"
// };

// const instituteCode = "roote-ancestral-learning";

// const levelTitles = {
//   beginner: "Yoruba Beginner Level - Roote Ancestral",
//   middle: "Yoruba Middle Level - Roote Ancestral",
//   advanced: "Yoruba Advanced Level - Roote Ancestral"
// };

// const sendWelcomeEmail = async (data) => {
//   try {
//     const { studentEmail, fullName, level, wiseUrl, score, courseId, instituteCode, paymentConfirmed } = data;

//     console.log('📧 Sending welcome email with score:', score, 'for:', studentEmail);

//     const levelDescriptions = {
//       beginner: {
//         title: "Beginner Yoruba Class",
//         description: "Perfect for starting your Yoruba journey! You'll learn basic greetings, vocabulary, and simple sentences.",
//         features: [
//           "Basic greetings and introductions",
//           "Essential vocabulary (200+ words)", 
//           "Simple sentence structures",
//           "Yoruba alphabet and pronunciation",
//           "Cultural basics and etiquette"
//         ]
//       },
//       middle: {
//         title: "Middle Yoruba Class",
//         description: "Great! You have some Yoruba knowledge. We'll build on your foundation with more complex conversations and grammar.",
//         features: [
//           "Everyday conversations",
//           "Complex sentence structures",
//           "Yoruba grammar rules",
//           "Reading and writing practice",
//           "Cultural proverbs and stories"
//         ]
//       },
//       advanced: {
//         title: "Advanced Yoruba Class", 
//         description: "Excellent! You're ready to master Yoruba with advanced cultural context, idioms, and fluent conversations.",
//         features: [
//           "Fluent conversations",
//           "Advanced grammar and idioms",
//           "Yoruba literature and poetry", 
//           "Cultural context and history",
//           "Teaching methodologies"
//         ]
//       }
//     };

//     const levelInfo = levelDescriptions[level] || levelDescriptions.beginner;
//     const studentCourseId = courseId || courseIds[level] || courseIds.beginner;
//     const studentInstituteCode = instituteCode || "roote-ancestral-learning";

//     const paymentSection = paymentConfirmed ? `
//       <div style="background:#ecfdf5; border:2px solid #10b981; padding:20px; border-radius:12px; margin-bottom:25px;">
//         <div style="display:flex; align-items:center; margin-bottom:10px;">
//           <div style="font-size:24px; margin-right:10px;">✅</div>
//           <h3 style="color:#065f46; margin:0; font-size:20px;">Payment Confirmed!</h3>
//         </div>
//         <p style="color:#065f46; margin:0;">Your payment of CAD 100 has been processed successfully. Your course access is now activated!</p>
//       </div>
//     ` : `
//       <div style="background:#fef3c7; border:2px solid #f59e0b; padding:20px; border-radius:12px; margin-bottom:25px; text-align:center;">
//         <h3 style="color:#92400e; margin:0 0 10px 0; font-size:20px;">💳 Payment Required</h3>
//         <p style="color:#92400e; margin:0 0 15px 0; opacity:0.9;">Complete your payment to access your ${levelInfo.title}</p>
//         <a href="${wiseUrl}" style="background:#f59e0b; color:white; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;">
//           Pay CAD 100 Now
//         </a>
//       </div>
//     `;

//     const codesSection = paymentConfirmed ? `
//       <div class="enrollment-codes">
//         <h3 style="color:#4f46e5; margin:0 0 15px 0; text-align:center; font-size:22px;">🎯 Your Activated Enrollment Codes</h3>
//         <div class="code-grid">
//           <div class="code-item">
//             <h4 style="color:#4f46e5; margin:0 0 10px 0; font-size:16px;">🏛️ Institute Code</h4>
//             <div style="font-size:18px; font-weight:bold; color:#4f46e5; background:#f8fafc; padding:12px; border-radius:6px;">
//               ${studentInstituteCode}
//             </div>
//             <p style="color:#6b7280; margin:10px 0 0 0; font-size:12px;">Use this first in the app</p>
//           </div>
//           <div class="code-item">
//             <h4 style="color:#7c3aed; margin:0 0 10px 0; font-size:16px;">📚 Course ID</h4>
//             <div style="font-size:18px; font-weight:bold; color:#7c3aed; background:#f8fafc; padding:12px; border-radius:6px;">
//               ${studentCourseId}
//             </div>
//             <p style="color:#6b7280; margin:10px 0 0 0; font-size:12px;">Use this after Institute Code</p>
//           </div>
//         </div>
//       </div>
//     ` : `
//       <div class="enrollment-codes" style="background:#f3f4f6; border:2px dashed #9ca3af;">
//         <h3 style="color:#6b7280; margin:0 0 15px 0; text-align:center; font-size:22px;">🔒 Your Enrollment Codes</h3>
//         <p style="color:#6b7280; text-align:center; margin-bottom:20px;">
//           These codes will be activated after payment completion
//         </p>
//         <div class="code-grid">
//           <div class="code-item" style="opacity:0.7;">
//             <h4 style="color:#6b7280; margin:0 0 10px 0; font-size:16px;">🏛️ Institute Code</h4>
//             <div style="font-size:18px; font-weight:bold; color:#6b7280; background:#f8fafc; padding:12px; border-radius:6px;">
//               ${studentInstituteCode}
//             </div>
//             <p style="color:#9ca3af; margin:10px 0 0 0; font-size:12px;">Activated after payment</p>
//           </div>
//           <div class="code-item" style="opacity:0.7;">
//             <h4 style="color:#6b7280; margin:0 0 10px 0; font-size:16px;">📚 Course ID</h4>
//             <div style="font-size:18px; font-weight:bold; color:#6b7280; background:#f8fafc; padding:12px; border-radius:6px;">
//               ${studentCourseId}
//             </div>
//             <p style="color:#9ca3af; margin:10px 0 0 0; font-size:12px;">Activated after payment</p>
//           </div>
//         </div>
//       </div>
//     `;

//     const ctaButton = paymentConfirmed ? `
//       <div style="text-align:center; margin:30px 0;">
//         <a href="https://roote-ancestral-learning.wise.live/download" class="cta-button">Download Roote Ancestral Learning Hub App</a>
//       </div>
//     ` : `
//       <div style="text-align:center; margin:30px 0;">
//         <a href="${wiseUrl}" class="cta-button" style="background:#f59e0b;">💳 Complete Payment (CAD 100)</a>
//       </div>
//     `;

//     const nextSteps = paymentConfirmed ? `
//       <div class="next-steps">
//         <h4 style="color:#4f46e5; margin-top:0; margin-bottom:20px; font-size:18px;">📱 App Setup Steps:</h4>
//         <ol style="color:#374151; line-height:1.8; padding-left:20px;">
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 1:</strong> Download the Roote Ancestral Learning Hub App using the button above
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 2:</strong> Open the app and enter Institute Code: 
//             <span style="background:#4f46e5; color:white; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:14px;">${studentInstituteCode}</span>
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 3:</strong> Create your account with email: <strong>${studentEmail}</strong>
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 4:</strong> When prompted, enter Course ID: 
//             <span style="background:#7c3aed; color:white; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:14px;">${studentCourseId}</span>
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 5:</strong> You'll be enrolled in your <strong>${levelInfo.title}</strong>
//           </li>
//         </ol>
//       </div>
//     ` : `
//       <div class="next-steps">
//         <h4 style="color:#4f46e5; margin-top:0; margin-bottom:20px; font-size:18px;">📋 Complete Your Enrollment:</h4>
//         <ol style="color:#374151; line-height:1.8; padding-left:20px;">
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 1:</strong> Complete your payment of CAD 100 using the button above
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 2:</strong> After payment, you'll receive a confirmation email with activated codes
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 3:</strong> Download the Roote Ancestral Learning Hub App
//           </li>
//           <li style="margin-bottom:12px; font-size:15px;">
//             <strong>Step 4:</strong> Use your Institute Code and Course ID to access your class
//           </li>
//         </ol>
//       </div>
//     `;

//     const emailSubject = paymentConfirmed 
//       ? `🎉 Welcome to Roote! Your ${levelInfo.title} is Activated` 
//       : `🎉 Welcome to Roote! Complete Payment for ${levelInfo.title}`;

//     const emailHtml = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         body { font-family: 'Inter', Arial, sans-serif; margin:0; padding:0; background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
//         .container { max-width:600px; margin:0 auto; padding:20px; }
//         .card { background:white; border-radius:16px; padding:40px; box-shadow:0 10px 30px rgba(0,0,0,0.1); }
//         .header { text-align:center; margin-bottom:30px; }
//         .level-card { background:linear-gradient(135deg,#4f46e5,#7c3aed); color:white; padding:25px; border-radius:12px; margin-bottom:30px; }
//         .enrollment-codes { background:#f0f9ff; border:2px solid #4f46e5; padding:25px; border-radius:12px; margin:25px 0; }
//         .code-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
//         .code-item { background:white; padding:20px; border-radius:8px; border:1px solid #4f46e5; text-align:center; }
//         .cta-button { background:#4f46e5; color:white; padding:16px 32px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block; font-size:16px; text-align:center; border:none; cursor:pointer; width:100%; max-width:300px; box-sizing:border-box; }
//         .features { margin-bottom:30px; }
//         .next-steps { background:#f8fafc; padding:25px; border-radius:8px; margin-bottom:30px; }
//         @media only screen and (max-width:600px){ 
//           .container{padding:10px;} 
//           .card{padding:20px;} 
//           .cta-button{padding:14px 24px; font-size:14px;}
//           .code-grid { grid-template-columns:1fr; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="card">
//           <div class="header">
//             <div style="font-size:48px; margin-bottom:20px;">🎉</div>
//             <h1 style="color:#4f46e5; margin:0; font-size:28px;">
//               ${paymentConfirmed ? 'Welcome to Roote!' : 'Almost There!'}
//             </h1>
//             <p style="color:#6b7280; font-size:18px; margin:10px 0 0 0;">
//               ${paymentConfirmed ? 'Your Yoruba learning journey begins now!' : 'Complete payment to start your Yoruba journey'}
//             </p>
//           </div>

//           ${paymentSection}

//           <div class="level-card">
//             <h2 style="margin:0 0 10px 0; font-size:24px;">${levelInfo.title}</h2>
//             <p style="margin:0; opacity:0.9; font-size:16px;">${levelInfo.description}</p>
//             <p style="margin:10px 0 0 0; opacity:0.9; font-size:16px;">Score: ${score}/8</p>
//           </div>

//           ${codesSection}

//           <div class="features">
//             <h3 style="color:#4f46e5; margin-bottom:15px;">What You'll Learn:</h3>
//             <ul style="color:#374151; line-height:1.6; padding-left:20px;">
//               ${levelInfo.features.map(f => `<li style="margin-bottom:8px; font-size:14px;">✅ ${f}</li>`).join('')}
//             </ul>
//           </div>

//           ${ctaButton}

//           ${nextSteps}
            
//           <div style="background:#ecfdf5; border:1px solid #a7f3d0; padding:15px; border-radius:6px; margin-top:15px;">
//             <p style="color:#065f46; margin:0; font-size:14px;">
//               💡 <strong>Pro Tip:</strong> Save this email or take screenshots of both codes for easy reference during setup!
//             </p>
//           </div>

//           <div style="text-align:center; color:#6b7280; font-size:14px;">
//             <p>Need help? Reply to this email or contact us at admin@rooteancestrallearninghub.com</p>
//             <p style="margin-top:20px;">We're excited to have you in our community! 🌍</p>
//           </div>

//           <div style="border-top:1px solid #e5e7eb; padding-top:20px; margin-top:30px; text-align:center;">
//             <p style="color:#9ca3af; font-size:12px;">Roote Ancestral Learning Hub<br>Winnipeg, Manitoba, Canada</p>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;

//     const { data: emailData, error } = await resend.emails.send({
//       from: 'Roote Ancestral Learning Hub <contact@updates.rooteancestrallearninghub.com>',
//       to: studentEmail,
//       reply_to: 'admin@rooteancestrallearninghub.com',
//       subject: emailSubject,
//       html: emailHtml,
//       tags: [
//         { name: 'category', value: 'welcome_email' },
//         { name: 'student_level', value: level },
//         { name: 'payment_status', value: paymentConfirmed ? 'paid' : 'pending' }
//       ]
//     });

//     if (error) throw error;

//     console.log('✅ Welcome email sent. Payment Status:', paymentConfirmed ? 'PAID' : 'PENDING', 'Score:', score);
//     return { success: true, emailId: emailData?.id };

//   } catch (error) {
//     console.error('❌ Error in sendWelcomeEmail:', error);
//     throw error;
//   }
// };

// const sendAdminNotification = async (data) => {
//   try {
//     const { studentEmail, fullName, level, score, quizResultId, totalQuestions, courseId, instituteCode, paymentStatus, transactionId, amount, currency } = data;

//     console.log('📧 Sending admin notification with score:', score, 'for:', studentEmail);

//     const paymentInfo = paymentStatus === 'completed' ? `
//       <div style="background:#ecfdf5; border:2px solid #10b981; padding:15px; border-radius:8px; margin-bottom:20px;">
//         <h4 style="color:#065f46; margin:0; font-size:16px;">✅ Payment Completed</h4>
//         <p style="color:#065f46; margin:5px 0 0 0; font-size:14px;">Amount: ${amount} ${currency} | Transaction: ${transactionId}</p>
//       </div>
//     ` : `
//       <div style="background:#fef3c7; border:2px solid #f59e0b; padding:15px; border-radius:8px; margin-bottom:20px;">
//         <h4 style="color:#92400e; margin:0; font-size:16px;">💳 Payment Pending</h4>
//         <p style="color:#92400e; margin:5px 0 0 0; font-size:14px;">Student needs to complete payment to access course</p>
//       </div>
//     `;

//     const emailHtml = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <style>
//         body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
//         .container { max-width:600px; margin:auto; padding:20px; }
//         .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
//         .header { text-align:center; margin-bottom:25px; border-bottom:2px solid #4f46e5; padding-bottom:20px; }
//         .info-card { background:#f0f9ff; border-left:4px solid #4f46e5; padding:20px; margin-bottom:25px; }
//         .stats { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:25px; }
//         .stat-item { background:#f8fafc; padding:15px; border-radius:8px; text-align:center; }
//         .course-info { background:#f0fdf4; border:1px solid #bbf7d0; padding:15px; border-radius:8px; margin-bottom:25px; }
//         .codes-grid { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:20px 0; }
//         .code-display { background:white; padding:15px; border-radius:8px; border:1px solid #e5e7eb; text-align:center; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="card">
//           <div class="header">
//             <h1 style="color:#4f46e5; margin:0; font-size:24px;">📊 ${paymentStatus === 'completed' ? 'Payment Completed' : 'New Quiz Submission'}</h1>
//             <p style="color:#6b7280; margin:10px 0 0 0;">${paymentStatus === 'completed' ? 'Student has completed payment and gained course access' : 'A student has completed the Yoruba placement assessment'}</p>
//           </div>

//           ${paymentInfo}

//           <div class="info-card">
//             <h3 style="color:#4f46e5; margin-top:0;">Student Information</h3>
//             <p><strong>Name:</strong> ${fullName}</p>
//             <p><strong>Email:</strong> ${studentEmail}</p>
//             <p><strong>Assessment ID:</strong> ${quizResultId}</p>
//             ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
//           </div>

//           <div class="stats">
//             <div class="stat-item">
//               <div style="font-size:24px; color:#4f46e5; font-weight:bold;">${score}/${totalQuestions}</div>
//               <div style="color:#6b7280; font-size:14px;">Final Score</div>
//             </div>
//             <div class="stat-item">
//               <div style="font-size:24px; color:#4f46e5; font-weight:bold; text-transform:capitalize;">${level}</div>
//               <div style="color:#6b7280; font-size:14px;">Placement Level</div>
//             </div>
//           </div>

//           <div class="course-info">
//             <h4 style="color:#166534; margin-top:0;">🎯 Enrollment Codes ${paymentStatus === 'completed' ? 'Activated' : 'Assigned'}:</h4>
//             <div class="codes-grid">
//               <div class="code-display">
//                 <strong>Institute Code</strong>
//                 <div style="font-size:18px; color:#4f46e5; font-weight:bold; margin-top:5px;">${instituteCode}</div>
//               </div>
//               <div class="code-display">
//                 <strong>Course ID</strong>
//                 <div style="font-size:18px; color:#7c3aed; font-weight:bold; margin-top:5px;">${courseId}</div>
//               </div>
//             </div>
//             <p style="color:#166534; margin:10px 0 0 0; font-size:14px;">
//               <strong>Payment Status:</strong> ${paymentStatus === 'completed' ? 'Completed ✅' : 'Pending 💳'}
//             </p>
//           </div>

//           <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:15px; border-radius:8px;">
//             <h4 style="color:#166534; margin-top:0;">✅ ${paymentStatus === 'completed' ? 'Completed Actions' : 'Next Steps Required'}:</h4>
//             <ul style="color:#166534; margin-bottom:0;">
//               <li>Welcome email sent to student</li>
//               <li>Student ${paymentStatus === 'completed' ? 'has completed payment' : 'needs to complete payment'}</li>
//               <li>Quiz result saved to database</li>
//               ${paymentStatus === 'completed' ? '<li>Course access activated</li>' : ''}
//               ${amount ? `<li>Payment amount: ${amount} ${currency}</li>` : ''}
//             </ul>
//           </div>

//           <div style="margin-top:25px; padding-top:20px; border-top:1px solid #e5e7eb;">
//             <p style="color:#6b7280; font-size:14px; text-align:center;">
//               This notification was automatically generated by the Roote Assessment System<br>
//               Time: ${new Date().toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;

//     const emailSubject = paymentStatus === 'completed' 
//       ? `✅ Payment Completed: ${fullName} - ${level} Level` 
//       : `📊 New Quiz Submission: ${fullName} - ${level} Level`;

//     const { data: emailData, error } = await resend.emails.send({
//       from: 'Roote Assessment System <contact@updates.rooteancestrallearninghub.com>',
//       to: process.env.ADMIN_EMAIL,
//       subject: emailSubject,
//       html: emailHtml,
//       tags: [
//         { name: 'category', value: 'admin_notification' }
//       ]
//     });

//     if (error) throw error;
//     console.log('✅ Admin notification sent. Email ID:', emailData?.id, 'Score:', score);

//   } catch (error) {
//     console.error('❌ Error in sendAdminNotification:', error);
//     throw error;
//   }
// };

// module.exports = {
//   sendWelcomeEmail,
//   sendAdminNotification,
//   courseIds,
//   instituteCode
// };


const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const courseIds = {
  beginner: "643218529",
  middle: "968954470", 
  advanced: "179756668"
};

const instituteCode = "roote-ancestral-learning";

const levelTitles = {
  beginner: "Yoruba Beginner Level - Roote Ancestral",
  middle: "Yoruba Middle Level - Roote Ancestral",
  advanced: "Yoruba Advanced Level - Roote Ancestral"
};

const sendWelcomeEmail = async (data) => {
  try {
    const { studentEmail, fullName, level, wiseUrl, score, courseId, instituteCode, paymentConfirmed, freePeriodActive = false } = data;

    console.log('📧 Sending welcome email with score:', score, 'for:', studentEmail, 'Free Period Active:', freePeriodActive);

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
    const studentCourseId = courseId || courseIds[level] || courseIds.beginner;
    const studentInstituteCode = instituteCode || "roote-ancestral-learning";

    let paymentSection = '';
    if (freePeriodActive) {
      paymentSection = `
        <div style="background:#ecfdf5; border:2px solid #10b981; padding:20px; border-radius:12px; margin-bottom:25px;">
          <div style="display:flex; align-items:center; margin-bottom:10px;">
            <div style="font-size:24px; margin-right:10px;">🎉</div>
            <h3 style="color:#065f46; margin:0; font-size:20px;">Free Class Access Granted!</h3>
          </div>
          <p style="color:#065f46; margin:0;">
            You have been granted <strong>free access</strong> to the <strong>January 3rd, 2026 Yoruba Class at 12 PM CST</strong>. 
            No payment is required for this special free class!
          </p>
        </div>
      `;
    } else if (paymentConfirmed) {
      paymentSection = `
        <div style="background:#ecfdf5; border:2px solid #10b981; padding:20px; border-radius:12px; margin-bottom:25px;">
          <div style="display:flex; align-items:center; margin-bottom:10px;">
            <div style="font-size:24px; margin-right:10px;">✅</div>
            <h3 style="color:#065f46; margin:0; font-size:20px;">Payment Confirmed!</h3>
          </div>
          <p style="color:#065f46; margin:0;">Your payment of CAD 100 has been processed successfully. Your course access is now activated!</p>
        </div>
      `;
    } else {
      paymentSection = `
        <div style="background:#fef3c7; border:2px solid #f59e0b; padding:20px; border-radius:12px; margin-bottom:25px; text-align:center;">
          <h3 style="color:#92400e; margin:0 0 10px 0; font-size:20px;">💳 Payment Required</h3>
          <p style="color:#92400e; margin:0 0 15px 0; opacity:0.9;">Complete your payment to access your ${levelInfo.title}</p>
          <a href="${wiseUrl}" style="background:#f59e0b; color:white; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;">
            Pay CAD 100 Now
          </a>
        </div>
      `;
    }

    const codesSection = paymentConfirmed || freePeriodActive ? `
      <div class="enrollment-codes">
        <h3 style="color:#4f46e5; margin:0 0 15px 0; text-align:center; font-size:22px;">🎯 Your Activated Enrollment Codes</h3>
        <div class="code-grid">
          <div class="code-item">
            <h4 style="color:#4f46e5; margin:0 0 10px 0; font-size:16px;">🏛️ Institute Code</h4>
            <div style="font-size:18px; font-weight:bold; color:#4f46e5; background:#f8fafc; padding:12px; border-radius:6px;">
              ${studentInstituteCode}
            </div>
            <p style="color:#6b7280; margin:10px 0 0 0; font-size:12px;">Use this first in the app</p>
          </div>
          <div class="code-item">
            <h4 style="color:#7c3aed; margin:0 0 10px 0; font-size:16px;">📚 Course ID</h4>
            <div style="font-size:18px; font-weight:bold; color:#7c3aed; background:#f8fafc; padding:12px; border-radius:6px;">
              ${studentCourseId}
            </div>
            <p style="color:#6b7280; margin:10px 0 0 0; font-size:12px;">Use this after Institute Code</p>
          </div>
        </div>
      </div>
    ` : `
      <div class="enrollment-codes" style="background:#f3f4f6; border:2px dashed #9ca3af;">
        <h3 style="color:#6b7280; margin:0 0 15px 0; text-align:center; font-size:22px;">🔒 Your Enrollment Codes</h3>
        <p style="color:#6b7280; text-align:center; margin-bottom:20px;">
          These codes will be activated after payment completion
        </p>
        <div class="code-grid">
          <div class="code-item" style="opacity:0.7;">
            <h4 style="color:#6b7280; margin:0 0 10px 0; font-size:16px;">🏛️ Institute Code</h4>
            <div style="font-size:18px; font-weight:bold; color:#6b7280; background:#f8fafc; padding:12px; border-radius:6px;">
              ${studentInstituteCode}
            </div>
            <p style="color:#9ca3af; margin:10px 0 0 0; font-size:12px;">Activated after payment</p>
          </div>
          <div class="code-item" style="opacity:0.7;">
            <h4 style="color:#6b7280; margin:0 0 10px 0; font-size:16px;">📚 Course ID</h4>
            <div style="font-size:18px; font-weight:bold; color:#6b7280; background:#f8fafc; padding:12px; border-radius:6px;">
              ${studentCourseId}
            </div>
            <p style="color:#9ca3af; margin:10px 0 0 0; font-size:12px;">Activated after payment</p>
          </div>
        </div>
      </div>
    `;

    const ctaButton = paymentConfirmed || freePeriodActive ? `
      <div style="text-align:center; margin:30px 0;">
        <a href="https://roote-ancestral-learning.wise.live/download" 
           class="cta-button"
           style="background:#4f46e5; color:#ffffff !important; padding:16px 32px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block; font-size:16px; text-align:center; border:2px solid #3730a3; width:100%; max-width:300px; box-sizing:border-box;">
          📲 Download Roote Ancestral Learning Hub App
        </a>
      </div>
    ` : `
      <div style="text-align:center; margin:30px 0;">
        <a href="${wiseUrl}" 
           class="cta-button"
           style="background:#f59e0b; color:#ffffff !important; padding:16px 32px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block; font-size:16px; text-align:center; border:2px solid #d97706; width:100%; max-width:300px; box-sizing:border-box;">
          💳 Complete Payment (CAD 100)
        </a>
      </div>
    `;

    const nextSteps = paymentConfirmed || freePeriodActive ? `
      <div class="next-steps">
        <h4 style="color:#4f46e5; margin-top:0; margin-bottom:20px; font-size:18px;">📱 App Setup Steps:</h4>
        <ol style="color:#374151; line-height:1.8; padding-left:20px;">
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 1:</strong> Download the Roote Ancestral Learning Hub App using the button above
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 2:</strong> Open the app and enter Institute Code: 
            <span style="background:#4f46e5; color:white; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:14px;">${studentInstituteCode}</span>
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 3:</strong> Create your account with email: <strong>${studentEmail}</strong>
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 4:</strong> When prompted, enter Course ID: 
            <span style="background:#7c3aed; color:white; padding:4px 8px; border-radius:4px; font-weight:bold; font-size:14px;">${studentCourseId}</span>
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 5:</strong> You'll be enrolled in your <strong>${levelInfo.title}</strong>
          </li>
        </ol>
      </div>
    ` : `
      <div class="next-steps">
        <h4 style="color:#4f46e5; margin-top:0; margin-bottom:20px; font-size:18px;">📋 Complete Your Enrollment:</h4>
        <ol style="color:#374151; line-height:1.8; padding-left:20px;">
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 1:</strong> Complete your payment of CAD 100 using the button above
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 2:</strong> After payment, you'll receive a confirmation email with activated codes
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 3:</strong> Download the Roote Ancestral Learning Hub App
          </li>
          <li style="margin-bottom:12px; font-size:15px;">
            <strong>Step 4:</strong> Use your Institute Code and Course ID to access your class
          </li>
        </ol>
      </div>
    `;

    let emailSubject = '';
    if (freePeriodActive) {
      emailSubject = `🎉 Free Class Access - Welcome to ${levelInfo.title} (January 3rd, 2026 at 12 PM CST)`;
    } else if (paymentConfirmed) {
      emailSubject = `🎉 Welcome to Roote! Your ${levelInfo.title} is Activated`;
    } else {
      emailSubject = `🎉 Welcome to Roote! Complete Payment for ${levelInfo.title}`;
    }

    const freePeriodNotice = freePeriodActive ? `
      <div style="background:#dbeafe; border:2px solid #3b82f6; padding:15px; border-radius:8px; margin:20px 0;">
        <h4 style="color:#1e40af; margin:0; font-size:16px;">📅 Class Details:</h4>
        <p style="color:#1e40af; margin:5px 0 0 0; font-size:14px;">
          <strong>Date:</strong> January 3rd, 2026<br>
          <strong>Time:</strong> 12:00 PM CST (Central Standard Time)<br>
          <strong>Access:</strong> You can access the course materials immediately in the app
        </p>
      </div>
    ` : '';

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin:0; padding:0; background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
        .container { max-width:600px; margin:0 auto; padding:20px; }
        .card { background:white; border-radius:16px; padding:40px; box-shadow:0 10px 30px rgba(0,0,0,0.1); }
        .header { text-align:center; margin-bottom:30px; }
        .level-card { background:linear-gradient(135deg,#4f46e5,#7c3aed); color:white; padding:25px; border-radius:12px; margin-bottom:30px; }
        .enrollment-codes { background:#f0f9ff; border:2px solid #4f46e5; padding:25px; border-radius:12px; margin:25px 0; }
        .code-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
        .code-item { background:white; padding:20px; border-radius:8px; border:1px solid #4f46e5; text-align:center; }
        .cta-button { 
          background:#4f46e5; 
          color:#ffffff !important; 
          padding:16px 32px; 
          text-decoration:none; 
          border-radius:8px; 
          font-weight:bold; 
          display:inline-block; 
          font-size:16px; 
          text-align:center; 
          border:2px solid #3730a3; 
          cursor:pointer; 
          width:100%; 
          max-width:300px; 
          box-sizing:border-box; 
        }
        .cta-button:hover {
          opacity:0.9;
          transform:translateY(-2px);
          box-shadow:0 6px 12px rgba(0,0,0,0.15);
          transition:all 0.3s ease;
        }
        .features { margin-bottom:30px; }
        .next-steps { background:#f8fafc; padding:25px; border-radius:8px; margin-bottom:30px; }
        @media only screen and (max-width:600px){ 
          .container{padding:10px;} 
          .card{padding:20px;} 
          .cta-button{padding:14px 24px; font-size:14px;}
          .code-grid { grid-template-columns:1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <div style="font-size:48px; margin-bottom:20px;">${freePeriodActive ? '🎉' : (paymentConfirmed ? '🎉' : '📝')}</div>
            <h1 style="color:#4f46e5; margin:0; font-size:28px;">
              ${freePeriodActive ? 'Free Class Access Granted!' : (paymentConfirmed ? 'Welcome to Roote!' : 'Almost There!')}
            </h1>
            <p style="color:#6b7280; font-size:18px; margin:10px 0 0 0;">
              ${freePeriodActive ? 'You have been enrolled in our free January 3rd, 2026 Yoruba class!' : (paymentConfirmed ? 'Your Yoruba learning journey begins now!' : 'Complete payment to start your Yoruba journey')}
            </p>
          </div>

          ${paymentSection}

          <div class="level-card">
            <h2 style="margin:0 0 10px 0; font-size:24px;">${levelInfo.title}</h2>
            <p style="margin:0; opacity:0.9; font-size:16px;">${levelInfo.description}</p>
            <p style="margin:10px 0 0 0; opacity:0.9; font-size:16px;">Score: ${score}/8</p>
          </div>

          ${freePeriodNotice}

          ${codesSection}

          <div class="features">
            <h3 style="color:#4f46e5; margin-bottom:15px;">What You'll Learn:</h3>
            <ul style="color:#374151; line-height:1.6; padding-left:20px;">
              ${levelInfo.features.map(f => `<li style="margin-bottom:8px; font-size:14px;">✅ ${f}</li>`).join('')}
            </ul>
          </div>

          ${ctaButton}

          ${nextSteps}
            
          <div style="background:#ecfdf5; border:1px solid #a7f3d0; padding:15px; border-radius:6px; margin-top:15px;">
            <p style="color:#065f46; margin:0; font-size:14px;">
              💡 <strong>Pro Tip:</strong> Save this email or take screenshots of both codes for easy reference during setup!
            </p>
          </div>

          <div style="text-align:center; color:#6b7280; font-size:14px;">
            <p>Need help? Reply to this email or contact us at admin@rooteancestrallearninghub.com</p>
            <p style="margin-top:20px;">We're excited to have you in our community! 🌍</p>
          </div>

          <div style="border-top:1px solid #e5e7eb; padding-top:20px; margin-top:30px; text-align:center;">
            <p style="color:#9ca3af; font-size:12px;">Roote Ancestral Learning Hub<br>Winnipeg, Manitoba, Canada</p>
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
      subject: emailSubject,
      html: emailHtml,
      tags: [
        { name: 'category', value: 'welcome_email' },
        { name: 'student_level', value: level },
        { name: 'payment_status', value: paymentConfirmed ? 'paid' : 'pending' },
        { name: 'free_period', value: freePeriodActive ? 'yes' : 'no' }
      ]
    });

    if (error) throw error;

    console.log('✅ Welcome email sent. Free Period Active:', freePeriodActive, 'Payment Status:', paymentConfirmed ? 'PAID' : 'PENDING', 'Score:', score);
    return { success: true, emailId: emailData?.id };

  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error);
    throw error;
  }
};

const sendAdminNotification = async (data) => {
  try {
    const { studentEmail, fullName, level, score, quizResultId, totalQuestions, courseId, instituteCode, paymentStatus, transactionId, amount, currency, enrollmentType } = data;

    console.log('📧 Sending admin notification with score:', score, 'for:', studentEmail);

    let paymentInfo = '';
    if (enrollmentType === 'free_period') {
      paymentInfo = `
        <div style="background:#ecfdf5; border:2px solid #10b981; padding:15px; border-radius:8px; margin-bottom:20px;">
          <h4 style="color:#065f46; margin:0; font-size:16px;">🎉 Free Class Enrollment</h4>
          <p style="color:#065f46; margin:5px 0 0 0; font-size:14px;">Student enrolled for free January 3rd, 2026 class (Register today until Jan 3rd)</p>
        </div>
      `;
    } else if (paymentStatus === 'completed') {
      paymentInfo = `
        <div style="background:#ecfdf5; border:2px solid #10b981; padding:15px; border-radius:8px; margin-bottom:20px;">
          <h4 style="color:#065f46; margin:0; font-size:16px;">✅ Payment Completed</h4>
          <p style="color:#065f46; margin:5px 0 0 0; font-size:14px;">Amount: ${amount} ${currency} | Transaction: ${transactionId}</p>
        </div>
      `;
    } else {
      paymentInfo = `
        <div style="background:#fef3c7; border:2px solid #f59e0b; padding:15px; border-radius:8px; margin-bottom:20px;">
          <h4 style="color:#92400e; margin:0; font-size:16px;">💳 Payment Pending</h4>
          <p style="color:#92400e; margin:5px 0 0 0; font-size:14px;">Student needs to complete payment to access course</p>
        </div>
      `;
    }

    let emailSubject = '';
    if (enrollmentType === 'free_period') {
      emailSubject = `🎉 Free Class Enrollment: ${fullName} - ${level} Level (Jan 3rd, 2026)`;
    } else if (paymentStatus === 'completed') {
      emailSubject = `✅ Payment Completed: ${fullName} - ${level} Level`;
    } else {
      emailSubject = `📊 New Quiz Submission: ${fullName} - ${level} Level`;
    }

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
        .container { max-width:600px; margin:auto; padding:20px; }
        .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align:center; margin-bottom:25px; border-bottom:2px solid #4f46e5; padding-bottom:20px; }
        .info-card { background:#f0f9ff; border-left:4px solid #4f46e5; padding:20px; margin-bottom:25px; }
        .stats { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:25px; }
        .stat-item { background:#f8fafc; padding:15px; border-radius:8px; text-align:center; }
        .course-info { background:#f0fdf4; border:1px solid #bbf7d0; padding:15px; border-radius:8px; margin-bottom:25px; }
        .codes-grid { display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:20px 0; }
        .code-display { background:white; padding:15px; border-radius:8px; border:1px solid #e5e7eb; text-align:center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1 style="color:#4f46e5; margin:0; font-size:24px;">${enrollmentType === 'free_period' ? '🎉 Free Class Enrollment' : (paymentStatus === 'completed' ? 'Payment Completed' : 'New Quiz Submission')}</h1>
            <p style="color:#6b7280; margin:10px 0 0 0;">${enrollmentType === 'free_period' ? 'Student enrolled for free January 3rd, 2026 class (Register today until Jan 3rd)' : (paymentStatus === 'completed' ? 'Student has completed payment and gained course access' : 'A student has completed the Yoruba placement assessment')}</p>
          </div>

          ${paymentInfo}

          <div class="info-card">
            <h3 style="color:#4f46e5; margin-top:0;">Student Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${studentEmail}</p>
            <p><strong>Assessment ID:</strong> ${quizResultId}</p>
            ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
            <p><strong>Enrollment Type:</strong> ${enrollmentType === 'free_period' ? 'Free Class (Jan 3rd, 2026 at 12 PM CST)' : 'Regular'}</p>
          </div>

          <div class="stats">
            <div class="stat-item">
              <div style="font-size:24px; color:#4f46e5; font-weight:bold;">${score}/${totalQuestions}</div>
              <div style="color:#6b7280; font-size:14px;">Final Score</div>
            </div>
            <div class="stat-item">
              <div style="font-size:24px; color:#4f46e5; font-weight:bold; text-transform:capitalize;">${level}</div>
              <div style="color:#6b7280; font-size:14px;">Placement Level</div>
            </div>
          </div>

          <div class="course-info">
            <h4 style="color:#166534; margin-top:0;">🎯 Enrollment Codes ${paymentStatus === 'completed' || enrollmentType === 'free_period' ? 'Activated' : 'Assigned'}:</h4>
            <div class="codes-grid">
              <div class="code-display">
                <strong>Institute Code</strong>
                <div style="font-size:18px; color:#4f46e5; font-weight:bold; margin-top:5px;">${instituteCode}</div>
              </div>
              <div class="code-display">
                <strong>Course ID</strong>
                <div style="font-size:18px; color:#7c3aed; font-weight:bold; margin-top:5px;">${courseId}</div>
              </div>
            </div>
            <p style="color:#166534; margin:10px 0 0 0; font-size:14px;">
              <strong>Payment Status:</strong> ${paymentStatus === 'completed' ? 'Completed ✅' : (enrollmentType === 'free_period' ? 'Free Class Access 🎉' : 'Pending 💳')}
            </p>
          </div>

          <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:15px; border-radius:8px;">
            <h4 style="color:#166534; margin-top:0;">✅ ${paymentStatus === 'completed' || enrollmentType === 'free_period' ? 'Completed Actions' : 'Next Steps Required'}:</h4>
            <ul style="color:#166534; margin-bottom:0;">
              <li>Welcome email sent to student</li>
              <li>Student ${paymentStatus === 'completed' || enrollmentType === 'free_period' ? 'has access to course' : 'needs to complete payment'}</li>
              <li>Quiz result saved to database</li>
              ${paymentStatus === 'completed' || enrollmentType === 'free_period' ? '<li>Course access activated</li>' : ''}
              ${amount ? `<li>Payment amount: ${amount} ${currency}</li>` : ''}
              ${enrollmentType === 'free_period' ? '<li>Free class enrollment (January 3rd, 2026 at 12 PM CST)</li>' : ''}
            </ul>
          </div>

          <div style="margin-top:25px; padding-top:20px; border-top:1px solid #e5e7eb;">
            <p style="color:#6b7280; font-size:14px; text-align:center;">
              This notification was automatically generated by the Roote Assessment System<br>
              Time: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Roote Assessment System <contact@updates.rooteancestrallearninghub.com>',
      to: process.env.ADMIN_EMAIL,
      subject: emailSubject,
      html: emailHtml,
      tags: [
        { name: 'category', value: 'admin_notification' },
        { name: 'free_period', value: enrollmentType === 'free_period' ? 'yes' : 'no' }
      ]
    });

    if (error) throw error;
    console.log('✅ Admin notification sent. Email ID:', emailData?.id, 'Score:', score, 'Enrollment Type:', enrollmentType);

  } catch (error) {
    console.error('❌ Error in sendAdminNotification:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendAdminNotification,
  courseIds,
  instituteCode
};