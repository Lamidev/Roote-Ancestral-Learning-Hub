export const quizConfig = {
  title: "Yoruba Placement Assessment",
  description: "Discover your perfect Yoruba class level",
  totalQuestions: 8,
  passingScore: {
    beginner: { min: 0, max: 3 },
    middle: { min: 4, max: 6 },
    advanced: { min: 7, max: 8 }
  },
  wiseUrls: {
    beginner: "https://roote-ancestral-learning.wise.live/download",
    middle: "https://roote-ancestral-learning.wise.live/download", 
    advanced: "https://roote-ancestral-learning.wise.live/download"
  },
  instituteCode: "roote-ancestral-learning",
  courseIds: {
    beginner: "643218529",
    middle: "968954470",
    advanced: "179756668"
  },
  questions: [
    {
      id: 1,
      question: "What is 'good morning' in Yoruba?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "E wa jẹun", score: 0 },
        { id: "b", text: "O ti sun", score: 0 },
        { id: "c", text: "E kaaro", score: 1 }
      ]
    },
    {
      id: 2,
      question: "How is 'dog' written in Yoruba?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "koko", score: 0 },
        { id: "b", text: "aja", score: 1 },
        { id: "c", text: "ẹran", score: 0 }
      ]
    },
    {
      id: 3,
      question: "Two children born by same mother at the same time are called ...",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Alejo", score: 0 },
        { id: "b", text: "Ibeji", score: 1 },
        { id: "c", text: "omode", score: 0 }
      ]
    },
    {
      id: 4,
      question: "Complete this proverb: 'Ba mi na ọmọ mi ....'",
      type: "multiple_choice",
      options: [
        { id: "a", text: "O ma sunkun", score: 0 },
        { id: "b", text: "Baba o ni gba", score: 0 },
        { id: "c", text: "Ko de inú olomo", score: 1 }
      ]
    },
    {
      id: 5,
      question: "First day of the week in Yoruba is ...",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Ibusun", score: 0 },
        { id: "b", text: "Àìkú", score: 1 },
        { id: "c", text: "Ìṣẹ́gun", score: 0 }
      ]
    },
    {
      id: 6,
      question: "What is pounded yam called in Yoruba?",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Okele", score: 0 },
        { id: "b", text: "Iyan", score: 1 },
        { id: "c", text: "Ounje", score: 0 }
      ]
    },
    {
      id: 7,
      question: "Orange is called ____ in Yoruba.",
      type: "multiple_choice",
      options: [
        { id: "a", text: "osan", score: 1 },
        { id: "b", text: "Ojú", score: 0 },
        { id: "c", text: "Àpótí", score: 0 }
      ]
    },
    {
      id: 8,
      question: "Translate this: My mother went out.",
      type: "multiple_choice",
      options: [
        { id: "a", text: "Mama jade.", score: 0 },
        { id: "b", text: "Mama mi jade", score: 1 },
        { id: "c", text: "Mama mi n sun.", score: 0 }
      ]
    }
  ]
};

export const calculateLevel = (score) => {
  let level;
  if (score >= quizConfig.passingScore.advanced.min) {
    level = 'advanced';
  } else if (score >= quizConfig.passingScore.middle.min) {
    level = 'middle';
  } else {
    level = 'beginner';
  }
  
  console.log(`🎯 Score: ${score}, Level: ${level}, CourseID: ${quizConfig.courseIds[level]}`);
  
  return { 
    level: level,
    url: quizConfig.wiseUrls[level],
    instituteCode: quizConfig.instituteCode,
    courseId: quizConfig.courseIds[level]
  };
};