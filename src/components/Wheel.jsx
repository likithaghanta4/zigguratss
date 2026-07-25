import React, { useState, useEffect, useRef } from "react";
/* eslint-disable-next-line no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Wheel.css";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

function useWheelItems(projects, angle, radius) {
  const xTransforms = [];
  const yTransforms = [];
  const opacityTransforms = [];
  /* eslint-disable react-hooks/rules-of-hooks */
  for (let i = 0; i < projects.length; i++) {
    const initialAngle = (i / projects.length) * 2 * Math.PI;
    xTransforms[i] = useTransform(angle, (a) => radius * Math.cos(initialAngle + a));
    yTransforms[i] = useTransform(angle, (a) => radius * Math.sin(initialAngle + a));
    opacityTransforms[i] = useTransform(angle, (a) => {
      const currentAngle = initialAngle + a;
      return Math.cos(currentAngle) > 0 ? 1 : 0;
    });
  }
  /* eslint-enable react-hooks/rules-of-hooks */
  return { xTransforms, yTransforms, opacityTransforms };
}

/* Stagger animation for each text line */
const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const Wheel = ({ projects }) => {
  const wheelRef = useRef(null);
  const { width } = useWindowSize();
  const snapTimeout = useRef(null);

  const getResponsiveRadius = () => {
    if (width < 480) return 700;
    if (width < 768) return 350;
    if (width < 1024) return 600;
    return 1000;
  };
  const getResponsiveItemSize = () => {
    if (width < 480) return 270;
    if (width < 768) return 220;
    if (width < 1024) return 320;
    return 400;
  };
  const getResponsiveLeftOffset = () => {
    if (width < 480) return "-507px";
    if (width < 768) return "30px";
    if (width < 1024) return "60px";
    return "-200px";
  };

  const radius = getResponsiveRadius();
  const itemSize = getResponsiveItemSize();
  const leftOffset = getResponsiveLeftOffset();

  const rawAngle = useMotionValue(0);
  const angle = useSpring(rawAngle, { stiffness: 40, damping: 25 });
  const speedFactor = 0.005;

  // useEffect(() => {
  //   const handleWheel = (e) => {
  //     e.preventDefault();
  //     const delta = -e.deltaY * speedFactor;
  //     rawAngle.set(rawAngle.get() + delta);
  //     if (snapTimeout.current) clearTimeout(snapTimeout.current);
  //     snapTimeout.current = setTimeout(() => snapToNearest(), 150);
  //   };
  //   let touchStartY = 0;
  //   const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
  //   const handleTouchMove = (e) => {
  //     e.preventDefault();
  //     const touchEndY = e.touches[0].clientY;
  //     const delta = -(touchStartY - touchEndY) * speedFactor * 2;
  //     rawAngle.set(rawAngle.get() + delta);
  //     touchStartY = touchEndY;
  //     if (snapTimeout.current) clearTimeout(snapTimeout.current);
  //     snapTimeout.current = setTimeout(() => snapToNearest(), 150);
  //   };
  //   window.addEventListener("wheel", handleWheel, { passive: false });
  //   window.addEventListener("touchstart", handleTouchStart, { passive: false });
  //   window.addEventListener("touchmove", handleTouchMove, { passive: false });
  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //     window.removeEventListener("touchstart", handleTouchStart);
  //     window.removeEventListener("touchmove", handleTouchMove);
  //     if (snapTimeout.current) clearTimeout(snapTimeout.current);
  //   };
  // }, [rawAngle]);

 useEffect(() => {
  const handleWheel = (e) => {
    if (!wheelRef.current) return;

    const isInsideWheel = wheelRef.current.contains(e.target);
    if (!isInsideWheel) return;

    e.preventDefault();

    const delta = -e.deltaY * speedFactor;
    rawAngle.set(rawAngle.get() + delta);

    if (snapTimeout.current) clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => snapToNearest(), 150);
  };

  // ✅ NEW: keyboard control
  const handleKeyDown = (e) => {
    if (!wheelRef.current) return;

    const isInsideWheel =
      wheelRef.current.contains(document.activeElement) ||
      wheelRef.current.matches(":hover");

    if (!isInsideWheel) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      rawAngle.set(rawAngle.get() - 0.2); // scroll down
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      rawAngle.set(rawAngle.get() + 0.2); // scroll up
    }

    if (snapTimeout.current) clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => snapToNearest(), 150);
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [rawAngle]);

  const snapToNearest = () => {
    const step = (2 * Math.PI) / projects.length;
    const current = rawAngle.get();
    const snapped = Math.round(current / step) * step;
    rawAngle.set(snapped);
  };

  const { xTransforms, yTransforms, opacityTransforms } = useWheelItems(projects, angle, radius);

  return (
    <>
 {/* <div className="featured-page-heading">
    <h1>Featured Artists</h1>
  </div> */}
    
      {/* ── LEFT SIDE TEXT ── */}
      <div className="wheel-left-info">
        
        <motion.p
          className="wl-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          — Featured Artists
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Explore Our<br />
          <em>Artists</em>
        </motion.h2>
        <motion.p
          className="wl-body"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          Discover a curated selection of contemporary
          artists redefining visual storytelling through
          digital and traditional mediums.
        </motion.p>
      </div>

      {/* ── WHEEL ── */}
    <div ref={wheelRef} className="wheel-fixed" style={{ left: leftOffset }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="wheel-item"
            style={{
              x: xTransforms[index],
              y: yTransforms[index],
              opacity: opacityTransforms[index],
              position: "absolute",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
              width: itemSize,
              height: itemSize,
            }}
            whileHover={{
              scale: 1.1,
              zIndex: 10,
              boxShadow: "0px 30px 60px rgba(0,0,0,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={`/project/${project.id}`}>
              <img src={project.img} alt={project.title} />
            </Link>

            {/* ── TEXT SECTION ── */}
            <motion.div className="text-section">

              {/* AR.05 /10 */}
              <motion.h1
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={0}
              >
                <span className="wt-title-main">{project.title}</span>
                <br />
                <span className="slash">/10</span>
              </motion.h1>

              {/* Divider line */}
              <motion.div
                className="wt-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              />

              {/* Artist name */}
              <motion.p
                className="author"
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={1}
              >
                {project.name}
              </motion.p>

              {/* Designation */}
              <motion.p
                className="designation"
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={2}
              >
                {project.designation}
              </motion.p>

              {/* Total artwork */}
              <motion.p
                className="total-artwork"
                variants={lineVariants}
                initial="hidden"
                animate="show"
                custom={3}
              >
                {project.totalartwork} Artworks
              </motion.p>

            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="scroll-indicator">
        <div className="indicator-circle">
          <motion.div
            className="indicator-dot"
            style={{
              x: useTransform(angle, (a) => 30 * Math.cos(a)),
              y: useTransform(angle, (a) => 30 * Math.sin(a)),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Wheel;