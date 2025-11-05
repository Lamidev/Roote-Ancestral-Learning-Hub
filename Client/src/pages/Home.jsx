import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
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
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-50 via-white to-amber-50 py-20 px-4">
        <motion.div 
          className="container mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-900 mb-6 leading-tight font-outfit"
          >
            Learn Yoruba,<br />Connect with Your Roots
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the beauty of Yoruba language and culture through immersive classes designed for all levels.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
              <Link to="/admission">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-base sm:text-lg rounded-lg transition-all duration-300 w-full sm:w-auto">
              <Link to="/classes">View Classes</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-900 mb-12 font-outfit"
          >
            Why Learn with Roote?
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg h-full group">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <CardTitle className="text-indigo-900 font-outfit">Cultural Depth</CardTitle>
                  <CardDescription>More than just language</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">Learn Yoruba with cultural context, proverbs, and traditions that bring the language to life.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg h-full group">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <CardTitle className="text-indigo-900 font-outfit">Expert Tutors</CardTitle>
                  <CardDescription>Native speakers and educators</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">Our tutors are passionate about sharing Yoruba culture and ensuring you learn effectively.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg h-full group">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <span className="text-2xl">💻</span>
                  </div>
                  <CardTitle className="text-indigo-900 font-outfit">Flexible Learning</CardTitle>
                  <CardDescription>Learn from anywhere</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">Join live online classes that fit your schedule, with materials accessible anytime.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-16 px-4">
        <motion.div 
          className="container mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-outfit">Ready to Start Your Journey?</h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Take our placement assessment and discover your perfect Yoruba class.</p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/admission">Begin Your Journey</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;