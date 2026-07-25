import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import gsap from 'gsap';
import malyadrik from '../assets/User-images/Malyadri k.jpeg';
import pradipSarkar from '../assets/User-images/Pradip Sarkar.jpeg';
import gulshanAchari from '../assets/User-images/GULSHAN ACHARI.jpeg';
import dhatriDevalThanki from '../assets/User-images/Dhatri Deval Thanki.jpeg';
import chetanKatigar from '../assets/User-images/Chetan Katigar.jpeg';
import arjunDas from '../assets/User-images/arjunDas.jpeg';
import anupamPal from '../assets/User-images/Anupam Pal.jpeg';

export function AllExpertsPage({ onNavigate }) {
  const containerRef = useRef(null);
  const circleContainerRef = useRef(null);
  const rotationRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isInsideCircle, setIsInsideCircle] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const experts = [
    {
      id: 1,
      code: 'AR.01',
      name: 'Malyadri k',
      title: 'Fine Artist',
      image: malyadrik,
      artworks: '21',
    },
    {
      id: 2,
      code: 'AR.02',
      name: 'Pradip Sarkar',
      title: 'Cubism Artist',
      image: pradipSarkar,
      artworks: '20',
    },
    {
      id: 3,
      code: 'AR.03',
      name: 'Gulshan Achari',
      title: 'Professional Artist',
      image: gulshanAchari,
      artworks: '3',
    },
    {
      id: 4,
      code: 'AR.04',
      name: 'Dhatri Deval Thanki',
      title: 'Self Taught Artist',
      image: dhatriDevalThanki,
      artworks: '10',
    },
    {
      id: 5,
      code: 'AR.05',
      name: 'Chetan Katigar',
      title: 'Contemporary Artist',
      image: chetanKatigar,
      artworks: '27',
    },
    {
      id: 6,
      code: 'AR.06',
      name: 'Arjun Das',
      title: 'Professional Painter',
      image: arjunDas,
      artworks: '18',
    },
    {
      id: 7,
      code: 'AR.07',
      name: 'Anupam Pal',
      title: 'Indian Style Painter',
      image: anupamPal,
      artworks: '26',
    },
  ];

  // Scroll event handler for circle - ONLY updates center image, not rotation
  const handleCircleScroll = (e) => {
    if (!isInsideCircle) return;
    
    e.preventDefault();
    
    const deltaY = e.deltaY;
    const direction = deltaY > 0 ? 1 : -1; // forward or backward
    
    setCurrentIndex((prev) => {
      const newIndex = (prev + direction + experts.length) % experts.length;
      return newIndex;
    });
  };

  // Mouse enter/leave circle area
  const handleMouseEnter = () => {
    setIsInsideCircle(true);
  };

  const handleMouseLeave = () => {
    setIsInsideCircle(false);
  };

  // Auto-rotate circle - ALWAYS, independent of scroll
  useEffect(() => {
    const interval = setInterval(() => {
      rotationRef.current += 360 / experts.length;
    }, 2857);
    return () => clearInterval(interval);
  }, [experts.length]);

  return (
    <div className="bg-white overflow-hidden">
      {/* Header/Title Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>

        <div className="relative z-10 w-full">
          {/* Back Button */}
          <motion.button
            onClick={() => onNavigate && onNavigate('creative-hub')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-8 left-8 md:left-16 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition duration-300 shadow-lg"
            title="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Left Column - Text */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-8 md:pl-16 max-w-xs">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Featured</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">
                Explore Our<br />
                <span className="italic">Artists</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover a curated selection of contemporary artists redefining visual storytelling through digital and traditional mediums.
              </p>
            </motion.div>
          </div>

          {/* Center - Circular Gallery */}
          <div 
            ref={containerRef} 
            className="flex items-center justify-center min-h-screen"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={handleCircleScroll}
            style={{ cursor: isInsideCircle ? 'grab' : 'auto' }}
          >
            <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
              {/* Circular background hint */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 md:w-full md:h-full md:max-w-2xl md:max-h-2xl rounded-full border border-gray-200 opacity-20"></div>
              </div>

              {/* Center Card - Selected Artist */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isInsideCircle ? 1 : 0, scale: isInsideCircle ? 1 : 0.8 }}
                transition={{ duration: 0.4 }}
              >
                {isInsideCircle && (
                  <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src={experts[currentIndex]?.image}
                      alt={experts[currentIndex]?.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}
              </motion.div>

              {/* Cards in circular arrangement */}
              <motion.div
                ref={circleContainerRef}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
              {experts.map((expert, index) => {
                const angle = (index / experts.length) * Math.PI * 2;
                const radius = 350; // Increased radius for better visibility
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={expert.id}
                    style={{
                      x,
                      y,
                      position: 'absolute',
                    }}
                    className="w-56 h-72 cursor-pointer group"
                    onMouseEnter={() => setSelectedExpert(expert)}
                    onMouseLeave={() => setSelectedExpert(null)}
                    onClick={() => setSelectedExpert(expert)}
                  >
                    {/* Card */}
                    <div className="relative w-full h-full">
                      <motion.div
                        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <img
                          src={expert.image}
                          alt={expert.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      </motion.div>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white z-10">
                        <div>
                          <p className="text-2xl font-black font-serif">{expert.code}</p>
                          <p className="text-xs opacity-70 mt-1">/{experts.length}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold mb-1">{expert.name}</h3>
                          <p className="text-xs opacity-80 uppercase tracking-wider">{expert.title}</p>
                          <p className="text-xs opacity-70 mt-2">{expert.artworks} Artworks</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </motion.div>
            </div>

            {/* Right Column - Info */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-8 md:pr-16 max-w-xs text-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.p
                  key={currentIndex}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl font-black text-black"
                >
                  {experts[currentIndex]?.code || 'AR.01'}/{experts.length}
                </motion.p>
                <motion.div
                  key={`info-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-6"
                >
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {experts[currentIndex]?.name}
                  </h3>
                  <p className="text-sm text-gray-600 opacity-70 mb-3">
                    {experts[currentIndex]?.title}
                  </p>
                  <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-xs font-semibold">
                    {experts[currentIndex]?.artworks} Artworks
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Detail Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExpert(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl"
            >
              {/* Modal Header with Close Button */}
              <div className="absolute top-0 right-0 z-10 p-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedExpert(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition"
                >
                  ✕
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-screen lg:min-h-auto">
                {/* Left - Artist Image (Large) */}
                <motion.div
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="lg:col-span-2 relative overflow-hidden bg-gray-900"
                >
                  <img
                    src={selectedExpert.image}
                    alt={selectedExpert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </motion.div>

                {/* Right - Artist Details */}
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="lg:col-span-1 bg-white p-8 lg:p-12 flex flex-col justify-between"
                >
                  {/* Artist Code - Large and Bold */}
                  <div>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="mb-8"
                    >
                      <p className="text-8xl lg:text-9xl font-black text-black leading-none mb-4">
                        {selectedExpert.code}
                      </p>
                      <div className="h-1 w-16 bg-black"></div>
                    </motion.div>

                    {/* Artist Name and Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="space-y-4 mb-8"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Artist Name</p>
                        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">{selectedExpert.name}</h2>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Specialization</p>
                        <p className="text-xl text-gray-800 font-semibold">{selectedExpert.title}</p>
                      </div>
                    </motion.div>

                    {/* Artworks Count */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-gray-100 rounded-xl p-6 mb-8"
                    >
                      <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-3">Total Artworks</p>
                      <p className="text-5xl font-black text-black">{selectedExpert.artworks}</p>
                    </motion.div>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedExpert(null)}
                    className="w-full py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition duration-300"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <div className="flex justify-center py-12">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Scroll to explore</span>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Connect With Our Artists</h3>
            <p className="text-xl opacity-90 mb-10">
              Explore collaborations, commission custom artworks, or simply connect with these remarkable creators
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition duration-300 inline-flex items-center gap-2"
            >
              Get In Touch
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
