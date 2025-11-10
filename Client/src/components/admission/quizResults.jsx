

// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import { useQuiz } from "@/contexts/quizContext";
// import { quizConfig, calculateLevel } from "@/config/quizConfig";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const QuizResult = () => {
//   const { state, dispatch } = useQuiz();
//   const { currentScore, studentInfo, answers } = state;

//   const [isProcessing, setIsProcessing] = useState(true);
//   const savingRef = useRef(false);

//   const result = calculateLevel(currentScore);
//   const { level, url } = result;

//   // ✅ Get API URL from Vite environment variables
//   const API_BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:7090";

//   const saveQuizResult = useCallback(async () => {
//     if (savingRef.current) {
//       console.log("📝 Quiz result already sent, skipping...");
//       return;
//     }

//     savingRef.current = true;
//     try {
//       dispatch({ type: "SET_LEVEL", payload: result });

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

//       console.log("📤 Sending quiz result:", quizData);

//       // ✅ Use the correct API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}/api/quiz/results`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(quizData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         console.log("✅ Quiz result saved successfully");

//         toast.success("Welcome email sent!", {
//           description: "Check your inbox for class details and next steps.",
//           duration: 5000,
//           position: "top-center",
//         });
//       } else {
//         console.error("❌ Server error:", data.error);

//         toast.error("Failed to save results", {
//           description:
//             data.error ||
//             "Something went wrong. Your level has been determined.",
//           duration: 5000,
//           position: "top-center",
//         });
//         savingRef.current = false;
//       }
//     } catch (err) {
//       console.error("❌ Network error:", err);

//       toast.error("Network error", {
//         description:
//           "Could not connect to server. Your level has been determined.",
//         duration: 5000,
//         position: "top-center",
//       });
//       savingRef.current = false;
//     } finally {
//       setIsProcessing(false);
//     }
//   }, [
//     dispatch,
//     result,
//     studentInfo,
//     currentScore,
//     answers,
//     level,
//     url,
//     API_BASE_URL,
//   ]);

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
//       case "beginner":
//         return "from-green-400 to-blue-400";
//       case "middle":
//         return "from-blue-400 to-purple-400";
//       case "advanced":
//         return "from-purple-400 to-indigo-400";
//       default:
//         return "from-indigo-400 to-blue-400";
//     }
//   };

//   return (
//     <div className="py-12 px-4">
//       <div className="container mx-auto max-w-2xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <Card className="border-indigo-100 shadow-xl text-center">
//             <CardHeader>
//               <motion.div
//                 className="text-6xl mb-4"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
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
//               {isProcessing && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-center justify-center text-blue-800">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800 mr-3"></div>
//                     <span className="font-medium">
//                       Saving your results and sending welcome email...
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <motion.div
//                 className={`bg-linear-to-r ${getLevelColor(
//                   level
//                 )} text-white rounded-2xl p-6 shadow-lg`}
//               >
//                 <h3 className="text-2xl font-bold mb-2 font-outfit">
//                   {level.charAt(0).toUpperCase() + level.slice(1)} Level
//                 </h3>
//                 <p className="text-white/90 font-outfit">
//                   Score: {currentScore} out of {quizConfig.questions.length}
//                 </p>
//               </motion.div>

//               <div className="text-left space-y-4 bg-indigo-50 rounded-lg p-6">
//                 <h4 className="font-semibold text-indigo-900 font-outfit">
//                   Next Steps:
//                 </h4>
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
//                 disabled={isProcessing}
//               >
//                 {isProcessing ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   "Continue to Wise.live to Create Account"
//                 )}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="w-full mt-4 border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-outfit transition-all duration-300"
//                 onClick={() => (window.location.href = "/thank-you")}
//               >
//                 Not Ready Yet
//               </Button>

//               <p className="text-sm text-gray-500">
//                 You'll be redirected to our learning platform to complete your
//                 registration
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default QuizResult;


import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useQuiz } from "@/contexts/quizContext";
import { quizConfig, calculateLevel } from "@/config/quizConfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const QuizResult = () => {
  const { state, dispatch } = useQuiz();
  const { currentScore, studentInfo, answers } = state;

  const [isProcessing, setIsProcessing] = useState(true);
  const savingRef = useRef(false);

  const result = calculateLevel(currentScore);
  const { level, url, courseId } = result;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7090";

  const saveQuizResult = useCallback(async () => {
    if (savingRef.current) {
      console.log("📝 Quiz result already sent, skipping...");
      return;
    }

    savingRef.current = true;
    try {
      dispatch({ type: "SET_LEVEL", payload: result });

      const quizData = {
        studentEmail: studentInfo.email,
        fullName: studentInfo.fullName,
        score: currentScore,
        level: level,
        wiseUrl: url,
        courseId: courseId,
        answers: Object.values(answers).map((answer) => ({
          questionId: answer.questionId,
          answerId: answer.answerId,
          score: answer.score,
        })),
      };

      console.log("📤 Sending quiz result:", quizData);

      const response = await fetch(`${API_BASE_URL}/api/quiz/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Quiz result saved successfully");
        
        toast.success("Welcome email sent!", {
          description: `Check your inbox for class details. Your Course ID: ${courseId}`,
          duration: 5000,
          position: "top-center",
        });
      } else {
        console.error("❌ Server error:", data.error);
        toast.error("Failed to save results", {
          description: data.error || "Something went wrong. Your level has been determined.",
          duration: 5000,
          position: "top-center",
        });
        savingRef.current = false;
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      toast.error("Network error", {
        description: "Could not connect to server. Your level has been determined.",
        duration: 5000,
        position: "top-center",
      });
      savingRef.current = false;
    } finally {
      setIsProcessing(false);
    }
  }, [
    dispatch,
    result,
    studentInfo,
    currentScore,
    answers,
    level,
    url,
    courseId,
    API_BASE_URL,
  ]);

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
      case "beginner":
        return "from-green-400 to-blue-400";
      case "middle":
        return "from-blue-400 to-purple-400";
      case "advanced":
        return "from-purple-400 to-indigo-400";
      default:
        return "from-indigo-400 to-blue-400";
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
              <CardTitle className="text-2xl font-outfit text-indigo-900">
                Assessment Complete!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your Yoruba level has been determined
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isProcessing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-center text-blue-800">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800 mr-3"></div>
                    <span className="font-medium">
                      Saving your results and sending welcome email...
                    </span>
                  </div>
                </div>
              )}

              <motion.div
                className={`bg-linear-to-r ${getLevelColor(
                  level
                )} text-white rounded-2xl p-6 shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-2 font-outfit">
                  {level.charAt(0).toUpperCase() + level.slice(1)} Level
                </h3>
                <p className="text-white/90 font-outfit">
                  Score: {currentScore} out of {quizConfig.questions.length}
                </p>
              </motion.div>

              {/* Course ID Display */}
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 text-center">
                <h4 className="text-indigo-900 font-bold text-lg mb-2 font-outfit">
                  Your Course ID
                </h4>
                <div className="text-4xl font-bold text-indigo-700 font-mono tracking-wider mb-2">
                  {courseId}
                </div>
                <p className="text-indigo-600 text-sm">
                  Save this code - you'll need it to join your class
                </p>
              </div>

              <div className="text-left space-y-4 bg-indigo-50 rounded-lg p-6">
                <h4 className="font-semibold text-indigo-900 font-outfit">
                  Next Steps:
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>✅ Check your email for your welcome message</li>
                  <li>✅ Click below to download the Roote Ancestral Learning Hub App</li>
                  <li>✅ Use Course ID: <strong>{courseId}</strong> to join your class</li>
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
                  "Download Roote Ancestral Learning Hub App"
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full mt-4 border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-outfit transition-all duration-300"
                onClick={() => (window.location.href = "/thank-you")}
              >
                Not Ready Yet
              </Button>

              <p className="text-sm text-gray-500">
                You'll be redirected to download our learning platform app
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;