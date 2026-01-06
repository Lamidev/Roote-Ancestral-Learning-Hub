import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import rooteLogo from '@/assets/rooteLogo.jpg';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 sm:py-12 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center mb-4 group"
            >
              <img
                src={rooteLogo}
                alt="Roote Logo"
                className="h-13 w-auto md:h-13 object-contain"
              />
            </Link>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Preserving Yoruba heritage through language education.
              Join us in connecting with your roots and discovering the beauty of Yoruba culture.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.instagram.com/yoruba_made_fun?igsh=eHltYnk1N256M2dz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 font-outfit">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">About</Link></li>
              <li><Link to="/classes" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Classes</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 font-outfit">Start Learning</h3>
            <ul className="space-y-2">
              <li><Link to="/admission" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Admission Process</Link></li>
              <li><Link to="/classes" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Class Levels</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 px-4 md:px-0">
          <p>&copy; {new Date().getFullYear()} Roote Ancestral Learning Hub. All rights reserved.</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
              <p className="text-sm text-gray-600">
                Crafted with <span className="text-red-500">❤️</span> by{' '}
                <span className="font-bold text-indigo-600">Lamidev</span>
              </p>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/akinyemi-oluwatosin-95519130b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  title="Connect on LinkedIn"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/thisslami?igsh=MWRtNmwydnBzbnhuaw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
                  title="Follow on Instagram"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://wa.me/2347056501913?text=Hello%20Lamidev,%20I%20saw%20your%20work%20on%20Roote%20Ancestral%20and%20I'd%20like%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                  title="Chat on WhatsApp"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;