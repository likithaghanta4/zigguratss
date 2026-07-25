import React from 'react';
import birdsImg from '../assets/User-images/birds.jpg';
import bnvjdrvgImg from '../assets/User-images/bnvjdrvg.jpg';
import booImg from '../assets/User-images/boo.jpg';
import dfjImg from '../assets/User-images/dfj.jpg';
import imaeg14Img from '../assets/User-images/imaeg14.jpg';

export function GalleriesSection() {
  const galleries = [
    { id: 1, name: 'Metropolitan Heritage', location: 'New York - USA', image: birdsImg },
    { id: 2, name: 'Classical Collections', location: 'London - UK', image: bnvjdrvgImg },
    { id: 3, name: 'Ancient Treasures', location: 'Paris - France', image: booImg },
    { id: 4, name: 'Eastern Wonders', location: 'Tokyo - Japan', image: dfjImg },
  ];

  const categories = [
    'Indian Heritage Galleries',
    'Asian Art Collections',
    'European Museums',
    'Contemporary Collections',
    'Private Galleries',
    'All galleries →'
  ];

  return (
    <section className="py-8 md:py-16 lg:py-24 bg-gray-50">
      <div className="luxury-container px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <p className="section-subtitle text-xs md:text-sm">Curated Networks</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Featured Galleries</h2>
          <p className="text-gray-600 text-sm md:text-base">Discover our network of prestigious galleries worldwide</p>
        </div>

        {/* Gallery Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 items-start">
          {/* Featured Gallery */}
          <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg">
            <div className="w-full h-40 md:h-48 rounded-lg mb-4 md:mb-6 flex items-center justify-center overflow-hidden">
              <img src={imaeg14Img} alt="Ziggurat Heritage Gallery" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-bold mb-1 md:mb-2">Ziggurat Heritage Gallery</h3>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 uppercase">NEW DELHI, INDIA</p>
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
              Welcome to our flagship gallery. We curate an exceptional collection of rare artifacts and cultural treasures. Our dedication to authenticity, preservation, and education makes us a leader in heritage curation. We provide expert guidance and secure transactions for collectors worldwide.
            </p>
            <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <p className="flex items-center gap-2">
                <span className="text-lg">★</span>
                <span className="text-gray-600">Trusted Partner since 2015</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">◐</span>
                <span className="text-gray-600">500+ artifacts authenticated</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">◉</span>
                <span className="text-gray-600">Premium Seller</span>
              </p>
            </div>
            <button className="mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-2.5 border border-gray-300 rounded-full text-xs md:text-sm font-medium hover:border-black hover:bg-black hover:text-white transition">Discover</button>
          </div>

          {/* Other Galleries */}
          <div className="space-y-2 md:space-y-4">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="flex gap-3 md:gap-4 hover:bg-white p-2 md:p-4 rounded-lg transition cursor-pointer"
              >
                <div className="w-16 md:w-24 h-16 md:h-24 rounded-lg flex-shrink-0 overflow-hidden">
                  <img src={gallery.image} alt={gallery.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-xs md:text-sm mb-0.5 md:mb-1 truncate">{gallery.name}</h4>
                  <p className="text-xs text-gray-600">{gallery.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-full text-xs md:text-sm hover:border-black hover:bg-black hover:text-white transition whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

