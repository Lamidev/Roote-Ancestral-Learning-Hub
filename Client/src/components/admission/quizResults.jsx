

// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
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
//   const navigate = useNavigate();

//   const [isProcessing, setIsProcessing] = useState(true);
//   const [stripeSession, setStripeSession] = useState(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const savingRef = useRef(false);

//   const result = calculateLevel(currentScore);
//   const { level, url, courseId } = result;

//   const API_BASE_URL =
//     import.meta.env.VITE_API_BASE_URL ||
//     (window.location.hostname === "localhost"
//       ? "http://localhost:7090"
//       : "https://api.rooteancestrallearninghub.com");

//   const createStripeCheckoutSession = async () => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/payments/create-checkout-session`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             studentEmail: studentInfo.email,
//             studentName: studentInfo.fullName,
//             level: level,
//             courseId: courseId,
//             amount: 10000,
//             currency: "cad",
//             successUrl: `${
//               window.location.origin
//             }/payment-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
//               studentInfo.email
//             )}`,
//             cancelUrl: `${
//               window.location.origin
//             }/payment-return?status=cancelled&student_email=${encodeURIComponent(
//               studentInfo.email
//             )}`,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.id) {
//         setStripeSession(data);
//         return data;
//       } else {
//         throw new Error(data.error || "Failed to create payment session");
//       }
//     } catch (error) {
//       toast.error("Payment system temporarily unavailable", {
//         description:
//           "You can still proceed with manual payment. Contact support for assistance.",
//         duration: 8000,
//       });
//       throw error;
//     }
//   };

//   const saveQuizResult = useCallback(async () => {
//     if (savingRef.current) return;

//     if (!studentInfo?.email || !studentInfo?.fullName) {
//       toast.error("Cannot save quiz result: missing student info");
//       setIsProcessing(false);
//       return;
//     }

//     savingRef.current = true;
//     try {
//       dispatch({ type: "SET_LEVEL", payload: result });

//       const quizData = {
//         studentEmail: studentInfo.email,
//         fullName: studentInfo.fullName,
//         score: typeof currentScore === "number" ? currentScore : 0,
//         level: level || "beginner",
//         wiseUrl: `${window.location.origin}/payment`,
//         courseId: courseId,
//         answers: Array.isArray(answers)
//           ? answers.map((answer, index) => ({
//               questionId: answer.questionId ?? index + 1,
//               answerId: answer.answerId ?? "",
//               score: answer.score ?? 0,
//             }))
//           : [],
//       };

//       const response = await fetch(`${API_BASE_URL}/api/quiz/results`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(quizData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         setSaveSuccess(true);

//         try {
//           await createStripeCheckoutSession();
//           toast.success("Payment Ready!", {
//             description: `Complete payment of CAD 100 to access your ${level} level class.`,
//             duration: 6000,
//           });
//         } catch (stripeError) {
//           toast.info("Quiz Submitted Successfully", {
//             description:
//               "Your level has been determined. Payment system is temporarily unavailable - please contact support.",
//             duration: 8000,
//           });
//         }
//       } else {
//         throw new Error(data.error || "Server returned error");
//       }
//     } catch (err) {
//       toast.error("Submission Error", {
//         description:
//           "Your level has been determined but we couldn't save your results. You can still proceed with payment.",
//         duration: 6000,
//       });
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
//     courseId,
//     API_BASE_URL,
//   ]);

//   useEffect(() => {
//     if (studentInfo?.email && !savingRef.current) {
//       saveQuizResult();
//     }
//   }, [studentInfo?.email, saveQuizResult]);

//   const handleRedirectToPayment = () => {
//     if (stripeSession?.url) {
//       window.location.href = stripeSession.url;
//     } else {
//       toast.error("Payment system not ready", {
//         description:
//           "Please wait while we set up your payment session, or try refreshing the page.",
//         duration: 4000,
//       });
//     }
//   };

//   const handleManualPayment = () => {
//     toast.info("Contact Support", {
//       description:
//         "Please email admin@rooteancestrallearninghub.com for manual payment instructions.",
//       duration: 6000,
//     });
//   };

//   const handleSkipPayment = () => {
//     dispatch({ type: "SET_LEVEL", payload: result });

//     toast.success("Assessment Complete!", {
//       description:
//         "You can always complete payment later to access your class.",
//       duration: 5000,
//     });

//     setTimeout(() => {
//       navigate("/thank-you");
//     }, 1500);
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
//                 {saveSuccess ? "✅" : "📝"}
//               </motion.div>
//               <CardTitle className="text-2xl font-outfit text-indigo-900">
//                 {saveSuccess ? "Quiz Submitted!" : "Assessment Complete!"}
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 {saveSuccess
//                   ? "Your Yoruba level has been determined - Complete payment to receive course access"
//                   : "Processing your results..."}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {isProcessing && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-center justify-center text-blue-800">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800 mr-3"></div>
//                     <span className="font-medium">
//                       {saveSuccess
//                         ? "Setting up payment..."
//                         : "Saving your results..."}
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
//                 <div className="mt-4 bg-white/20 rounded-lg p-3">
//                   <p className="font-bold text-lg">CAD 100</p>
//                   <p className="text-sm">
//                     One-time payment for full course access
//                   </p>
//                 </div>
//               </motion.div>

//               {saveSuccess && (
//                 <>
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     <Button
//                       onClick={handleRedirectToPayment}
//                       size="lg"
//                       className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-lg hover:shadow-xl transition-all duration-300"
//                       disabled={isProcessing || !stripeSession}
//                     >
//                       {isProcessing ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                           Setting up payment...
//                         </>
//                       ) : !stripeSession ? (
//                         "Preparing payment..."
//                       ) : (
//                         "💳 Pay CAD 100 & Continue to Class"
//                       )}
//                     </Button>
//                   </motion.div>

//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     <Button
//                       onClick={handleSkipPayment}
//                       variant="outline"
//                       size="lg"
//                       className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-outfit transition-all duration-300"
//                     >
//                       Skip Payment for Now
//                     </Button>
//                   </motion.div>

//                   {!stripeSession && !isProcessing && (
//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 400 }}
//                     >
//                       <Button
//                         onClick={handleManualPayment}
//                         variant="outline"
//                         size="lg"
//                         className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-outfit transition-all duration-300"
//                       >
//                         💳 Manual Payment Option
//                       </Button>
//                     </motion.div>
//                   )}
//                 </>
//               )}

//               {!saveSuccess && !isProcessing && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                   <p className="text-yellow-800">
//                     There was an issue saving your results. Please refresh the
//                     page or contact support.
//                   </p>
//                 </div>
//               )}
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
import { CheckCircle, Copy, ExternalLink, Calendar, Clock, Key, Mail, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizResult = () => {
  const { state, dispatch } = useQuiz();
  const { currentScore, studentInfo, answers } = state;
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [browserUrl, setBrowserUrl] = useState("");
  const [hasRedirected, setHasRedirected] = useState(false);
  const savingRef = useRef(false);

  const result = calculateLevel(currentScore, studentInfo?.email);
  const { level, courseId } = result;
  const instituteCode = "roote-ancestral-learning";
  const freeClassDate = "January 3, 2026";
  const freeClassTime = "12:00 PM CST";

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:7090"
      : "https://api.rooteancestrallearninghub.com");

  const saveQuizResult = useCallback(async () => {
    if (savingRef.current) return;

    if (!studentInfo?.email || !studentInfo?.fullName) {
      toast.error("Cannot save quiz result: missing student info");
      setIsProcessing(false);
      return;
    }

    savingRef.current = true;
    try {
      dispatch({ type: "SET_LEVEL", payload: result });

      const browserAccessUrl = quizConfig.wiseUrls[level];
      setBrowserUrl(browserAccessUrl);

      const quizData = {
        studentEmail: studentInfo.email,
        fullName: studentInfo.fullName,
        score: typeof currentScore === "number" ? currentScore : 0,
        level: level || "beginner",
        wiseUrl: browserAccessUrl,
        courseId: courseId,
        answers: Array.isArray(answers)
          ? answers.map((answer, index) => ({
              questionId: answer.questionId ?? index + 1,
              answerId: answer.answerId ?? "",
              score: answer.score ?? 0,
            }))
          : [],
      };

      const response = await fetch(`${API_BASE_URL}/api/quiz/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSaveSuccess(true);
        toast.success("🎉 Free Class Access Ready!", {
          description: `Click "Start Learning" to join!`,
          duration: 8000,
        });
      } else {
        throw new Error(data.error || "Server returned error");
      }
    } catch (err) {
      toast.error("Submission Error", {
        description:
          "There was an issue saving your results. Please refresh the page or contact support.",
        duration: 6000,
      });
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
    courseId,
    API_BASE_URL,
  ]);

  useEffect(() => {
    if (studentInfo?.email && !savingRef.current) {
      saveQuizResult();
    }
  }, [studentInfo?.email, saveQuizResult]);

  const handleCopyCode = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  };

  const handleStartLearning = () => {
    if (browserUrl && !hasRedirected) {
      setHasRedirected(true);
      window.open(browserUrl, "_blank");
      
      setTimeout(() => {
        dispatch({ type: "RESET_QUIZ" });
        toast.info("Quiz completed! Feel free to take it again or explore our site.");
      }, 1000);
    }
  };

  const handleReturnHome = () => {
    dispatch({ type: "RESET_QUIZ" });
    navigate("/");
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "from-purple-500 to-indigo-500";
      case "middle":
        return "from-indigo-500 to-purple-500";
      case "advanced":
        return "from-purple-600 to-indigo-600";
      default:
        return "from-indigo-500 to-purple-500";
    }
  };

  if (isProcessing) {
    return (
      <div className="py-8 sm:py-12 px-4 min-h-screen bg-linear-to-b from-indigo-50 to-white">
        <div className="container mx-auto max-w-md sm:max-w-lg">
          <Card className="border-indigo-100 shadow-xl text-center">
            <CardContent className="p-8 sm:p-12">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-indigo-600 mx-auto mb-4 sm:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2 font-outfit">Preparing Your Access</h3>
              <p className="text-sm sm:text-base text-gray-600">Creating your personalized learning account...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 bg-linear-to-b from-indigo-50 to-white min-h-screen">
      <div className="container mx-auto max-w-lg sm:max-w-2xl lg:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-indigo-200 shadow-2xl overflow-hidden">
            <CardHeader className="text-center pb-6 sm:pb-8 bg-linear-to-r from-purple-50 to-indigo-50">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-outfit text-indigo-900 font-bold">
                  Assessment Complete! 🎉
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-gray-600 mt-2 max-w-md mx-auto">
                  Your free class access is ready
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 sm:p-8">
              {/* Level Display */}
              <div className="text-center mb-6 sm:mb-8">
                <div className={`inline-block bg-linear-to-r ${getLevelColor(level)} text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg`}>
                  <h2 className="text-lg sm:text-xl font-bold">Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h2>
                  <p className="text-sm sm:text-base opacity-90">Score: {currentScore} out of {quizConfig.totalQuestions}</p>
                </div>
              </div>

              {/* Main Action Button */}
              <div className="mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 sm:py-6 text-base sm:text-xl font-bold shadow-lg rounded-lg h-auto"
                    onClick={handleStartLearning}
                    disabled={hasRedirected}
                  >
                    <ExternalLink className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                    {hasRedirected ? "Class Opened!" : "Start Learning Now"}
                  </Button>
                </motion.div>
                {hasRedirected && (
                  <p className="text-center text-purple-600 text-xs sm:text-sm mt-2">
                    Your class has been opened in a new tab. You can close this page.
                  </p>
                )}
              </div>

              {/* Class Details */}
              <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-linear-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <h3 className="text-base sm:text-lg font-bold text-purple-900 mb-3 sm:mb-4 flex items-center gap-2 font-outfit">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0" />
                  Free Class Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white rounded border border-purple-100 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800 text-xs sm:text-sm">Date</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-purple-900">{freeClassDate}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-white rounded border border-purple-100 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800 text-xs sm:text-sm">Time</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-purple-900">{freeClassTime}</p>
                  </div>
                </div>
              </div>

              {/* Access Codes */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5 font-outfit">Your Access Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-linear-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Key className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="font-bold text-purple-800 text-sm sm:text-base truncate">Institute Code</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyCode(instituteCode, "Institute Code")}
                        className="h-8 px-2 ml-2 text-purple-700 hover:bg-purple-100 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-mono font-bold text-purple-800 bg-white p-2 sm:p-3 rounded border border-purple-300 inline-block min-w-[200px]">
                        {instituteCode}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-bold text-indigo-800 text-sm sm:text-base truncate">Course ID</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyCode(courseId, "Course ID")}
                        className="h-8 px-2 ml-2 text-indigo-700 hover:bg-indigo-100 shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-mono font-bold text-indigo-800 bg-white p-2 sm:p-3 rounded border border-indigo-300 inline-block min-w-[200px]">
                        {courseId}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="p-4 sm:p-5 bg-linear-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-purple-800 text-sm sm:text-base font-outfit">Email Sent</p>
                    <p className="text-purple-700 text-xs sm:text-sm truncate">
                      Complete instructions sent to <strong>{studentInfo?.email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 text-sm sm:text-base h-12"
                  onClick={handleReturnHome}
                >
                  <Home className="mr-2 w-4 h-4" />
                  Return Home
                </Button>
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-sm sm:text-base h-12"
                  onClick={() => {
                    dispatch({ type: "RESET_QUIZ" });
                    navigate("/admission");
                  }}
                >
                  Take Quiz Again
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              Need help? Email{' '}
              <a 
                href="mailto:admin@rooteancestrallearninghub.com" 
                className="text-purple-600 hover:underline font-medium"
              >
                admin@rooteancestrallearninghub.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;
