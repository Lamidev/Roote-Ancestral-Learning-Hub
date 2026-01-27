import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/quizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { quizConfig } from '@/config/quizConfig';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const QuizStart = () => {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    email: '',
    fullName: '',
    phoneNumber: ''
  });

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:7090"
      : "https://api.rooteancestrallearninghub.com");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for forced Beginner level in discovery class
      const registrationData = {
        studentEmail: studentInfo.email,
        fullName: studentInfo.fullName,
        phoneNumber: studentInfo.phoneNumber,
        score: 0, // Forced score for beginner level
        level: 'beginner',
        classUrl: quizConfig.classUrls.beginner,
        answers: []
      };

      const response = await fetch(`${API_BASE_URL}/api/quiz/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch({
        type: 'SET_STUDENT_INFO',
        payload: studentInfo
      });

      dispatch({
        type: 'SET_LEVEL',
        payload: { 
          level: 'beginner', 
          classUrl: registrationData.classUrl 
        }
      });

      // Directly navigate to result for the discovery class
      navigate('/admission/result');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-8 sm:py-16 md:py-24 px-4 min-h-screen bg-linear-to-b from-indigo-50 to-white">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="border-indigo-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-outfit text-indigo-900">Join Our Free Class</CardTitle>
              <CardDescription className="text-gray-600">
                Register now for the January 31st Yoruba Discovery session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-outfit">Full Name</Label>
                  <Input
                    id="fullName"
                    value={studentInfo.fullName}
                    onChange={(e) => setStudentInfo({ ...studentInfo, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                    className="border-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="font-outfit">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={studentInfo.phoneNumber}
                    onChange={(e) => setStudentInfo({ ...studentInfo, phoneNumber: e.target.value })}
                    placeholder="Enter your phone number"
                    required
                    disabled={isSubmitting}
                    className="border-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-outfit">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                    className="border-indigo-100 focus:border-indigo-300"
                  />
                  <p className="text-sm text-gray-600">
                    We'll send your class access details to this email
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register and Get Access"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizStart;