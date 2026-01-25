// src/components/AnimatedCarousel.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const graphicRef = useRef(null);

  // Slide data - 6 slides with different colors
  const slides = [
    {
      id: 1,
      title: "Creative Designs",
      subtitle: "Innovative Solutions",
      description: "Kickstart your projects with print graphic design templates made by global artists. With product mockups, UX/UI kits, infographics, and more.",
      stats: "500+ Projects",
      bgColor: "bg-gradient-to-br from-indigo-600 to-purple-700",
      textColor: "text-white",
      graphic: "/creasoLogo.svg",
      graphicColor: "text-yellow-300/30",
      accentColor: "#8B5CF6"
    },
    {
      id: 2,
      title: "Marketing Excellence",
      subtitle: "Strategic Approach",
      description: "Comprehensive marketing solutions including social media management, promotions, and data-driven strategic planning for maximum ROI.",
      stats: "1500 Hours",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
      textColor: "text-white",
      graphic: "📈",
      graphicColor: "text-white/20",
      accentColor: "#10B981"
    },
    {
      id: 3,
      title: "Portfolio Success",
      subtitle: "Proven Results",
      description: "View our impressive portfolio featuring successful projects worldwide. 98% client satisfaction rate with ongoing support.",
      stats: "98% Success",
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
      textColor: "text-gray-900",
      graphic: "🏆",
      graphicColor: "text-amber-900/20",
      accentColor: "#F59E0B"
    },
    {
      id: 4,
      title: "Client Partnership",
      subtitle: "Collaborative Process",
      description: "We work closely with clients to understand their vision and deliver unique solutions that exceed expectations every time.",
      stats: "50+ Clients",
      bgColor: "bg-gradient-to-br from-rose-600 to-pink-700",
      textColor: "text-white",
      graphic: "👥",
      graphicColor: "text-white/20",
      accentColor: "#EF4444"
    },
    {
      id: 5,
      title: "Support System",
      subtitle: "Always Available",
      description: "Round-the-clock support with dedicated professionals ensuring your projects run smoothly from start to finish.",
      stats: "24/7 Support",
      bgColor: "bg-gradient-to-br from-violet-600 to-purple-700",
      textColor: "text-white",
      graphic: "🛠️",
      graphicColor: "text-white/20",
      accentColor: "#8B5CF6"
    },
    {
      id: 6,
      title: "Innovation Hub",
      subtitle: "Future Forward",
      description: "Cutting-edge solutions using latest technologies and creative approaches to keep you ahead of the competition.",
      stats: "15 Innovators",
      bgColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
      textColor: "text-white",
      graphic: "💡",
      graphicColor: "text-white/20",
      accentColor: "#06B6D4"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      return;
    }

    const playNext = () => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    autoPlayRef.current = setTimeout(playNext, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isPlaying, slides.length]);

  // Mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setDirection(newDirection);
    setCurrentSlide(index);
    setIsPlaying(false);
    
    // Resume auto-play after manual selection
    setTimeout(() => setIsPlaying(true), 3000);
  }, [currentSlide]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case '1': case '2': case '3': case '4': case '5': case '6':
          const index = parseInt(e.key) - 1;
          if (index < slides.length) goToSlide(index);
          break;
        case 'p': case 'P':
          setIsPlaying(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToSlide, slides.length]);

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      rotateY: dir > 0 ? 15 : -15
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.3 },
        rotateY: { duration: 0.5 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      rotateY: dir > 0 ? -15 : 15,
      transition: {
        duration: 0.3
      }
    })
  };

  // Graphic animation variants
  const graphicVariants = {
    initial: {
      x: '100%',
      y: '-100%',
      rotate: 0,
      scale: 0.8,
      opacity: 0
    },
    animate: {
      x: ['100%', '80%', '60%', '40%', '20%', '0%', '20%', '40%', '60%', '80%', '100%'],
      y: ['-100%', '-80%', '-60%', '-40%', '-20%', '0%', '20%', '40%', '60%', '80%', '100%'],
      rotate: [0, 90, 180, 270, 360, 450, 540, 630, 720],
      scale: [0.8, 1, 1.2, 1.4, 1.2, 1, 0.8],
      opacity: [0, 0.3, 0.6, 0.9, 0.6, 0.3, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <div 
      ref={carouselRef}
      className="relative w-full h-screen overflow-hidden "
    >
      {/* Main Slides */}
      <div className="absolute inset-0">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute inset-0 ${slides[currentSlide].bgColor} ${slides[currentSlide].textColor}`}
            style={{
              transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
            }}
          >
            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-3xl">
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <span className={`px-4 py-2 rounded-full ${slides[currentSlide].textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'} backdrop-blur-sm`}>
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xl md:text-2xl mb-8 max-w-2xl ${slides[currentSlide].textColor === 'text-white' ? 'text-white/90' : 'text-gray-800'}`}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* Stats */}
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block"
                >
                  <div className={`px-6 py-3 rounded-xl ${slides[currentSlide].textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'} backdrop-blur-sm`}>
                    <span className="text-2xl font-bold">{slides[currentSlide].stats}</span>
                  </div>
                </motion.div> */}

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-10 px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-shadow ${
                    slides[currentSlide].textColor === 'text-white' 
                      ? 'bg-white text-gray-900' 
                      : 'bg-gray-900 text-white'
                  }`}
                  style={{
                    backgroundColor: slides[currentSlide].textColor === 'text-white' ? 'white' : '#111827'
                  }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, ${slides[currentSlide].accentColor} 0%, transparent 50%)`
              }} />
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 80% 70%, ${slides[currentSlide].accentColor} 0%, transparent 50%)`
              }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Circular Motion Graphics */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <motion.div
          ref={graphicRef}
          variants={graphicVariants}
          initial="initial"
          animate="animate"
          className={`absolute text-[20rem] ${slides[currentSlide].graphicColor}`}
          style={{
            filter: 'blur(40px)'
          }}
        >
          {slides[currentSlide].graphic}
        </motion.div>

        {/* Secondary Graphic */}
        <motion.div
          variants={graphicVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 8,
            delay: 1
          }}
          className={`absolute text-[15rem] ${slides[currentSlide].graphicColor}`}
          style={{
            filter: 'blur(60px)'
          }}
        >
          {slides[currentSlide].graphic}
        </motion.div>
      </div>

      {/* Vertical Navigation Boxes */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              {/* Box */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  index === currentSlide
                    ? 'shadow-2xl scale-110 backdrop-blur-md'
                    : 'opacity-60 hover:opacity-80 backdrop-blur-sm'
                }`}
                style={{
                  backgroundColor: index === currentSlide
                    ? `color-mix(in srgb, ${slides[currentSlide].accentColor} 40%, transparent)`
                    : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.3)'}`
                }}
              >
                {/* Number */}
                <span
                  className={`text-xl font-bold ${
                    index === currentSlide ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {index + 1}
                </span>

                {/* Active Indicator */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ backgroundColor: 'white' }}
                  />
                )}
              </div>

              {/* Hover Title */}
              <motion.div
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
              >
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg whitespace-nowrap">
                  <span className="font-semibold text-sm">{slides[index].title}</span>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      {/* <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </motion.button> */}

      {/* Progress Bar */}
      {/* <div className="absolute bottom-8 left-8 z-30">
        <div className="flex items-center gap-3">
          <div className="w-40 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={currentSlide}
              style={{ backgroundColor: slides[currentSlide].accentColor }}
            />
          </div>
          <span className="text-white font-bold text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div> */}

      {/* Next Slide Preview */}
      {/* <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="h-full flex flex-col items-center justify-end pb-6">
          <span className="text-white/60 text-sm mb-2">Next Slide</span>
          <span className="text-white text-lg font-semibold">
            {slides[(currentSlide + 1) % slides.length].title}
          </span>
        </div>
      </motion.div> */}

      {/* Instructions */}
      <motion.div
        className="absolute top-8 left-8 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
     
      </motion.div>
    </div>
  );
};

export default Carousel;