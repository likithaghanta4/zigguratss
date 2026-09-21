import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';
import '../styles/contact-scroll.css';

const isMobileDevice = () => window.innerWidth <= 768;

const ARTWORKS = [
    { src: 'https://zigguratss.com/public/images/artworks/1482/propose_1482_01.jpg', title: 'Propose', artist: 'Uttam Manna' },
    { src: 'https://zigguratss.com/public/images/artworks/1481/eternal_melody_1481_01.jpg', title: 'Eternal Melody', artist: 'Zigguratss Artist' },
    { src: 'https://zigguratss.com/public/images/artworks/1480/artwork_1480_01.jpg', title: 'Abstract Vision', artist: 'Zigguratss Artist' },
    { src: 'https://zigguratss.com/public/images/artworks/1479/artwork_1479_01.jpg', title: 'Silent Story', artist: 'Zigguratss Artist' },
];

const FALLBACK = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
];

const TOTAL_PANELS = 4;

const Contact = () => {
    const imgRefs = useRef([]);
    const panelRefs = useRef([]);
    const progressRef = useRef(null);
    const blurOverlayRef = useRef(null);
    const currentRef = useRef(0);
    const animatingRef = useRef(false);
    const goToRef = useRef(null);
    const tlRef = useRef(null);

    const [current, setCurrent] = useState(0);
    const isMobile = isMobileDevice();

    /* ── swap artwork + caption ── */
    const swapImage = useCallback((i) => {
        const idx = Math.min(i, ARTWORKS.length - 1);
        imgRefs.current.forEach((img, j) => {
            if (!img) return;
            gsap.to(img, { opacity: j === idx ? 1 : 0, scale: j === idx ? 1 : 1.06, duration: 1.1, ease: 'power2.inOut' });
        });
        const captionTitle = document.querySelector('.artwork-caption-title');
        const captionSub = document.querySelector('.artwork-caption-sub');
        if (captionTitle) {
            gsap.to(captionTitle, {
                opacity: 0, duration: 0.25, onComplete: () => {
                    captionTitle.textContent = ARTWORKS[idx].title;
                    gsap.to(captionTitle, { opacity: 1, duration: 0.45, ease: 'power2.out' });
                }
            });
        }
        if (captionSub) {
            gsap.to(captionSub, {
                opacity: 0, duration: 0.25, onComplete: () => {
                    captionSub.textContent = ARTWORKS[idx].artist;
                    gsap.to(captionSub, { opacity: 1, duration: 0.45, delay: 0.08, ease: 'power2.out' });
                }
            });
        }
    }, []);

    /* ── MAIN navigate — smooth fade/blur only, no slide ── */
    const goTo = useCallback((next) => {
        const prev = currentRef.current;
        if (next === prev || next < 0 || next >= TOTAL_PANELS) return;
        if (animatingRef.current) return;
        animatingRef.current = true;

        const prevPanel = panelRefs.current[prev];
        const nextPanel = panelRefs.current[next];
        if (!prevPanel || !nextPanel) { animatingRef.current = false; return; }

        if (tlRef.current) tlRef.current.kill();
        swapImage(next);

        // Prep next panel — no y offset, pure fade+blur
        gsap.set(nextPanel, { autoAlpha: 0, filter: 'blur(10px)', scale: 0.98, zIndex: 2 });
        gsap.set(prevPanel, { zIndex: 1 });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(prevPanel, { zIndex: 0, autoAlpha: 0, filter: 'blur(0px)', scale: 1 });
                currentRef.current = next;
                setCurrent(next);
                if (progressRef.current) {
                    gsap.to(progressRef.current, { scaleX: (next + 1) / TOTAL_PANELS, duration: 0.6, ease: 'power2.out' });
                }
                setTimeout(() => { animatingRef.current = false; }, 200);
            },
        });
        tlRef.current = tl;

        // Subtle blur flash overlay
        if (blurOverlayRef.current) {
            tl.fromTo(blurOverlayRef.current, { opacity: 0 }, { opacity: 0.3, duration: 0.15, ease: 'power1.in' }, 0)
                .to(blurOverlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.15);
        }

        // Fade OUT prev — no y
        tl.to(prevPanel, { autoAlpha: 0, filter: 'blur(8px)', scale: 0.985, duration: 0.5, ease: 'power2.inOut' }, 0);

        // Fade IN next — overlapping, starts 0.18s in, no y
        tl.to(nextPanel, { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 0.7, ease: 'power3.out' }, 0.18);

        // Stagger inner content
        const inner = nextPanel.querySelector('.rp-inner');
        const cards = nextPanel.querySelectorAll('.info-card, .contact-block');
        const rows = nextPanel.querySelectorAll('.service-row, .footer-col');

        if (inner) {
            gsap.set(inner, { opacity: 0 });
            tl.to(inner, { opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.38);
        }
        if (cards.length) {
            gsap.set(cards, { opacity: 0 });
            tl.to(cards, { opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 0.46);
        }
        if (rows.length) {
            gsap.set(rows, { opacity: 0 });
            tl.to(rows, { opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' }, 0.44);
        }
    }, [swapImage]);

    useEffect(() => { goToRef.current = goTo; }, [goTo]);

    useEffect(() => {
        /* ── Skip panel system on mobile — panels scroll naturally ── */
        if (isMobile) return;

        const panels = panelRefs.current.filter(Boolean);
        gsap.set(panels, { autoAlpha: 0, filter: 'blur(0px)', scale: 1, zIndex: 0 });
        gsap.set(panels[0], { autoAlpha: 1, zIndex: 1 });

        const inner0 = panels[0].querySelector('.rp-inner');
        if (inner0) gsap.fromTo(inner0, { opacity: 0 }, { opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' });

        if (progressRef.current) gsap.set(progressRef.current, { scaleX: 1 / TOTAL_PANELS });

        const onWheel = (e) => {
            e.preventDefault();
            if (e.deltaY > 30) goToRef.current(currentRef.current + 1);
            else if (e.deltaY < -30) goToRef.current(currentRef.current - 1);
        };

        const onKey = (e) => {
            if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); goToRef.current(currentRef.current + 1); }
            if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goToRef.current(currentRef.current - 1); }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKey);
            if (tlRef.current) tlRef.current.kill();
        };
    }, [isMobile]);

    return (
        <>
            <Navbar />

            {!isMobile && (
                <div className="scroll-progress-bar">
                    <div className="scroll-progress-fill" ref={progressRef}></div>
                </div>
            )}

            {!isMobile && <div className="csp-blur-overlay" ref={blurOverlayRef}></div>}

            {!isMobile && (
                <nav className="csp-dot-nav">
                    {Array.from({ length: TOTAL_PANELS }).map((_, i) => (
                        <button key={i} className={`csp-dot${current === i ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Panel ${i + 1}`} />
                    ))}
                </nav>
            )}

            <div className={`csp-wrapper${isMobile ? ' csp-wrapper--mobile' : ''}`}>

                {/* ── LEFT sticky artwork ── */}
                <div className="csp-left">
                    <div className="artwork-stack">
                        {ARTWORKS.map((art, i) => (
                            <img key={i} ref={el => (imgRefs.current[i] = el)} src={art.src} alt={art.title}
                                className="artwork-img" style={{ opacity: i === 0 ? 1 : 0 }}
                                onError={e => { e.target.src = FALLBACK[i % FALLBACK.length]; }} />
                        ))}
                        <div className="artwork-overlay"></div>
                    </div>
                    <div className="artwork-caption">
                        <span className="artwork-caption-eyebrow">— ZIGGURATSS COLLECTION</span>
                        <p className="artwork-caption-title">{ARTWORKS[0].title}</p>
                        <p className="artwork-caption-sub">{ARTWORKS[0].artist}</p>
                    </div>
                    <div className="artwork-sidetag">CONTACT US</div>
                </div>

                {/* ── RIGHT stacked panels ── */}
                <div className="csp-right">

                    {/* Panel 0 — Hero */}
                    <div className="right-panel rp-hero" ref={el => (panelRefs.current[0] = el)}>
                        <div className="hero-shapes">
                            <div className="hs-1"></div><div className="hs-2"></div><div className="hs-3"></div>
                        </div>
                        <div className="rp-inner">
                            <span className="rp-eyebrow">ZIGGURATSS ARTWORK</span>
                            <h1 className="rp-headline">CREATE<br /><span className="rp-gold">SOMETHING</span><br />EXTRAORDINARY</h1>
                            <p className="rp-body">Every masterpiece begins with a conversation.<br />Let's start yours.</p>
                            {!isMobile && (
                                <button className="rp-cta" onClick={() => goTo(1)}>
                                    <span>Get in Touch</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>
                            )}
                            {isMobile && (
                                <a href="#panel-form" className="rp-cta">
                                    <span>Get in Touch</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </a>
                            )}

                        </div>
                    </div>

                    {/* Panel 1 — Form */}
                    <div className="right-panel rp-form" id="panel-form" ref={el => (panelRefs.current[1] = el)}>
                        <div className="rp-inner">
                            <span className="rp-eyebrow">ZIGGURATSS ARTWORK</span>
                            <h2 className="rp-section-title">EVERY ARTWORK STARTS <em>with a</em> VISION.<br />LET'S START YOURS</h2>
                            <div className="rp-gold-line"></div>
                            <ContactForm />
                        </div>
                    </div>

                    {/* Panel 2 — Contact Info (redesigned) */}
                    <div className="right-panel rp-info" ref={el => (panelRefs.current[2] = el)}>
                        <div className="rp-inner rp-inner--wide">
                            <span className="rp-eyebrow">REACH US</span>
                            <h2 className="rp-section-title">LET'S <span className="rp-gold-text">CONNECT</span></h2>
                            <div className="rp-gold-line"></div>

                            <div className="contact-blocks">

                                {/* Block 01 — Enquiries */}
                                <div className="contact-block">
                                    <div className="cb-header">
                                        <span className="cb-num">01</span>
                                        <div className="cb-gold-bar"></div>
                                    </div>
                                    <h3 className="cb-title">GENERAL<br />ENQUIRIES</h3>
                                    <div className="cb-divider"></div>
                                    <p className="cb-label">STUDIO</p>
                                    <div className="cb-links">
                                        <a href="mailto:contact@zigguratss.com" className="cb-link">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>
                                            contact@zigguratss.com
                                        </a>
                                        <a href="tel:+917838535496" className="cb-link">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            +91 7838535496
                                        </a>
                                    </div>
                                </div>

                                {/* Block 02 — Social */}
                                <div className="contact-block">
                                    <div className="cb-header">
                                        <span className="cb-num">02</span>
                                        <div className="cb-gold-bar"></div>
                                    </div>
                                    <h3 className="cb-title">CONNECT<br />WITH US</h3>
                                    <div className="cb-divider"></div>
                                    <p className="cb-label">FOLLOW</p>
                                    <div className="cb-social">
                                        <a href="https://www.instagram.com/zigguratss/" target="_blank" rel="noopener noreferrer" className="cb-social-item">
                                            <span className="cb-social-icon">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                            </span>
                                            <div className="cb-social-text">
                                                <span className="cb-social-name">Instagram</span>
                                                <span className="cb-social-handle">@zigguratss</span>
                                            </div>
                                            <span className="cb-social-arrow">→</span>
                                        </a>
                                        <a href="https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/" target="_blank" rel="noopener noreferrer" className="cb-social-item">
                                            <span className="cb-social-icon">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                            </span>
                                            <div className="cb-social-text">
                                                <span className="cb-social-name">Facebook</span>
                                                <span className="cb-social-handle">Zigguratss Artwork</span>
                                            </div>
                                            <span className="cb-social-arrow">→</span>
                                        </a>
                                        <a href="https://www.linkedin.com/company/zigguratssartwork/about/" target="_blank" rel="noopener noreferrer" className="cb-social-item">
                                            <span className="cb-social-icon">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                            </span>
                                            <div className="cb-social-text">
                                                <span className="cb-social-name">LinkedIn</span>
                                                <span className="cb-social-handle">zigguratssartwork</span>
                                            </div>
                                            <span className="cb-social-arrow">→</span>
                                        </a>
                                        <a href="https://in.pinterest.com/zigguratss/" target="_blank" rel="noopener noreferrer" className="cb-social-item">
                                            <span className="cb-social-icon">
                                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
                                            </span>
                                            <div className="cb-social-text">
                                                <span className="cb-social-name">Pinterest</span>
                                                <span className="cb-social-handle">@zigguratss</span>
                                            </div>
                                            <span className="cb-social-arrow">→</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Block 03 — Location */}
                                <div className="contact-block">
                                    <div className="cb-header">
                                        <span className="cb-num">03</span>
                                        <div className="cb-gold-bar"></div>
                                    </div>
                                    <h3 className="cb-title">OUR<br />LOCATION</h3>
                                    <div className="cb-divider"></div>
                                    <p className="cb-label">ADDRESS</p>
                                    <div className="cb-address">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        <div>
                                            <p className="cb-address-line">New Delhi</p>
                                            <p className="cb-address-line">India</p>
                                            <p className="cb-address-note">Visits by appointment only</p>
                                        </div>
                                    </div>
                                    <a href="https://maps.google.com/?q=New+Delhi,India" target="_blank" rel="noopener noreferrer" className="cb-map-link">
                                        View on Map <span>→</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Panel 3 — Services */}
                    <div className="right-panel rp-services" ref={el => (panelRefs.current[3] = el)}>
                        <div className="rp-inner">
                            <span className="rp-eyebrow">WHAT WE DO</span>
                            <h2 className="rp-section-title">OUR <span className="rp-gold">SERVICES</span></h2>
                            <div className="rp-gold-line"></div>
                            <div className="services-list">
                                {[
                                    { num: '01', title: 'Custom Artwork', desc: 'Oil, acrylic, watercolor, mixed media & digital art tailored to your vision.' },
                                    { num: '02', title: 'Art Restoration', desc: 'Damage assessment, color restoration, frame repair and preservation.' },
                                    { num: '03', title: 'Corporate Art', desc: 'Office installations, brand artwork, wall murals and art consultation.' },
                                    { num: '04', title: 'Gallery Services', desc: 'Exhibition design, lighting setup, collection management and art advisory.' },
                                ].map(s => (
                                    <div className="service-row" key={s.num}>
                                        <span className="service-num">{s.num}</span>
                                        <div className="service-content"><h3>{s.title}</h3><p>{s.desc}</p></div>
                                        <span className="service-arrow">→</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>{/* /csp-right */}
            </div>{/* /csp-wrapper */}
        </>
    );
};

export default Contact;