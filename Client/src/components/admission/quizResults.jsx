import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/QuizContext';
import { quizConfig, calculateLevel } from '@/config/quizConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuizResult = () => {
  const { state, dispatch } = useQuiz();
  const { currentScore, studentInfo } = state;
  
  const result = calculateLevel(currentScore);
  const { level, url } = result;

  useEffect(() => {
    dispatch({ type: 'SET_LEVEL', payload: result });
    sendWelcomeEmail();
  }, []);

  const sendWelcomeEmail = async () => {
    try {
      await fetch('http://localhost:5000/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentEmail: studentInfo.email,
          level: level,
          wiseUrl: url
        })
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  };

  const handleRedirectToWise = () => {
    window.location.href = url;
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'from-green-400 to-blue-400';
      case 'intermediate': return 'from-blue-400 to-purple-400';
      case 'advanced': return 'from-purple-400 to-indigo-400';
      default: return 'from-indigo-400 to-blue-400';
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="border-indigo-100 shadow-xl text-center">
            <CardHeader>
              <motion.div 
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                🎉
              </motion.div>
              <CardTitle className="text-2xl font-outfit text-indigo-900">Assessment Complete!</CardTitle>
              <CardDescription className="text-gray-600">
                Your Yoruba level has been determined
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className={`bg-linear-to-r ${getLevelColor(level)} text-white rounded-2xl p-6 shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-2 font-outfit">
                  {level.charAt(0).toUpperCase() + level.slice(1)} Level
                </h3>
                <p className="text-white/90 font-outfit">
                  Score: {currentScore} out of {quizConfig.questions.length}
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="text-left space-y-4 bg-indigo-50 rounded-lg p-6"
              >
                <h4 className="font-semibold text-indigo-900 font-outfit">Next Steps:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3 text-lg">✅</span>
                    Check your email for welcome message and class details
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3 text-lg">✅</span>
                    Click the button below to create your account on Wise.live
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3 text-lg">✅</span>
                    Start your Yoruba learning journey immediately!
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  onClick={handleRedirectToWise}
                  size="lg" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue to Wise.live to Create Account
                </Button>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-sm text-gray-500"
              >
                You'll be redirected to our learning platform to complete your registration
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;