

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock as ClockIcon, ChevronDown, LogIn, Monitor } from 'lucide-react';
import heroImg from '@/assets/heroImg.jpg';
import StudentReviewsCarousel from '@/components/layoutView/ReviewCarousel';
import OnboardingSteps from '@/components/layoutView/OnboardingSteps';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: {
      scale: 1.1,
      opacity: 0,
      rotateY: 10
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const freeClassInfo = {
    title: "Free Yoruba Language Class",
    date: "January 25, 2026",
    time: "12:00 PM CST",
    description: "Experience our teaching style and curriculum in a free introductory class!",
    features: [
      "Live interactive session with our expert teachers",
      "Sample Yoruba lessons and cultural activities",
      "Q&A session for parents",
      "Special enrollment offer for attendees"
    ],
    registrationLink: "/admission",
    googleCalendarLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Free+Yoruba+Language+Class&details=Join+Roote+Ancestral+for+a+free+Yoruba+language+and+culture+class!&location=Online&dates=20260116T180000Z/20260116T190000Z"
  };

  const learningAreas = [
    "Basic greetings and conversations",
    "Yoruba alphabet and pronunciation",
    "Traditional folktales and stories",
    "Oriki (praise poetry) and proverbs",
    "Cultural songs and games",
    "Essay writing in Yoruba",
    "Reading and comprehension",
    "Cultural traditions and etiquette"
  ];

  const scrollToExistingStudents = () => {
    const element = document.getElementById('existing-students');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectLogin = () => {
    window.location.href = 'https://learning.rooteancestrallearninghub.com';
  };


  return (
    <div className="overflow-x-hidden min-h-screen">
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white py-12 sm:py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
        <motion.div
          className="container mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants} className="lg:order-1">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight font-outfit tracking-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Welcome to <motion.span
                  className="text-indigo-600 inline-block"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >Roote Ancestral</motion.span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Where Kids Discover the Beauty of Yoruba Language and Culture!
              </motion.p>
              <motion.p
                className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                We make learning Yoruba exciting, interactive, and full of culture! Our fun online classes help children ages 2–18 speak, read, and write Yoruba while exploring the stories, songs, and traditions that make our heritage so special.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.32 }}
                className="mb-8"
              >
                <div className="backdrop-blur-md bg-white/70 rounded-2xl p-5 border border-indigo-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500 rounded-lg p-2 shrink-0">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-indigo-800 font-outfit">Free Yoruba Language Class!</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mt-1 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-700">{freeClassInfo.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-700">{freeClassInfo.time}</span>
                        </div>
                      </div>
                      <p className="text-indigo-700 text-sm mb-3">{freeClassInfo.description}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <Link to={freeClassInfo.registrationLink}>Register for Free Class</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                          onClick={scrollToExistingStudents}
                        >
                          <span className="flex items-center gap-1">
                            Already a Student?
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mb-6"
              >
                <div className="bg-white rounded-lg p-4 border-2 border-indigo-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-indigo-900 font-outfit">Affordable Quality Education</h3>
                      <p className="text-gray-600 text-sm">All classes include cultural materials & resources</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-indigo-600">CAD $100</span>
                        <span className="text-gray-500 text-sm">per month</span>
                      </div>
                      <p className="text-xs text-gray-500">No hidden fees</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full sm:w-auto"
                >
                  <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                    <Link to="/admission">Start Learning Today</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full sm:w-auto"
                >
                  <Button asChild variant="outline" size="lg" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg transition-all duration-300 w-full">
                    <Link to="/classes">View Classes</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative lg:order-2"
              variants={imageVariants}
              animate={floatingAnimation}
            >
              <motion.img
                src={heroImg}
                alt="Children learning Yoruba language and culture"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover max-h-[500px]"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-400 rounded-full hidden sm:block"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-400 rounded-full hidden sm:block"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="onboarding-steps" className="py-8 sm:py-16 md:py-24 px-4 bg-white">
        <OnboardingSteps />
      </section>

      <section className="py-8 sm:py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
              What Your Child Will Learn
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              From greetings and folktales to Oriki, proverbs, and essay writing in Yoruba
            </p>
          </motion.div>

          <div className="bg-linear-to-r from-indigo-50 to-indigo-100 rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {learningAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-indigo-600 text-lg shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 md:py-24 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
              Right Level for Every Child
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              All levels included for just CAD $100 per month
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                level: "Beginner",
                description: "Perfect for starting the Yoruba journey",
                features: ["Basic greetings", "Simple vocabulary", "Cultural introduction", "Fun songs & games"],
                color: "from-blue-400 to-indigo-400"
              },
              {
                level: "Middle",
                description: "Building on existing knowledge",
                features: ["Conversational skills", "Reading practice", "Folktales & stories", "Basic writing"],
                color: "from-indigo-400 to-purple-400"
              },
              {
                level: "Advanced",
                description: "Mastering Yoruba language & culture",
                features: ["Essay writing", "Complex proverbs", "Cultural analysis", "Advanced comprehension"],
                color: "from-purple-400 to-indigo-600"
              }
            ].map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-indigo-100 h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-r ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-xl sm:text-2xl text-white font-bold">{index + 1}</span>
                    </div>
                    <CardTitle className="text-indigo-900 font-outfit text-lg sm:text-xl">{level.level}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{level.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {level.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <span className="text-indigo-600 text-sm shrink-0">✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg">
              <Link to="/admission">Enroll Now - CAD $100/month</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="existing-students" className="py-8 sm:py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
              Already a Student?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Quick access to your Yoruba learning platform
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-indigo-100 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-indigo-900 font-outfit text-xl">Access Your Classroom</CardTitle>
                  <CardDescription>Login directly through your web browser</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">Perfect for desktop, laptop, tablet, or mobile browser use</p>
                  <Button
                    onClick={handleDirectLogin}
                    size="lg"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Login to Classroom
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Use the same email you registered with
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <div className="bg-indigo-50 rounded-lg p-4 sm:p-6 border-2 border-indigo-200 inline-block max-w-2xl mx-auto">
              <p className="text-indigo-700 text-sm sm:text-base">
                <strong>Need help logging in?</strong> Contact us at admin@rooteancestrallearninghub.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <StudentReviewsCarousel />

      <section className="bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-10 sm:py-16 md:py-24 px-4">
        <motion.div
          className="container mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-outfit">
            Let's Keep Our Culture Alive
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 max-w-2xl mx-auto px-4">
            One word, one story, and one smile at a time. Whether your child is just starting or already knows a few Yoruba words, we'll make every lesson an adventure!
          </p>
          <p className="text-base sm:text-lg md:text-lg text-indigo-200 mb-6 sm:mb-8 font-semibold">
            Start your child's cultural journey today!
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-slate-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100">
            <Link to="/admission">Join Free Class on Jan 25, 2026</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;