import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import back2 from '../back2.jpg';
import birds from '../birds.jpg';
import bird1 from '../bird1.jpg';

export function MyInformation() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="w-full py-4 md:py-6 flex items-center gap-2 text-xs md:text-sm text-gray-600 px-4 md:px-8 overflow-x-auto max-w-7xl mx-auto">
        <Home className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">My Account</span>
        <ChevronRight className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
        <span className="text-gray-900 font-medium whitespace-nowrap">My information</span>
      </div>

      {/* Hero Header Section with Bird Background */}
      <div className="relative w-full py-16 md:py-28 lg:py-40 overflow-hidden" style={{
        backgroundImage: `url(${birds})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'none'
      }}>
        {/* Content */}
        <div className="relative z-10 text-center flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-black mb-3 md:mb-6 drop-shadow-lg" style={{ letterSpacing: '-0.02em' }}>
              MY INFORMATION
            </h1>
            <div className="w-32 md:w-48 h-1.5 md:h-2 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 mx-auto mb-4 md:mb-8"></div>
            <p className="text-black text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
              Manage your personal details, preferences, and account settings. Keep your information updated to enhance your experience on our platform.
            </p>
          </div>
          {/* Circular Artist Image */}
          <div className="flex-shrink-0 hidden lg:block">
            <img 
              src={bird1} 
              alt="Artist" 
              className="rounded-full w-56 lg:w-80 h-56 lg:h-80 object-cover shadow-2xl border-4 border-white"
              style={{ filter: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8 md:py-16 lg:py-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Personal Information Section */}
        <div className="mb-12 md:mb-20 p-6 md:p-8 lg:p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black mb-6 md:mb-10 pb-4 md:pb-6 border-b-3 border-amber-300">
            PERSONAL INFORMATION
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-3 md:mb-4">Date of Birth</label>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-2">Month</label>
                  <input
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-xs md:text-sm"
                    placeholder="MM"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-2">Day</label>
                  <input
                    type="text"
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-xs md:text-sm"
                    placeholder="DD"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-2">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-xs md:text-sm"
                    placeholder="YYYY"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 text-sm md:text-base"
                disabled
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Phone number *</label>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <div className="w-full sm:w-24">
                  <div className="flex items-center gap-2 px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base h-full">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-gray-700 font-medium">+91</span>
                  </div>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                  placeholder="Enter phone number"
                />
              </div>
              {!formData.phone && <p className="text-red-500 text-xs md:text-sm mt-2 font-medium">This value should not be blank.</p>}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8 md:mt-12 lg:mt-14">
            <button className="px-10 md:px-16 py-3 md:py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition duration-300 text-sm md:text-base shadow-lg hover:shadow-xl">
              Save my information
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-12 md:mb-20 p-6 md:p-8 lg:p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black mb-6 md:mb-10 pb-4 md:pb-6 border-b-3 border-amber-300">
            CHOOSE YOUR PREFERENCES
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Country */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 text-sm md:text-base"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Language *</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 text-sm md:text-base"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Currency *</label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 text-sm md:text-base"
              />
            </div>

            {/* Measure */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Measure *</label>
              <input
                type="text"
                name="measure"
                value={formData.measure}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Update Preferences Button */}
          <div className="flex justify-center mt-8 md:mt-12 lg:mt-14">
            <button className="px-10 md:px-16 py-3 md:py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition duration-300 text-sm md:text-base shadow-lg hover:shadow-xl">
              Update preferences
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-12 md:mb-20 p-6 md:p-8 lg:p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black mb-6 md:mb-10 pb-4 md:pb-6 border-b-3 border-amber-300">
            NEW PASSWORD
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Current password *</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">New password *</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">Repeat new password *</label>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                className="w-full px-4 md:px-5 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm md:text-base placeholder-gray-400"
                placeholder="Repeat new password"
              />
              {formData.repeatPassword && !formData.newPassword && (
                <p className="text-gray-600 text-xs md:text-sm mt-2">Please fill out this field.</p>
              )}
            </div>
          </div>

          {/* Change Password Button */}
          <div className="flex justify-center mt-8 md:mt-12 lg:mt-14">
            <button className="px-10 md:px-16 py-3 md:py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition duration-300 text-sm md:text-base shadow-lg hover:shadow-xl">
              Change password
            </button>
          </div>
        </div>

        {/* Budget Section */}
        <div className="mb-12 md:mb-20 p-6 md:p-8 lg:p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black mb-6 md:mb-10 pb-4 md:pb-6 border-b-3 border-amber-300">
            MY BUDGET
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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

        {/* Email Notifications Section */}
        <div className="mb-20 px-4 md:px-8 lg:px-12 py-12 bg-gradient-to-br from-white via-amber-50 to-white rounded-lg border border-amber-100 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-black mb-2 text-center">
              MY EMAIL NOTIFICATIONS
            </h2>
            <p className="text-center text-gray-600 text-sm mb-10">
              Choose which notifications you'd like to receive to stay updated
            </p>

            <div className="space-y-3">
              {[
                { key: 'promotions', label: 'Notifications concerning promotions', icon: '🎁' },
                { key: 'favoriteArtists', label: 'Notifications concerning your favorite artists', icon: '🎨' },
                { key: 'favoriteGalleries', label: 'Notifications concerning your favorite galleries', icon: '🏛️' },
                { key: 'favoriteArtworks', label: 'Notifications concerning your favorite artworks', icon: '✨' },
              ].map((notification) => (
                <label 
                  key={notification.key} 
                  className="flex items-center cursor-pointer p-4 rounded-xl border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 group"
                >
                  <input
                    type="checkbox"
                    name={notification.key}
                    checked={formData.notifications[notification.key]}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                  <span className="ml-3 text-lg mr-2 group-hover:scale-110 transition-transform">{notification.icon}</span>
                  <span className="text-sm text-gray-800 font-medium group-hover:text-amber-700 transition">{notification.label}</span>
                </label>
              ))}
            </div>

            <p className="text-gray-600 text-xs mt-10 text-center italic">
              If you no longer wish to receive email notifications, simply uncheck the boxes above.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            TRY THE ARTWORK OUT AT HOME FOR FREE FOR 14 DAYS
          </h2>
          <p className="text-lg text-gray-800">
            If you change your mind, you can send it back free of charge, and we'll reimburse you.
          </p>
        </div>
      </div>
    </div>
  );
}
