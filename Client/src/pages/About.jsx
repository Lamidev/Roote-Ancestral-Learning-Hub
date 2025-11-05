import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
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
            About Roote Ancestral
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-700 font-outfit"
          >
            Preserving Yoruba heritage through language education
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="mb-8 border-indigo-100">
            <CardHeader>
              <CardTitle className="font-outfit">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                Roote Ancestral Learning Hub is dedicated to making Yoruba language and culture 
                accessible to everyone. We believe that language is the key to understanding 
                our heritage, connecting with our roots, and preserving our cultural identity 
                for future generations.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader>
                <CardTitle className="font-outfit">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To create a global community of Yoruba speakers who are deeply connected 
                  to their cultural heritage and empowered to pass it on to future generations.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader>
                <CardTitle className="font-outfit">Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We combine modern teaching methods with traditional cultural knowledge, 
                  ensuring our students not only learn the language but understand the 
                  context and beauty behind it.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="mb-8 border-indigo-100">
            <CardHeader>
              <CardTitle className="font-outfit">Why Yoruba Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Yoruba is more than just a language—it's a gateway to understanding one of Africa's 
                  most influential cultures. With over 40 million speakers worldwide, Yoruba culture 
                  has shaped art, music, religion, and traditions across the globe.
                </p>
                <p>
                  By learning Yoruba, you're not just acquiring language skills; you're connecting 
                  with centuries of history, philosophy, and cultural wisdom.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="font-outfit">Meet the Founders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-indigo-200 transition-colors">
                    <span className="text-indigo-700 font-bold text-xl font-outfit group-hover:text-indigo-800">TJ</span>
                  </div>
                  <h3 className="font-semibold text-lg font-outfit">Engr. Tunde Jimoh</h3>
                  <p className="text-gray-600">Co-founder & Technical Director</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Bringing technical excellence and passion for cultural preservation together.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-indigo-200 transition-colors">
                    <span className="text-indigo-700 font-bold text-xl font-outfit group-hover:text-indigo-800">OO</span>
                  </div>
                  <h3 className="font-semibold text-lg font-outfit">Mrs. Olujoke Olofinlade</h3>
                  <p className="text-gray-600">Co-founder & Educational Director</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Dedicated to making Yoruba language education accessible and engaging for all.
                  </p>
                </div>
              </div>
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
              <h3 className="text-xl font-semibold text-indigo-900 mb-4 font-outfit">
                Ready to Start Your Yoruba Journey?
              </h3>
              <p className="text-gray-700 mb-4">
                Join our community of learners and connect with your heritage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/admission" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-outfit">
                  Start Learning
                </a>
                <a href="/contact" className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors font-outfit">
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;