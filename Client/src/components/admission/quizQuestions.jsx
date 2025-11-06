import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/contexts/quizContext';
import { quizConfig } from '@/config/quizConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const QuizQuestions = () => {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const currentQuestion = quizConfig.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizConfig.questions.length - 1;

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
    
    dispatch({
      type: 'SET_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        answerId: selectedAnswer,
        score: selectedOption.score
      }
    });

    if (isLastQuestion) {
      navigate('/admission/result');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  const progress = ((currentQuestionIndex + 1) / quizConfig.questions.length) * 100;

  const questionVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-indigo-100 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="font-outfit text-indigo-900">
                Question {currentQuestionIndex + 1} of {quizConfig.questions.length}
              </CardTitle>
              <span className="text-sm text-gray-600 font-outfit">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-3">
              <motion.div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              ></motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                variants={questionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 font-outfit">
                  {currentQuestion.question}
                </h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  {currentQuestion.options.map((option) => (
                    <motion.div 
                      key={option.id} 
                      className="flex items-center space-x-3 p-4 border border-indigo-100 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={option.id} 
                        className="text-indigo-600 border-indigo-300"
                      />
                      <Label 
                        htmlFor={option.id} 
                        className="flex-1 cursor-pointer text-gray-700 font-outfit"
                      >
                        {option.text}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                <Button 
                  onClick={handleNext} 
                  disabled={!selectedAnswer}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit"
                  size="lg"
                >
                  {isLastQuestion ? 'See Results' : 'Next Question'}
                </Button>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestions;