import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionId = searchParams.get('session_id');
    const studentEmail = searchParams.get('student_email');

    // Redirect based on payment status
    if (status === 'success') {
      navigate(`/payment-success?session_id=${transactionId}&email=${encodeURIComponent(studentEmail || '')}`);
    } else {
      navigate(`/payment-failed?email=${encodeURIComponent(studentEmail || '')}&reason=${status || 'cancelled'}`);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-amber-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-indigo-100 shadow-2xl text-center">
            <CardHeader>
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                ⏳
              </motion.div>
              <CardTitle className="text-3xl font-bold text-indigo-900 font-outfit">
                Processing Payment
              </CardTitle>
              <p className="text-indigo-600 mt-2 text-lg">
                Please wait while we confirm your payment...
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
              </div>
              <p className="text-gray-600">
                You will be redirected automatically in a moment.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentReturn;