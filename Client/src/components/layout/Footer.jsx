import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-indigo-900 to-indigo-950 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <span className="text-indigo-900 font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold font-outfit">Roote Ancestral</span>
            </Link>
            <p className="text-indigo-100 max-w-md leading-relaxed">
              Preserving Yoruba heritage through language education. 
              Join us in connecting with your roots and discovering the beauty of Yoruba culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white font-outfit">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-indigo-100 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="text-indigo-100 hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link to="/classes" className="text-indigo-100 hover:text-white transition-colors duration-300">Classes</Link></li>
              <li><Link to="/contact" className="text-indigo-100 hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-semibold mb-4 text-white font-outfit">Start Learning</h3>
            <ul className="space-y-2">
              <li><Link to="/admission" className="text-indigo-100 hover:text-white transition-colors duration-300">Admission Process</Link></li>
              <li><Link to="/classes" className="text-indigo-100 hover:text-white transition-colors duration-300">Class Levels</Link></li>
              <li><a href="#" className="text-indigo-100 hover:text-white transition-colors duration-300">Student Portal</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200">
          <p>&copy; {new Date().getFullYear()} Roote Ancestral Learning Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;