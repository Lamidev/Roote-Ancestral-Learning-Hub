
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
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .container { padding: 40px 20px; }
          .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background-color: #4f46e5; padding: 24px; color: #ffffff; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .content { padding: 32px; color: #334155; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
          .data-row { margin-bottom: 8px; font-size: 15px; }
          .data-label { font-weight: 600; color: #475569; width: 140px; display: inline-block; }
          .message-box { background-color: #f9fafb; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb; white-space: pre-wrap; margin-top: 10px; }
          .footer { background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; }
          .footer p { margin: 0; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="main">
            <div class="header">
              <h1>📨 New Inquiry: ${data.fullName}</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="data-row"><span class="data-label">Full Name:</span> ${data.fullName}</div>
                <div class="data-row"><span class="data-label">Email:</span> ${data.email}</div>
                <div class="data-row"><span class="data-label">Location:</span> ${data.country || 'N/A'}</div>
                <div class="data-row"><span class="data-label">Interest Level:</span> ${data.interestLevel || 'N/A'}</div>
                <div class="data-row"><span class="data-label">Source:</span> ${data.referralSource || 'N/A'}</div>
              </div>

              <div class="section">
                <div class="section-title">Message Details</div>
                <div class="message-box">${data.message || 'No message provided.'}</div>
              </div>
              
              <p style="font-size: 12px; color: #94a3b8; margin-top: 30px;">
                Submission ID: ${data.contactId}
              </p>
            </div>
            <div class="footer">
              <p>Roote Ancestral Learning Hub Website</p>
            </div>
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
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; background-color: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
          .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7fa; padding-bottom: 40px; padding-top: 40px; }
          .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 550px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .header { background-color: #4f46e5; padding: 40px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
          .content { padding: 40px; color: #374151; font-size: 16px; line-height: 1.6; }
          .thank-you { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 20px; }
          .next-steps { background-color: #f0f4ff; border-left: 4px solid #4f46e5; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .next-steps h3 { margin-top: 0; font-size: 16px; color: #1e1b4b; }
          .next-steps ul { margin: 10px 0 0; padding-left: 20px; }
          .next-steps li { margin-bottom: 8px; }
          .btn-container { text-align: center; margin-top: 30px; }
          .button { display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 600; }
          .footer { padding: 30px; text-align: center; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="main">
            <div class="header">
              <h1>Roote Ancestral Learning Hub</h1>
            </div>
            <div class="content">
              <p class="thank-you">Kaabo (Welcome) ${data.fullName},</p>
              <p>Thank you for reaching out to us. We've received your inquiry and our team is already reviewing it.</p>
              
              <div class="next-steps">
                <h3>What happens next?</h3>
                <ul>
                  <li>Our team will respond to you within 24 hours.</li>
                  <li>We'll provide tailored information about our Yoruba classes.</li>
                  <li>In the meantime, feel free to explore our community.</li>
                </ul>
              </div>

              <p>Ready to start your journey right now?</p>
              <div class="btn-container">
                <a href="https://rooteancestrallearninghub.com/admission" class="button">Visit Admission Page</a>
              </div>

              <p style="margin-top: 40px;">Best regards,<br><strong>The Roote Team</strong></p>
            </div>
            <div class="footer">
              <p>Winnipeg, Manitoba, Canada</p>
              <p>© ${new Date().getFullYear()} Roote Ancestral Learning Hub</p>
            </div>
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
