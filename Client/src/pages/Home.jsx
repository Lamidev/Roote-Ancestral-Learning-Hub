import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BookOpen, Star, Target, Heart } from 'lucide-react';

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

  const ageGroups = [
    { range: "2-6 years", focus: "Fun & Play-based Learning", icon: "🎨" },
    { range: "7-12 years", focus: "Interactive Stories & Songs", icon: "📚" },
    { range: "13-18 years", focus: "Advanced Writing & Culture", icon: "🎓" }
  ];

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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-50 via-white to-amber-50 py-16 sm:py-20 px-4">
        <motion.div 
          className="container mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-900 mb-6 leading-tight font-outfit">
                Welcome to <span className="text-amber-600">Roote Ancestral</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                Where Kids Discover the Beauty of Yoruba Language and Culture!
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                We make learning Yoruba exciting, interactive, and full of culture! Our fun online classes help children ages 2–18 speak, read, and write Yoruba while exploring the stories, songs, and traditions that make our heritage so special.
              </p>
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  <Link to="/admission">Start Learning Today</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-base sm:text-lg rounded-lg transition-all duration-300 w-full sm:w-auto">
                  <Link to="/classes">View Classes</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <Card className="border-indigo-100 shadow-xl p-6 bg-white">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-linear-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2 font-outfit">Perfect Level Placement</h3>
                    <p className="text-gray-600">We place each child in the right level based on their knowledge</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {ageGroups.map((group, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl mb-2">{group.icon}</div>
                        <p className="text-sm font-semibold text-indigo-900">{group.range}</p>
                        <p className="text-xs text-gray-600 mt-1">{group.focus}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Roote Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
              Why Choose Roote Ancestral?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine expert teaching with cultural immersion to create a truly authentic learning experience
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 font-outfit">Expert Yoruba Teachers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our tutors are well-trained Yoruba language teachers with over a decade of teaching experience. They bring authentic pronunciation, cultural insights, and proven teaching methodologies to every class.
              </p>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-indigo-600 text-lg shrink-0">✓</span>
                  <span className="text-gray-700">Native speakers with authentic accent</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-indigo-600 text-lg shrink-0">✓</span>
                  <span className="text-gray-700">10+ years teaching experience</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-indigo-600 text-lg shrink-0">✓</span>
                  <span className="text-gray-700">Certified in language education</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="border-indigo-100 text-center p-6">
                <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h4 className="font-semibold text-indigo-900 mb-2">Small Class Sizes</h4>
                <p className="text-sm text-gray-600">Personalized attention for every child</p>
              </Card>
              <Card className="border-amber-100 text-center p-6">
                <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h4 className="font-semibold text-indigo-900 mb-2">Cultural Immersion</h4>
                <p className="text-sm text-gray-600">Learn through stories and traditions</p>
              </Card>
              <Card className="border-green-100 text-center p-6">
                <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-indigo-900 mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your child's development</p>
              </Card>
              <Card className="border-purple-100 text-center p-6">
                <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-indigo-900 mb-2">Passionate Teachers</h4>
                <p className="text-sm text-gray-600">Dedicated to cultural preservation</p>
              </Card>
            </motion.div>
          </div>

          {/* What You'll Learn Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-indigo-50 to-amber-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center font-outfit">What Your Child Will Learn</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {learningAreas.map((area, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-indigo-600 text-lg shrink-0">✓</span>
                  <span className="text-gray-700">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
              Right Level for Every Child
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From greetings and folktales to Oriki, proverbs, and essay writing in Yoruba, every class is designed to help your child grow in confidence and stay connected to their roots.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: "Beginner",
                description: "Perfect for starting the Yoruba journey",
                features: ["Basic greetings", "Simple vocabulary", "Cultural introduction", "Fun songs & games"],
                color: "from-green-400 to-blue-400"
              },
              {
                level: "Middle", 
                description: "Building on existing knowledge",
                features: ["Conversational skills", "Reading practice", "Folktales & stories", "Basic writing"],
                color: "from-blue-400 to-purple-400"
              },
              {
                level: "Advanced",
                description: "Mastering Yoruba language & culture",
                features: ["Essay writing", "Complex proverbs", "Cultural analysis", "Advanced comprehension"],
                color: "from-purple-400 to-indigo-400"
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
                    <div className={`w-16 h-16 bg-linear-to-r ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl text-white font-bold">{index + 1}</span>
                    </div>
                    <CardTitle className="text-indigo-900 font-outfit">{level.level}</CardTitle>
                    <CardDescription>{level.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {level.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center gap-2 text-sm text-gray-600"
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
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-16 px-4">
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
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            One word, one story, and one smile at a time. Whether your child is just starting or already knows a few Yoruba words, we'll make every lesson an adventure!
          </p>
          <p className="text-lg text-amber-200 mb-8 font-semibold">
            Start your child's cultural journey today!
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/admission">Begin Your Journey</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

