// src/components/CustomCursor.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const numPoints = 15;
    const friction = 0.4;
    
    const points = Array.from({ length: numPoints }, () => ({ 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    }));
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const setDotX = gsap.quickSetter(cursorRef.current, "x", "px");
    const setDotY = gsap.quickSetter(cursorRef.current, "y", "px");

    const updateRope = () => {
      points[0].x = mouse.x;
      points[0].y = mouse.y;

      for (let i = 1; i < numPoints; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * friction;
        points[i].y += (points[i - 1].y - points[i].y) * friction;
      }

      if (pathRef.current) {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < numPoints - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          d += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
        }
        d += ` L ${points[numPoints - 1].x} ${points[numPoints - 1].y}`;
        pathRef.current.setAttribute('d', d);
      }

      setDotX(mouse.x - 4);
      setDotY(mouse.y - 4);
    };

    gsap.ticker.add(updateRope);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateRope);
    };
  }, []);

  return (
    // Z-index 9999 to ensure it stays above everything
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <svg className="w-full h-full">
        <path
          ref={pathRef}
          // Changed stroke to a standard color to ensure visibility
          className="stroke-[#C5A059] fill-none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      <div
        ref={cursorRef}
        // Changed bg to a standard color
        className="absolute top-0 left-0 w-2 h-2 bg-[#C5A059] rounded-full"
      />
    </div>
  );
};