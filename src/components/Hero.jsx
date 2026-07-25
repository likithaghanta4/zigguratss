// 

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const containerRef = useRef(null);
  const leftFrameRef = useRef(null);
  const rightFrameRef = useRef(null);
  const centerFrameRef = useRef(null);
  const zigguratRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      tl.to(leftFrameRef.current, {
        // Reduced horizontal travel on mobile to keep frame visible
        x: isMobile ? -80 : -300, 
        rotate: isMobile ? -15 : -30,
        ease: "none"
      }, 0)
      .to(rightFrameRef.current, {
        x: isMobile ? 80 : 300,
        rotate: isMobile ? 15 : 30,
        ease: "none"
      }, 0)
      .to(centerFrameRef.current, {
        rotate: 0,
        scale: 1,
        // Match the travel distance to the relative position of Section 2
        y: isMobile ? "75vh" : "125vh", 
        ease: "none"
      }, 0)
      .fromTo(zigguratRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" }, 
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-black overflow-x-hidden">

      {/* SECTION 1: HERO */}
      <div ref={containerRef} className="h-screen w-full flex flex-col relative">
        
        {/* BACKGROUND LAYER */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#e0be6a] via-[#8e7915] to-black h-[55vh] md:h-[75vh] z-0"
          style={{ clipPath: "ellipse(140% 100% at 50% 0%)" }}
        />

        {/* CONTENT LAYER - Added md:pt-32 for desktop padding */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-10 md:pt-32">
          
          {/* Side Frames - Adjusted horizontal start points for small screens */}
          <div ref={leftFrameRef} className="absolute left-[-1rem] sm:left-4 top-[50vh] md:top-[75vh] -translate-y-1/2 w-28 h-40 md:w-48 md:h-72 border-[6px] md:border-[12px] border-white shadow-2xl rotate-[-5deg] z-10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Art 1" />
          </div>

          <div ref={rightFrameRef} className="absolute right-[-1rem] sm:right-4 top-[50vh] md:top-[75vh] -translate-y-1/2 w-24 h-36 md:w-48 md:h-72 border-[6px] md:border-[12px] border-white shadow-2xl rotate-[5deg] z-10 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Art 2" />
          </div>

          {/* Ladder Text */}
          <div className="relative flex flex-col w-full max-w-5xl px-6 md:px-20 mt-[-5vh] md:mt-0">
            <h1 className="z-10 text-5xl md:text-8xl font-serif text-[#f5f5dc] uppercase tracking-widest self-start drop-shadow-lg">
              Create
            </h1>
            
            <h1 className="z-0 text-5xl md:text-8xl font-serif text-[#f5f5dc] uppercase tracking-widest self-center my-4 md:my-6">
              Inspire
            </h1>

            {/* Middle Frame - Slightly smaller on mobile to keep text legible */}
            <div ref={centerFrameRef} className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-60 md:w-80 md:h-[28rem] border-[10px] md:border-[16px] border-white shadow-2xl z-0 rotate-[15deg] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Main Art" />
            </div>

            <h1 className="z-20 text-5xl md:text-8xl font-serif text-[#f5f5dc] uppercase tracking-widest self-end drop-shadow-lg">
              Evolve
            </h1>
          </div>
        </div>
      </div>

      {/* ZIGGURATSS - Adjusted padding for cleaner transition */}
      <div className="relative z-40 min-h-0 w-full flex justify-center pt-20 pb-10 md:py-16 bg-transparent overflow-hidden">
          <h2 ref={zigguratRef} className="text-5xl md:text-7xl lg:text-9xl font-serif uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#D4AF37] drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] whitespace-nowrap px-4">
            Zigguratss
          </h2>
      </div>

      {/* SECTION 2: GALLERY CONTENT */}
      <div className="relative z-30 py-16 md:py-40 w-full flex flex-col items-center justify-center px-6 text-center bg-transparent">
        <h2 className="text-white text-3xl md:text-6xl font-serif uppercase tracking-widest max-w-4xl drop-shadow-2xl leading-tight">
          The Gallery of Tomorrow
        </h2>
        <p className="text-white/60 mt-6 md:mt-10 max-w-xl text-sm md:text-xl drop-shadow-md leading-relaxed font-light">
          Beyond the frame lies a world of digital expression. Continue scrolling to witness the fusion of traditional aesthetics and modern technology.
        </p>
      </div>

      <div className="h-[5vh] md:h-[10vh] bg-black" />
    </div>
  );
};

export default LandingPage;