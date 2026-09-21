import React, { useState, useEffect, useRef } from 'react';
import About from "./AboutPage";
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.png";

/* ─────────────────────────────────────
    DATA OBJECT (Unchanged)
───────────────────────────────────── */
const data = {
  artwork: {
    categories: ["Paintings", "Sculptures", "Photography", "Digital Art", "Mixed Media", "Prints", "Drawings"],
    filters: {
      Category: ["Abstract", "Portrait", "Landscape", "Still Life", "Contemporary", "Classical", "Modern"],
      Style: ["Impressionism", "Cubism", "Surrealism", "Minimalism", "Pop Art", "Realism", "Expressionism"],
      Medium: ["Oil on Canvas", "Acrylic", "Watercolor", "Charcoal", "Digital", "Bronze", "Marble"],
    },
    featured: {
      title: "Featured Artwork",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000",
    },
  },
  artists: {
    categories: ["Painters", "Sculptors", "Photographers", "Digital Artists", "Mixed Media Artists", "Printmakers"],
    groups: {
      Emerging: ["Sofia Chen", "Marcus Rivera", "Elena Volkov", "James Park", "Aria Nakamura"],
      Featured: ["Isabella Romano", "David Kim", "Sarah Mitchell", "Carlos Mendez", "Nina Petrov"],
      Bestseller: ["Alexander Stone", "Maria Santos", "Robert Chen", "Lisa Anderson", "Ahmed Hassan"],
      Famous: ["Catherine Moore", "Vincent Torres", "Rachel Green", "Michael Brown", "Anna Kowalski"],
      Master: ["Leonardo Rossi", "Yuki Tanaka", "Pierre Dubois", "Sophia Williams", "Marco Benedetti"],
    },
    profiles: [
      { name: "Isabella Romano", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
      { name: "Alexander Stone", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
      { name: "Sofia Chen", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
      { name: "Leonardo Rossi", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
      { name: "Catherine Moore", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" },
      { name: "David Kim", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
      { name: "Yuki Tanaka", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150" },
      { name: "Maria Santos", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150" },
    ],
  },
  pages: {
    "/": "Welcome to Zigguratss",
    "/artwork": "Artwork Collection",
    "/artist": "Artist Directory",
    "/About": "AboutPage",
    "/blog": "Blog",
    "/contact": "Contact",
  },
};

const Navbar = () => {
  const [activeMega, setActiveMega] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpand, setMobileExpand] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  
  // New States for Roll Animation
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);
  const searchRef = useRef(null);

  // Scroll logic for rolling up/down
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Show if scrolling up, hide if scrolling down (after 100px)
        if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  useEffect(() => {
    const onHash = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
      setMobileOpen(false);
      setMobileExpand(null);
      setActiveMega(null);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const onEnter = (type) => { if (window.innerWidth >= 1024) setActiveMega(type); };
  const onLeave = () => { if (window.innerWidth >= 1024) setActiveMega(null); };

  const isActive = (p) => currentPath === p;

  const navLink = (href, label, path) => (
    <a
      href={href}
      className={`text-gray-200/85 hover:text-[#C5A059] transition-colors ${isActive(path) ? 'text-[#C5A059]' : ''}`}
    >
      {label}
    </a>
  );

  const glassStyle = "bg-[#0a0a0a]/80 backdrop-blur-[20px] border-b border-white/10";
  const megaGradient = "bg-gradient-to-br from-[#0a0a0a]/98 to-[#141414]/95";

  // Roll transformation styles
  const rollClass = (isVisible || isHovered || activeMega || mobileOpen) 
    ? "translate-y-0 rotate-0 opacity-100" 
    : "-translate-y-full -rotate-x-90 opacity-0 pointer-events-none";

  return (
    <>
      {/* ── Hidden Trigger Area (for hover return) ── */}
      <div 
        onMouseEnter={() => setIsHovered(true)} 
        className="fixed top-0 left-0 right-0 h-4 z-[51]"
      />

      {/* ══════════ TOP BAR ══════════ */}
      <nav 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 sm:h-20 px-4 md:px-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu origin-top ${rollClass} ${glassStyle}`}
      >

        {/* ── Hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 flex-shrink-0 z-50"
        >
          <span className={`block h-0.5 bg-[#C5A059] transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
          <span className={`block h-0.5 bg-[#C5A059] transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-6'}`} />
          <span className={`block h-0.5 bg-[#C5A059] transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
        </button>

        {/* ── Logo ── */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0">
          <a href="#/" onClick={() => { setMobileOpen(false); setMobileExpand(null); }}>
            <img src={logo} alt="Logo" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
          </a>
        </div>

        {/* ── Desktop Nav ── */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-[13px] font-sans uppercase tracking-[0.2em] text-gray-200/85">
          <li>{navLink('/', 'Home', '/')}</li>
          <li onMouseEnter={() => onEnter('artwork')} className="relative py-7">
            <Link
    to="/artwork"
    className="uppercase tracking-widest hover:text-[#C5A059] transition-colors cursor-pointer"
  >
    Artwork
  </Link>
          </li>
          <li onMouseEnter={() => onEnter('artist')} className="relative py-7">
             <Link
    to="/artist"
    className="uppercase tracking-widest hover:text-[#C5A059]"
  >
    Artists
  </Link>
          </li>
          <li><Link to="/about">About</Link></li>
          <li>{navLink('/blog', 'Blog', '/blog')}</li>
<li>{navLink('/contact', 'Contact', '/contact')}</li>


        </ul>

        {/* ── Right Icons ── */}
        <div className="flex items-center gap-1 sm:gap-3">
          <div ref={searchRef} className={`relative flex items-center transition-all duration-500 ${isSearchOpen ? 'w-[140px] xs:w-[180px] sm:w-64' : 'w-8 sm:w-10'}`}>
            <input type="text" placeholder="Search..."
              className={`w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs text-gray-100 focus:outline-none focus:border-[#C5A059]/50 transition-all ${isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`} />
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="absolute right-0 p-2 text-[#C5A059] hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
          <div className={`${isSearchOpen ? 'hidden xs:flex' : 'flex'} items-center gap-1 sm:gap-2`}>
            <Link
  to="/login"
  className="p-2 text-[#C5A059] hover:scale-110 transition-transform"
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
</Link>
            <button className="p-2 text-[#C5A059] hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════ DESKTOP MEGA MENU ══════════ */}
      <div
        onMouseEnter={() => onEnter(activeMega)}
        onMouseLeave={onLeave}
        className={`hidden lg:block fixed left-0 right-0 top-16 sm:top-20 z-40 border-white/10 shadow-2xl transition-all duration-500 overflow-hidden ${megaGradient} ${activeMega ? 'max-h-[85vh] opacity-100 border-b' : 'max-h-0 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 flex gap-10 overflow-y-auto max-h-[80vh]">
          {activeMega === 'artwork' && (
            <>
              <div className="w-48 flex-shrink-0">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-6">Collections</h3>
                <ul className="flex flex-col gap-4">
                  {data.artwork.categories.map(cat => (
                    <li key={cat}><Link to="/artwork" className="text-gray-300 hover:text-[#C5A059] transition-all text-xl font-serif">{cat}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-12 border-x border-white/5 px-12">
                {Object.entries(data.artwork.filters).map(([name, items]) => (
                  <div key={name}>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-5">{name}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {items.map(item => (<li key={item}><Link to="/artwork" className="text-gray-400 hover:text-[#C5A059] text-sm transition-colors">{item}</Link></li>))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="w-64 flex flex-col items-center">
                <div className="overflow-hidden rounded-sm shadow-2xl mb-5">
                   <img src={data.artwork.featured.image} alt="Featured" className="w-full h-52 object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <span className="text-[#C5A059] text-xl font-serif text-center italic">{data.artwork.featured.title}</span>
                <a href="#/artwork" className="mt-6 px-8 py-2.5 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all">Explore All</a>
              </div>
            </>
          )}

          {activeMega === 'artist' && (
            <>
              <div className="w-48 flex-shrink-0">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold mb-6">Disciplines</h3>
                <ul className="flex flex-col gap-4">
                  {data.artists.categories.map(cat => (
                    <li key={cat}><Link to="/artist" className="text-gray-300 hover:text-[#C5A059] transition-all text-xl font-serif">{cat}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 grid grid-cols-2 xl:grid-cols-4 gap-8 border-l border-white/5 px-12">
                {Object.entries(data.artists.groups).map(([name, artists]) => (
                  <div key={name}>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">{name}</h3>
                    <ul className="flex flex-col gap-2">
                      {artists.map(a => (<li key={a}><Link to="/artist" className="text-gray-400 hover:text-[#C5A059] text-[13px] transition-colors">{a}</Link></li>))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="w-56 grid grid-cols-2 gap-4 content-start">
                {data.artists.profiles.slice(0, 6).map(p => (
                  <div key={p.name} className="group cursor-pointer text-center">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-white/10 group-hover:border-[#C5A059] transition-all p-1">
                      <img src={p.image} alt={p.name} className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-[9px] mt-2 uppercase tracking-tighter text-gray-400 group-hover:text-[#C5A059] transition-colors">{p.name.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══════════ MOBILE DRAWER ══════════ */}
      <div 
        onClick={() => setMobileOpen(false)} 
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-md transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      
      <aside className={`lg:hidden fixed top-0 left-0 w-[85%] max-w-[400px] bottom-0 z-[70] bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-500 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <button onClick={() => setMobileOpen(false)} className="text-[#C5A059]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="px-6 space-y-2">
            <li>
                <a href="#/" onClick={() => setMobileOpen(false)} className={`block py-3 text-lg font-serif ${isActive('/') ? 'text-[#C5A059]' : 'text-gray-200'}`}>Home</a>
            </li>
            
            {['artwork', 'artists'].map((key) => (
              <li key={key} className="border-t border-white/5 pt-2">
                <button 
                  onClick={() => setMobileExpand(mobileExpand === key ? null : key)} 
                  className={`w-full flex items-center justify-between py-4 text-lg font-serif ${mobileExpand === key ? 'text-[#C5A059]' : 'text-gray-200'}`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <svg className={`w-4 h-4 transition-transform duration-300 ${mobileExpand === key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileExpand === key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 pb-4 grid grid-cols-1 gap-3">
                    {data[key]?.categories?.map((category) => (
                      <Link
                        key={category}
                        to={`/${key === 'artists' ? 'artist' : key}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-gray-400 py-1 text-base hover:text-[#C5A059]"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}

            {[ { h: '/about', l: 'About', p: '/about' },
  { h: '/blog', l: 'Blog', p: '/blog' },
  { h: '/contact', l: 'Contact', p: '/contact' },
  { h: '/login', l: 'Login', p: '/login' }].map(link => (
              <li key={link.p} className="border-t border-white/5 pt-2">
                <a href={link.h} onClick={() => setMobileOpen(false)} className={`block py-4 text-lg font-serif ${isActive(link.p) ? 'text-[#C5A059]' : 'text-gray-200'}`}>
                  {link.l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-8 border-t border-white/5 bg-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Quick Links</p>
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#C5A059]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#C5A059]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;