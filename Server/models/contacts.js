const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  country: {
    type: String,
    trim: true,
    maxlength: [50, 'Country name too long']
  },
  interestLevel: {
    type: String,
    enum: {
      values: ['beginner', 'middle', 'advanced', 'not-sure'],
      message: '{VALUE} is not a valid interest level'
    },
    default: 'not-sure'
  },
  referralSource: {
    type: String,
    enum: {
      values: ['social-media', 'friend', 'search', 'advertisement', 'other'],
      message: '{VALUE} is not a valid referral source'
    },
    default: 'other'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'archived'],
    default: 'new'
  }
}, {
  timestamps: true
});

// Create indexes for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;