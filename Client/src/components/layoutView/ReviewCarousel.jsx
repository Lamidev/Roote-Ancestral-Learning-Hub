import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const StudentReviewsCarousel = () => {
  const reviews = [
    {
      id: 1,
      name: "Adeola",
      age: 8,
      parentName: "Mrs. Johnson",
      rating: 5,
      content: "My daughter went from knowing just 'hello' to having full Yoruba conversations! The cultural stories make learning so engaging and fun.",
      avatarColor: "bg-indigo-100 text-indigo-700"
    },
    {
      id: 2,
      name: "Chinedu",
      age: 12,
      parentName: "Mr. & Mrs. Okafor",
      rating: 5,
      content: "The teachers are incredibly patient and knowledgeable. My son now writes Yoruba essays confidently and loves sharing what he learns!",
      avatarColor: "bg-purple-100 text-purple-700"
    },
    {
      id: 3,
      name: "Zahara",
      age: 5,
      parentName: "Ms. Ahmed",
      rating: 5,
      content: "My daughter sings Yoruba songs all day! The interactive games and activities make learning feel like playtime. She asks for her Yoruba class every day!",
      avatarColor: "bg-pink-100 text-pink-700"
    },
    {
      id: 4,
      name: "Kofi",
      age: 15,
      parentName: "Dr. Mensah",
      rating: 5,
      content: "As a teenager reconnecting with my heritage, these classes have been transformative. The advanced level lessons are challenging but incredibly rewarding.",
      avatarColor: "bg-amber-100 text-amber-700"
    },
    {
      id: 5,
      name: "Ife",
      age: 10,
      parentName: "Mr. Adeyemi",
      rating: 5,
      content: "The cultural immersion is amazing! My child not only learns the language but also understands the traditions and values behind it.",
      avatarColor: "bg-green-100 text-green-700"
    },
    {
      id: 6,
      name: "Temi",
      age: 7,
      parentName: "Mrs. Bello",
      rating: 5,
      content: "The small class sizes ensure personalized attention. My daughter's confidence in speaking Yoruba has grown tremendously!",
      avatarColor: "bg-blue-100 text-blue-700"
    }
  ];

  // Double the reviews for a seamless infinite scroll
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 sm:py-24 px-4 bg-white overflow-hidden relative">
      {/* Background Gradients for Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 mb-4 font-outfit">
            What Parents & Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Join hundreds of families who've discovered the joy of learning Yoruba with Roote Ancestral
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative mt-8 sm:mt-12 group touch-pan-x">
          <div className="flex gap-6 py-4 animate-marquee">
            {doubledReviews.map((review, index) => (
              <Card 
                key={`${review.id}-${index}`}
                className="w-[300px] sm:w-[450px] shrink-0 border-indigo-100/60 hover:shadow-2xl transition-all duration-500 hover:border-indigo-300 bg-white/90 backdrop-blur-md select-none transform hover:-translate-y-2 active:scale-95 sm:active:scale-100"
              >
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-indigo-200/50" />
                    </div>
                    
                    <p className="text-gray-700 mb-8 flex-grow text-sm sm:text-base leading-relaxed italic">
                      "{review.content}"
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-indigo-50">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${review.avatarColor} rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner rotate-3 group-hover:rotate-0 transition-transform`}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-900 text-base sm:text-lg">{review.name}, {review.age}</h4>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">Parent: {review.parentName}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-linear-to-r from-indigo-50 to-white rounded-full px-8 py-4 border border-indigo-100 shadow-xs">
            <div className="flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-indigo-100 pb-2 sm:pb-0 sm:pr-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-black text-indigo-900">4.9/5</span>
            </div>
            <span className="text-sm font-bold text-indigo-800 tracking-wide uppercase">
              Trusted by 200+ families worldwide
            </span>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee,
        .group:active .animate-marquee {
          animation-play-state: paused !important;
        }
      `}} />
    </section>
  );
};

export default StudentReviewsCarousel;