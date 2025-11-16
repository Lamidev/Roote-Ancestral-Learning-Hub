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

//   // Dynamic API base URL
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7090';

//   useEffect(() => {
//     const checkEmailStatus = async () => {
//       try {
//         console.log('📧 Checking email status for:', studentEmail, 'session:', sessionId);
        
//         const response = await fetch(
//           `${API_BASE_URL}/api/payments/check-email-status?session_id=${sessionId}&email=${studentEmail}`
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('📧 Email status response:', data);
        
//         if (data.emailSent) {
//           setEmailStatus('sent');
//         } else if (checkCount >= 6) { // After 30 seconds (6 checks)
//           setEmailStatus('failed');
//         } else {
//           setEmailStatus('checking');
//           setCheckCount(prev => prev + 1);
//         }
//       } catch (error) {
//         console.error('Error checking email status:', error);
//         if (checkCount >= 3) { // Faster fail on errors
//           setEmailStatus('failed');
//         } else {
//           setCheckCount(prev => prev + 1);
//         }
//       }
//     };

//     if (sessionId && studentEmail) {
//       // Check immediately
//       checkEmailStatus();
      
//       // Then check every 5 seconds for up to 30 seconds
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
//       // If no session/email params, assume email might be delayed
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
//           <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
//             <div className="flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
//               <div>
//                 <h3 className="text-blue-800 font-semibold">Processing Your Enrollment</h3>
//                 <p className="text-blue-700 text-sm">
//                   Your course codes are being activated and will be sent to your email shortly...
//                   {checkCount > 0 && ` (Check ${checkCount}/6)`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       case 'sent':
//         return (
//           <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-4 mb-4">
//             <div className="flex items-center">
//               <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-indigo-800 font-semibold">Enrollment Email Sent!</h3>
//                 <p className="text-indigo-700 text-sm">
//                   Your course codes have been delivered to {studentEmail || 'your email'}.
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       case 'failed':
//         return (
//           <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-4">
//             <div className="flex items-center">
//               <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-yellow-800 font-semibold">Email Delivery Check</h3>
//                 <p className="text-yellow-700 text-sm">
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
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 to-emerald-100 py-8 px-4">
//       <div className="container mx-auto max-w-2xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card className="border-indigo-200 shadow-2xl">
//             <CardHeader className="text-center pb-4">
//               <motion.div
//                 className="text-6xl mb-4"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
//               >
//                 🎉
//               </motion.div>
//               <CardTitle className="text-3xl font-bold text-indigo-800">
//                 Welcome to Roote!
//               </CardTitle>
//               <p className="text-indigo-600 mt-2 text-lg">
//                 Your payment was successful and your course access is activated!
//               </p>
//             </CardHeader>
            
//             <CardContent className="space-y-6">
//               {renderEmailStatus()}

//               <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-4">
//                 <div className="flex items-start">
//                   <div className="shrink-0">
//                     <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-indigo-800 font-semibold text-lg">Payment Confirmed!</h3>
//                     <p className="text-indigo-700 mt-1">
//                       CAD 100 payment processed successfully. Your Yoruba course access is now active.
//                     </p>
//                     {sessionId && (
//                       <p className="text-indigo-600 text-sm mt-2">
//                         Transaction ID: {sessionId}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <Button
//                   onClick={handleDownloadApp}
//                   size="lg"
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                   </svg>
//                   Download Learning App
//                 </Button>

//                 <Button
//                   onClick={handleCheckEmail}
//                   variant="outline"
//                   size="lg"
//                   className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 transition-all duration-300"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                   </svg>
//                   Check Your Email
//                 </Button>

//                 {emailStatus === 'failed' && (
//                   <Button
//                     onClick={handleContactSupport}
//                     variant="outline"
//                     size="lg"
//                     className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 transition-all duration-300"
//                   >
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                     </svg>
//                     Contact Support
//                   </Button>
//                 )}
//               </div>

//               <div className="text-center pt-4 border-t border-gray-200">
//                 <p className="text-sm text-gray-600">
//                   Need help setting up? Contact us at{' '}
//                   <a 
//                     href="mailto:admin@rooteancestrallearninghub.com" 
//                     className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
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
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <div>
                <h3 className="text-blue-800 font-semibold font-outfit">Processing Your Enrollment</h3>
                <p className="text-blue-700 text-sm">
                  Your course codes are being activated and will be sent to your email shortly...
                  {checkCount > 0 && ` (Check ${checkCount}/6)`}
                </p>
              </div>
            </div>
          </div>
        );
      case 'sent':
        return (
          <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-indigo-800 font-semibold font-outfit">Enrollment Email Sent!</h3>
                <p className="text-indigo-700 text-sm">
                  Your course codes have been delivered to {studentEmail || 'your email'}.
                </p>
              </div>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-800 font-semibold font-outfit">Email Delivery Check</h3>
                <p className="text-yellow-700 text-sm">
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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-amber-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-indigo-100 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                🎉
              </motion.div>
              <CardTitle className="text-3xl font-bold text-indigo-900 font-outfit">
                Welcome to Roote!
              </CardTitle>
              <p className="text-indigo-600 mt-2 text-lg">
                Your payment was successful and your course access is activated!
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {renderEmailStatus()}

              <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-indigo-800 font-semibold text-lg font-outfit">Payment Confirmed!</h3>
                    <p className="text-indigo-700 mt-1">
                      CAD 100 payment processed successfully. Your Yoruba course access is now active.
                    </p>
                    {sessionId && (
                      <p className="text-indigo-600 text-sm mt-2">
                        Transaction ID: {sessionId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleDownloadApp}
                    size="lg"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-outfit py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Download Learning App
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleCheckEmail}
                    variant="outline"
                    size="lg"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold font-outfit py-3 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Check Your Email
                  </Button>
                </motion.div>

                {emailStatus === 'failed' && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      onClick={handleContactSupport}
                      variant="outline"
                      size="lg"
                      className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 font-semibold font-outfit py-3 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Contact Support
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help setting up? Contact us at{' '}
                  <a 
                    href="mailto:admin@rooteancestrallearninghub.com" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                  >
                    admin@rooteancestrallearninghub.com
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">
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