import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import rooteLogo from '@/assets/rooteLogo.jpg';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 mt-auto border-t">
      <div className="container mx-auto px-0 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link 
              to="/" 
              className="flex items-center mb-4 group pl-4 md:pl-0"
            >
              <img 
                src={rooteLogo} 
                alt="Roote Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 max-w-md leading-relaxed pl-4 md:pl-0">
              Preserving Yoruba heritage through language education. 
              Join us in connecting with your roots and discovering the beauty of Yoruba culture.
            </p>
            <div className="flex space-x-4 mt-4 pl-4 md:pl-0">
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
          <div className="pl-4 md:pl-0">
            <h3 className="font-semibold mb-4 text-gray-900 font-outfit">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">About</Link></li>
              <li><Link to="/classes" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Classes</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div className="pl-4 md:pl-0">
            <h3 className="font-semibold mb-4 text-gray-900 font-outfit">Start Learning</h3>
            <ul className="space-y-2">
              <li><Link to="/admission" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Admission Process</Link></li>
              <li><Link to="/classes" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Class Levels</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 px-4 md:px-0">
          <p>&copy; {new Date().getFullYear()} Roote Ancestral Learning Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;