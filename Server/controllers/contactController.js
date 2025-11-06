// const Contact = require('../models/contacts');
// const nodemailer = require('nodemailer');

// // Configure Gmail transporter (requires app password)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,  
//     pass: process.env.GMAIL_APP_PASSWORD   
//   }
// });


// const submitContactForm = async (req, res) => {
//   try {
//     const { fullName, email, country, message, interestLevel, referralSource } = req.body;

//     console.log('📨 Received contact form submission:', { fullName, email });

//     // 1. Save to MongoDB
//     const contact = new Contact({
//       fullName,
//       email,
//       country,
//       message,
//       interestLevel,
//       referralSource
//     });

//     await contact.save();
//     console.log('💾 Contact saved to database:', contact._id);

//     // 2. Send emails (non-blocking)
//     sendEmailsAsync({ fullName, email, country, message, interestLevel, referralSource });

//     res.status(200).json({ 
//       success: true, 
//       message: 'Thank you! Your message has been sent successfully.',
//       contactId: contact._id
//     });

//   } catch (error) {
//     console.error('❌ Contact form error:', error);
    
//     // Check if it's a duplicate email error
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

// // Non-blocking email sending
// const sendEmailsAsync = async (data) => {
//   try {
//     // Send email to Roote team
//     await transporter.sendMail({
//       from: `"Roote Website" <noreply@rooteancestrallearninghub.com>`,
//       to: 'info@rooteancestrallearninghub.com',
//       subject: `New Student Interest: ${data.fullName}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #4f46e5;">New Student Inquiry</h2>
          
//           <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #4f46e5; margin-top: 0;">Student Details</h3>
//             <p><strong>Name:</strong> ${data.fullName}</p>
//             <p><strong>Email:</strong> ${data.email}</p>
//             <p><strong>Location:</strong> ${data.country || 'Not specified'}</p>
//             <p><strong>Interest Level:</strong> ${data.interestLevel || 'Not specified'}</p>
//             <p><strong>Referral Source:</strong> ${data.referralSource || 'Not specified'}</p>
//           </div>
          
//           <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
//             <h3 style="color: #4f46e5;">Message</h3>
//             <p>${data.message || 'No message provided'}</p>
//           </div>
          
//           <br/>
//           <p style="color: #6b7280; font-size: 12px;">
//             This message was sent from the Roote website contact form.
//           </p>
//         </div>
//       `
//     });

//     // Send confirmation to student
//     await transporter.sendMail({
//       from: `"Roote Ancestral Learning Hub" <noreply@rooteancestrallearninghub.com>`,
//       to: data.email,
//       subject: `We've received your inquiry - Roote Ancestral Learning Hub`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #4f46e5;">Thank you for reaching out!</h2>
          
//           <p>Dear ${data.fullName},</p>
          
//           <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
          
//           <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #4f46e5; margin-top: 0;">What's Next?</h3>
//             <ul>
//               <li>Our team will review your inquiry</li>
//               <li>We'll contact you with more information about Yoruba classes</li>
//               <li>You can also <a href="http://localhost:5173/admission" style="color: #4f46e5;">take our placement quiz</a> to get started immediately</li>
//             </ul>
//           </div>
          
//           <p>If you have any urgent questions, feel free to reply to this email.</p>
          
//           <p>Best regards,<br>
//           <strong>The Roote Team</strong></p>
//         </div>
//       `
//     });

//     console.log('✅ Emails sent successfully for:', data.email);
//   } catch (emailError) {
//     console.error('❌ Email sending failed:', emailError);
//     // Don't throw error - data is already saved to DB
//   }
// };

// module.exports = {
//   submitContactForm
// };


// controllers/contactController.js
const Contact = require('../models/contacts'); 
const nodemailer = require('nodemailer');

/**
 * -----------------------------
 *  EMAIL TRANSPORT CONFIG
 * -----------------------------
 * For development: Gmail (App Password required)
 * For production:  Change user/pass to domain email creds
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,           // e.g. your Gmail or domain email
    pass: process.env.GMAIL_APP_PASSWORD    // App Password (not normal Gmail password)
  }
});

// ✅ Verify transporter on startup
(async () => {
  try {
    await transporter.verify();
    console.log('✅ Gmail transporter verified successfully.');
  } catch (error) {
    console.error('❌ Gmail transporter verification failed:', error.message);
  }
})();

/**
 * -----------------------------
 *  CONTACT FORM HANDLER
 * -----------------------------
 * 1. Save contact entry to MongoDB
 * 2. Send email notification to admin
 * 3. Send confirmation email to student
 */
const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, country, message, interestLevel, referralSource } = req.body;

    console.log('\n📨 New contact form submission received:', { fullName, email });

    // ✅ Save contact data to MongoDB
    const contact = await Contact.create({
      fullName,
      email,
      country,
      message,
      interestLevel,
      referralSource
    });

    console.log('💾 Contact saved successfully with ID:', contact._id);

    // ✅ Send emails asynchronously (no blocking)
    sendEmailsAsync({
      fullName,
      email,
      country,
      message,
      interestLevel,
      referralSource,
      contactId: contact._id
    });

    // ✅ Respond immediately to frontend
    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      contactId: contact._id
    });

  } catch (error) {
    console.error('❌ Contact form submission failed:', error);

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

/**
 * -----------------------------
 *  EMAIL LOGIC (ASYNC)
 * -----------------------------
 * Handles sending both admin + student emails
 */
const sendEmailsAsync = async (data) => {
  try {
    console.log('\n📧 Sending contact form emails...');

    // ✅ Send email to yourself (admin/test mode)
    const adminMail = await transporter.sendMail({
      from: `"Roote Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,  // For now, send to your Gmail for testing
      subject: `New Student Interest: ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #4f46e5;">New Student Inquiry</h2>
          <p><strong>Contact ID:</strong> ${data.contactId}</p>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Country:</strong> ${data.country || 'Not specified'}</p>
          <p><strong>Interest Level:</strong> ${data.interestLevel || 'Not specified'}</p>
          <p><strong>Referral Source:</strong> ${data.referralSource || 'Not specified'}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${data.message || 'No message provided'}</p>
          <br/>
          <small style="color:#6b7280">Sent from Roote Ancestral Learning Hub website contact form.</small>
        </div>
      `
    });
    console.log(`✅ Admin notification email sent: ${adminMail.messageId}`);

    // ✅ Send confirmation email to student
    const studentMail = await transporter.sendMail({
      from: `"Roote Ancestral Learning Hub" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `We've received your inquiry - Roote Ancestral Learning Hub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #4f46e5;">Thank you for reaching out!</h2>
          <p>Dear ${data.fullName},</p>
          <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5;">Next Steps</h3>
            <ul>
              <li>Our team will review your inquiry</li>
              <li>We’ll reach out with information about Yoruba classes</li>
              <li>You can also <a href="http://localhost:5173/admission" style="color: #4f46e5;">take our placement quiz</a> to get started now</li>
            </ul>
          </div>
          <p>If you have urgent questions, reply to this email anytime.</p>
          <p>Warm regards,<br/><strong>The Roote Team</strong></p>
          <hr/>
          <small style="color:#9ca3af">Roote Ancestral Learning Hub | Winnipeg, Manitoba, Canada</small>
        </div>
      `
    });
    console.log(`✅ Confirmation email sent to student: ${studentMail.messageId}`);

  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    // Don’t throw error — database save already completed
  }
};

module.exports = { submitContactForm };
