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
      title: "Placement Assessment",
      description: "Discover your current proficiency",
      details: "Take our quick, interactive quiz to find the perfect starting point for your journey."
    },
    {
      step: "2",
      title: "Get Matched",
      description: "Receive your personalized level",
      details: "We'll instantly place you in the Beginner, Middle, or Advanced level based on your results."
    },
    {
      step: "3",
      title: "Start Learning",
      description: "Access your student portal",
      details: "Complete your enrollment and join your class to begin speaking Yoruba immediately."
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-linear-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-outfit"
          >
            Join Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-yellow-400">Yoruba Classes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Begin your journey by discovering your current proficiency level. Our placement process ensures you start exactly where you belong.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/20">
              <Link to="/admission/assessment">Take Placement Quiz</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 -mt-10 relative z-20">
        <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {admissionSteps.map((step, index) => (
              <motion.div key={step.step} variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <CardHeader>
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <span className="font-bold text-xl font-outfit">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl font-outfit text-indigo-900">{step.title}</CardTitle>
                    <CardDescription className="text-indigo-600/80 font-medium">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.details}</p>
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
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
             <div>
                <h3 className="text-2xl font-bold text-indigo-900 mb-6 font-outfit">Frequently Asked Questions</h3>
                <p className="text-gray-600 mb-6">Everything you need to know about getting started.</p>
                <div className="p-6 bg-indigo-950 rounded-2xl text-white relative overflow-hidden">
                   <div className="relative z-10">
                      <h4 className="font-bold text-lg mb-2 text-amber-400">Need more help?</h4>
                      <p className="text-indigo-200 text-sm mb-4">Our support team is available to assist you.</p>
                      <Button asChild variant="outline" className="border-indigo-400 text-indigo-100 hover:bg-white/10 bg-transparent">
                        <Link to="/contact">Contact Support</Link>
                      </Button>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"></div>
                </div>
             </div>
             
             <Card className="border-gray-100 shadow-md">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-indigo-50">
                      <AccordionTrigger className="font-outfit hover:text-indigo-600 text-left">How accurate is the placement quiz?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Our quiz is expertly designed to gauge your vocabulary, grammar, and cultural understanding. It matches you with 95% accuracy to the level where you'll be most challenged yet comfortable.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-indigo-50">
                      <AccordionTrigger className="font-outfit hover:text-indigo-600 text-left">Can I move to a higher level later?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Absolutely! We review student progress every 3 months. If you demonstrate mastery of your current level's curriculum earlier, we can advance you to the next level.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-indigo-50">
                       <AccordionTrigger className="font-outfit hover:text-indigo-600 text-left">How do I access my classes?</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Identifying your level is the first step. Once you enroll, you'll receive login credentials for our student portal where all live classes, recordings, and materials are hosted.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
             </Card>
          </div>
        </motion.div>

        <motion.div
           className="text-center pb-20"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
         >
           <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
             <div className="relative z-10">
               <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-outfit">
                 Ready to Join?
               </h3>
               <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
                 Secure your spot in our upcoming sessions and start connecting with your heritage today.
               </p>
               <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-8 py-6 text-lg rounded-xl shadow-lg">
                 <Link to="/admission/assessment">Take Placement Quiz</Link>
               </Button>
             </div>
           </div>
         </motion.div>
      </div>
    </div>
  );
};

export default Admission;