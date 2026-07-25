import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy users database
const DUMMY_USERS = [
  {
    id: 1,
    name: 'Arsh Deep',
    email: 'arsh@example.com',
    password: 'arsh123',
    avatar: 'AS',
    bgColor: 'bg-blue-600',
    stats: {
      totalViews: 3640,
      totalSpent: 18600,
      itemsOwned: 41,
      collections: 12,
      viewsChange: 12,
      spentChange: 18,
      ownedChange: 8,
      collectionsChange: 3
    }
  },
  {
    id: 2,
    name: 'Simran Kaur',
    email: 'simran@example.com',
    password: 'simran123',
    avatar: 'SK',
    bgColor: 'bg-pink-600',
    stats: {
      totalViews: 5200,
      totalSpent: 24500,
      itemsOwned: 58,
      collections: 18,
      viewsChange: 15,
      spentChange: 22,
      ownedChange: 12,
      collectionsChange: 5
    }
  },
  {
    id: 3,
    name: 'Raj Patel',
    email: 'raj@example.com',
    password: 'raj123',
    avatar: 'RP',
    bgColor: 'bg-green-600',
    stats: {
      totalViews: 4800,
      totalSpent: 21000,
      itemsOwned: 45,
      collections: 15,
      viewsChange: 10,
      spentChange: 20,
      ownedChange: 9,
      collectionsChange: 4
    }
  },
  {
    id: 4,
    name: 'Priya Singh',
    email: 'priya@example.com',
    password: 'priya123',
    avatar: 'PS',
    bgColor: 'bg-purple-600',
    stats: {
      totalViews: 6100,
      totalSpent: 28900,
      itemsOwned: 67,
      collections: 22,
      viewsChange: 18,
      spentChange: 25,
      ownedChange: 14,
      collectionsChange: 6
    }
  },
  {
    id: 5,
    name: 'Aman Verma',
    email: 'aman@example.com',
    password: 'aman123',
    avatar: 'AV',
    bgColor: 'bg-indigo-600',
    stats: {
      totalViews: 3920,
      totalSpent: 19800,
      itemsOwned: 38,
      collections: 11,
      viewsChange: 11,
      spentChange: 19,
      ownedChange: 7,
      collectionsChange: 2
    }
  }
];

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Check if email and password are not empty
      if (email.trim() === '' || password.trim() === '') {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      // Check if email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check if password is at least 3 characters
      if (password.length < 3) {
        setError('Password must be at least 3 characters');
        setLoading(false);
        return;
      }

      // Try to find user in DUMMY_USERS first
      let user = DUMMY_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        // If not found in DUMMY_USERS, create a new user with the entered credentials
        // Use first dummy user's stats as default
        user = {
          id: Math.random(),
          name: email.split('@')[0].toUpperCase(), // Extract name from email
          email: email,
          password: password,
          avatar: email.substring(0, 2).toUpperCase(),
          bgColor: 'bg-blue-600',
          stats: {
            totalViews: 3640,
            totalSpent: 18600,
            itemsOwned: 41,
            collections: 12,
            viewsChange: 12,
            spentChange: 18,
            ownedChange: 8,
            collectionsChange: 3
          }
        };
      }

      // Login successful
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 500);
  };

  const handleQuickLogin = (user) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-yellow-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-900 mb-2">Zigguratss</h1>
          <p className="text-sm sm:text-base md:text-lg text-amber-700">Art Gallery & Collection Platform</p>
        </motion.div>

        <div className="flex justify-center w-full">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 border-t-4 border-amber-500 w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-1 sm:mb-2">Welcome Back</h2>
            <p className="text-sm sm:text-base text-amber-700 mb-6 sm:mb-8">Sign in to your account</p>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-amber-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arsh@example.com"
                    className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition text-amber-900 placeholder-amber-400 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-amber-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 sm:pl-12 pr-9 sm:pr-12 py-2 sm:py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none transition text-amber-900 placeholder-amber-400 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 text-amber-600 hover:text-amber-800"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded text-xs sm:text-sm"
                >
                  <p className="text-red-700">{error}</p>
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
              >
                <LogIn className="w-4 sm:w-5 h-4 sm:h-5" />
                {loading ? 'Signing In...' : 'Sign In'}
              </motion.button>

              {/* Demo Credentials */}
              <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200 text-xs sm:text-sm">
                <p className="font-semibold text-amber-900 mb-1 sm:mb-2">Demo Credentials:</p>
                <p className="text-amber-800">Email: arsh@example.com</p>
                <p className="text-amber-800">Password: arsh123</p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
