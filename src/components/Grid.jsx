import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const carouselData = [
  { id: 1, title: 'The Threshold', src: "/artworks-images/artwork 1.jpg" },
  { id: 2, title: 'Inner Chamber', src: "/artworks-images/artwork 2.jpeg" },
  { id: 3, title: 'Lower Hall', src: "/artworks-images/artwork 3.jpg" },
];

export default function GridSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: (direction) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }),
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Keep the dome and secondary images tied to scroll
  const timeline = [0, 0.2, 0.7, 1];
  const centerWidth = useTransform(scrollYProgress, timeline, ["40vw", "95vw", "95vw", "40vw"]);
  const centerHeight = useTransform(scrollYProgress, timeline, ["60vh", "85vh", "85vh", "45vh"]);
  const centerY = useTransform(scrollYProgress, timeline, ["0vh", "0vh", "0vh", "27.5vh"]);
  const centerRadius = useTransform(scrollYProgress, timeline, ["16px", "24px", "24px", "300px 300px 0px 0px"]);

  const sidePushTimeline = [0, 0.2]; 
  const pushLeftX = useTransform(scrollYProgress, sidePushTimeline, ["0vw", "-110vw"]);
  const pushRightX = useTransform(scrollYProgress, sidePushTimeline, ["0vw", "110vw"]);
  const uiOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.7, 0.85], [0, 1, 1, 0]);

  // Background text parallax is the only one we keep on scroll logic
  const bgTextY = useTransform(scrollYProgress, [0.8, 1], ["100px", "-100px"]);

  const secondaryImages = [
    { id: 1, src: "/artworks-images/artwork 1.jpg", x: pushLeftX, classes: "left-[2vw] top-[5vh] w-[12vw] h-[25vh]" },
    { id: 2, src: "/artworks-images/artwork 2.jpeg", x: pushLeftX, classes: "left-[15vw] top-[35vh] w-[10vw] h-[20vh]" },
    { id: 3, src: "/artworks-images/artwork 3.jpg", x: pushLeftX, classes: "left-[4vw] bottom-[5vh] w-[13vw] h-[28vh]" },
    { id: 5, src: "/artworks-images/artwork 5.jpeg", x: pushRightX, classes: "right-[2vw] top-[10vh] w-[12vw] h-[22vh]" },
    { id: 6, src: "/artworks-images/artwork 6.jpeg", x: pushRightX, classes: "right-[16vw] top-[40vh] w-[9vw] h-[18vh]" },
    { id: 7, src: "/artworks-images/artwork 7.jpeg", x: pushRightX, classes: "right-[5vw] bottom-[8vh] w-[14vw] h-[26vh]" },
  ];

  return (
    <div className="bg-[#111111] font-sans">
      <div ref={containerRef} className="relative h-[350vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {secondaryImages.map((img) => (
            <motion.div 
              key={img.id}
              style={{ x: img.x, opacity: 1 }}
              className={`absolute overflow-hidden rounded-lg shadow-xl ${img.classes}`}
            >
              <img src={img.src} alt={`Artwork ${img.id}`} className="w-full h-full object-cover grayscale-[0.2]" />
            </motion.div>
          ))}

          <motion.div 
            style={{ 
              width: centerWidth, 
              height: centerHeight, 
              borderRadius: centerRadius,
              y: centerY 
            }} 
            className="absolute z-10 overflow-hidden shadow-2xl bg-zinc-900"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={activeIndex}
                src={carouselData[activeIndex].src}
                alt={carouselData[activeIndex].title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </AnimatePresence>

            <motion.div style={{ opacity: uiOpacity }} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            <motion.div style={{ opacity: uiOpacity }} className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-16 left-0 right-0 flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="text-white text-5xl md:text-8xl font-serif text-center px-4"
                  >
                    {carouselData[activeIndex].title}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-6 md:px-12 pointer-events-none">
                <button onClick={handlePrev} className="p-4 rounded-full border border-white/20 text-white backdrop-blur-md bg-black/40 pointer-events-auto">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button onClick={handleNext} className="p-4 rounded-full border border-white/20 text-white backdrop-blur-md bg-black/40 pointer-events-auto">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* WHITE SECTION - Using whileInView instead of scroll math for the main text */}
      <div className="relative z-30 bg-[#efece8] min-h-screen flex flex-col items-center justify-center p-8 border-t border-black/10 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
        
        {/* Background Label */}
        <motion.span 
          style={{ y: bgTextY }}
          className="absolute top-1/4 text-[18vw] font-serif text-black/[0.05] uppercase tracking-tighter select-none pointer-events-none text-center w-full"
        >
          Zigguratss
        </motion.span>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-bold block">
            The Final Evolution
          </span>
          
          <h3 className="text-black text-5xl md:text-8xl font-serif max-w-5xl leading-[1.1] mb-8">
            Art That Transcends <br/> 
            <span className="italic text-[#C5A059]">The Physical Map</span>
          </h3>

          <p className="text-black/60 max-w-xl text-sm md:text-lg leading-relaxed font-light mb-12">
            Zigguratss isn't just a gallery; it's a digital sanctuary. We curate the intersection of 
            human inspiration and technological mastery, bringing you works that exist 
            beyond the boundaries of traditional coordinates.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-black text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors shadow-xl"
          >
            Enter The Vault
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}