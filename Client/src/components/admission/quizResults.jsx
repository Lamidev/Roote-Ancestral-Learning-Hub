

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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(true);
  const [stripeSession, setStripeSession] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isFreePeriod, setIsFreePeriod] = useState(false);
  const [countdown, setCountdown] = useState(8); // 8 seconds countdown
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const savingRef = useRef(false);
  const countdownRef = useRef(null);

  const result = calculateLevel(currentScore);
  const { level, url, courseId } = result;

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:7090"
      : "https://api.rooteancestrallearninghub.com");

  const startCountdown = () => {
    setShowRedirectMessage(true);
    setCountdown(8);
    
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          navigate("/thank-you");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, []);

  const createStripeCheckoutSession = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentEmail: studentInfo.email,
            studentName: studentInfo.fullName,
            level: level,
            courseId: courseId,
            amount: 10000,
            currency: "cad",
            successUrl: `${
              window.location.origin
            }/payment-success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
              studentInfo.email
            )}`,
            cancelUrl: `${
              window.location.origin
            }/payment-return?status=cancelled&student_email=${encodeURIComponent(
              studentInfo.email
            )}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.id) {
        setStripeSession(data);
        return data;
      } else if (data.error === 'Free period active') {
        setIsFreePeriod(true);
        return { freePeriod: true };
      } else {
        throw new Error(data.error || "Failed to create payment session");
      }
    } catch (error) {
      toast.error("Payment system temporarily unavailable", {
        description:
          "You can still proceed with manual payment. Contact support for assistance.",
        duration: 8000,
      });
      throw error;
    }
  };

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

      const quizData = {
        studentEmail: studentInfo.email,
        fullName: studentInfo.fullName,
        score: typeof currentScore === "number" ? currentScore : 0,
        level: level || "beginner",
        wiseUrl: `${window.location.origin}/payment`,
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
        setIsFreePeriod(data.data.isFreePeriodActive);

        if (data.data.isFreePeriodActive) {
          toast.success("🎉 Free Class Access Granted!", {
            description: `Welcome to your free Yoruba class on January 3rd, 2026 at 12 PM CST! Check your email for access details.`,
            duration: 8000,
          });
          
          // Start countdown for redirect
          setTimeout(() => {
            startCountdown();
          }, 2000); // Wait 2 seconds before showing countdown
        } else {
          try {
            const stripeResult = await createStripeCheckoutSession();
            
            if (stripeResult.freePeriod) {
              setIsFreePeriod(true);
              toast.success("🎉 Free Class Access Granted!", {
                description: `Welcome to your free Yoruba class on January 3rd, 2026 at 12 PM CST! Check your email for access details.`,
                duration: 8000,
              });
              
              // Start countdown for redirect
              setTimeout(() => {
                startCountdown();
              }, 2000); // Wait 2 seconds before showing countdown
            } else {
              setStripeSession(stripeResult);
              toast.success("Payment Ready!", {
                description: `Complete payment of CAD 100 to access your ${level} level class.`,
                duration: 6000,
              });
            }
          } catch (stripeError) {
            toast.info("Quiz Submitted Successfully", {
              description:
                "Your level has been determined. Payment system is temporarily unavailable - please contact support.",
              duration: 8000,
            });
          }
        }
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
    navigate,
  ]);

  useEffect(() => {
    if (studentInfo?.email && !savingRef.current) {
      saveQuizResult();
    }
  }, [studentInfo?.email, saveQuizResult]);

  const handleRedirectToPayment = () => {
    if (stripeSession?.url) {
      window.location.href = stripeSession.url;
    } else {
      toast.error("Payment system not ready", {
        description:
          "Please wait while we set up your payment session, or try refreshing the page.",
        duration: 4000,
      });
    }
  };

  const handleManualPayment = () => {
    toast.info("Contact Support", {
      description:
        "Please email admin@rooteancestrallearninghub.com for manual payment instructions.",
      duration: 6000,
    });
  };

  const handleSkipPayment = () => {
    dispatch({ type: "SET_LEVEL", payload: result });

    toast.success("Assessment Complete!", {
      description:
        "You can always complete payment later to access your class.",
      duration: 5000,
    });

    setTimeout(() => {
      navigate("/thank-you");
    }, 1500);
  };

  const handleManualRedirect = () => {
    stopCountdown();
    navigate("/thank-you");
  };

  const handleStayOnPage = () => {
    stopCountdown();
    setShowRedirectMessage(false);
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

  const getStatusIcon = () => {
    if (isFreePeriod) return "🎉";
    if (saveSuccess) return "✅";
    return "📝";
  };

  const getStatusTitle = () => {
    if (isFreePeriod) return "Free Class Access Granted!";
    if (saveSuccess) return "Quiz Submitted!";
    return "Assessment Complete!";
  };

  const getStatusDescription = () => {
    if (isFreePeriod) return "Welcome to your free Yoruba class on January 3rd, 2026 at 12 PM CST! Check your email for access details.";
    if (saveSuccess) return "Your Yoruba level has been determined - Complete payment to receive course access";
    return "Processing your results...";
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
                {getStatusIcon()}
              </motion.div>
              <CardTitle className="text-2xl font-outfit text-indigo-900">
                {getStatusTitle()}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {getStatusDescription()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isProcessing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-center text-blue-800">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800 mr-3"></div>
                    <span className="font-medium">
                      {saveSuccess
                        ? isFreePeriod
                          ? "Setting up your free class access..."
                          : "Setting up payment..."
                        : "Saving your results..."}
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
                {!isFreePeriod && (
                  <div className="mt-4 bg-white/20 rounded-lg p-3">
                    <p className="font-bold text-lg">CAD 100</p>
                    <p className="text-sm">
                      One-time payment for full course access
                    </p>
                  </div>
                )}
              </motion.div>

              {saveSuccess && !isFreePeriod && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      onClick={handleRedirectToPayment}
                      size="lg"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isProcessing || !stripeSession}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Setting up payment...
                        </>
                      ) : !stripeSession ? (
                        "Preparing payment..."
                      ) : (
                        "💳 Pay CAD 100 & Continue to Class"
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      onClick={handleSkipPayment}
                      variant="outline"
                      size="lg"
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-outfit transition-all duration-300"
                    >
                      Skip Payment for Now
                    </Button>
                  </motion.div>

                  {!stripeSession && !isProcessing && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        onClick={handleManualPayment}
                        variant="outline"
                        size="lg"
                        className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-outfit transition-all duration-300"
                      >
                        💳 Manual Payment Option
                      </Button>
                    </motion.div>
                  )}
                </>
              )}

              {isFreePeriod && saveSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-center">
                    🎉 Free class access activated for January 3rd, 2026 at 12 PM CST! Check your email for enrollment codes and class details.
                  </p>
                  
                  {showRedirectMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="text-amber-600">
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <p className="text-amber-700 font-medium">
                            Redirecting to Thank You page in {countdown} seconds...
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={handleManualRedirect}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            Go Now
                          </Button>
                          <Button
                            onClick={handleStayOnPage}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                          >
                            Stay Here
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {!showRedirectMessage && (
                    <Button
                      onClick={handleManualRedirect}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    >
                      Continue to Thank You Page
                    </Button>
                  )}
                </div>
              )}

              {!saveSuccess && !isProcessing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    There was an issue saving your results. Please refresh the page or contact support.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;