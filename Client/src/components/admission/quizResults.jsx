
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useQuiz } from "@/contexts/quizContext";
import { quizConfig, calculateLevel } from "@/config/quizConfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Copy, ExternalLink, Calendar, Clock, Key, Mail, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizResult = () => {
  const { state, dispatch } = useQuiz();
  const { currentScore, studentInfo, answers } = state;
  const navigate = useNavigate();

  // Initialize processing to false to show results immediately
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const savingRef = useRef(false);

  // Result is calculated locally for immediate feedback
  const result = calculateLevel(currentScore, studentInfo?.email);
  const { level, classUrl } = result;

  const handleStartLearning = () => {
    if (classUrl) {
      setHasRedirected(true);
      
      // Immediate open - no timeout
      window.open(classUrl, "_blank");

      // Reset state for next time
      setTimeout(() => {
        dispatch({ type: "RESET_QUIZ" });
      }, 500);
    }
  };

  const handleReturnHome = () => {
    dispatch({ type: "RESET_QUIZ" });
    navigate("/");
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "from-green-400 to-emerald-600";
      case "middle":
        return "from-blue-400 to-indigo-600";
      case "advanced":
        return "from-purple-400 to-pink-600";
      default:
        return "from-indigo-500 to-purple-500";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-linear-to-br from-indigo-950 to-purple-900 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
          {/* Decorative Header */}
          <div className="h-32 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
               className="bg-white p-4 rounded-full shadow-lg relative z-10"
             >
                <CheckCircle className="w-12 h-12 text-green-500" />
             </motion.div>
          </div>
          
          <CardContent className="pt-12 pb-10 px-6 sm:px-12 text-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
             >
               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 font-outfit mb-2">Placement Complete! 🎉</h2>
               <p className="text-gray-600 text-lg mb-8">We've found the perfect class level for your child.</p>

               {/* Result Badge */}
               <div className="mb-10 relative inline-block">
                 <div className={`absolute inset-0 bg-linear-to-r ${getLevelColor(level)} blur-xl opacity-30 rounded-full`}></div>
                 <div className={`relative bg-linear-to-r ${getLevelColor(level)} text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                   <span className="block text-xs uppercase tracking-widest opacity-90 mb-1">Recommended Level</span>
                   <span className="block text-3xl font-bold font-outfit tracking-wide">{level ? level.charAt(0).toUpperCase() + level.slice(1) : 'Beginner'}</span>
                 </div>
               </div>

               {/* Action Area */}
               <div className="space-y-4 max-w-md mx-auto">
                  <Button 
                    size="lg" 
                    onClick={handleStartLearning}
                    disabled={hasRedirected}
                    className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold h-14 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                     <ExternalLink className="mr-2 w-5 h-5" />
                     {hasRedirected ? "Portal Opened!" : "Access Student Portal"}
                  </Button>
                  
                   {hasRedirected && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-indigo-600 text-sm font-medium"
                    >
                      Class portal opened in a new tab!
                    </motion.p>
                  )}

                  <Button 
                    variant="ghost" 
                    onClick={handleReturnHome}
                    className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Return to Homepage
                  </Button>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-2 rounded-lg inline-flex px-4">
                    <Mail className="w-4 h-4" />
                    <span>Confirmation sent to <strong>{studentInfo?.email}</strong></span>
                  </div>
               </div>
             </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizResult;
