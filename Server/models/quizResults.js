

// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   questionId: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 8
//   },
//   answerId: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   score: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 1
//   }
// });

// const quizResultSchema = new mongoose.Schema({
//   studentEmail: {
//     type: String,
//     required: [true, 'Student email is required'],
//     trim: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   fullName: {
//     type: String,
//     required: [true, 'Full name is required'],
//     trim: true,
//     maxlength: [100, 'Name cannot be more than 100 characters']
//   },
//   score: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 8
//   },
//   level: {
//     type: String,
//     required: true,
//     enum: {
//       values: ['beginner', 'middle', 'advanced'],
//       message: '{VALUE} is not a valid level'
//     }
//   },
//   wiseUrl: {
//     type: String,
//     required: true
//   },
//   instituteCode: {
//     type: String,
//     required: true,
//     default: "roote-ancestral-learning"
//   },
//   courseId: {
//     type: String,
//     required: true
//   },
//   answers: [answerSchema],
//   emailSent: {
//     type: Boolean,
//     default: false
//   },
//   enrolled: {
//     type: Boolean,
//     default: false
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending'
//   },
//   transactionId: {
//     type: String
//   },
//   paidAt: {
//     type: Date
//   },
//   lastPaymentAttempt: {
//     type: Date
//   }
// }, {
//   timestamps: true
// });

// quizResultSchema.index({ studentEmail: 1 });
// quizResultSchema.index({ level: 1 });
// quizResultSchema.index({ createdAt: -1 });
// quizResultSchema.index({ score: 1 });
// quizResultSchema.index({ emailSent: 1 });
// quizResultSchema.index({ courseId: 1 });
// quizResultSchema.index({ instituteCode: 1 });
// quizResultSchema.index({ paymentStatus: 1 });
// quizResultSchema.index({ paidAt: 1 });

// const QuizResult = mongoose.model('QuizResult', quizResultSchema);

// module.exports = QuizResult;

const mongoose = require('mongoose');

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
  instituteCode: {
    type: String,
    required: true,
    default: "roote-ancestral-learning"
  },
  courseId: {
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
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String
  },
  paidAt: {
    type: Date
  },
  lastPaymentAttempt: {
    type: Date
  },
  enrollmentType: {
    type: String,
    enum: ['regular', 'free_period'],
    default: 'regular'
  }
}, {
  timestamps: true
});

quizResultSchema.index({ studentEmail: 1 });
quizResultSchema.index({ level: 1 });
quizResultSchema.index({ createdAt: -1 });
quizResultSchema.index({ score: 1 });
quizResultSchema.index({ emailSent: 1 });
quizResultSchema.index({ courseId: 1 });
quizResultSchema.index({ instituteCode: 1 });
quizResultSchema.index({ paymentStatus: 1 });
quizResultSchema.index({ paidAt: 1 });
quizResultSchema.index({ enrollmentType: 1 });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;