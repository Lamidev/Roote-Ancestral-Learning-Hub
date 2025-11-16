import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENT_INFO':
      return { ...state, studentInfo: action.payload };
    case 'SET_ANSWER':
      // Store answers as array instead of object
      const answerIndex = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      let newAnswers;
      
      if (answerIndex >= 0) {
        // Update existing answer
        newAnswers = [...state.answers];
        newAnswers[answerIndex] = action.payload;
      } else {
        // Add new answer
        newAnswers = [...state.answers, action.payload];
      }
      
      // Calculate score from array
      const newScore = newAnswers.reduce((total, answer) => total + (answer.score || 0), 0);
      
      console.log('📊 Score calculation:', {
        answers: newAnswers,
        totalScore: newScore,
        answerCount: newAnswers.length
      });
      
      return { ...state, answers: newAnswers, currentScore: newScore };
    case 'SET_LEVEL':
      return { ...state, placementLevel: action.payload };
    case 'RESET_QUIZ':
      return { 
        studentInfo: {},
        answers: [], // Initialize as empty array
        currentScore: 0, 
        placementLevel: null
      };
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, {
    studentInfo: {},
    answers: [], // Initialize as empty array
    currentScore: 0,
    placementLevel: null
  });

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};