import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Globe, BookOpen } from 'lucide-react';

const Classes = () => {
  const levels = [
    {
      title: "Beginner",
      description: "Start from scratch with basic greetings and vocabulary",
      duration: "3 Months",
      features: [
        "Basic greetings and introductions",
        "Essential vocabulary (200+ words)",
        "Simple sentence structures",
        "Yoruba alphabet and pronunciation",
        "Cultural basics and etiquette"
      ],
      color: "indigo",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Middle",
      description: "Build conversational skills and grammar knowledge",
      duration: "3 Months",
      features: [
        "Everyday conversations",
        "Complex sentence structures",
        "Yoruba grammar rules",
        "Reading and writing practice",
        "Cultural proverbs and stories"
      ],
      color: "purple",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Advanced",
      description: "Master fluency and deep cultural understanding",
      duration: "3 Months",
      features: [
        "Fluent conversations",
        "Advanced grammar and idioms",
        "Yoruba literature and poetry",
        "Cultural context and history",
        "Teaching methodologies"
      ],
      color: "amber",
      gradient: "from-amber-500 to-orange-600"
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-linear-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 font-outfit tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Roote <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-yellow-400">Curriculum</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A structured journey through Yoruba language and culture, tailored for every stage of your child's learning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
             <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:px-8 border border-white/20">
                <span className="text-indigo-200 uppercase text-xs font-bold tracking-widest">All Access Pass</span>
                <span className="h-4 w-px bg-white/20 hidden sm:block"></span>
                <span className="text-2xl font-bold text-white">CAD $100<span className="text-sm font-normal text-indigo-300">/month</span></span>
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold rounded-lg ml-0 sm:ml-4">
                  <Link to="/admission">Enroll Today</Link>
                </Button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="py-20 px-4">
        <motion.div
          className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {levels.map((level, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden group bg-white ring-1 ring-slate-900/5">
                <div className={`h-3 bg-linear-to-r ${level.gradient}`}></div>
                <CardHeader className="text-center pb-2">
                  <div className={`w-14 h-14 bg-linear-to-br ${level.gradient} rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                    <span className="text-2xl text-white font-bold">{index + 1}</span>
                  </div>
                  <CardTitle className="text-2xl font-outfit text-slate-900 mb-2">{level.title}</CardTitle>
                  <CardDescription className="text-base text-gray-500">{level.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-8">
                  <div className="flex items-center justify-center gap-2 mb-8 text-sm font-medium text-slate-500 bg-slate-50 py-2 rounded-full">
                    <Clock className="w-4 h-4" />
                    Duration: {level.duration}
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {level.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start text-gray-700 text-sm"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 text-${level.color}-500`} />
                        <span className="leading-snug">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button asChild className={`w-full bg-linear-to-r ${level.gradient} hover:opacity-90 text-white font-outfit h-12 text-lg shadow-md group-hover:shadow-lg transition-all`}>
                    <Link to="/admission">Enroll in {level.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pathway/Placement Section */}
      <section className="py-20 px-4 bg-indigo-50/50">
         <motion.div
          className="container mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-indigo-100 bg-white overflow-hidden shadow-lg relative">
            <div className="absolute top-0 right-0 p-32 bg-linear-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <CardContent className="p-8 sm:p-12 text-center relative z-10">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-4 font-outfit">Not Sure Where to Start?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our quick placement assessment will analyze your child's current knowledge and recommend the perfect level for their journey.
              </p>
              <Button asChild size="lg" variant="outline" className="border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold px-8 h-14 text-lg">
                <Link to="/admission/assessment">Take Placement Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Philosophy/Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div 
               className="p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 group"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit">Flexible Schedule</h3>
              <p className="text-gray-600 leading-relaxed">Classes designed to fit into your busy lifestyle with a mix of live interaction and self-paced materials.</p>
            </motion.div>

            <motion.div 
               className="p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-purple-100 group"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit">Comprehensive Resources</h3>
              <p className="text-gray-600 leading-relaxed">Access to our digital library of Yoruba stories, songs, and worksheets to reinforce learning.</p>
            </motion.div>

            <motion.div 
               className="p-6 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-100 group"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit">Cultural Immersion</h3>
              <p className="text-gray-600 leading-relaxed">We don't just teach the language; we immerse children in the rich heritage and traditions of the Yoruba people.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;