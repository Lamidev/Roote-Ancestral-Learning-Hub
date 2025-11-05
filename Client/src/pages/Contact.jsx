import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      description: "We'll respond quickly",
      details: "info@rooteancestrallearninghub.com",
      link: "mailto:info@rooteancestrallearninghub.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us", 
      description: "Mon to Fri, 9am to 5pm CST",
      details: "+1 (204) 555-0198",
      link: "tel:+12045550198"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      description: "Based in Canada",
      details: "Winnipeg, Manitoba",
      link: "#"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Response Time",
      description: "We're here to help",
      details: "Within 24 hours",
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-indigo-900 mb-4 font-outfit">Get In Touch</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions about Yoruba classes? We're here to help you start your language journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="sticky top-8 border-indigo-100">
                <CardHeader>
                  <CardTitle className="font-outfit">Contact Information</CardTitle>
                  <CardDescription>
                    Choose your preferred way to reach us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      className="flex items-start space-x-3 p-3 rounded-lg border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-indigo-600 mt-0.5 group-hover:text-indigo-700">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-900 font-outfit">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                          {item.details}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-indigo-100">
                <CardHeader>
                  <CardTitle className="font-outfit">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>

              {/* Quick Action Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="mt-6 bg-linear-to-r from-indigo-50 to-amber-50 border-indigo-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-2 font-outfit">
                        Ready to Start Learning Immediately?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Skip the wait and begin your Yoruba journey right now with our placement assessment.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                          <Link to="/admission">
                            <Send className="w-4 h-4 mr-2" />
                            Take Placement Quiz
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                          <Link to="/classes">View Classes</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      country: formData.get('country'),
      interestLevel: formData.get('interestLevel'),
      referralSource: formData.get('referralSource'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you within 24 hours.' });
        e.target.reset();
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant={submitStatus.type === 'success' ? 'default' : 'destructive'}>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-outfit">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            required
            className="border-indigo-100 focus:border-indigo-300"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-outfit">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="border-indigo-100 focus:border-indigo-300"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="font-outfit">Country/Location</Label>
          <Input
            id="country"
            name="country"
            placeholder="Where are you located?"
            className="border-indigo-100 focus:border-indigo-300"
          />
        </div>

        {/* Interest Level */}
        <div className="space-y-2">
          <Label htmlFor="interestLevel" className="font-outfit">Your Current Level</Label>
          <Select name="interestLevel">
            <SelectTrigger className="border-indigo-100 focus:border-indigo-300">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-sure">Not Sure</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Referral Source */}
      <div className="space-y-2">
        <Label htmlFor="referralSource" className="font-outfit">How did you hear about us?</Label>
        <Select name="referralSource">
          <SelectTrigger className="border-indigo-100 focus:border-indigo-300">
            <SelectValue placeholder="Select one..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social-media">Social Media</SelectItem>
            <SelectItem value="friend">Friend Referral</SelectItem>
            <SelectItem value="search">Google Search</SelectItem>
            <SelectItem value="advertisement">Advertisement</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-outfit">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your interest in learning Yoruba, any questions you have, or how we can help you..."
          rows={5}
          required
          className="border-indigo-100 focus:border-indigo-300"
        />
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit"
        disabled={isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default Contact;