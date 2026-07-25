import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import wall1 from '../assets/User-images/wall1.jpg';
import wall2 from '../assets/User-images/wall2.jpg';
import wall3 from '../assets/User-images/wall3.jpg';
import wall4 from '../assets/User-images/wall4.jpg';
import wall5 from '../assets/User-images/wall5.jpg';
import wall6 from '../assets/User-images/wall6.jpg';
import wall7 from '../assets/User-images/wall7.jpg';
import wall8 from '../assets/User-images/wall8.webp';
import wall9 from '../assets/User-images/wall9.webp';
import wall10 from '../assets/User-images/wall10.webp';

export function ExhibitionsPage({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const exhibitions = [
    {
      id: 1,
      title: 'Ancient Echoes',
      image: wall1,
      date: 'March 2026 - May 2026',
      description: 'A journey through time exploring ancient civilizations'
    },
    {
      id: 2,
      title: 'Heritage Unveiled',
      image: wall2,
      date: 'April 2026 - June 2026',
      description: 'Discover the hidden stories of cultural artifacts'
    },
    {
      id: 3,
      title: 'Modern Classics',
      image: wall3,
      date: 'May 2026 - July 2026',
      description: 'Contemporary art meets traditional craftsmanship'
    },
    {
      id: 4,
      title: 'Global Perspectives',
      image: wall4,
      date: 'June 2026 - August 2026',
      description: 'Art from every corner of the world'
    },
    {
      id: 5,
      title: 'Artistic Vision',
      image: wall5,
      date: 'July 2026 - September 2026',
      description: 'Curated collection of visionary artists'
    },
    {
      id: 6,
      title: 'Cultural Legacy',
      image: wall6,
      date: 'August 2026 - October 2026',
      description: 'Preserving traditions through art'
    },
    {
      id: 7,
      title: 'Contemporary Forms',
      image: wall7,
      date: 'September 2026 - November 2026',
      description: 'Breaking boundaries with modern expression'
    },
    {
      id: 8,
      title: 'Digital Dreams',
      image: wall8,
      date: 'October 2026 - December 2026',
      description: 'Where technology meets creativity'
    },
    {
      id: 9,
      title: 'Timeless Beauty',
      image: wall9,
      date: 'November 2026 - January 2027',
      description: 'Classic masterpieces across generations'
    },
    {
      id: 10,
      title: 'Future Horizons',
      image: wall10,
      date: 'December 2026 - February 2027',
      description: 'Exploring what art can become'
    },
  ];

  const nextExhibition = () => {
    setCurrentIndex((prev) => (prev + 1) % exhibitions.length);
  };

  const prevExhibition = () => {
    setCurrentIndex((prev) => (prev - 1 + exhibitions.length) % exhibitions.length);
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="luxury-container px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="section-subtitle text-amber-600 font-semibold uppercase tracking-widest text-xs md:text-sm mb-3">Featured Exhibitions</p>
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl font-black text-black mb-4">All Exhibitions</h1>
          <p className="text-gray-700 text-base md:text-lg max-w-2xl">Explore our complete collection of exhibitions showcasing the finest artifacts and artworks from around the world.</p>
        </div>

        {/* Main Exhibition Display */}
        <div className="mb-12 md:mb-16">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl">
            <img 
              src={exhibitions[currentIndex].image}
              alt={exhibitions[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif mb-2 md:mb-4">{exhibitions[currentIndex].title}</h2>
              <p className="text-sm md:text-base mb-2 opacity-90">{exhibitions[currentIndex].date}</p>
              <p className="text-sm md:text-lg opacity-80 max-w-2xl">{exhibitions[currentIndex].description}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevExhibition}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition z-20"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextExhibition}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition z-20"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="mb-12">
          <h3 className="text-lg md:text-xl font-bold mb-6 text-black">Browse All Exhibitions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {exhibitions.map((exhibition, index) => (
              <button
                key={exhibition.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative rounded-lg overflow-hidden aspect-square group transition-all duration-300 ${
                  index === currentIndex ? 'ring-3 md:ring-4 ring-black shadow-lg' : 'opacity-70 hover:opacity-90'
                }`}
              >
                <img 
                  src={exhibition.image}
                  alt={exhibition.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium line-clamp-1">{exhibition.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">Ready to Explore?</h3>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">Visit our galleries to see these exhibitions in person or browse our complete collection of artifacts and artworks.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('all-artworks')}
              className="px-6 md:px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition text-sm md:text-base"
            >
              View All Artworks
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('creative-hub')}
              className="px-6 md:px-8 py-3 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition text-sm md:text-base"
            >
              Back to Creative Hub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
