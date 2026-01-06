import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Users, Star, Target, Globe, Award } from 'lucide-react';

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

  const coreValues = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Heritage",
      description: "We honor and celebrate our Yoruba roots",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning",
      description: "We make education fun, creative, and inspiring",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "We grow together as one big Yoruba family",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Excellence",
      description: "We aim for quality in every lesson and interaction",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Confidence",
      description: "We empower every child to speak proudly and boldly",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  const impactStats = [
    { number: "2-18", label: "Age Range" },
    { number: "3", label: "Learning Levels" },
    { number: "10+", label: "Cultural Topics" },
    { number: "100%", label: "Diaspora Focused" }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-16 md:py-24 px-4 bg-linear-to-b from-indigo-50 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 mb-4 font-outfit"
          >
            About Roote Ancestral
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-700 font-outfit max-w-2xl mx-auto"
          >
            Preserving Yoruba heritage through joyful language education for diaspora children
          </motion.p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-indigo-100 h-full hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-outfit text-indigo-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  To nurture a love for the Yoruba language and culture in children through engaging,
                  joyful, and meaningful learning experiences.
                </p>
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-700 text-center">
                    Roote Ancestral Learning Hub is dedicated to making Yoruba language and culture
                    accessible to everyone in the diaspora.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-amber-100 h-full hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-outfit text-indigo-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  To see every child confidently speak, read, and celebrate Yoruba heritage keeping
                  our culture alive for generations to come.
                </p>
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-700 text-center">
                    Creating a global community of Yoruba speakers deeply connected to their cultural heritage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 font-outfit">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Roote Ancestral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-md h-full text-center">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-linear-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-indigo-900 mb-2 font-outfit">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <Card className="bg-linear-to-r from-indigo-500 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold font-outfit">{stat.number}</div>
                    <div className="text-indigo-100 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Yoruba Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <Card className="border-indigo-100">
            <CardHeader className="text-center">
              <CardTitle className="font-outfit text-indigo-900">Why Yoruba Matters for Diaspora Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">
                <div className="space-y-4">
                  <p>
                    Yoruba is more than just a language—it's a gateway to understanding one of Africa's
                    most influential cultures. With over 40 million speakers worldwide, Yoruba culture
                    has shaped art, music, religion, and traditions across the globe.
                  </p>
                  <p>
                    For diaspora children, learning Yoruba builds cultural identity, family connections,
                    and pride in their heritage.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    By learning Yoruba, your child is not just acquiring language skills; they're connecting
                    with centuries of history, philosophy, and cultural wisdom that will help them understand
                    their place in the world.
                  </p>
                  <p>
                    We combine modern teaching methods with traditional cultural knowledge, ensuring our
                    students not only learn the language but understand the context and beauty behind it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <Card className="border-indigo-100">
            <CardHeader className="text-center">
              <CardTitle className="font-outfit text-indigo-900">Meet Our Founder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-linear-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl font-outfit">O</span>
                  </div>
                  <h3 className="font-semibold text-lg font-outfit text-indigo-900">Opeyemi</h3>
                  <p className="text-gray-600 mb-3">Founder & Educational Director</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Dedicated to making Yoruba language education accessible, engaging, and meaningful
                    for children growing up in the diaspora. With a passion for cultural preservation
                    and innovative teaching methods, Olujoke leads our mission to keep Yoruba heritage
                    alive for future generations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-linear-to-r from-indigo-50 to-amber-50 border-indigo-200">
            <CardContent className="pt-8 pb-8">
              <Award className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 mb-4 font-outfit">
                Ready to Start Your Child's Yoruba Journey?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Join our community of diaspora families and help your child connect with their heritage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/admission">Start Learning Today</Link>
                </Button>
                <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;