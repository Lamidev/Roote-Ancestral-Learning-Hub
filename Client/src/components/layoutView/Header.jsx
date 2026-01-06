import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import rooteLogo from '@/assets/rooteLogo.jpg';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/admission', label: 'Admission' },
    { path: '/classes', label: 'Classes' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto md:px-4 px-3 flex items-center justify-between min-h-[64px] md:min-h-[80px]">
        <Link to="/" className="flex items-center group z-10 -ml-2 md:ml-0">
          <motion.img
            src={rooteLogo}
            alt="Roote Logo"
            className="h-13 w-auto md:h-13 object-contain"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-all duration-300 hover:text-indigo-600 relative ${location.pathname === item.path ? 'text-indigo-600' : 'text-gray-900'
                }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center">
          {isHomePage ? (
            <Button
              asChild
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg transition-all duration-300 font-outfit"
            >
              <Link to="/admission">Get Started</Link>
            </Button>
          ) : (
            <div className="w-32 opacity-0">
              <Button size="sm" className="px-6" disabled>
                Get Started
              </Button>
            </div>
          )}
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
            ></span>
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden bg-white border-t px-4 py-4 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 rounded-lg transition-all duration-300 text-lg font-outfit ${location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-outfit"
                >
                  <Link to="/admission" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;