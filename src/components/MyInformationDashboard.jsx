import React, { useState } from 'react';
import { ChevronRight, Home, BarChart3, User, Settings, Bell, Lock, Wallet, LogOut, Menu, X, Gift, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import image444 from '../assets/User-images/image444.jpg';
import image555 from '../assets/User-images/image555.jpg';
import img222 from '../assets/User-images/img222.jpg';
import img333 from '../assets/User-images/img333.jpg';
import kudiImage from '../assets/User-images/kudi.png';
import sideImage from '../assets/User-images/sidev.png';

export function MyInformationDashboard({ currentUser = null, sidebarOpen = true, onSidebarToggle = null, onLogout = null }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(sidebarOpen);
  const [profileImage, setProfileImage] = useState(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  const [autofillEmail, setAutofillEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Use currentUser data if available, otherwise use defaults
  const userData = currentUser || {};
  const userStats = userData.stats || {};
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    month: '',
    day: '',
    year: '',
    email: 'arshdeepkaur24@navgurukul.org',
    phone: '',
    country: 'India',
    language: 'English',
    currency: 'USD ($)',
    measure: 'Cm',
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
    budget: 'No budget',
    notifications: {
      promotions: true,
      favoriteArtists: true,
      favoriteGalleries: true,
      favoriteArtworks: true,
    },
  });

  // Sample Orders Data
  const [orders] = useState([
    {
      id: '#ORD-001',
      title: 'Krishna Leela',
      artist: 'Sekhar Roy',
      image: image444,
      price: '₹299,000',
      size: '152.40 x 121.92 cm',
      type: 'Acrylic on Canvas',
      status: 'Delivered',
      date: '2024-03-15',
      deliveryDate: '2024-03-22',
      quantity: 1,
      paymentStatus: 'Paid',
    },
    {
      id: '#ORD-002',
      title: 'Meditating Buddha',
      artist: 'Spiritual Creator',
      image: image555,
      price: '₹185,500',
      size: '120 x 100 cm',
      type: 'Acrylic',
      status: 'In Transit',
      date: '2024-04-01',
      deliveryDate: '2024-04-10',
      quantity: 1,
      paymentStatus: 'Paid',
    },
  ]);

  const activityData = [
    { month: 'Jan', views: 400, purchases: 240, favorites: 320 },
    { month: 'Feb', views: 500, purchases: 310, favorites: 420 },
    { month: 'Mar', views: 450, purchases: 280, favorites: 380 },
    { month: 'Apr', views: 620, purchases: 420, favorites: 510 },
    { month: 'May', views: 780, purchases: 580, favorites: 650 },
    { month: 'Jun', views: 890, purchases: 720, favorites: 780 },
  ];

  const purchaseStats = [
    { category: 'Paintings', count: 12 },
    { category: 'Sculptures', count: 8 },
    { category: 'Digital Art', count: 15 },
    { category: 'Photography', count: 6 },
  ];

  const paintingsByArtist = [
    { artist: 'John Smith', paintings: 5 },
    { artist: 'Emma Wilson', paintings: 8 },
    { artist: 'Michael Brown', paintings: 6 },
    { artist: 'Sarah Davis', paintings: 4 },
    { artist: 'James Chen', paintings: 7 },
  ];

  const monthlySpending = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2800 },
    { month: 'Apr', amount: 3200 },
    { month: 'May', amount: 3800 },
    { month: 'Jun', amount: 4200 },
  ];

  const collectionStats = [
    { name: 'Modern', value: 30 },
    { name: 'Classical', value: 25 },
    { name: 'Abstract', value: 25 },
    { name: 'Digital', value: 20 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'preferences', label: 'Notifications', icon: Bell },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'budget', label: 'My Budget', icon: Wallet },
    { id: 'offers', label: 'My Offers', icon: Gift },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar - FIXED BELOW NAVBAR */}
        <div
          className={`fixed left-0 z-40 w-56 sm:w-64 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 flex flex-col top-16 h-[calc(100vh-4rem)] ${
            internalSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
        {/* Close Button for Mobile */}
        <div className="lg:hidden absolute top-4 right-4 z-50">
          <button
            onClick={() => setInternalSidebarOpen(false)}
            className="text-white hover:bg-amber-600 p-2 rounded-lg transition w-10 h-10 flex items-center justify-center"
            title="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Section - Compact */}
        <div className="p-6 text-center border-b border-amber-600 relative">
          {/* Profile Image Container */}
          <div className="relative w-24 h-24 mx-auto mb-3 rounded-full bg-white flex items-center justify-center font-bold text-amber-700 text-4xl overflow-hidden group shadow-lg">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>AS</span>
            )}
            
            {/* Upload Overlay */}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
              <div className="text-white text-center">
                <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-xs font-bold">Upload</p>
              </div>
            </label>
          </div>
          
          <h3 className="text-white font-semibold text-base">{userData.name || 'Arsh Deep'}</h3>
          <p className="text-amber-100 text-xs">{userData.email || 'arshdeepkaur24@navgurukul.org'}</p>
          <p className="text-amber-100 text-xs mt-2 text-center text-[10px]">Hover to upload profile image</p>
        </div>

        {/* Menu Items - Compact */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setInternalSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-white text-amber-700 shadow-md'
                    : 'text-amber-100 hover:bg-amber-600'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button - Pinned at Bottom */}
        <div className="p-3 border-t border-amber-600">
          <button 
            onClick={() => {
              if (onLogout) {
                onLogout();
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setInternalSidebarOpen(!internalSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-amber-700 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content - Adjusted for Fixed Sidebar */}
      <div className="flex-1 w-full overflow-auto ml-0 lg:ml-64">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>My Account</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold capitalize">
              {menuItems.find(item => item.id === activeSection)?.label}
            </span>
          </div>
        </div>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="w-full p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Dashboard Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                  Your Activity Dashboard
                </h1>
                <p className="text-gray-600">Track your purchases, views, and artistic journey</p>
              </div>

              {/* Statistics Cards with Images */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Views Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={image444} alt="Total Views" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-amber-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Total Views</div>
                    <div className="text-3xl font-bold text-amber-700 mt-2">{(userStats.totalViews || 3640).toLocaleString()}</div>
                    <div className="text-green-600 text-xs mt-2">↑ {userStats.viewsChange || 12}% from last month</div>
                  </div>
                </div>

                {/* Total Spent Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={image555} alt="Total Spent" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-orange-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Total Spent</div>
                    <div className="text-3xl font-bold text-orange-700 mt-2">${(userStats.totalSpent || 18600).toLocaleString()}</div>
                    <div className="text-green-600 text-xs mt-2">↑ {userStats.spentChange || 18}% from last month</div>
                  </div>
                </div>

                {/* Items Owned Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={img222} alt="Items Owned" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-purple-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Items Owned</div>
                    <div className="text-3xl font-bold text-purple-700 mt-2">{userStats.itemsOwned || 41}</div>
                    <div className="text-green-600 text-xs mt-2">↑ {userStats.ownedChange || 8}% from last month</div>
                  </div>
                </div>

                {/* Collections Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={img333} alt="Collections" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-pink-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Collections</div>
                    <div className="text-3xl font-bold text-pink-700 mt-2">{userStats.collections || 12}</div>
                    <div className="text-green-600 text-xs mt-2">↑ {userStats.collectionsChange || 3} new collections</div>
                  </div>
                </div>
              </div>

              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Activity Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#b45309" strokeWidth={2} dot={{ fill: '#b45309', r: 5 }} />
                      <Line type="monotone" dataKey="purchases" stroke="#ea580c" strokeWidth={2} dot={{ fill: '#ea580c', r: 5 }} />
                      <Line type="monotone" dataKey="favorites" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Spending</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Bar dataKey="amount" fill="#b45309" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category and Artist Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Content Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={collectionStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {collectionStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#b45309', '#ea580c', '#f97316', '#fb923c'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Top Paintings by Artist</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={paintingsByArtist} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" />
                      <YAxis dataKey="artist" type="category" width={80} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Bar dataKey="paintings" fill="#ea580c" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Purchase by Category */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Purchases by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={purchaseStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Bar dataKey="count" fill="#b45309" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Purchases & Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { date: 'Today at 2:30 PM', action: 'Purchased "Abstract Dreams"', artist: 'John Smith', price: '$1,200', category: 'Painting' },
                    { date: 'Yesterday at 5:45 PM', action: 'Added "Moon Light" to favorites', artist: 'Emma Wilson', price: '$850', category: 'Photography' },
                    { date: '2 days ago', action: 'Purchased "Serenity Canvas"', artist: 'Michael Brown', price: '$650', category: 'Painting' },
                    { date: '3 days ago', action: 'Followed Artist "Sarah Davis"', artist: 'Sarah Davis', price: 'Free', category: 'Artist' },
                  ].map((activity, idx) => (
                    <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition">
                      <p className="text-gray-800 font-bold text-base mb-2">{activity.action}</p>
                      <p className="text-amber-700 font-semibold text-sm mb-3">By {activity.artist}</p>
                      <p className="text-gray-600 text-sm mb-4">{activity.date}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white bg-amber-600 px-3 py-1 rounded">{activity.category}</span>
                        <span className="text-amber-700 font-bold text-base">{activity.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-300 shadow-md">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Your Collection Insights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-amber-700">287</p>
                    <p className="text-sm text-gray-600 mt-1">Favorite Items</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-orange-700">43</p>
                    <p className="text-sm text-gray-600 mt-1">Artists Followed</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-amber-700">12</p>
                    <p className="text-sm text-gray-600 mt-1">Collections</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-orange-700">18</p>
                    <p className="text-sm text-gray-600 mt-1">Galleries Visited</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Sections */}
        {activeSection !== 'dashboard' && (
          <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Personal Information Section */}
              {activeSection === 'personal' && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                    PERSONAL INFORMATION
                  </h2>

                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Last name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-4">Date of Birth</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Month</label>
                          <input
                            type="text"
                            name="month"
                            value={formData.month}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="MM"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Day</label>
                          <input
                            type="text"
                            name="day"
                            value={formData.day}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="DD"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Year</label>
                          <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="YYYY"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50"
                        disabled
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Phone number *</label>
                      <div className="flex gap-3">
                        <div className="w-24">
                          <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 h-full">
                            <span className="text-lg">🇮🇳</span>
                            <span className="text-gray-700 font-medium">+91</span>
                          </div>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center mt-8">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save my information
                    </button>
                  </div>

                  {/* Define Your Addresses Section */}
                  <div className="mt-12 bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">Define your addresses</h3>
                    <p className="text-gray-600 text-sm mb-8">Indicate to which address you wish to receive your products and be invoiced</p>

                    {/* Delivery Address */}
                    <div className="bg-white p-6 rounded-lg mb-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-6">Delivery address</h4>

                      {/* Full Name */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Full name</label>
                        <input
                          type="text"
                          placeholder="Recipient name for delivery"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Address Lines */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Address</label>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="Address line 1"
                            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Address line 2"
                            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* City, Zip, Apartment */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Apartment/Building/...</label>
                          <input
                            type="text"
                            placeholder="Apartment/Building/..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Zip Code/Postcode</label>
                          <input
                            type="text"
                            placeholder="Zip Code/Postcode"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* State and Country */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">State/County</label>
                          <input
                            type="text"
                            placeholder="State/County"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Country</label>
                          <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer">
                            <option value="">Please select a country</option>
                            <option value="india">India</option>
                            <option value="usa">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="canada">Canada</option>
                            <option value="australia">Australia</option>
                          </select>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className="flex items-center mb-6">
                        <input
                          type="checkbox"
                          id="billingAddress"
                          defaultChecked
                          className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="billingAddress" className="ml-3 text-sm text-gray-800 font-medium cursor-pointer">
                          The billing address is the same as the delivery address
                        </label>
                      </div>

                      {/* Update Button */}
                      <div className="flex justify-end">
                        <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Account Section */}
                  <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-red-900 mb-2">Delete my account</h3>
                    <p className="text-red-800 text-sm mb-6">To delete your account, please write your email in the box below</p>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                      <div className="flex-1 w-full lg:w-auto">
                        <label className="block text-sm font-semibold text-red-900 mb-3">Your email</label>
                        <input
                          type="email"
                          placeholder="Your email"
                          className="w-full lg:w-80 px-4 py-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        />
                      </div>
                      <button className="px-8 py-3 border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-50 transition whitespace-nowrap">
                        Delete my account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section - Choose how to receive notifications */}
              {activeSection === 'preferences' && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Main Notifications Section */}
                  <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Choose how to receive notifications</h2>
                        <p className="text-gray-600 text-xs sm:text-sm">Define your search criteria and receive notifications as soon as a new piece matching your criteria is posted online.</p>
                      </div>
                      <button className="px-4 sm:px-6 md:px-8 py-2 border-2 border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition whitespace-nowrap text-sm sm:text-base">
                        Disable all
                      </button>
                    </div>

                    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg space-y-4 sm:space-y-6">
                      {/* Your following artists */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 sm:pb-6 border-b border-gray-200">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Your following artists</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Get important notifications of new works from artists and designers you follow</p>
                        </div>
                        <select className="px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-base whitespace-nowrap">
                          <option>No more than once a day</option>
                          <option>Instant</option>
                          <option>Weekly</option>
                        </select>
                      </div>

                      {/* Your saved searches */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 sm:pb-6 border-b border-gray-200">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Your saved searches</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Be notified of new artworks that match your search criteria</p>
                        </div>
                        <select className="px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-base whitespace-nowrap">
                          <option>No more than once a day</option>
                          <option>Instant</option>
                          <option>Weekly</option>
                        </select>
                      </div>

                      {/* Our newsletter */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 sm:pb-6 border-b border-gray-200">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Our newsletter</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Be notified of the news and activity from Singulart</p>
                        </div>
                        <label className="flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="w-5 sm:w-6 h-5 sm:h-6 accent-green-600 cursor-pointer" defaultChecked={false} />
                          <span className="sr-only">Toggle newsletter</span>
                        </label>
                      </div>

                      {/* Your favorites */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 sm:pb-6 border-b border-gray-200">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Your favorites</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Receive notifications if another collector is interested in your favorite pieces</p>
                        </div>
                        <label className="flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="w-5 sm:w-6 h-5 sm:h-6 accent-green-600 cursor-pointer" defaultChecked={true} />
                          <span className="sr-only">Toggle favorites</span>
                        </label>
                      </div>

                      {/* Your personalized recommendations */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Your personalized recommendations</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Let our algorithms inspire you by offering personalized recommendations based on what you previously liked on our site</p>
                        </div>
                        <label className="flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="w-5 sm:w-6 h-5 sm:h-6 accent-green-600 cursor-pointer" defaultChecked={true} />
                          <span className="sr-only">Toggle recommendations</span>
                        </label>
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
                      <button className="px-8 sm:px-12 py-2 sm:py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition text-sm sm:text-base">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Section */}
              {activeSection === 'password' && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                    NEW PASSWORD
                  </h2>

                  <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Current password *</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">New password *</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Repeat new password *</label>
                      <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>

                  {/* Change Button */}
                  <div className="flex justify-center mt-8">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Change password
                    </button>
                  </div>
                </div>
              )}

              {/* Budget Section */}
              {activeSection === 'budget' && (
                <div className="space-y-8">
                  {/* Budget Selection */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                      MY BUDGET
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[
                        'Under $ 500',
                        '$ 500 - $ 1,000',
                        '$ 1,000 - $ 2,500',
                        '$ 2,500 - $ 5,000',
                        '$ 5,000 - $ 10,000',
                        '$ 10,000 - $ 25,000',
                        '$ 25,000 - $ 50,000',
                        'Over $ 50,000',
                      ].map((budget) => (
                        <label key={budget} className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-amber-500 transition">
                          <input
                            type="radio"
                            name="budget"
                            value={budget}
                            checked={formData.budget === budget}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-amber-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{budget}</span>
                        </label>
                      ))}
                      
                      <label className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="budget"
                          value="No budget"
                          checked={formData.budget === 'No budget'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-amber-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No budget</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget Analysis Graphs */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Budget Distribution Pie Chart */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Your Budget Range Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Under $500', value: 15 },
                              { name: '$500-$1K', value: 20 },
                              { name: '$1K-$2.5K', value: 25 },
                              { name: '$2.5K-$5K', value: 22 },
                              { name: 'Over $5K', value: 18 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name} ${entry.value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Under $500', value: 15 },
                              { name: '$500-$1K', value: 20 },
                              { name: '$1K-$2.5K', value: 25 },
                              { name: '$2.5K-$5K', value: 22 },
                              { name: 'Over $5K', value: 18 },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#b45309', '#ea580c', '#f97316', '#fb923c', '#fbbf24'][index]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Budget Spending Trend */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Budget Spending Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { month: 'Jan', spent: 1200, budget: 2500 },
                          { month: 'Feb', spent: 1800, budget: 2500 },
                          { month: 'Mar', spent: 1500, budget: 2500 },
                          { month: 'Apr', spent: 2100, budget: 2500 },
                          { month: 'May', spent: 2400, budget: 2500 },
                          { month: 'Jun', spent: 2300, budget: 2500 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                          <Legend />
                          <Bar dataKey="spent" fill="#ea580c" name="Amount Spent" radius={[8, 8, 0, 0]} />
                          <Bar dataKey="budget" fill="#dbeafe" name="Budget Limit" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Budget Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Budget</div>
                      <div className="text-3xl font-bold text-amber-700">$15,000</div>
                      <div className="text-xs text-gray-600 mt-2">Annual allocation</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Amount Spent</div>
                      <div className="text-3xl font-bold text-blue-700">$12,300</div>
                      <div className="text-xs text-gray-600 mt-2">82% of total budget</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Remaining</div>
                      <div className="text-3xl font-bold text-green-700">$2,700</div>
                      <div className="text-xs text-gray-600 mt-2">18% available</div>
                    </div>
                  </div>

                  {/* Budget Tips */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-black mb-6">Budget Management Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { tip: 'Track high-value purchases', icon: '💎' },
                        { tip: 'Set alerts for budget limits', icon: '🔔' },
                        { tip: 'Review monthly spending', icon: '📊' },
                        { tip: 'Explore budget-friendly collections', icon: '🎨' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                          <span className="text-2xl">{item.icon}</span>
                          <p className="text-gray-700 font-medium">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save budget settings
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Section - NOW Shows Preferences Form */}
              {activeSection === 'settings' && (
                <div className="space-y-8">
                  {/* Main Settings Card */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-2 pb-4 border-b-3 border-amber-500">
                      ACCOUNT PREFERENCES & SETTINGS
                    </h2>
                    <p className="text-gray-600 text-sm mb-8">Customize your experience on Zigguratss</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Regional Settings */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Regional Settings</h3>

                        {/* Country Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Select Country *</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Choose your country</option>
                            <option value="India">🇮🇳 India</option>
                            <option value="United States">🇺🇸 United States</option>
                            <option value="United Kingdom">🇬🇧 United Kingdom</option>
                            <option value="Canada">🇨🇦 Canada</option>
                            <option value="Australia">🇦🇺 Australia</option>
                            <option value="Germany">🇩🇪 Germany</option>
                            <option value="France">🇫🇷 France</option>
                            <option value="Japan">🇯🇵 Japan</option>
                          </select>
                        </div>

                        {/* Language Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Preferred Language *</label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select language</option>
                            <option value="English">🇬🇧 English</option>
                            <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
                            <option value="Spanish">🇪🇸 Español (Spanish)</option>
                            <option value="French">🇫🇷 Français (French)</option>
                            <option value="German">🇩🇪 Deutsch (German)</option>
                            <option value="Japanese">🇯🇵 日本語 (Japanese)</option>
                            <option value="Mandarin">🇨🇳 中文 (Mandarin)</option>
                            <option value="Portuguese">🇵🇹 Português (Portuguese)</option>
                          </select>
                        </div>

                        {/* Timezone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Time Zone *</label>
                          <select
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select timezone</option>
                            <option value="IST">India Standard Time (IST) UTC+5:30</option>
                            <option value="EST">Eastern Standard Time (EST) UTC-5</option>
                            <option value="PST">Pacific Standard Time (PST) UTC-8</option>
                            <option value="GMT">Greenwich Mean Time (GMT) UTC+0</option>
                            <option value="CET">Central European Time (CET) UTC+1</option>
                            <option value="JST">Japan Standard Time (JST) UTC+9</option>
                          </select>
                        </div>
                      </div>

                      {/* Display & Currency Settings */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Currency & Display</h3>

                        {/* Currency Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Currency *</label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select currency</option>
                            <option value="USD ($)">💵 US Dollar (USD $)</option>
                            <option value="EUR (€)">💶 Euro (EUR €)</option>
                            <option value="GBP (£)">💷 British Pound (GBP £)</option>
                            <option value="INR (₹)">₹ Indian Rupee (INR ₹)</option>
                            <option value="JPY (¥)">¥ Japanese Yen (JPY ¥)</option>
                            <option value="AUD ($)">🇦🇺 Australian Dollar (AUD $)</option>
                            <option value="CAD ($)">🇨🇦 Canadian Dollar (CAD $)</option>
                          </select>
                        </div>

                        {/* Measurement Unit */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Measurement Unit *</label>
                          <select
                            name="measure"
                            value={formData.measure}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select unit</option>
                            <option value="Cm">📏 Centimeters (Cm)</option>
                            <option value="Inches">📏 Inches (In)</option>
                            <option value="Meters">📏 Meters (M)</option>
                            <option value="Feet">📏 Feet (Ft)</option>
                          </select>
                        </div>

                        {/* Date Format */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Date Format *</label>
                          <select
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select format</option>
                            <option value="DD/MM/YYYY">📅 DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">📅 MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">📅 YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Security Settings */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-200 shadow-md">
                    <h3 className="text-xl font-bold text-amber-900 mb-6">Privacy & Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Two-Factor Authentication', status: 'Enabled' },
                        { label: 'Profile Visibility', status: 'Public' },
                        { label: 'Email Verification', status: 'Verified' },
                        { label: 'Activity Tracking', status: 'On' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-200 hover:border-amber-500 transition">
                          <div>
                            <p className="font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-600">{item.status}</p>
                          </div>
                          <button className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full hover:bg-amber-200 transition">
                            Configure
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Display Preferences */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-black mb-6">Display Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Theme', current: 'Light Mode', options: ['Light', 'Dark', 'Auto'] },
                        { label: 'Items per Page', current: '12', options: ['6', '12', '24', '36'] },
                        { label: 'Font Size', current: 'Normal', options: ['Small', 'Normal', 'Large'] },
                      ].map((pref, idx) => (
                        <div key={idx} className="p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 transition">
                          <label className="block text-sm font-semibold text-gray-800 mb-3">{pref.label}</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white cursor-pointer">
                            {pref.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <p className="text-xs text-gray-600 mt-2">Current: {pref.current}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center gap-4">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save all settings
                    </button>
                    <button className="px-16 py-3 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition shadow-lg hover:shadow-xl">
                      Reset to default
                    </button>
                  </div>
                </div>
              )}

              {/* My Offers Section */}
              {activeSection === 'offers' && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-serif font-bold text-black mb-2 pb-4 border-b-3 border-amber-500">
                    MY OFFERS
                  </h2>
                  <p className="text-gray-600 text-sm mb-8">View and manage all your active offers and negotiations</p>
                  
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-semibold mb-2">No Active Offers</p>
                    <p className="text-gray-500 text-sm">You haven't received any offers yet. Keep exploring artworks to get offers from sellers.</p>
                  </div>
                </div>
              )}

              {/* My Orders Section */}
              {activeSection === 'orders' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-2 pb-4 border-b-3 border-amber-500">
                      MY ORDERS
                    </h2>
                    <p className="text-gray-600 text-sm mb-8">Track and manage all your purchases and orders</p>
                    
                    {orders.length === 0 ? (
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg font-semibold mb-2">No Orders Yet</p>
                        <p className="text-gray-500 text-sm">You haven't placed any orders yet. Start shopping for beautiful artworks today!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Filter and Sort Options */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                            <option>All Orders</option>
                            <option>Delivered</option>
                            <option>In Transit</option>
                            <option>Pending</option>
                          </select>
                          <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                            <option>Latest Orders</option>
                            <option>Oldest Orders</option>
                            <option>Price: High to Low</option>
                            <option>Price: Low to High</option>
                          </select>
                        </div>

                        {/* Orders List */}
                        {orders.map((order) => (
                          <div key={order.id} className="border-2 border-gray-300 rounded-lg overflow-hidden hover:border-amber-500 transition bg-white">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                              {/* Order Image */}
                              <div className="lg:col-span-1">
                                <div className="relative h-48 md:h-56 rounded-lg overflow-hidden shadow-md">
                                  <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                                  <div className="absolute top-3 right-3 bg-amber-600 text-white px-4 py-2 rounded-full text-xs font-bold">
                                    {order.status}
                                  </div>
                                </div>
                              </div>

                              {/* Order Details */}
                              <div className="lg:col-span-3 flex flex-col justify-between">
                                {/* Header Info - All in One Row */}
                                <div>
                                  <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                                    {/* Order ID - Left */}
                                    <div>
                                      <p className="text-xs text-gray-500 font-semibold">ORDER ID</p>
                                      <p className="text-lg font-bold text-gray-900">{order.id}</p>
                                    </div>
                                    
                                    {/* Art Title and Artist - Center */}
                                    <div className="flex-1 text-center">
                                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{order.title}</h3>
                                      <p className="text-gray-600 text-sm">by <span className="font-semibold text-gray-900">{order.artist}</span></p>
                                    </div>
                                    
                                    {/* Order Date - Right */}
                                    <div className="text-right">
                                      <p className="text-xs text-gray-500 font-semibold">ORDER DATE</p>
                                      <p className="text-sm font-semibold text-gray-900">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                  </div>

                                  {/* Art Details */}
                                  <div className="mb-6 pb-6 border-b-2 border-gray-200">
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">SIZE</p>
                                        <p className="font-semibold text-gray-900">{order.size}</p>
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">TYPE</p>
                                        <p className="font-semibold text-gray-900">{order.type}</p>
                                      </div>
                                      <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">QUANTITY</p>
                                        <p className="font-semibold text-gray-900">{order.quantity}</p>
                                      </div>
                                      <div className="bg-amber-50 p-3 rounded-lg border-2 border-amber-200">
                                        <p className="text-xs text-amber-600 font-semibold mb-1">PRICE</p>
                                        <p className="font-bold text-amber-700">{order.price}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-3 justify-center">
                                    <button className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition text-sm">
                                      Track Order
                                    </button>
                                    <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">
                                      View Invoice
                                    </button>
                                    <button className="px-6 py-2 border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-amber-500 transition text-sm">
                                      Contact Support
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Settings Section */}
              {activeSection === 'payment' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-2 pb-4 border-b-3 border-amber-500">
                      PAYMENT SETTINGS
                    </h2>
                    <p className="text-gray-600 text-sm mb-8">Manage your payment methods and billing information</p>

                    {/* Define Payment Method Section */}
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Define your payment method</h3>
                      <p className="text-gray-600 text-sm mb-8">Enter your credit card information to make your purchases.</p>

                      {/* Main Card Container */}
                      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                        {/* Payment Methods Accepted */}
                        <div className="mb-8">
                          <p className="text-sm font-bold text-gray-800 mb-4">We accept</p>
                          <div className="flex gap-3 flex-wrap">
                            <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
                              <span className="text-lg">💳</span>
                              <span className="text-sm font-semibold">VISA</span>
                            </div>
                            <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
                              <span className="text-lg">🔴</span>
                              <span className="text-sm font-semibold">Mastercard</span>
                            </div>
                            <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
                              <span className="text-lg">🔵</span>
                              <span className="text-sm font-semibold">Maestro</span>
                            </div>
                            <div className="bg-blue-600 text-white border-2 border-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
                              <span className="text-xs font-bold">AMEX</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Left Side - Form */}
                          <div className="lg:col-span-2">
                            {/* Name on Card */}
                            <div className="mb-6">
                              <label className="text-sm font-bold text-gray-800 mb-3 block">Name on the card</label>
                              <input 
                                type="text" 
                                placeholder="Name on the card"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                              />
                            </div>

                            {/* Card Details */}
                            <div className="mb-6">
                              <label className="text-sm font-bold text-gray-800 mb-3 block">Card details</label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  placeholder="Card number"
                                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white pr-28"
                                />
                                <button
                                  onClick={() => setShowAutofillModal(true)}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                                >
                                  Autofill ✓
                                </button>
                              </div>
                            </div>

                            {/* Expiry and CVV */}
                            <div className="grid grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                placeholder="MM/YY"
                                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
                              />
                              <input 
                                type="text" 
                                placeholder="CVV"
                                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
                              />
                            </div>
                          </div>

                          {/* Right Side - Card Preview */}
                          <div className="lg:col-span-1 flex flex-col items-center">
                            <div className="w-full bg-gray-900 rounded-2xl p-6 text-white shadow-xl mb-6" style={{ aspectRatio: '16/9' }}>
                              <div className="flex justify-between items-start mb-8">
                                <div className="text-lg font-bold">•••• •••• •••• ••••</div>
                                <div className="text-xs opacity-75">CHIP</div>
                              </div>
                              <div className="flex justify-between items-end h-full">
                                <div>
                                  <div className="text-xs opacity-75 mb-1">NAME</div>
                                  <div className="text-sm font-semibold">YOUR NAME</div>
                                </div>
                                <div className="w-12 h-8 bg-gradient-to-r from-amber-400 to-yellow-300 rounded"></div>
                              </div>
                            </div>
                            <button className="px-10 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition text-sm">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Information - Keep Original */}
                    <div className="border-t-2 border-gray-200 pt-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Billing Address</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Street Address</label>
                          <input type="text" placeholder="Enter street address" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">City</label>
                          <input type="text" placeholder="Enter city" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">State/Province</label>
                          <input type="text" placeholder="Enter state" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Postal Code</label>
                          <input type="text" placeholder="Enter postal code" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center gap-4 mt-8">
                      <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                        Save Billing Info
                      </button>
                      <button className="px-16 py-3 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition shadow-lg hover:shadow-xl">
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Autofill Modal */}
                  {showAutofillModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
                        {/* Close Button */}
                        <button
                          onClick={() => setShowAutofillModal(false)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                          ×
                        </button>

                        {/* Header with Icon */}
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            ✓
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">link</h2>
                        </div>

                        {/* Title and Description */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Continue with Link</h3>
                        <p className="text-gray-600 text-sm mb-8">Enter your information to get started</p>

                        {/* Email Input */}
                        <div className="mb-6">
                          <input
                            type="email"
                            placeholder="Email"
                            value={autofillEmail}
                            onChange={(e) => setAutofillEmail(e.target.value)}
                            className="w-full px-4 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                          />
                        </div>

                        {/* Continue Button */}
                        <button
                          onClick={() => {
                            if (autofillEmail) {
                              // Handle autofill logic
                              setShowAutofillModal(false);
                              setAutofillEmail('');
                            }
                          }}
                          className="w-full py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Newsletter Section - Appears at bottom of all pages */}
              <div className="py-16 md:py-20 px-4 md:px-8 mt-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-blue-600 mb-4">Sign up and get 10% off your first order</h3>
                    <p className="text-gray-600 mb-6 text-lg">Fresh arrivals, curator picks, exclusive features.</p>
                    <div className="flex flex-col gap-3">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition inline-flex items-center justify-center gap-2">
                        Get 10% off now <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                    <img src={sideImage} alt="Newsletter" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {internalSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
          onClick={() => setInternalSidebarOpen(false)}
        ></div>
      )}
      </div>
    </div>
  );
}
