import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentEmail = searchParams.get('email');
  const reason = searchParams.get('reason');

  const handleRetryPayment = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:admin@rooteancestrallearninghub.com?subject=Payment%20Issue&body=Hello,%20I%20had%20an%20issue%20with%20my%20payment.%20My%20email%20is:%20${encodeURIComponent(studentEmail || '')}`;
  };

  const getFailureMessage = () => {
    switch (reason) {
      case 'cancelled':
        return "You cancelled the payment process.";
      case 'failed':
        return "There was an issue processing your payment.";
      default:
        return "The payment was not completed.";
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
                ❌
              </motion.div>
              <CardTitle className="text-3xl font-bold text-indigo-900 font-outfit">
                Payment Not Completed
              </CardTitle>
              <p className="text-indigo-600 mt-2 text-lg">
                {getFailureMessage()}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-amber-800 font-semibold text-lg font-outfit">Payment Incomplete</h3>
                    <p className="text-amber-700 mt-1">
                      Your course access will be activated once payment is successful.
                    </p>
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
                    onClick={handleRetryPayment}
                    size="lg"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-outfit py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Try Payment Again
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    onClick={handleContactSupport}
                    variant="outline"
                    size="lg"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold font-outfit py-3 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Contact Support Team
                  </Button>
                </motion.div>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help? Email us at{' '}
                  <a 
                    href="mailto:admin@rooteancestrallearninghub.com" 
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                  >
                    admin@rooteancestrallearninghub.com
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  We're here to help you complete your enrollment!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailed;