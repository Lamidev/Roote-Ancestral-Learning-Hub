import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import QuizStart from '@/components/admission/quizStart';
import QuizQuestions from '@/components/admission/quizQuestions';
import QuizResult from '@/components/admission/quizResults';

const Admission = () => {
  const location = useLocation();
  const isQuizFlow = location.pathname.includes('/admission/');

  const admissionSteps = [
    {
      step: "1",
      title: "Start Your Journey",
      description: "Begin with our simple placement assessment",
      details: "Tell us a bit about yourself and take our friendly Yoruba placement quiz."
    },
    {
      step: "2", 
      title: "Discover Your Level",
      description: "Get your personalized class placement",
      details: "Based on your results, we'll place you in the perfect Beginner, Middle, or Advanced class."
    },
    {
      step: "3",
      title: "Join Your Class",
      description: "Create your account and start learning",
      details: "You'll be redirected to our learning platform to create your account and begin classes immediately."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // If we're in the quiz flow, render the nested routes
  if (isQuizFlow) {
    return (
      <Routes>
        <Route path="assessment" element={<QuizStart />} />
        <Route path="questions" element={<QuizQuestions />} />
        <Route path="result" element={<QuizResult />} />
      </Routes>
    );
  }

  // Otherwise render the main admission page
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-indigo-900 mb-4 font-outfit"
          >
            Begin Your Yoruba Journey
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-700 mb-8"
          >
            Start with our placement assessment to find your perfect class level
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-outfit">
              <Link to="/admission/assessment">Start Placement Assessment</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {admissionSteps.map((step) => (
            <motion.div key={step.step} variants={itemVariants}>
              <Card className="text-center border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg group h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                    <span className="font-bold text-lg font-outfit">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg font-outfit">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{step.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="font-outfit">Admission Process FAQs</CardTitle>
              <CardDescription>
                Common questions about getting started with Roote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-indigo-100">
                  <AccordionTrigger className="font-outfit hover:text-indigo-600">How long does the placement assessment take?</AccordionTrigger>
                  <AccordionContent>
                    The assessment typically takes 5-10 minutes to complete. It's designed to be quick and straightforward.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-indigo-100">
                  <AccordionTrigger className="font-outfit hover:text-indigo-600">What if I'm a complete beginner?</AccordionTrigger>
                  <AccordionContent>
                    Perfect! Our Beginner class is designed specifically for those starting from scratch. The assessment will identify this and place you accordingly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-indigo-100">
                  <AccordionTrigger className="font-outfit hover:text-indigo-600">When can I start classes after the assessment?</AccordionTrigger>
                  <AccordionContent>
                    Immediately! Once you complete the assessment, you can create your account and start classes right away through our learning platform.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-linear-to-r from-indigo-50 to-amber-50 border-indigo-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-indigo-900 mb-2 font-outfit">
                Ready to Begin Your Yoruba Learning Journey?
              </h3>
              <p className="text-gray-700 mb-4">
                Take the first step with our placement assessment
              </p>
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-outfit">
                <Link to="/admission/assessment">Start Assessment Now</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admission;