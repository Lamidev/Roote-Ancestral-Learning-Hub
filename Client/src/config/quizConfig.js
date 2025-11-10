

export const quizConfig = {
  title: "Yoruba Placement Assessment",
  description: "Discover your perfect Yoruba class level",
  totalQuestions: 8,
  passingScore: {
    beginner: { min: 0, max: 2 },
    middle: { min: 3, max: 5 },
    advanced: { min: 6, max: 8 }
  },
  wiseUrls: {
    beginner: "https://roote-ancestral-learning.wise.live/download",
    middle: "https://roote-ancestral-learning.wise.live/download", 
    advanced: "https://roote-ancestral-learning.wise.live/download"
  },
  instituteCode: "roote-ancestral-learning",
  courseIds: {
    beginner: "643218529",
    middle: "154209784",
    advanced: "179756668"
  },
  questions: [
    {
      id: 1,
      question: "How do you say 'Good morning' in Yoruba?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "E kaaro", score: 1 },
        { id: "b", text: "E kaale", score: 0 },
        { id: "c", text: "E ku irole", score: 0 },
        { id: "d", text: "E ku otutu", score: 0 }
      ]
    },
    {
      id: 2,
      question: "What does 'E se' mean in English?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Thank you", score: 1 },
        { id: "b", text: "Goodbye", score: 0 },
        { id: "c", text: "Please", score: 0 },
        { id: "d", text: "Sorry", score: 0 }
      ]
    },
    {
      id: 3,
      question: "How would you respond to 'Bawo ni?'",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Dada ni", score: 1 },
        { id: "b", text: "O dabo", score: 0 },
        { id: "c", text: "Mo wa daadaa", score: 0 },
        { id: "d", text: "E ku ise", score: 0 }
      ]
    },
    {
      id: 4,
      question: "What is the Yoruba word for 'water'?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Omi", score: 1 },
        { id: "b", text: "Iye", score: 0 },
        { id: "c", text: "Odo", score: 0 },
        { id: "d", text: "Oja", score: 0 }
      ]
    },
    {
      id: 5,
      question: "Which phrase means 'See you later'?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "O dab o", score: 1 },
        { id: "b", text: "E kaaro", score: 0 },
        { id: "c", text: "E seun", score: 0 },
        { id: "d", text: "Kilode", score: 0 }
      ]
    },
    {
      id: 6,
      question: "What does 'Joko' mean?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Stand up", score: 0 },
        { id: "b", text: "Sit down", score: 1 },
        { id: "c", text: "Come here", score: 0 },
        { id: "d", text: "Go away", score: 0 }
      ]
    },
    {
      id: 7,
      question: "How do you say 'I don't understand' in Yoruba?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Mo gbo", score: 0 },
        { id: "b", text: "Ko ye mi", score: 1 },
        { id: "c", text: "Mo fe", score: 0 },
        { id: "d", text: "Ma gbo", score: 0 }
      ]
    },
    {
      id: 8,
      question: "What is the correct response to 'E ku ise'?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Oun naa ni", score: 0 },
        { id: "b", text: "E seun", score: 1 },
        { id: "c", text: "E kaale", score: 0 },
        { id: "d", text: "Bawo ni", score: 0 }
      ]
    }
  ]
};

export const calculateLevel = (score) => {
  const level = score >= quizConfig.passingScore.advanced.min ? 'advanced' :
               score >= quizConfig.passingScore.middle.min ? 'middle' : 'beginner';
  
  return { 
    level: level,
    url: quizConfig.wiseUrls[level],
    instituteCode: quizConfig.instituteCode,
    courseId: quizConfig.courseIds[level]
  };
};