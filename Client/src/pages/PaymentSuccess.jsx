


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useSearchParams } from 'react-router-dom';

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const [emailStatus, setEmailStatus] = useState('checking');
//   const [checkCount, setCheckCount] = useState(0);
//   const studentEmail = searchParams.get('email');
//   const sessionId = searchParams.get('session_id');

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7090';

//   useEffect(() => {
//     const checkEmailStatus = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/payments/check-email-status?session_id=${sessionId}&email=${studentEmail}`
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         if (data.emailSent) {
//           setEmailStatus('sent');
//         } else if (checkCount >= 6) {
//           setEmailStatus('failed');
//         } else {
//           setEmailStatus('checking');
//           setCheckCount(prev => prev + 1);
//         }
//       } catch (error) {
//         if (checkCount >= 3) {
//           setEmailStatus('failed');
//         } else {
//           setCheckCount(prev => prev + 1);
//         }
//       }
//     };

//     if (sessionId && studentEmail) {
//       checkEmailStatus();
      
//       const interval = setInterval(checkEmailStatus, 5000);
//       const timeout = setTimeout(() => {
//         clearInterval(interval);
//         if (emailStatus === 'checking') {
//           setEmailStatus('failed');
//         }
//       }, 30000);

//       return () => {
//         clearInterval(interval);
//         clearTimeout(timeout);
//       };
//     } else {
//       setEmailStatus('failed');
//     }
//   }, [sessionId, studentEmail, API_BASE_URL, checkCount, emailStatus]);

//   const handleDownloadApp = () => {
//     window.open('https://roote-ancestral-learning.wise.live/download', '_blank');
//   };

//   const handleCheckEmail = () => {
//     if (studentEmail) {
//       window.location.href = `mailto:${studentEmail}`;
//     } else {
//       window.location.href = 'mailto:';
//     }
//   };

//   const handleContactSupport = () => {
//     window.location.href = 'mailto:admin@rooteancestrallearninghub.com?subject=Payment%20Confirmation%20Email%20Issue&body=Hello,%20I%20completed%20payment%20but%20did%20not%20receive%20my%20course%20codes.%20My%20email%20is:%20' + encodeURIComponent(studentEmail || '');
//   };

//   const renderEmailStatus = () => {
//     switch (emailStatus) {
//       case 'checking':
//         return (
//           <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-3 sm:p-4 mb-4">
//             <div className="flex items-start sm:items-center">
//               <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500 mr-3 mt-0.5 sm:mt-0"></div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-blue-800 font-semibold font-outfit text-sm sm:text-base">Processing Your Enrollment</h3>
//                 <p className="text-blue-700 text-xs sm:text-sm mt-1">
//                   Your course codes are being activated and will be sent to your email shortly...
//                   {checkCount > 0 && ` (Check ${checkCount}/6)`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       case 'sent':
//         return (
//           <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-3 sm:p-4 mb-4">
//             <div className="flex items-start sm:items-center">
//               <div className="w-5 h-5 sm:w-6 sm:h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-3 mt-0.5 sm:mt-0 shrink-0">
//                 <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-indigo-800 font-semibold font-outfit text-sm sm:text-base">Enrollment Email Sent!</h3>
//                 <p className="text-indigo-700 text-xs sm:text-sm mt-1 wrap-break-words">
//                   Your course codes have been delivered to {studentEmail || 'your email'}.
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       case 'failed':
//         return (
//           <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-3 sm:p-4 mb-4">
//             <div className="flex items-start sm:items-center">
//               <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 sm:mt-0 shrink-0">
//                 <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-yellow-800 font-semibold font-outfit text-sm sm:text-base">Email Delivery Check</h3>
//                 <p className="text-yellow-700 text-xs sm:text-sm mt-1">
//                   Your enrollment is confirmed! If you don't see the email within 5 minutes, check your spam folder or contact support.
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-amber-50 py-4 sm:py-8 px-3 sm:px-4">
//       <div className="container mx-auto max-w-2xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card className="border-indigo-100 shadow-2xl mx-2 sm:mx-0">
//             <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
//               <motion.div
//                 className="text-4xl sm:text-6xl mb-3 sm:mb-4"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
//               >
//                 🎉
//               </motion.div>
//               <CardTitle className="text-xl sm:text-3xl font-bold text-indigo-900 font-outfit leading-tight">
//                 Welcome to Roote!
//               </CardTitle>
//               <p className="text-indigo-600 mt-2 text-sm sm:text-lg">
//                 Your payment was successful and your course access is activated!
//               </p>
//             </CardHeader>
            
//             <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
//               {renderEmailStatus()}

//               <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-3 sm:p-4">
//                 <div className="flex items-start">
//                   <div className="shrink-0">
//                     <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-full flex items-center justify-center">
//                       <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="ml-3 flex-1 min-w-0">
//                     <h3 className="text-indigo-800 font-semibold text-base sm:text-lg font-outfit">Payment Confirmed!</h3>
//                     <p className="text-indigo-700 mt-1 text-sm sm:text-base">
//                       CAD 100 payment processed successfully. Your Yoruba course access is now active.
//                     </p>
//                     {sessionId && (
//                       <p className="text-indigo-600 text-xs sm:text-sm mt-2 break-all">
//                         Transaction ID: {sessionId}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <Button
//                     onClick={handleDownloadApp}
//                     size="lg"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-outfit py-2 sm:py-3 text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//                   >
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                     </svg>
//                     Download Learning App
//                   </Button>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <Button
//                     onClick={handleCheckEmail}
//                     variant="outline"
//                     size="lg"
//                     className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold font-outfit py-2 sm:py-3 text-sm sm:text-base transition-all duration-300"
//                   >
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                     </svg>
//                     Check Your Email
//                   </Button>
//                 </motion.div>

//                 {emailStatus === 'failed' && (
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     <Button
//                       onClick={handleContactSupport}
//                       variant="outline"
//                       size="lg"
//                       className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold font-outfit py-2 sm:py-3 text-sm sm:text-base transition-all duration-300"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                       </svg>
//                       Contact Support
//                     </Button>
//                   </motion.div>
//                 )}
//               </div>

//               <div className="text-center pt-3 sm:pt-4 border-t border-gray-200">
//                 <p className="text-xs sm:text-sm text-gray-600 wrap-break-words">
//                   Need help setting up? Contact us at{' '}
//                   <a 
//                     href="mailto:admin@rooteancestrallearninghub.com" 
//                     className="text-indigo-600 hover:text-indigo-700 font-semibold underline break-all"
//                   >
//                     admin@rooteancestrallearninghub.com
//                   </a>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   We're excited to have you join our Yoruba learning community! 🌍
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [emailStatus, setEmailStatus] = useState('checking');
  const [checkCount, setCheckCount] = useState(0);
  const studentEmail = searchParams.get('email');
  const sessionId = searchParams.get('session_id');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7090';

  useEffect(() => {
    const checkEmailStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/payments/check-email-status?session_id=${sessionId}&email=${studentEmail}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.emailSent) {
          setEmailStatus('sent');
        } else if (checkCount >= 6) {
          setEmailStatus('failed');
        } else {
          setEmailStatus('checking');
          setCheckCount(prev => prev + 1);
        }
      } catch (error) {
        if (checkCount >= 3) {
          setEmailStatus('failed');
        } else {
          setCheckCount(prev => prev + 1);
        }
      }
    };

    if (sessionId && studentEmail) {
      checkEmailStatus();
      
      const interval = setInterval(checkEmailStatus, 5000);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (emailStatus === 'checking') {
          setEmailStatus('failed');
        }
      }, 30000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setEmailStatus('failed');
    }
  }, [sessionId, studentEmail, API_BASE_URL, checkCount, emailStatus]);

  const handleDownloadApp = () => {
    window.open('https://roote-ancestral-learning.wise.live/download', '_blank');
  };

  const handleCheckEmail = () => {
    if (studentEmail) {
      window.location.href = `mailto:${studentEmail}`;
    } else {
      window.location.href = 'mailto:';
    }
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:admin@rooteancestrallearninghub.com?subject=Payment%20Confirmation%20Email%20Issue&body=Hello,%20I%20completed%20payment%20but%20did%20not%20receive%20my%20course%20codes.%20My%20email%20is:%20' + encodeURIComponent(studentEmail || '');
  };

  const renderEmailStatus = () => {
    switch (emailStatus) {
      case 'checking':
        return (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-blue-800 font-semibold font-outfit text-lg">Processing Your Enrollment</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Your course codes are being activated and will be sent to your email shortly...
                  {checkCount > 0 && ` (Check ${checkCount}/6)`}
                </p>
              </div>
            </div>
          </div>
        );
      case 'sent':
        return (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-800 font-semibold font-outfit text-lg">Enrollment Email Sent!</h3>
                <p className="text-emerald-700 text-sm mt-1 wrap-break-words">
                  Your course codes have been delivered to {studentEmail || 'your email'}.
                </p>
              </div>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-amber-800 font-semibold font-outfit text-lg">Email Delivery Check</h3>
                <p className="text-amber-700 text-sm mt-1">
                  Your enrollment is confirmed! If you don't see the email within 5 minutes, check your spam folder or contact support.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-6 pt-8 px-6 bg-linear-to-r  text-indigo-800">
              <motion.div
                className="text-5xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                🎉
              </motion.div>
              <CardTitle className="text-3xl font-bold font-outfit">
                Welcome to Roote!
              </CardTitle>
              <p className="text-indigo-800 text-lg mt-2">
                Your payment was successful and your course access is activated!
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              {renderEmailStatus()}

              <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg font-outfit">Payment Confirmed!</h3>
                    <p className="text-white/90 mt-1">
                      CAD 100 payment processed successfully. Your Yoruba course access is now active.
                    </p>
                    {sessionId && (
                      <p className="text-white/80 text-sm mt-2 break-all bg-white/10 rounded-lg px-3 py-2">
                        Transaction ID: {sessionId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleDownloadApp}
                    size="lg"
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold font-outfit py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
                  >
                    <div className="flex items-center space-x-2">
                      <span>📱</span>
                      <span>Download Roote Learning App</span>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleCheckEmail}
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold font-outfit py-6 text-lg transition-all duration-300 rounded-2xl"
                  >
                    <div className="flex items-center space-x-2">
                      <span>📧</span>
                      <span>Check Your Email</span>
                    </div>
                  </Button>
                </motion.div>

                {emailStatus === 'failed' && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      onClick={handleContactSupport}
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 font-semibold font-outfit py-6 text-lg transition-all duration-300 rounded-2xl"
                    >
                      <div className="flex items-center space-x-2">
                        <span>💬</span>
                        <span>Contact Support</span>
                      </div>
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 wrap-break-words">
                  Need help setting up? Contact us at{' '}
                  <a 
                    href="mailto:admin@rooteancestrallearninghub.com" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline break-all"
                  >
                    admin@rooteancestrallearninghub.com
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  We're excited to have you join our Yoruba learning community! 🌍
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;