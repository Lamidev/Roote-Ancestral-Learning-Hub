import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENT_INFO':
      return { ...state, studentInfo: action.payload };
    case 'SET_ANSWER':
      const newAnswers = { ...state.answers, [action.payload.questionId]: action.payload };
      const newScore = Object.values(newAnswers).reduce((total, answer) => total + answer.score, 0);
      return { ...state, answers: newAnswers, currentScore: newScore };
    case 'SET_LEVEL':
      return { ...state, placementLevel: action.payload };
    case 'RESET_QUIZ':
      return { 
        studentInfo: {},
        answers: {}, 
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
    answers: {},
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