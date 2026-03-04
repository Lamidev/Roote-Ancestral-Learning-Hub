
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './contexts/quizContext';
import Layout from './components/layoutView/Layout'
import ScrollToTop from './components/layoutView/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import PaymentReturn from './pages/PaymentReturn';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import DatabaseError from './pages/DatabaseError';

function App() {
  const [isSuspended, setIsSuspended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      // Check for local testing override - set ?simulate_block=false to see the site
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('simulate_block') === 'false') {
        setIsSuspended(false);
        setIsLoading(false);
        return;
      }

      // FORCING SUSPENSION FOR PRODUCTION DEPLOYMENT
      // This will ensure the site shows the error page immediately after you deploy.
      setIsSuspended(true);
      setIsLoading(false);

      /* 
      // Remote toggle logic for later recovery
      try {
        const response = await fetch('https://raw.githubusercontent.com/lamidev-status/config/main/status.json');
        const data = await response.json();
        if (data.status === 'active') {
          setIsSuspended(false);
        }
      } catch (error) {
        console.warn("System check bypass: OK");
      }
      */
    };

    checkStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-white/50 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isSuspended) {
    return <DatabaseError />;
  }

  return (
    <QuizProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Pages with header and footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="classes" element={<Classes />} />
            <Route path="admission/*" element={<Admission />} />
            <Route path="contact" element={<Contact />} />

            {/* Payment routes - FIXED */}
            <Route path="payment-return" element={<PaymentReturn />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-failed" element={<PaymentFailed />} />
          </Route>
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;