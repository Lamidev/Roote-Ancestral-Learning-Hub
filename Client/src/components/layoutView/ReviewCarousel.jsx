import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  // Handle touch events for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextReview();
    } else if (isRightSwipe) {
      prevReview();
    }
  };

  // Auto-play functionality - much simpler without pause/play toggle
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000); // Change review every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Calculate visible reviews based on screen size
  const getVisibleReviews = () => {
    if (typeof window === 'undefined') return [reviews[currentIndex]];
    
    if (window.innerWidth >= 1024) {
      // Large screens: show 3 reviews
      const start = currentIndex % reviews.length;
      const end = start + 3;
      if (end <= reviews.length) {
        return reviews.slice(start, end);
      } else {
        return [...reviews.slice(start), ...reviews.slice(0, end - reviews.length)];
      }
    } else if (window.innerWidth >= 768) {
      // Medium screens: show 2 reviews
      const start = currentIndex % reviews.length;
      const end = start + 2;
      if (end <= reviews.length) {
        return reviews.slice(start, end);
      } else {
        return [...reviews.slice(start), ...reviews.slice(0, end - reviews.length)];
      }
    } else {
      // Small screens: show 1 review
      return [reviews[currentIndex]];
    }
  };

  // Use a default for SSR
  const visibleReviews = typeof window !== 'undefined' ? getVisibleReviews() : [reviews[0]];

  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-4 font-outfit">
            What Parents & Students Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Join hundreds of families who've discovered the joy of learning Yoruba with Roote Ancestral
          </p>
        </motion.div>

        {/* Desktop & Tablet: Grid Layout */}
        <div className="hidden md:block">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-indigo-100 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 bg-white">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <Quote className="w-6 h-6 text-indigo-300" />
                        </div>
                        
                        <p className="text-gray-700 mb-6 flex-grow text-sm leading-relaxed">
                          "{review.content}"
                        </p>
                        
                        <div className="mt-auto">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${review.avatarColor} rounded-full flex items-center justify-center font-bold text-lg`}>
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.name}, {review.age}</h4>
                              <p className="text-sm text-gray-500">Parent: {review.parentName}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Carousel Layout */}
        <div className="md:hidden">
          <div 
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-indigo-100 shadow-lg bg-white mx-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-7 h-7 text-indigo-300" />
                    </div>
                    
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">
                      "{reviews[currentIndex].content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${reviews[currentIndex].avatarColor} rounded-full flex items-center justify-center font-bold text-xl`}>
                        {reviews[currentIndex].name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{reviews[currentIndex].name}, {reviews[currentIndex].age}</h4>
                        <p className="text-sm text-gray-500">Parent: {reviews[currentIndex].parentName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border-indigo-200 shadow-md hover:bg-indigo-50"
              onClick={prevReview}
            >
              <ChevronLeft className="w-4 h-4 text-indigo-700" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white border-indigo-200 shadow-md hover:bg-indigo-50"
              onClick={nextReview}
            >
              <ChevronRight className="w-4 h-4 text-indigo-700" />
            </Button>
          </div>
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            className="border-indigo-300 hover:bg-indigo-50"
            onClick={prevReview}
          >
            <ChevronLeft className="w-5 h-5 text-indigo-700" />
          </Button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-600 w-8' 
                    : 'bg-indigo-200 hover:bg-indigo-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="border-indigo-300 hover:bg-indigo-50"
            onClick={nextReview}
          >
            <ChevronRight className="w-5 h-5 text-indigo-700" />
          </Button>
        </div>

        {/* Mobile Dots Indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-indigo-600 w-4 h-4' 
                  : 'bg-indigo-200'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-indigo-50 rounded-2xl px-6 py-3 border border-indigo-100">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-lg font-bold text-indigo-900">4.9/5</span>
            </div>
            <span className="text-sm font-medium text-indigo-700 hidden sm:inline">•</span>
            <span className="text-sm font-medium text-indigo-900">Rated by 200+ families</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentReviewsCarousel;