import React from 'react';
import { User, MapPin, ShoppingBag, Store, LogOut, Gift, ChevronRight, Palette } from 'lucide-react';

export function MyAccount({ onNavigate, onLogout }) {
  const accountOptions = [
    {
      id: 1,
      title: 'My Information',
      description: 'View and edit your personal information.',
      icon: User,
      action: 'my-information',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      title: 'My Purchases',
      description: 'View and track your purchases',
      icon: ShoppingBag,
      action: 'my-purchases',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 5,
      title: 'Creative Hub',
      description: 'Explore exhibitions and connect with other artists.',
      icon: Palette,
      action: 'creative-hub',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconColor: 'text-pink-600'
    },
  ];

  const handleCardClick = (action) => {
    if (onNavigate) {
      onNavigate(action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="w-full bg-white border-b border-gray-200 py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2">
            MY ACCOUNT
          </h1>
          <p className="text-sm md:text-base text-gray-600">Manage your profile, addresses, and purchases</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Account Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
            {accountOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.id}
                  onClick={() => handleCardClick(option.action)}
                  className={`${option.bgColor} p-6 md:p-8 rounded-xl border-2 border-gray-200 hover:border-gray-400 cursor-pointer transition-all duration-300 hover:shadow-lg group`}
                >
                  {/* Icon */}
                  <div className={`${option.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={40} className="md:w-12 md:h-12" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-700 mb-4 line-clamp-2">
                    {option.description}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="flex items-center text-gray-600 group-hover:text-gray-900 font-semibold text-sm">
                    <span>View</span>
                    <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gift Card Section */}
          <div className="mb-8 md:mb-12 p-6 md:p-8 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Gift className="text-pink-600 w-8 h-8 md:w-10 md:h-10" />
                <div>
                  <p className="text-gray-900 font-bold text-base md:text-lg">
                    You own a gift card? Check its balance.
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">View your gift card balance</p>
                </div>
              </div>
              <button className="px-6 py-2 md:px-8 md:py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold text-sm md:text-base whitespace-nowrap">
                Check Balance
              </button>
            </div>
          </div>

          {/* Logout Section */}
          <div className="mb-8 md:mb-12 p-6 md:p-8 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogOut className="text-red-600 w-8 h-8 md:w-10 md:h-10" />
                <p className="text-gray-900 font-bold text-base md:text-lg">
                  Sign out of your account
                </p>
              </div>
              <button 
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  }
                }}
                className="px-6 py-2 md:px-8 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm md:text-base whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-black text-white p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
              TRY THE ARTWORK OUT AT HOME FOR FREE FOR 14 DAYS
            </h2>
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
              If you change your mind, you can send it back free of charge, and we'll reimburse you.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
