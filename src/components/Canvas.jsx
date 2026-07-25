import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { getNames } from "country-list";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCard from "./LuxuryCard";
import profilesData from "../data/profile";

gsap.registerPlugin(Draggable);

const CATEGORIES = [
  "Sculpture",
  "Painting",
  "Digital Art",
  "Photography",
];

const ARTIST_TYPES = [
  "Emerging Artist",
  "Bestseller Artist",
  "Featured Artist",
  "Famous Artist",
  "Master Artist",
];

const DEFAULT_FILTERS = {
  country: "All",
  category: "All",
  artistType: "All",
};

const LERP_FACTOR = 0.09;

const Canvas = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef(new Map());
  const proxy = useRef(null);
  const tickerAdded = useRef(false);
  const smoothPos = useRef({ x: 0, y: 0 });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState(DEFAULT_FILTERS);
  const [isDragging, setIsDragging] = useState(false);

  const countries = useMemo(() => getNames().sort(), []);

  const rowData = useMemo(() => {
    const term = search.toLowerCase();

    const filtered = profilesData.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      const matchCountry =
        filters.country === "All" ||
        p.country?.trim() === filters.country;

      const matchCategory =
        filters.category === "All" ||
        p.category === filters.category;

      const matchArtistType =
        filters.artistType === "All" ||
        p.artistType === filters.artistType;

      return (
        matchSearch &&
        matchCountry &&
        matchCategory &&
        matchArtistType
      );
    });

    if (!filtered.length) {
      return {
        rows: [],
        totalCount: 0,
      };
    }

    const baseRows = [[], [], [], []];

    filtered.forEach((p, i) => {
      baseRows[i % 4].push(p);
    });

    const infiniteRows = baseRows.map((row) => {
      const tripled = [...row, ...row, ...row];

      return tripled.map((item, idx) => ({
        ...item,
        uniqueId: `${item.name}-${idx}-${Math.random()}`,
      }));
    });

    return {
      rows: infiniteRows,
      totalCount: infiniteRows.reduce(
        (acc, r) => acc + r.length,
        0
      ),
    };
  }, [search, filters]);

  const openSidebar = useCallback(() => {
    setTempFilters(filters);
    setIsSidebarOpen(true);
  }, [filters]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const applyFilters = useCallback(() => {
    setFilters(tempFilters);
    closeSidebar();
  }, [tempFilters, closeSidebar]);

  const clearTemp = useCallback(() => {
    setTempFilters(DEFAULT_FILTERS);
  }, []);

  useEffect(() => {
    if (!rowData.totalCount) return;

    const grid = gridRef.current;
    const container = containerRef.current;

    if (!grid || !container) return;

    if (!proxy.current) {
      proxy.current = document.createElement("div");
    }

    let loopX = grid.offsetWidth / 3;
    let loopY = grid.offsetHeight / 3;

    const setGridX = gsap.quickSetter(grid, "x", "px");
    const setGridY = gsap.quickSetter(grid, "y", "px");

    gsap.set(grid, { force3D: true });

    const handleScrollInput = (e) => {
      if (isSidebarOpen) return;

      let dx = 0;
      let dy = 0;

      if (e.type === "wheel") {
        dx = e.deltaX;
        dy = e.deltaY;
      } else if (e.type === "keydown") {
        const speed = 100;

        if (e.key === "ArrowRight") dx = speed;
        if (e.key === "ArrowLeft") dx = -speed;
        if (e.key === "ArrowDown") dy = speed;
        if (e.key === "ArrowUp") dy = -speed;
      }

      if (proxy.current && (dx !== 0 || dy !== 0)) {
        const currentX = gsap.getProperty(proxy.current, "x");
        const currentY = gsap.getProperty(proxy.current, "y");

        gsap.set(proxy.current, {
          x: currentX - dx,
          y: currentY - dy,
        });
      }
    };

    container.addEventListener("wheel", handleScrollInput, {
      passive: true,
    });

    container.addEventListener("keydown", handleScrollInput);

    const updateCardOpacity = () => {
      const rect = container.getBoundingClientRect();

      const vw = rect.width;
      const vh = rect.height;

      const pad = 90;

      cardRefs.current.forEach((card) => {
        if (!card?.getBounds) return;

        const b = card.getBounds();

        if (!b) return;

        const cX = b.left - rect.left + b.width / 2;
        const cY = b.top - rect.top + b.height / 2;

        const op =
          gsap.utils.mapRange(
            0,
            pad,
            0,
            1,
            gsap.utils.clamp(0, pad, cX)
          ) *
          gsap.utils.mapRange(
            vw - pad,
            vw,
            1,
            0,
            gsap.utils.clamp(vw - pad, vw, cX)
          ) *
          gsap.utils.mapRange(
            0,
            pad,
            0,
            1,
            gsap.utils.clamp(0, pad, cY)
          ) *
          gsap.utils.mapRange(
            vh - pad,
            vh,
            1,
            0,
            gsap.utils.clamp(vh - pad, vh, cY)
          );

        card.setOpacity(op);
      });
    };

    const tick = () => {
      const rawX = gsap.getProperty(proxy.current, "x");
      const rawY = gsap.getProperty(proxy.current, "y");

      smoothPos.current.x +=
        (rawX - smoothPos.current.x) * LERP_FACTOR;

      smoothPos.current.y +=
        (rawY - smoothPos.current.y) * LERP_FACTOR;

      const wrappedX = gsap.utils.wrap(
        -loopX,
        0,
        smoothPos.current.x
      );

      const wrappedY = gsap.utils.wrap(
        -loopY,
        0,
        smoothPos.current.y
      );

      setGridX(wrappedX);
      setGridY(wrappedY);

      updateCardOpacity();
    };

    if (!tickerAdded.current) {
      gsap.ticker.add(tick);
      tickerAdded.current = true;
    }

    const dragInstance = Draggable.create(proxy.current, {
      type: "x,y",
      trigger: container,
      inertia: true,
      throwResistance: 1200,
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => setIsDragging(false),
      allowNativeTouchScrolling: true,
      dragClickables: false,
    });

    return () => {
      if (dragInstance[0]) {
        dragInstance[0].kill();
      }

      gsap.ticker.remove(tick);
      tickerAdded.current = false;

      container.removeEventListener(
        "wheel",
        handleScrollInput
      );

      container.removeEventListener(
        "keydown",
        handleScrollInput
      );
    };
  }, [rowData, isSidebarOpen]);

  return (
    <main
      ref={containerRef}
      tabIndex={0}
      className="relative w-full h-screen bg-[#070707] overflow-hidden touch-none select-none isolate"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* CONTROLS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-24 md:right-10 md:left-auto z-[110] flex flex-col md:flex-row items-center gap-3 w-[90%] md:w-auto pointer-events-none">
        {/* SEARCH */}
        <div className="pointer-events-auto w-full md:w-auto flex items-center bg-black/60 backdrop-blur-2xl border border-white/[0.08] rounded-full px-6 py-3 transition-all duration-500 hover:border-white/20 hover:bg-black/80 group">
          <input
            type="text"
            placeholder="Search Artist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-[11px] outline-none w-full md:w-48 placeholder:text-white/20 uppercase tracking-[0.2em] font-serif italic"
          />
        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={openSidebar}
          className="pointer-events-auto w-full md:w-auto px-8 py-4 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:bg-neutral-200 active:scale-95 shadow-xl"
        >
          Filters {filters !== DEFAULT_FILTERS && "•"}
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[150] cursor-crosshair"
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
              }}
              className="absolute top-0 left-0 h-full w-full sm:w-[320px] bg-[#0a0a0a] z-[160] flex flex-col shadow-2xl"
              style={{
                borderRight:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between px-7 py-8 border-b border-white/5">
                <div className="flex flex-col">
                  <h2 className="text-[#e5c787] text-xl font-serif italic tracking-tight">
                    Search Filters
                  </h2>
                </div>

                <button
                  onClick={closeSidebar}
                  className="group p-2 -mr-2 transition-transform duration-300 hover:rotate-90"
                >
                  <div className="relative w-5 h-5">
                    <span className="absolute top-1/2 left-0 w-full h-[1px] bg-[#e5c787]/50 group-hover:bg-[#e5c787] rotate-45"></span>

                    <span className="absolute top-1/2 left-0 w-full h-[1px] bg-[#e5c787]/50 group-hover:bg-[#e5c787] -rotate-45"></span>
                  </div>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-7 py-10 scrollbar-hide">
                {/* CATEGORY */}
                <div className="mb-12">
                  <p className="text-[9px] text-[#c5a059] mb-6 uppercase tracking-[0.3em] font-semibold opacity-90">
                    Select Artist Category
                  </p>

                  <div className="space-y-4">
                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center group cursor-pointer"
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-3.5 h-3.5 border border-white/20 rounded-full checked:border-[#e5c787] transition-all duration-300"
                            checked={
                              tempFilters.category === cat
                            }
                            onChange={() =>
                              setTempFilters((prev) => ({
                                ...prev,
                                category:
                                  prev.category === cat
                                    ? "All"
                                    : cat,
                              }))
                            }
                          />

                          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#e5c787] scale-0 peer-checked:scale-100 transition-transform duration-300 shadow-[0_0_8px_rgba(229,199,135,0.6)]" />
                        </div>

                        <span className="ml-4 text-sm text-white/50 group-hover:text-[#e5c787] transition-colors duration-300 uppercase tracking-widest font-light">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 py-8 flex flex-col gap-3 border-t border-white/5 bg-[#0a0a0a]">
                <button
                  onClick={applyFilters}
                  className="w-full py-4 bg-[#e5c787] text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all duration-300"
                >
                  Apply Filters
                </button>

                <button
                  onClick={clearTemp}
                  className="w-full py-3 text-[#c5a059]/40 text-[9px] uppercase tracking-[0.3em] hover:text-[#e5c787] transition-colors"
                >
                  Reset Selection
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* GRID */}
      <section
        ref={gridRef}
        className="absolute top-0 left-0 flex flex-col gap-8 md:gap-16 p-10 md:p-20 pt-32 md:pt-64 w-max will-change-transform"
      >
        {rowData.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-8 md:gap-16"
            style={{
              paddingLeft:
                rowIndex % 2 !== 0 ? "60px" : "0",
            }}
          >
            {row.map((profile, i) => (
              <LuxuryCard
                key={profile.uniqueId}
                profile={profile}
                ref={(el) => {
                  if (el) {
                    cardRefs.current.set(
                      `${rowIndex}-${i}`,
                      el
                    );
                  } else {
                    cardRefs.current.delete(
                      `${rowIndex}-${i}`
                    );
                  }
                }}
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Canvas;