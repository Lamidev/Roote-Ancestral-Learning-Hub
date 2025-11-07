
// const Contact = require('../models/contacts'); 
// const { Resend } = require('resend');
// const resend = new Resend(process.env.RESEND_API_KEY);

// /**
//  * -----------------------------
//  *  CONTACT FORM HANDLER
//  * -----------------------------
//  */
// const submitContactForm = async (req, res) => {
//   try {
//     const { fullName, email, country, message, interestLevel, referralSource } = req.body;

//     console.log('\n📨 New contact form submission received:', { fullName, email });

//     // Save contact to DB
//     const contact = await Contact.create({
//       fullName,
//       email,
//       country,
//       message,
//       interestLevel,
//       referralSource
//     });

//     console.log('💾 Contact saved successfully with ID:', contact._id);

//     // Send emails asynchronously
//     sendEmailsAsync({
//       fullName,
//       email,
//       country,
//       message,
//       interestLevel,
//       referralSource,
//       contactId: contact._id
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Thank you! Your message has been sent successfully.',
//       contactId: contact._id
//     });

//   } catch (error) {
//     console.error('❌ Contact form submission failed:', error);

//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: 'You have already submitted a contact form with this email.'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       error: 'Failed to send message. Please try again later.'
//     });
//   }
// };

// /**
//  * -----------------------------
//  *  EMAIL LOGIC (ASYNC) WITH RESEND
//  * -----------------------------
//  */
// const sendEmailsAsync = async (data) => {
//   try {
//     console.log('\n📧 Sending contact form emails via Resend...');

//     // Admin notification
//     const adminEmail = await resend.emails.send({
//       from: 'Roote Website <contact@updates.rooteancestrallearninghub.com>',
//       to: process.env.ADMIN_EMAIL,
//       subject: `New Student Interest: ${data.fullName}`,
//       html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
//           .container { max-width:600px; margin:auto; padding:20px; }
//           .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
//           .header { text-align:center; margin-bottom:20px; color:#4f46e5; }
//           .details { margin-top:15px; color:#374151; line-height:1.5; }
//           .details p { margin:5px 0; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="card">
//             <h2 class="header">📨 New Student Inquiry</h2>
//             <div class="details">
//               <p><strong>Contact ID:</strong> ${data.contactId}</p>
//               <p><strong>Name:</strong> ${data.fullName}</p>
//               <p><strong>Email:</strong> ${data.email}</p>
//               <p><strong>Country:</strong> ${data.country || 'Not specified'}</p>
//               <p><strong>Interest Level:</strong> ${data.interestLevel || 'Not specified'}</p>
//               <p><strong>Referral Source:</strong> ${data.referralSource || 'Not specified'}</p>
//               <hr/>
//               <p><strong>Message:</strong></p>
//               <p>${data.message || 'No message provided'}</p>
//             </div>
//             <p style="color:#6b7280; font-size:12px; margin-top:15px;">Sent from Roote Ancestral Learning Hub website contact form.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//       tags: [
//         { name: 'category', value: 'contact_form' },
//         { name: 'type', value: 'admin_notification' }
//       ]
//     });
//     console.log(`✅ Admin email sent: ${adminEmail.data?.id}`);

//     // Student confirmation
//     const studentEmail = await resend.emails.send({
//       from: 'Roote Ancestral Learning Hub <contact@updates.rooteancestrallearninghub.com>',
//       to: data.email,
//       reply_to: 'admin@rooteancestrallearninghub.com',
//       subject: `We've received your inquiry - Roote Ancestral Learning Hub`,
//       html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
//           .container { max-width:600px; margin:auto; padding:20px; }
//           .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
//           h2 { color:#4f46e5; }
//           p { color:#374151; line-height:1.6; }
//           .next-steps { background:#f0f9ff; padding:15px; border-radius:8px; margin:20px 0; }
//           .next-steps li { margin-bottom:5px; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="card">
//             <h2>Thank you for reaching out!</h2>
//             <p>Dear ${data.fullName},</p>
//             <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
//             <div class="next-steps">
//               <h3>Next Steps</h3>
//               <ul>
//                 <li>Our team will review your inquiry</li>
//                 <li>We'll reach out with information about Yoruba classes</li>
//                 <li>You can also <a href="https://rooteancestrallearninghub.com/admission" style="color:#4f46e5;">take our placement quiz</a> to get started now</li>
//               </ul>
//             </div>
//             <p>If you have urgent questions, reply to this email anytime.</p>
//             <p>Warm regards,<br/><strong>The Roote Team</strong></p>
//             <hr/>
//             <p style="color:#9ca3af; font-size:12px;">Roote Ancestral Learning Hub | Winnipeg, Manitoba, Canada</p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//       tags: [
//         { name: 'category', value: 'contact_form' },
//         { name: 'type', value: 'student_confirmation' }
//       ]
//     });
//     console.log(`✅ Student confirmation email sent: ${studentEmail.data?.id}`);

//   } catch (error) {
//     console.error('❌ Email sending error:', error);
//     // Don't throw to avoid breaking DB save
//   }
// };

// module.exports = { submitContactForm };

const Contact = require('../models/contacts'); 
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, country, message, interestLevel, referralSource } = req.body;

    const contact = await Contact.create({
      fullName,
      email,
      country,
      message,
      interestLevel,
      referralSource
    });

    sendEmailsAsync({
      fullName,
      email,
      country,
      message,
      interestLevel,
      referralSource,
      contactId: contact._id
    });

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      contactId: contact._id
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'You have already submitted a contact form with this email.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
};

const sendEmailsAsync = async (data) => {
  try {
    const adminEmail = await resend.emails.send({
      from: 'Roote Website <contact@updates.rooteancestrallearninghub.com>',
      to: process.env.ADMIN_EMAIL,
      reply_to: data.email,
      subject: `New Student Interest: ${data.fullName}`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
          .container { max-width:600px; margin:auto; padding:20px; }
          .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
          .header { text-align:center; margin-bottom:20px; color:#4f46e5; }
          .details { margin-top:15px; color:#374151; line-height:1.5; }
          .details p { margin:5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h2 class="header">📨 New Student Inquiry</h2>
            <div class="details">
              <p><strong>Contact ID:</strong> ${data.contactId}</p>
              <p><strong>Name:</strong> ${data.fullName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Country:</strong> ${data.country || 'Not specified'}</p>
              <p><strong>Interest Level:</strong> ${data.interestLevel || 'Not specified'}</p>
              <p><strong>Referral Source:</strong> ${data.referralSource || 'Not specified'}</p>
              <hr/>
              <p><strong>Message:</strong></p>
              <p>${data.message || 'No message provided'}</p>
            </div>
            <p style="color:#6b7280; font-size:12px; margin-top:15px;">Sent from Roote Ancestral Learning Hub website contact form.</p>
          </div>
        </div>
      </body>
      </html>
      `,
      tags: [
        { name: 'category', value: 'contact_form' },
        { name: 'type', value: 'admin_notification' }
      ]
    });

    const studentEmail = await resend.emails.send({
      from: 'Roote Ancestral Learning Hub <contact@updates.rooteancestrallearninghub.com>',
      to: data.email,
      reply_to: process.env.ADMIN_EMAIL,
      subject: `We've received your inquiry - Roote Ancestral Learning Hub`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family:Arial,sans-serif; margin:0; padding:0; background:#f8fafc; }
          .container { max-width:600px; margin:auto; padding:20px; }
          .card { background:white; border-radius:12px; padding:30px; box-shadow:0 4px 6px rgba(0,0,0,0.1); }
          h2 { color:#4f46e5; }
          p { color:#374151; line-height:1.6; }
          .next-steps { background:#f0f9ff; padding:15px; border-radius:8px; margin:20px 0; }
          .next-steps li { margin-bottom:5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h2>Thank you for reaching out!</h2>
            <p>Dear ${data.fullName},</p>
            <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
            <div class="next-steps">
              <h3>Next Steps</h3>
              <ul>
                <li>Our team will review your inquiry</li>
                <li>We'll reach out with information about Yoruba classes</li>
                <li>You can also <a href="https://rooteancestrallearninghub.com/admission" style="color:#4f46e5;">take our placement quiz</a> to get started now</li>
              </ul>
            </div>
            <p>If you have urgent questions, reply to this email anytime.</p>
            <p>Warm regards,<br/><strong>The Roote Team</strong></p>
            <hr/>
            <p style="color:#9ca3af; font-size:12px;">Roote Ancestral Learning Hub | Winnipeg, Manitoba, Canada</p>
          </div>
        </div>
      </body>
      </html>
      `,
      tags: [
        { name: 'category', value: 'contact_form' },
        { name: 'type', value: 'student_confirmation' }
      ]
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
  }
};

module.exports = { submitContactForm };
