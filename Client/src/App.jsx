

import React from 'react';
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

function App() {
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