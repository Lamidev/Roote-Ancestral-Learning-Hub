

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

  const handleCheckEmail = () => {
    if (studentEmail) {
      window.location.href = `mailto:${studentEmail}`;
    } else {
      window.location.href = 'mailto:';
    }
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:admin@rooteancestrallearninghub.com?subject=Payment%20Confirmation%20Email%20Issue&body=Hello,%20I%20completed%20payment%20but%20did%20not%20receive%20my%20class%20details.%20My%20email%20is:%20' + encodeURIComponent(studentEmail || '');
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
                  Your class details are being activated and will be sent to your email shortly...
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
                  Your direct class link has been delivered to {studentEmail || 'your email'}.
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
                  Your enrollment is confirmed! If you don't see the email within 5 minutes, please check your spam folder or contact support.
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
                Payment Successful!
              </CardTitle>
              <p className="text-indigo-800 text-lg mt-2">
                Your Yoruba course access is now activated!
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
                    <h3 className="font-semibold text-lg font-outfit">What Happens Next?</h3>
                    <p className="text-white/90 mt-1">
                      Check your email for your direct class link and session schedule. You can start learning immediately!
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
                    onClick={handleCheckEmail}
                    size="lg"
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold font-outfit py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
                  >
                    <div className="flex items-center space-x-2">
                      <span>📧</span>
                      <span>Go to Your Email</span>
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