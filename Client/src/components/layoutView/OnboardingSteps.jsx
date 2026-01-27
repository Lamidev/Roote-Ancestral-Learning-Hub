import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Zap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OnboardingSteps = () => {
  const steps = [
    {
      number: 1,
      icon: ClipboardCheck,
      title: "Register Now",
      description: "Sign up for our Discovery session",
      details: ["Quick signup", "Secure your spot", "Join the community"]
    },
    {
      number: 2,
      icon: Zap,
      title: "Get Access",
      description: "Receive your class access instantly",
      details: ["Direct course link", "Start immediately", "No setup needed"]
    },
    {
      number: 3,
      icon: Calendar,
      title: "Join Class",
      description: "Attend free Yoruba class",
      details: ["January 31, 2026", "12:00 PM CST", "100% free"]
    }
  ];

  return (
    <section id="onboarding-steps" className="py-8 sm:py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
            Simple 3-Step Onboarding
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Get instant access to your free Yoruba class
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        Step {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-indigo-900 mb-3 font-outfit">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            <span className="text-purple-500 mr-2">✓</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto border-2 border-purple-200">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4 font-outfit">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join our free class on January 31, 2026 or get instant access to materials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admission" className="w-full sm:w-auto">
                <Button className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-6 rounded-lg font-semibold transition-all duration-300">
                  Start Free Class
                </Button>
              </Link>
              <Link to="/admission" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-6 rounded-lg font-semibold transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingSteps;