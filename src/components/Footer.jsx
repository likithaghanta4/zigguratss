import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="w-full overflow-x-hidden border-t border-[#d4af3726] bg-[radial-gradient(ellipse_at_15%_0%,#18140b_0%,#080603_60%,#030201_100%)] px-5 py-10 text-[#cdc5a8] md:px-10">
      
      {/* Nav Grid */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        
        {/* Buyers */}
        <div>
          <h3 className="mb-4 inline-block border-b border-[#e4b363] pb-1 text-sm uppercase tracking-[0.12em] text-[#e4b363]">
            For Buyers
          </h3>

          <ul className="space-y-2 text-sm text-[#a0987a]">
            <li><a href="#" className="hover:text-[#f5e2b6]">Browse Artworks</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">How to Buy</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Secure Checkout</a></li>
            <li><Link to="/Delivery" className="hover:text-[#f5e2b6]">Shipping & Delivery</Link></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Returns Policy</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Buyer Protection</a></li>
          </ul>
        </div>

        {/* Artists */}
        <div>
          <h3 className="mb-4 inline-block border-b border-[#e4b363] pb-1 text-sm uppercase tracking-[0.12em] text-[#e4b363]">
            For Artists
          </h3>

          <ul className="space-y-2 text-sm text-[#a0987a]">
            <li><a href="#" className="hover:text-[#f5e2b6]">Sell Your Art</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Artist Registration</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Commission Guide</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Portfolio Tips</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Artist Support</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Success Stories</a></li>
          </ul>
        </div>

        {/* Zigguratss */}
        <div>
          <h3 className="mb-4 inline-block border-b border-[#e4b363] pb-1 text-sm uppercase tracking-[0.12em] text-[#e4b363]">
            Zigguratss Art
          </h3>

          <ul className="space-y-2 text-sm text-[#a0987a]">
            <li><a href="#" className="hover:text-[#f5e2b6]">Curated Collections</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Limited Editions</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Art Exhibitions</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Gift an Artwork</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Custom Commissions</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Art Valuation</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="mb-4 inline-block border-b border-[#e4b363] pb-1 text-sm uppercase tracking-[0.12em] text-[#e4b363]">
            
            <Link to="/about" className="hover:text-[#e4b363]">
 About Us
</Link>
          </h3>

          <ul className="space-y-2 text-sm text-[#a0987a]">
            <li><a href="#" className="hover:text-[#f5e2b6]">Our Story</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Our Team</a></li>
            <li><Link to="/admin" className="hover:text-[#f5e2b6]">Admin Panel</Link></li>
            <li><Link to="/User" className="hover:text-[#f5e2b6]">User Panel</Link></li>
            <li><Link to="/blog" className="hover:text-[#f5e2b6]">
              Blog
            </Link></li>
            <li><Link to="/contact" className="hover:text-[#f5e2b6]">
              Contact Us
            </Link></li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="mb-4 inline-block border-b border-[#e4b363] pb-1 text-sm uppercase tracking-[0.12em] text-[#e4b363]">
            Follow Us
          </h3>

          <ul className="space-y-2 text-sm text-[#a0987a]">
            <li><a href="#" className="hover:text-[#f5e2b6]">Facebook</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Instagram</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Twitter / X</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">YouTube</a></li>
            <li><a href="#" className="hover:text-[#f5e2b6]">Pinterest</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af3730] to-transparent"></div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          "100% Authentic Art",
          "Secure Payments",
          "Pan-India Delivery",
          "Dedicated Support",
          "Easy Returns",
          "4.8 / 5 Rated",
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-full border border-[#d4af3726] bg-[#d4af3708] px-4 py-2 text-sm text-[#a0987a] transition-all hover:border-[#d4af37]"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af3730] to-transparent"></div>

      {/* Newsletter */}
      <div className="rounded-2xl border border-[#d4af3726] bg-[#0e0b0699] p-6 backdrop-blur-md">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          
          <div>
            <h2 className="mb-2 text-2xl text-[#e4b363]">
              Stay Inspired
            </h2>

            <p className="max-w-md text-sm text-[#a0987a]">
              Curated artworks & exclusive collector offers — straight to your inbox.
            </p>
          </div>

          {!isSubscribed ? (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 rounded-full border border-[#d4af3750] bg-[#050402] px-5 py-3 text-sm outline-none focus:border-[#e4b363]"
              />

              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-[#b8860b] to-[#e4b363] px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-sm text-[#e4b363]">
              You're on the list. Thank you!
            </div>
          )}
        </div>
      </div>

      {/* Payments */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Credit / Debit Cards",
          "UPI / Google Pay",
          "Net Banking",
          "Paytm",
          "Razorpay",
          "EMI Options",
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-full border border-[#d4af3726] bg-[#0c0a05] px-4 py-2 text-sm text-[#a0987a] transition-all hover:border-[#e4b363]"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af3730] to-transparent"></div>

      {/* Description */}
      <div className="rounded-2xl border border-[#d4af3726] bg-[#d4af3705] p-6">
        <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-[#5e5240]">
          Zigguratss Artwork LLP is India's premier online destination for
          authentic, curated fine art. We bridge talented artists with
          passionate collectors — bringing original paintings, sculptures,
          photography, and digital art to homes and galleries across the
          country. Every piece is verified, thoughtfully packaged, and
          delivered with the care it deserves.
        </p>
      </div>

      {/* Copyright */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#d4af3726] pt-6 text-center text-sm text-[#5e5240] md:flex-row">
        
        <p>© 2026 Zigguratss Artwork LLP. All Rights Reserved.</p>

        <div className="flex flex-wrap justify-center gap-5 uppercase tracking-wider">
          <Link to="/Privacy" className="hover:text-[#e4b363]">
  Privacy Policy
</Link>

<Link to="/Terms" className="hover:text-[#e4b363]">
  Terms of Use
</Link>

          <a href="#" className="hover:text-[#e4b363]">
            Cookie Policy
          </a>
        </div>
      </div>

      {/* Back To Top */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#b8860b] to-[#e4b363] text-black shadow-lg transition-all duration-300 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;