import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the plugin globally
gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize the physics-based scroll
    const lenis = new Lenis({
      duration: 1.2, // Creates that heavy, deliberate deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // The Critical Sync: Tell ScrollTrigger to update every time Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis's requestAnimationFrame with GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from trying to catch up on missed frames (prevents lag spikes)
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
};