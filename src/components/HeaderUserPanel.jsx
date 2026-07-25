import React, { useState } from 'react';
import { Menu, X, Heart, ShoppingCart, User, LogOut, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ 
  onNavigate, 
  onLogout,
  currentUser,
  onSidebarToggle,
  wishlistCount = 0, 
  cartCount = 0,
  wishlist = [],
  cart = [],
  onRemoveFromWishlist,
  onRemoveFromCart
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleMyInformation = () => {
    onNavigate('my-information');
    setIsAccountDropdownOpen(false);
  };

  const handleMyPurchases = () => {
    onNavigate('my-purchases');
    setIsAccountDropdownOpen(false);
  };
  const handleCreativeHub = () => {
    onNavigate('creative-hub');
    setIsAccountDropdownOpen(false);
  };

  const handleHome = () => {
    onNavigate('my-information');
  };

  const handleUserIconClick = () => {
    // Toggle the dropdown on desktop
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleMobileUserIconClick = () => {
    // Navigate to my-account page on mobile
    onNavigate('my-account');
    setIsMobileAccountOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="luxury-container py-4 md:py-5 px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Button - Mobile only */}
            <button 
              onClick={() => onSidebarToggle && onSidebarToggle()}
              className="lg:hidden w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-700 transition flex-shrink-0"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo Text - navigate to home */}
            <button onClick={handleHome} className="hidden sm:inline flex items-center gap-2 hover:opacity-80 transition cursor-pointer">
              <span className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900">
                Zigguratss
              </span>
            </button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-4 lg:mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search artifacts..."
                className="w-full px-3 md:px-5 py-2 md:py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Currency Selector */}
            <button className="hidden md:flex items-center gap-2 text-xs md:text-sm font-medium hover:text-gray-600 transition">
              $ USD
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 relative">
              <div 
                className="relative"
                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                onMouseLeave={() => setIsAccountDropdownOpen(false)}
              >
                <button className="flex items-center gap-2 text-xs md:text-sm lg:text-sm font-medium hover:text-gray-600 transition duration-300 whitespace-nowrap">
                  <User className="w-3 md:w-4 h-3 md:h-4" />
                  Sign in
                </button>

                {/* Dropdown Menu */}
                {isAccountDropdownOpen && (
                  <div className="absolute top-full right-0 mt-0 w-48 md:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    <button onClick={handleMyInformation} className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-900 hover:bg-gray-50 transition flex items-center gap-2">
                      <User className="w-3 md:w-4 h-3 md:h-4" />
                      My Information
                    </button>
                    <button onClick={handleMyPurchases} className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-900 hover:bg-gray-50 transition flex items-center gap-2">
                      <ShoppingCart className="w-3 md:w-4 h-3 md:h-4" />
                      My Purchase
                    </button>
                    <button onClick={handleCreativeHub} className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-900 hover:bg-gray-50 transition flex items-center gap-2">
                      <User className="w-3 md:w-4 h-3 md:h-4" />
                      Creative Hub
                    </button>
                    <div className="border-t border-gray-200"></div>
                    <button onClick={onLogout} className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-red-600 hover:bg-gray-50 transition flex items-center gap-2">
                      <LogOut className="w-3 md:w-4 h-3 md:h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* User/Sign In - Desktop */}
              <div className="relative hidden md:block">
                <button 
                  onClick={handleUserIconClick}
                  onMouseEnter={() => setIsAccountDropdownOpen(true)}
                  onMouseLeave={() => setIsAccountDropdownOpen(false)}
                  className="relative"
                >
                  <User className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer hover:text-gray-600 transition duration-300" />
                </button>
              </div>

              {/* Wishlist */}
              <div className="relative">
                <button 
                  onClick={() => setShowWishlist(true)}
                  className="relative"
                >
                  <Heart className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer hover:fill-red-500 hover:text-red-500 transition duration-300" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Cart */}
              <div className="relative">
                <button 
                  onClick={() => setShowCart(true)}
                  className="relative"
                >
                  <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer hover:text-gray-600 transition duration-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* User/Sign In - Mobile */}
              <div className="relative md:hidden">
                <button 
                  onClick={handleMobileUserIconClick}
                  className="relative"
                >
                  <User className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer hover:text-gray-600 transition duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </header>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {showWishlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWishlist(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-red-50 to-white border-b-2 border-red-200 p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Wishlist</h2>
                    <p className="text-sm text-gray-600">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowWishlist(false)}
                  className="text-gray-400 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                  ×
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-24 h-24 text-red-200 mb-6" />
                    </motion.div>
                    <p className="text-gray-500 text-xl font-semibold mb-2">Your Wishlist is Empty</p>
                    <p className="text-gray-400 text-center max-w-xs">Start adding your favorite artworks to your wishlist and they'll appear here.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {wishlist.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-red-300 transition duration-300 bg-gradient-to-r from-gray-50 to-white"
                      >
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-28 h-28 object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            ♥
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{item.artist}</p>
                            <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-gray-900">{item.price}</p>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRemoveFromWishlist(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {wishlist.length > 0 && (
                <div className="border-t border-gray-200 p-8 bg-gradient-to-r from-red-50 to-white">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition duration-300 text-lg"
                  >
                    Move All to Cart
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-white border-b-2 border-blue-200 p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h2>
                    <p className="text-sm text-gray-600">{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-900 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                  ×
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ShoppingCart className="w-24 h-24 text-blue-200 mb-6" />
                    </motion.div>
                    <p className="text-gray-500 text-xl font-semibold mb-2">Your Cart is Empty</p>
                    <p className="text-gray-400 text-center max-w-xs">Browse our collection and add beautiful artworks to your cart.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition duration-300 bg-gradient-to-r from-gray-50 to-white"
                      >
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-28 h-28 object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{item.artist}</p>
                            <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Price</p>
                              <p className="text-2xl font-black text-gray-900">{item.price}</p>
                            </div>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-white space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 font-semibold">Subtotal:</span>
                      <span className="text-2xl font-black text-gray-900">₹ {cart.reduce((sum, item) => {
                        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
                        return sum + (price * item.quantity);
                      }, 0).toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Shipping and taxes calculated at checkout</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onNavigate('checkout');
                      setShowCart(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transition duration-300 text-lg"
                  >
                    Proceed to Checkout
                  </motion.button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}