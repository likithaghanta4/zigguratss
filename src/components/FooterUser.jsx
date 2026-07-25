import React from 'react';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}
      <div className="border-b border-gray-900 py-4 md:py-6 text-center px-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold mb-1 md:mb-2">
          Discover Timeless Heritage
        </h2>
        <p className="text-gray-400 text-xs md:text-xs lg:text-sm">
          Try any artifact from our collection for 14 days at no cost. Money-back guarantee.
        </p>
      </div>

      {/* Benefits */}
      <div className="border-b border-gray-900 py-4 md:py-6">
        <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold mb-1 md:mb-2 uppercase tracking-wide">Premium Curation</p>
              <p className="text-gray-400 text-xs">Our experts carefully select the finest pieces from around the world</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold mb-1 md:mb-2 uppercase tracking-wide">Secure Transactions</p>
              <p className="text-gray-400 text-xs">Protected payments via credit card, PayPal, and bank transfer</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold mb-1 md:mb-2 uppercase tracking-wide">Worldwide Delivery</p>
              <p className="text-gray-400 text-xs">Shipped securely and insured to your location worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-4 md:py-6">
        <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* About */}
            <div>
              <h3 className="font-bold text-xs mb-2 uppercase tracking-widest">About Zigguratss</h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Collectors Guide</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Press</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-xs mb-2 uppercase tracking-widest">Our Services</h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">Heritage Advisory</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Preservation Services</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Authentication</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Exhibitions</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Gift Cards</a></li>
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h3 className="font-bold text-xs mb-2 uppercase tracking-widest">Collections</h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">Ancient Artifacts</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Sculptures</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Paintings</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Collectibles</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">New Arrivals</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-xs mb-2 uppercase tracking-widest">Resources</h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Partners</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-900 pt-3 md:pt-4 mb-3 md:mb-4"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div>
              <div className="text-lg md:text-xl font-serif font-bold mb-1">Zigguratss</div>
              <p className="text-xs text-gray-500">Preserving Heritage, Inspiring Collectors</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-4 gap-2">
              <a href="#" className="text-gray-400 hover:text-white transition text-xs font-medium">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xs font-medium">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xs font-medium">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xs font-medium">LinkedIn</a>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 text-xs text-gray-500">
              <p>© 2026 Zigguratss. All rights reserved.</p>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <div className="border-t border-gray-900 py-3 md:py-4 text-center">
        <button className="text-gray-400 hover:text-white transition font-bold text-sm">↑</button>
      </div>
    </footer>
  );
}
