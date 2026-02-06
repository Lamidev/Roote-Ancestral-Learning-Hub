
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

  const handleDirectLogin = () => {
    window.location.href = 'https://learning.rooteancestrallearninghub.com';
  };

  const patternOverlay = (
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}></div>
  );

  return (
    <div className="overflow-x-hidden min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-linear-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white">
        {patternOverlay}
        
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <motion.div
          className="container mx-auto px-4 max-w-7xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={itemVariants} className="lg:order-1 text-center lg:text-left">
              <motion.div 
                className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-indigo-200 text-sm font-medium tracking-wide uppercase">Premier Yoruba Education</span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-outfit leading-tight tracking-tight">
                Connect with <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-yellow-400">
                  Your Roots
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-indigo-100 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Immersive online Yoruba classes for children ages 2–18. We combine language learning with rich cultural storytelling, songs, and traditions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300">
                  <Link to="/admission">Enroll Now <ChevronDown className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-indigo-400/50 bg-transparent text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-300">
                  <Link to="/classes">Explore Curriculum</Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-indigo-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Expert Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Cultural Immersion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Global Community</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:order-2 relative"
              variants={imageVariants}
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/50 border-4 border-white/10">
                <img
                  src={heroImg}
                  alt="Students learning Yoruba"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Pricing Card */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-4 rounded-xl border border-white/50 shadow-lg"
                  animate={floatingAnimation}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-indigo-950 font-bold font-outfit text-lg">All-Access Pass</p>
                      <p className="text-indigo-600 text-sm">Includes all materials</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-amber-600">CAD $100</span>
                      <span className="text-xs text-gray-500 block">/month</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements behind image */}
              <div className="absolute -inset-4 bg-linear-to-r from-amber-500 to-purple-600 rounded-[2rem] opacity-30 blur-lg -z-10"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Onboarding Steps */}
      <OnboardingSteps />

      {/* Learning Areas Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Curriculum Highlights</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6 font-outfit">What Your Child Will Learn</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive curriculum goes beyond words to teach the heart of Yoruba culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full p-6 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-xl group-hover:border-indigo-100 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors font-outfit">
                    {area}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Levels Section */}
      <section className="py-24 px-4 bg-slate-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Structured Learning</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6 font-outfit">The Right Level for Every Child</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expertly designed progression paths to ensure steady growth and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: "Beginner",
                icon: "🌱",
                description: "Perfect for starting the Yoruba journey. Focus on greetings and basics.",
                color: "indigo"
              },
              {
                level: "Middle",
                icon: "🌿",
                description: "Building confidence with sentences, stories, and conversation.",
                color: "purple"
              },
              {
                level: "Advanced",
                icon: "🌳",
                description: "Mastery through deeper cultural immersion, essays, and proverbs.",
                color: "amber"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white">
                  <div className={`h-2 w-full bg-linear-to-r from-${item.color}-500 to-${item.color}-600`}></div>
                  <CardHeader className="text-center pt-8 pb-4">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <CardTitle className="text-2xl font-bold text-slate-900 font-outfit">
                      {item.level}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-8 px-8 flex flex-col items-center h-full">
                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                      {item.description}
                    </p>
                    <div className="mb-6 px-4 py-1 bg-slate-50 border border-slate-100 rounded-full inline-block">
                       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wilder">Duration: ~3 Months</span>
                    </div>
                    
                    <Button variant="ghost" className={`mt-auto text-${item.color}-600 hover:text-${item.color}-700 hover:bg-${item.color}-50 w-full group-hover:translate-x-1 transition-transform`} asChild>
                      <Link to="/classes">Learn More &rarr;</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-indigo-100 text-indigo-900 font-medium">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              All levels available for just <span className="font-bold text-amber-600">CAD $100/month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Students Section */}
      <section id="existing-students" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-indigo-950 text-white overflow-hidden relative border-0 shadow-2xl">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <CardContent className="p-10 sm:p-16 relative z-10">
              <Monitor className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-outfit">Already Enrolled?</h2>
              <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
                Access your virtual classroom, assignments, and resources from anywhere.
              </p>
              <Button
                onClick={handleDirectLogin}
                size="lg"
                className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-xl"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Go to Classroom
              </Button>
              <p className="mt-6 text-sm text-indigo-300">
                Having trouble? <a href="mailto:admin@rooteancestrallearninghub.com" className="text-amber-300 hover:text-amber-200 underline">Contact Support</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <StudentReviewsCarousel />

      <section className="bg-linear-to-br from-indigo-900 to-indigo-950 py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-outfit">Let's Keep Our Culture Alive</h2>
          <p className="text-lg sm:text-xl text-indigo-100/90 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Start your child's journey into the richness of Yoruba heritage today. One word, one story at a time.
          </p>
          <Button asChild size="lg" className="bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-indigo-950 px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1">
            <Link to="/admission">Enroll Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;