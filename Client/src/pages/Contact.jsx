import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
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
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      description: "We'll respond quickly",
      details: "admin@rooteancestrallearninghub.com",
      link: "mailto:admin@rooteancestrallearninghub.com",
      type: "email"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      description: "Mon to Fri, 9am to 5pm CST",
      details: "+1 (431) 554-1180",
      link: "tel:+14315541180",
      type: "phone"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp",
      description: "Quick chat support",
      details: "+1 (204) 451-9525",
      link: "https://wa.me/12044519525?text=Hello%20Roote%20Ancestral%20Learning%20Hub!%20I'm%20interested%20in%20learning%20Yoruba%20and%20would%20like%20more%20information%20about%20your%20classes.",
      type: "whatsapp"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      title: "Instagram",
      description: "Follow for Yoruba content",
      details: "@yoruba_made_fun",
      link: "https://www.instagram.com/yoruba_made_fun?igsh=eHltYnk1N256M2dz&utm_source=qr",
      type: "instagram"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Office Address",
      description: "Visit our location",
      details: "15 Fireweed Lane, Winnipeg MB",
      link: "https://maps.google.com/?q=15+Fireweed+Lane+Winnipeg+Manitoba+Canada",
      type: "address"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Response Time",
      description: "We're here to help",
      details: "Within 24 hours",
      link: "#",
      type: "info"
    }
  ];

  const getContactStyle = (type) => {
    switch (type) {
      case 'whatsapp':
        return 'hover:bg-green-50 hover:border-green-200 text-green-700';
      case 'phone':
        return 'hover:bg-blue-50 hover:border-blue-200 text-blue-700';
      case 'email':
        return 'hover:bg-indigo-50 hover:border-indigo-200 text-indigo-700';
      case 'instagram':
        return 'hover:bg-pink-50 hover:border-pink-200 text-pink-700';
      case 'address':
        return 'hover:bg-purple-50 hover:border-purple-200 text-purple-700';
      default:
        return 'hover:bg-indigo-50 hover:border-indigo-200 text-indigo-700';
    }
  };

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
    <div className="min-h-screen py-8 sm:py-16 md:py-24 px-4 bg-linear-to-b from-indigo-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Have questions about Yoruba classes? We're here to help you start your language journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-indigo-100 shadow-sm sm:shadow-md lg:sticky lg:top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="font-outfit text-xl sm:text-2xl">Contact Information</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Multiple ways to reach us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      target={item.type === 'whatsapp' || item.type === 'address' || item.type === 'instagram' ? '_blank' : '_self'}
                      rel={item.type === 'whatsapp' || item.type === 'address' || item.type === 'instagram' ? 'noopener noreferrer' : ''}
                      className={`flex items-start space-x-3 p-3 sm:p-4 rounded-lg border border-gray-100 transition-all duration-300 group ${getContactStyle(item.type)}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`mt-0.5 group-hover:scale-110 transition-transform duration-200 ${item.type === 'whatsapp' ? 'text-green-600' :
                          item.type === 'phone' ? 'text-blue-600' :
                            item.type === 'email' ? 'text-indigo-600' :
                              item.type === 'instagram' ? 'text-pink-600' :
                                item.type === 'address' ? 'text-purple-600' :
                                  'text-indigo-600'
                        }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-current font-outfit text-sm sm:text-base truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
                        <p className="text-xs sm:text-sm font-medium mt-1 truncate">
                          {item.details}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              <Card className="border-indigo-100 shadow-sm sm:shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="font-outfit text-xl sm:text-2xl">Send us a Message</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <ContactForm />
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-linear-to-r from-indigo-50 to-amber-50 border-indigo-200 shadow-sm sm:shadow-md">
                  <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8">
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2 sm:mb-3 font-outfit">
                        Ready to Start Learning Immediately?
                      </h3>
                      <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                        Skip the wait and begin your Yoruba journey right now by registering for our upcoming Discovery class.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base">
                          <Link to="/admission">
                            <Send className="w-4 h-4 mr-2" />
                            Register for Free Class
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-sm sm:text-base">
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

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7090';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!', {
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
          position: 'top-center',
        });
        e.target.reset();
      } else {
        toast.error('Failed to send message', {
          description: result.error || 'Something went wrong. Please try again.',
          duration: 5000,
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Network error', {
        description: 'Failed to send message. Please check your connection and try again.',
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-outfit text-sm sm:text-base">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            required
            className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-outfit text-sm sm:text-base">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="country" className="font-outfit text-sm sm:text-base">Country/Location</Label>
          <Input
            id="country"
            name="country"
            placeholder="Where are you located?"
            className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestLevel" className="font-outfit text-sm sm:text-base">Your Current Level</Label>
          <Select name="interestLevel">
            <SelectTrigger className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-sure">Not Sure</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="middle">Middle</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralSource" className="font-outfit text-sm sm:text-base">How did you hear about us?</Label>
        <Select name="referralSource">
          <SelectTrigger className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base">
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

      <div className="space-y-2">
        <Label htmlFor="message" className="font-outfit text-sm sm:text-base">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your interest in learning Yoruba, any questions you have, or how we can help you..."
          rows={4}
          required
          className="border-indigo-100 focus:border-indigo-300 text-sm sm:text-base min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit text-sm sm:text-base"
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