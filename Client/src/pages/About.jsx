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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header */}
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
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-yellow-400">Roote Ancestral</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Preserving Yoruba heritage through joyful, meaningful language education for children in the diaspora.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 relative z-20 -mt-10 pb-20">
        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
               <div className="h-2 bg-linear-to-r from-green-400 to-blue-400"></div>
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-linear-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-outfit text-2xl text-indigo-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To nurture a love for the Yoruba language and culture in children through engaging,
                  joyful, and meaningful learning experiences.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-indigo-800 font-medium">
                    Making heritage accessible to everyone in the diaspora.
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
            <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-linear-to-r from-amber-400 to-orange-400"></div>
              <CardHeader className="text-center pt-8">
                <div className="w-16 h-16 bg-linear-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-outfit text-2xl text-indigo-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To see every child confidently speak, read, and celebrate Yoruba heritage, keeping
                  our culture alive for generations to come.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-amber-800 font-medium">
                    Creating a global community deeply connected to their roots.
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
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4 font-outfit">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do at Roote Ancestral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full text-center bg-white group overflow-hidden">
                  <div className={`h-1 w-full bg-linear-to-r ${value.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-linear-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-12 transition-transform duration-300`}>
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-indigo-900 mb-2 font-outfit">{value.title}</h3>
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
          className="mb-20"
        >
          <Card className="bg-linear-to-r from-indigo-900 to-purple-800 text-white border-0 shadow-2xl relative overflow-hidden rounded-3xl">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <CardContent className="p-10 sm:p-14 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-800/50">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4"
                  >
                    <div className="text-3xl sm:text-4xl font-bold font-outfit text-amber-400 mb-2">{stat.number}</div>
                    <div className="text-indigo-200 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Why Yoruba Matters */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
            >
               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-6 font-outfit leading-tight">Why Yoruba Matters for <span className="text-purple-600">Diaspora Children</span></h2>
               <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Yoruba is more than just a language—it's a gateway to understanding one of Africa's
                    most influential cultures. With over 40 million speakers worldwide, Yoruba culture
                    has shaped art, music, religion, and traditions across the globe.
                  </p>
                  <p>
                    For diaspora children, learning Yoruba builds cultural identity, family connections,
                    and pride in their heritage, helping them understand their place in the world.
                  </p>
               </div>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100"
            >
               <h3 className="text-xl font-bold text-indigo-900 mb-4 font-outfit">Our Approach</h3>
               <p className="text-gray-700 mb-6">We combine modern teaching methods with traditional cultural knowledge, ensuring our students not only learn the language but understand the context and beauty behind it.</p>
               <Button asChild variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold w-full sm:w-auto">
                 <Link to="/classes">Explore Curriculum</Link>
               </Button>
            </motion.div>
        </div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl overflow-hidden bg-white">
                <div className="flex flex-col md:flex-row">
                   <div className="md:w-1/3 bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center p-8">
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                         O
                      </div>
                   </div>
                   <div className="md:w-2/3 p-8 md:p-12">
                      <h3 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-1">Meet the Founder</h3>
                      <h2 className="text-3xl font-bold text-slate-900 font-outfit mb-4">Opeyemi</h2>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        "Dedicated to making Yoruba language education accessible, engaging, and meaningful
                        for children growing up in the diaspora. With a passion for cultural preservation
                        and innovative teaching methods, we are on a mission to keep Yoruba heritage
                        alive for future generations."
                      </p>
                      <div className="flex items-center gap-4">
                         <Button asChild size="sm" variant="ghost" className="bg-slate-100 hover:bg-slate-200 text-slate-700">
                           <Link to="/contact">Get in Touch</Link>
                         </Button>
                      </div>
                   </div>
                </div>
              </Card>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
           className="text-center pb-20"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
         >
           <div className="bg-linear-to-r from-indigo-900 to-indigo-950 rounded-3xl p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]"></div>
             
             <div className="relative z-10">
               <Award className="w-16 h-16 text-amber-400 mx-auto mb-6" />
               <h3 className="text-3xl sm:text-4xl font-bold mb-6 font-outfit">
                 Start Your Child's Yoruba Journey
               </h3>
               <p className="text-indigo-200 mb-10 max-w-2xl mx-auto text-lg">
                 Join our community of diaspora families and help your child connect with their heritage today.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold px-10 py-6 text-lg rounded-xl shadow-lg">
                   <Link to="/admission/assessment">Start Learning Today</Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="border-indigo-400 text-indigo-100 hover:bg-white/10 bg-transparent px-10 py-6 text-lg rounded-xl">
                   <Link to="/contact">Contact Us</Link>
                 </Button>
               </div>
             </div>
           </div>
         </motion.div>
      </div>
    </div>
  );
};

export default About;