import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@/contexts/quizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const QuizStart = () => {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [studentInfo, setStudentInfo] = useState({
    email: '',
    fullName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch({ 
      type: 'SET_STUDENT_INFO', 
      payload: studentInfo 
    });
    
    navigate('/admission/questions');
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
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="border-indigo-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-outfit text-indigo-900">Let's Find Your Level</CardTitle>
              <CardDescription className="text-gray-600">
                Start with our quick Yoruba placement assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-outfit">Full Name</Label>
                  <Input
                    id="fullName"
                    value={studentInfo.fullName}
                    onChange={(e) => setStudentInfo({...studentInfo, fullName: e.target.value})}
                    placeholder="Enter your full name"
                    required
                    className="border-indigo-100 focus:border-indigo-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-outfit">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                    className="border-indigo-100 focus:border-indigo-300"
                  />
                  <p className="text-sm text-gray-600">
                    We'll send your results and class details to this email
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit"
                  size="lg"
                >
                  Start Assessment
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