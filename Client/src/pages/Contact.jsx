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
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      details: "admin@rooteancestrallearninghub.com",
      link: "mailto:admin@rooteancestrallearninghub.com",
      type: "email",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon to Fri, 9am to 5pm CST",
      details: "+1 (431) 554-1180",
      link: "tel:+14315541180",
      type: "phone",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Quick chat support",
      details: "+1 (204) 451-9525",
      link: "https://wa.me/12044519525?text=Hello%20Roote%20Ancestral%20Learning%20Hub!%20I'm%20interested%20in%20learning%20Yoruba%20and%20would%20like%20more%20information%20about%20your%20classes.",
      type: "whatsapp",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      description: "Follow for Yoruba content",
      details: "@yoruba_made_fun",
      link: "https://www.instagram.com/yoruba_made_fun?igsh=eHltYnk1N256M2dz&utm_source=qr",
      type: "instagram",
      color: "text-pink-600 bg-pink-50"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Address",
      description: "Visit our location",
      details: "15 Fireweed Lane, Winnipeg MB",
      link: "https://maps.google.com/?q=15+Fireweed+Lane+Winnipeg+Manitoba+Canada",
      type: "address",
      color: "text-purple-600 bg-purple-50"
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 bg-linear-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-outfit"
          >
            Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-yellow-400">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Have questions about our classes or curriculum? We're here to help guide you on your journey to learning Yoruba.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 -mt-20 relative z-20 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden bg-white/95 backdrop-blur-sm">
                <div className="h-2 bg-linear-to-r from-indigo-500 to-purple-500"></div>
                <CardHeader>
                  <CardTitle className="font-outfit text-indigo-900">Contact Information</CardTitle>
                  <CardDescription>Ways to reach our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      target={item.type === 'whatsapp' || item.type === 'address' || item.type === 'instagram' ? '_blank' : '_self'}
                      rel={item.type === 'whatsapp' || item.type === 'address' || item.type === 'instagram' ? 'noopener noreferrer' : ''}
                      className="flex items-start p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="font-semibold text-slate-900 font-outfit">{item.title}</h4>
                         <p className="text-xs text-slate-500 mb-1">{item.description}</p>
                         <p className="text-sm font-medium text-slate-700 truncate">{item.details}</p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden bg-white">
                 <div className="p-8 sm:p-10">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-indigo-900 font-outfit mb-2">Send us a Message</h2>
                      <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
                    </div>
                    <ContactForm />
                 </div>
              </Card>

              {/* Quick CTA */}
              <div className="mt-8 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 font-outfit mb-1">Ready to Start Learning?</h3>
                    <p className="text-amber-800/80 text-sm">Join our next class session immediately.</p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-indigo-950 font-bold shadow-md">
                      <Link to="/admission">Enroll Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-amber-200 text-amber-900 hover:bg-amber-100">
                      <Link to="/classes">View Curriculum</Link>
                    </Button>
                  </div>
              </div>
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