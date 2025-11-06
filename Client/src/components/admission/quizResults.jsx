

// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useQuiz } from '@/contexts/QuizContext';
// import { quizConfig, calculateLevel } from '@/config/quizConfig';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const QuizResult = () => {
//   const { state, dispatch } = useQuiz();
//   const { currentScore, studentInfo, answers } = state;

//   const [emailStatus, setEmailStatus] = useState('sending'); // 'sending', 'success', 'error'
//   const [errorMessage, setErrorMessage] = useState('');
//   const savingRef = useRef(false); // ✅ prevents duplicate triggers

//   const result = calculateLevel(currentScore);
//   const { level, url } = result;

//   const saveQuizResult = useCallback(async () => {
//     if (savingRef.current) {
//       console.log('📝 Quiz result already sent, skipping...');
//       return;
//     }

//     savingRef.current = true; // ✅ lock before running async work
//     try {
//       dispatch({ type: 'SET_LEVEL', payload: result });

//       const quizData = {
//         studentEmail: studentInfo.email,
//         fullName: studentInfo.fullName,
//         score: currentScore,
//         level: level,
//         wiseUrl: url,
//         answers: Object.values(answers).map((answer) => ({
//           questionId: answer.questionId,
//           answerId: answer.answerId,
//           score: answer.score,
//         })),
//       };

//       console.log('📤 Sending quiz result:', quizData);

//       const response = await fetch('http://localhost:7090/api/quiz/results', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(quizData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setEmailStatus('success');
//         console.log('✅ Quiz result saved successfully');
//       } else {
//         setEmailStatus('error');
//         setErrorMessage(data.error || 'Failed to save quiz result');
//         console.error('❌ Server error:', data.error);
//         savingRef.current = false; // allow retry
//       }
//     } catch (err) {
//       setEmailStatus('error');
//       setErrorMessage('Network error: could not reach server');
//       console.error('❌ Network error:', err);
//       savingRef.current = false; // allow retry
//     }
//   }, [dispatch, result, studentInfo, currentScore, answers, level, url]);

//   useEffect(() => {
//     if (studentInfo?.email && !savingRef.current) {
//       saveQuizResult();
//     }
//   }, [studentInfo?.email, saveQuizResult]);

//   const handleRedirectToWise = () => {
//     window.location.href = url;
//   };

//   const getLevelColor = (level) => {
//     switch (level) {
//       case 'beginner':
//         return 'from-green-400 to-blue-400';
//       case 'intermediate':
//         return 'from-blue-400 to-purple-400';
//       case 'advanced':
//         return 'from-purple-400 to-indigo-400';
//       default:
//         return 'from-indigo-400 to-blue-400';
//     }
//   };

//   return (
//     <div className="py-12 px-4">
//       <div className="container mx-auto max-w-2xl">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
//           <Card className="border-indigo-100 shadow-xl text-center">
//             <CardHeader>
//               <motion.div
//                 className="text-6xl mb-4"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
//               >
//                 🎉
//               </motion.div>
//               <CardTitle className="text-2xl font-outfit text-indigo-900">
//                 Assessment Complete!
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Your Yoruba level has been determined
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {emailStatus === 'sending' && (
//                 <Alert className="bg-blue-50 border-blue-200">
//                   <AlertDescription className="text-blue-800">
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
//                       Saving your results and sending welcome email...
//                     </div>
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {emailStatus === 'error' && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{errorMessage}</AlertDescription>
//                 </Alert>
//               )}

//               {emailStatus === 'success' && (
//                 <Alert className="bg-green-50 border-green-200">
//                   <AlertDescription className="text-green-800">
//                     ✅ Welcome email sent successfully! Check your inbox.
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <motion.div
//                 className={`bg-linear-to-r ${getLevelColor(level)} text-white rounded-2xl p-6 shadow-lg`}
//               >
//                 <h3 className="text-2xl font-bold mb-2 font-outfit">
//                   {level.charAt(0).toUpperCase() + level.slice(1)} Level
//                 </h3>
//                 <p className="text-white/90 font-outfit">
//                   Score: {currentScore} out of {quizConfig.questions.length}
//                 </p>
//               </motion.div>

//               <div className="text-left space-y-4 bg-indigo-50 rounded-lg p-6">
//                 <h4 className="font-semibold text-indigo-900 font-outfit">Next Steps:</h4>
//                 <ul className="space-y-3 text-gray-700">
//                   <li>✅ Check your email for your welcome message</li>
//                   <li>✅ Click below to create your Wise.live account</li>
//                   <li>✅ Begin your Yoruba learning journey!</li>
//                 </ul>
//               </div>

//               <Button
//                 onClick={handleRedirectToWise}
//                 size="lg"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-lg hover:shadow-xl transition-all duration-300"
//                 disabled={emailStatus === 'sending'}
//               >
//                 {emailStatus === 'sending' ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   'Continue to Wise.live to Create Account'
//                 )}
//               </Button>

//               <p className="text-sm text-gray-500">
//                 You’ll be redirected to our learning platform to complete your registration
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizResult;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useQuiz } from '@/contexts/QuizContext';
import { quizConfig, calculateLevel } from '@/config/quizConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuizResult = () => {
  const { state, dispatch } = useQuiz();
  const { currentScore, studentInfo, answers } = state;

  const [isProcessing, setIsProcessing] = useState(true); // Only track loading state
  const savingRef = useRef(false); // ✅ prevents duplicate triggers

  const result = calculateLevel(currentScore);
  const { level, url } = result;

  const saveQuizResult = useCallback(async () => {
    if (savingRef.current) {
      console.log('📝 Quiz result already sent, skipping...');
      return;
    }

    savingRef.current = true; // ✅ lock before running async work
    try {
      dispatch({ type: 'SET_LEVEL', payload: result });

      const quizData = {
        studentEmail: studentInfo.email,
        fullName: studentInfo.fullName,
        score: currentScore,
        level: level,
        wiseUrl: url,
        answers: Object.values(answers).map((answer) => ({
          questionId: answer.questionId,
          answerId: answer.answerId,
          score: answer.score,
        })),
      };

      console.log('📤 Sending quiz result:', quizData);

      const response = await fetch('http://localhost:7090/api/quiz/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Quiz result saved successfully');
        
        // ✅ SUCCESS TOAST with Sonner (auto-dismisses after 5 seconds)
        toast.success('Welcome email sent!', {
          description: 'Check your inbox for class details and next steps.',
          duration: 5000,
          position: 'top-center',
        });
      } else {
        console.error('❌ Server error:', data.error);
        
        // ✅ ERROR TOAST with Sonner (auto-dismisses after 5 seconds)
        toast.error('Failed to save results', {
          description: data.error || 'Something went wrong. Your level has been determined.',
          duration: 5000,
          position: 'top-center',
        });
        savingRef.current = false; // allow retry
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      
      // ✅ NETWORK ERROR TOAST with Sonner (auto-dismisses after 5 seconds)
      toast.error('Network error', {
        description: 'Could not connect to server. Your level has been determined.',
        duration: 5000,
        position: 'top-center',
      });
      savingRef.current = false; // allow retry
    } finally {
      setIsProcessing(false); // Always stop loading regardless of outcome
    }
  }, [dispatch, result, studentInfo, currentScore, answers, level, url]);

  useEffect(() => {
    if (studentInfo?.email && !savingRef.current) {
      saveQuizResult();
    }
  }, [studentInfo?.email, saveQuizResult]);

  const handleRedirectToWise = () => {
    window.location.href = url;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'from-green-400 to-blue-400';
      case 'intermediate':
        return 'from-blue-400 to-purple-400';
      case 'advanced':
        return 'from-purple-400 to-indigo-400';
      default:
        return 'from-indigo-400 to-blue-400';
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-indigo-100 shadow-xl text-center">
            <CardHeader>
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                🎉
              </motion.div>
              <CardTitle className="text-2xl font-outfit text-indigo-900">
                Assessment Complete!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your Yoruba level has been determined
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Only show loading state, no success/error alerts */}
              {isProcessing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-center text-blue-800">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800 mr-3"></div>
                    <span className="font-medium">Saving your results and sending welcome email...</span>
                  </div>
                </div>
              )}

              <motion.div
                className={`bg-linear-to-r ${getLevelColor(level)} text-white rounded-2xl p-6 shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-2 font-outfit">
                  {level.charAt(0).toUpperCase() + level.slice(1)} Level
                </h3>
                <p className="text-white/90 font-outfit">
                  Score: {currentScore} out of {quizConfig.questions.length}
                </p>
              </motion.div>

              <div className="text-left space-y-4 bg-indigo-50 rounded-lg p-6">
                <h4 className="font-semibold text-indigo-900 font-outfit">Next Steps:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>✅ Check your email for your welcome message</li>
                  <li>✅ Click below to create your Wise.live account</li>
                  <li>✅ Begin your Yoruba learning journey!</li>
                </ul>
              </div>

              <Button
                onClick={handleRedirectToWise}
                size="lg"
                className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Continue to Wise.live to Create Account'
                )}
              </Button>

              <p className="text-sm text-gray-500">
                You'll be redirected to our learning platform to complete your registration
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;