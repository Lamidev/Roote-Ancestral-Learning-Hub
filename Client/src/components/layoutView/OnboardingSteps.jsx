import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, FileText, Mail, Smartphone, Key, Users } from 'lucide-react';

const OnboardingSteps = () => {
  const steps = [
    {
      number: 1,
      icon: ClipboardCheck,
      title: "Register & Take Assessment",
      description: "Fill the admission form and complete our 8-question placement test",
      details: ["Provide name and email", "Complete placement assessment", "Get instant level determination"]
    },
    {
      number: 2,
      icon: FileText,
      title: "Receive Your Score & Level",
      description: "Get placed in Beginner, Middle, or Advanced based on your assessment score",
      details: ["Personalized level assignment", "Based on 8-question assessment", "Tailored learning path"]
    },
    {
      number: 3,
      icon: Mail,
      title: "Check Your Email",
      description: "Receive welcome email with assessment score and access codes",
      details: ["Assessment results", "Institute code", "Course ID"]
    },
    {
      number: 4,
      icon: Smartphone,
      title: "Download Learning Hub App",
      description: "Get the Roote Ancestral learning hub app on your device",
      details: ["Available on all devices", "Same email registration", "Easy setup process"]
    },
    {
      number: 5,
      icon: Key,
      title: "Enter Access Codes",
      description: "Use the Institute code and Course ID from your email",
      details: ["Enter Institute code", "Enter Course ID", "Use same email address"]
    },
    {
      number: 6,
      icon: Users,
      title: "Access Your Class",
      description: "Start learning Yoruba for only CAD $100/month",
      details: ["Join your assigned level", "All materials included", "Begin cultural journey"]
    }
  ];

  return (
    <section id="onboarding-steps" className="py-12 sm:py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
            Simple Onboarding Process
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Get started with Roote Ancestral in just 6 easy steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-linear-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          Step {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 font-outfit">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 mb-3 text-sm">
                        {step.description}
                      </p>
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="text-indigo-500 text-xs">✓</span>
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
          <div className="bg-linear-to-r from-indigo-50 to-indigo-100 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto border-2 border-indigo-200">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4 font-outfit">
              Ready to Begin Your Yoruba Journey?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Start with our free class on January 3, 2026 or enroll directly to begin learning immediately
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/admission"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Register for Free Class
              </motion.a>
              <motion.a
                href="/admission"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                Start Learning Today
              </motion.a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Complete onboarding for only <span className="font-bold text-indigo-600">CAD $100/month</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingSteps;