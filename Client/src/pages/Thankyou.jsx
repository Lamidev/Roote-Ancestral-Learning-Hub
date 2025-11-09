// src/pages/ThankYou.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full text-center bg-white rounded-3xl shadow-2xl border border-indigo-100 p-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="text-6xl mb-4"
        >
          🌿
        </motion.div>

        <h1 className="text-3xl font-bold text-indigo-800 font-outfit mb-3">
          Thank You for Taking the Assessment!
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6 font-outfit">
          Your Yoruba level has been recorded successfully.
          <br />We’ve sent a summary and next steps to your email.
          <br />
          Whenever you’re ready, you can join your class and continue learning.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700 font-outfit shadow-md hover:shadow-xl transition-all duration-300"
          >
            Return Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/admission")}
            size="lg"
            className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-outfit"
          >
            Explore More About Roote Ancestral
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-6 font-outfit">
          🌸 Roote Ancestral Learning Hub — Preserving Culture, Inspiring Minds.
        </p>
      </motion.div>
    </div>
  );
}
