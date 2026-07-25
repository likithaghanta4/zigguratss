import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const preventIfDisabled = (e) => {
        // Prevent navigation for disabled links
        e.preventDefault();
        // Optionally, you could show a small toast or animation here.
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo disabled because only Blog should work while editing */}
                <a href="#" onClick={preventIfDisabled} className="logo disabled" aria-disabled="true" title="Disabled while working on Blog">
                    <span className="logo-text">Zigguratss</span>
                    <span className="logo-subtitle">Artwork LLP</span>
                </a>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
                </button>

                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <ul className="nav-list">
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">Home</a></li>
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">Artwork</a></li>
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">Artist</a></li>
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">About</a></li>
                        <li><a href="/" className="active">Blog</a></li>
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">Contest</a></li>
                        <li><a href="#" onClick={preventIfDisabled} className="disabled" aria-disabled="true">Contact</a></li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <a href="#" onClick={preventIfDisabled} className="action-btn disabled" aria-disabled="true" title="Disabled while working on Blog">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </a>
                    <a href="#" onClick={preventIfDisabled} className="action-btn disabled" aria-disabled="true" title="Disabled while working on Blog">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
