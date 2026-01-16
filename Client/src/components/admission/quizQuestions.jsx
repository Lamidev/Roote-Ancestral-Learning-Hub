import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@/contexts/quizContext';
import { quizConfig, calculateLevel } from '@/config/quizConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const QuizQuestions = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quizConfig.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizConfig.questions.length - 1;

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:7090"
      : "https://api.rooteancestrallearninghub.com");

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handleNext = async () => {
    if (!selectedAnswer) return;

    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);

    // Create the updated answers array for immediate use
    const updatedAnswer = {
      questionId: currentQuestion.id,
      answerId: selectedAnswer,
      score: selectedOption.score
    };

    dispatch({
      type: 'SET_ANSWER',
      payload: updatedAnswer
    });

    if (isLastQuestion) {
      setIsSubmitting(true);
      
      // Calculate results immediately for the backend call
      const allAnswers = [...state.answers, updatedAnswer];
      const totalScore = allAnswers.reduce((total, a) => total + (a.score || 0), 0);
      const studentInfo = state.studentInfo;
      const result = calculateLevel(totalScore, studentInfo?.email);
      
      // Dispatch level to state so results page has it
      dispatch({ type: "SET_LEVEL", payload: result });

      // Start saving to backend immediately
      const savePromise = (async () => {
        try {
          const quizData = {
            studentEmail: studentInfo.email,
            fullName: studentInfo.fullName,
            phoneNumber: studentInfo.phoneNumber,
            score: totalScore,
            level: result.level,
            classUrl: result.classUrl,
            answers: allAnswers.map((a, index) => ({
              questionId: a.questionId ?? index + 1,
              answerId: a.answerId ?? "",
              score: a.score ?? 0,
            })),
          };

          await fetch(`${API_BASE_URL}/api/quiz/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizData),
          });
        } catch (err) {
          console.error("Failed to save quiz results during transition:", err);
        }
      })();

      // Wait for both the minimum effect time and the save request
      const startTime = Date.now();
      await savePromise;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1500 - elapsed);
      
      setTimeout(() => {
        navigate('/admission/result');
      }, remaining);
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

  if (isSubmitting) {
    return (
      <div className="py-8 sm:py-16 md:py-24 px-4 min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-indigo-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              className="absolute inset-0 border-4 border-indigo-200 rounded-full"
              initial={{ opacity: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-indigo-900 font-outfit">Collecting Your Results</h2>
            <p className="text-gray-600 font-outfit">Preparing your personalized learning path...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 md:py-24 px-4 min-h-screen bg-linear-to-b from-indigo-50 to-white">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-indigo-100 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="font-outfit text-indigo-900 text-lg sm:text-xl">
                <span className="sm:hidden">{currentQuestionIndex + 1}/{quizConfig.questions.length}</span>
                <span className="hidden sm:inline">Question {currentQuestionIndex + 1} of {quizConfig.questions.length}</span>
              </CardTitle>
              <span className="text-xs sm:text-sm text-gray-600 font-outfit">{Math.round(progress)}% Complete</span>
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