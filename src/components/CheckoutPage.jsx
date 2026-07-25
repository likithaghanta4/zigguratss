import React, { useState } from 'react';
import { ChevronLeft, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const CheckoutPage = ({ onNavigate, cart, onRemoveFromCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.address && formData.cardNumber) {
      setOrderPlaced(true);
      setTimeout(() => {
        onNavigate('home');
      }, 3000);
    } else {
      alert('Please fill in all required fields');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <CheckCircle size={80} className="text-green-600 mx-auto" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-lg text-gray-600 mb-6">Thank you for your purchase</p>
          <p className="text-sm text-gray-500">Redirecting to home in a few seconds...</p>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 py-20">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some artworks before checkout</p>
          <button
            onClick={() => onNavigate('all-artworks')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Artworks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <div className="px-6 py-6 border-b border-blue-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ChevronLeft size={22} />
          Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 order-1 lg:order-1"
            >
              <form onSubmit={handlePlaceOrder} className="space-y-10">
                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Truck size={28} className="text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Shipping Address</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:col-span-2"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <CreditCard size={28} className="text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Payment Details</h2>
                  </div>

                  <div className="space-y-6">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name *"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits) *"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        if (value.length <= 16) {
                          const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                          handleInputChange({
                            target: { name: 'cardNumber', value: formatted }
                          });
                        }
                      }}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY *"
                        value={formData.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          handleInputChange({
                            target: { name: 'expiry', value }
                          });
                        }}
                        required
                        className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV *"
                        value={formData.cvv}
                        onChange={(e) => {
                          if (e.target.value.length <= 3) {
                            handleInputChange(e);
                          }
                        }}
                        required
                        className="px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition shadow-lg"
                >
                  Place Order • ₹{total.toLocaleString('en-IN')}
                </motion.button>

                <button
                  type="button"
                  onClick={() => onNavigate('all-artworks')}
                  className="w-full text-gray-700 py-4 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-50 transition text-lg"
                >
                  Continue Shopping
                </button>
              </form>
            </motion.div>

            {/* Order Summary - Right Side on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 order-2 lg:order-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h2>

                <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 line-clamp-2 text-sm">{item.title}</p>
                        <p className="text-gray-600 text-xs mt-2">{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            Qty: {item.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-6 text-sm font-semibold">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-6 mt-6 text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
