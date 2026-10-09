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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // The Critical Sync: Tell ScrollTrigger to update every time Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker function for clean teardown
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    // Sync Lenis's requestAnimationFrame with GSAP's ticker
    gsap.ticker.add(updateTicker);

    // Prevent GSAP from trying to catch up on missed frames (prevents lag spikes)
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};