const mongoose = require('mongoose');

// Schema for individual answers
const answerSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  answerId: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  }
});

// Main Quiz Result Schema
const quizResultSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 8
  },
  level: {
    type: String,
    required: true,
    enum: {
      values: ['beginner', 'middle', 'advanced'],
      message: '{VALUE} is not a valid level'
    }
  },
  wiseUrl: {
    type: String,
    required: true
  },
  answers: [answerSchema],
  emailSent: {
    type: Boolean,
    default: false
  },
  enrolled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better query performance
quizResultSchema.index({ studentEmail: 1 });
quizResultSchema.index({ level: 1 });
quizResultSchema.index({ createdAt: -1 });
quizResultSchema.index({ score: 1 });
quizResultSchema.index({ emailSent: 1 });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;