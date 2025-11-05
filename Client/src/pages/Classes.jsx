import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Classes = () => {
  const levels = [
    {
      title: "Beginner",
      description: "Start from scratch with basic greetings and vocabulary",
      features: [
        "Basic greetings and introductions",
        "Essential vocabulary (200+ words)",
        "Simple sentence structures",
        "Yoruba alphabet and pronunciation",
        "Cultural basics and etiquette"
      ],
      icon: "🌱",
      gradient: "from-indigo-50 to-blue-50",
      border: "border-indigo-200"
    },
    {
      title: "Intermediate", 
      description: "Build conversational skills and grammar knowledge",
      features: [
        "Everyday conversations",
        "Complex sentence structures",
        "Yoruba grammar rules",
        "Reading and writing practice",
        "Cultural proverbs and stories"
      ],
      icon: "🌿",
      gradient: "from-blue-50 to-purple-50",
      border: "border-blue-200"
    },
    {
      title: "Advanced",
      description: "Master fluency and deep cultural understanding",
      features: [
        "Fluent conversations",
        "Advanced grammar and idioms",
        "Yoruba literature and poetry",
        "Cultural context and history",
        "Teaching methodologies"
      ],
      icon: "🌳",
      gradient: "from-purple-50 to-indigo-50",
      border: "border-purple-200"
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
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-indigo-900 mb-4 font-outfit">Our Classes</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Find the perfect level for your Yoruba learning journey
          </p>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-outfit">
            <Link to="/admission">Take Placement Quiz</Link>
          </Button>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {levels.map((level, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`border-2 ${level.border} linear-to-br ${level.gradient} hover:shadow-lg transition-all duration-300 group h-full`}>
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {level.icon}
                  </div>
                  <CardTitle className="text-2xl font-outfit text-indigo-900">{level.title}</CardTitle>
                  <CardDescription className="text-gray-600">{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {level.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start text-gray-700"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="text-indigo-600 mr-3 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit group-hover:scale-105 transition-transform duration-300">
                    <Link to="/admission">Start at This Level</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="text-center border-indigo-200 linear-to-r from-indigo-50 to-amber-50">
            <CardHeader>
              <CardTitle className="font-outfit">Not Sure Which Level is Right for You?</CardTitle>
              <CardDescription className="text-gray-600">
                Our placement quiz will help determine the perfect starting point
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-outfit">
                <Link to="/admission">Take Placement Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="border-indigo-100">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl text-indigo-600 mb-2">📚</div>
                  <h3 className="font-semibold text-indigo-900 font-outfit mb-2">Flexible Schedule</h3>
                  <p className="text-sm text-gray-600">Learn at your own pace with live and recorded sessions</p>
                </div>
                <div>
                  <div className="text-2xl text-indigo-600 mb-2">👥</div>
                  <h3 className="font-semibold text-indigo-900 font-outfit mb-2">Small Classes</h3>
                  <p className="text-sm text-gray-600">Personalized attention with small class sizes</p>
                </div>
                <div>
                  <div className="text-2xl text-indigo-600 mb-2">🌍</div>
                  <h3 className="font-semibold text-indigo-900 font-outfit mb-2">Cultural Immersion</h3>
                  <p className="text-sm text-gray-600">Learn beyond language with cultural context</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Classes;