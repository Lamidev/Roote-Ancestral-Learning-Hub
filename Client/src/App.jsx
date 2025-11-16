// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QuizProvider } from './contexts/quizContext';
// import Layout from './components/layoutView/Layout'
// import Home from './pages/Home';
// import About from './pages/About';
// import Classes from './pages/Classes';
// import Admission from './pages/Admission';
// import Contact from './pages/Contact';
// import ThankYou from './pages/Thankyou';
// // import './styles/App.css';

// function App() {
//   return (
//     <QuizProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="about" element={<About />} />
//             <Route path="classes" element={<Classes />} />
//             <Route path="admission/*" element={<Admission />} />
//             <Route path="contact" element={<Contact />} />
//           </Route>
//                     {/* Add this new route outside Layout (clean standalone page) */}
//           <Route path="/thank-you" element={<ThankYou/>} />

//         </Routes>
//       </Router>
//     </QuizProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './contexts/quizContext';
import Layout from './components/layoutView/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import ThankYou from './pages/Thankyou';
import PaymentReturn from './pages/PaymentReturn';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
    <QuizProvider>
      <Router>
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
          
          {/* Standalone pages (without header/footer) */}
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;