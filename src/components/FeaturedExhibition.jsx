import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img222 from '../assets/User-images/img222.jpg';
import img333 from '../assets/User-images/img333.jpg';
import image444 from '../assets/User-images/image444.jpg';
import image555 from '../assets/User-images/image555.jpg';
import history from '../assets/User-images/history.jpg';
import { ExhibitionGallery } from './ExhibitionGallery';

export function FeaturedExhibition() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const slides = [
    { id: 1, color: 'bg-blue-500', title: 'The Ancient Citadel', image: img222 },
    { id: 2, color: 'bg-green-600', title: 'Desert Landscape', image: img333 },
    { id: 3, color: 'bg-cyan-400', title: 'Nature\'s Canvas', image: image444 },
    { id: 4, color: 'bg-blue-600', title: 'Modern Heritage', image: image555 },
    { id: 5, color: 'bg-purple-600', title: 'Timeless Treasures', image: img222 },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 relative" style={{
      backgroundImage: `url(${history})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* White overlay for readability */}
      <div className="absolute inset-0 bg-white/95"></div>
      
      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm text-amber-600 font-semibold uppercase tracking-widest mb-2 md:mb-4">Featured Showcase</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 md:mb-6 leading-tight">Ancient Wonders Collection</h2>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-medium">
              An exhibition showcasing rare ancient artifacts and timeless cultural treasures from around the world.
            </p>
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <p className="text-gray-700 text-sm md:text-base font-semibold">From March 2026 to May 2026</p>
              <p className="text-black font-bold text-base md:text-lg tracking-wide">ZIGGURAT CULTURAL HERITAGE</p>
            </div>
            <button onClick={() => setShowGallery(true)} className="hidden md:inline-block bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-900 transition text-sm md:text-base shadow-lg hover:shadow-xl">See all exhibitions</button>
          </div>

          {/* Carousel */}
          <div className="relative bg-black rounded-lg md:rounded-2xl overflow-hidden p-2 md:p-4 lg:p-6 shadow-lg md:shadow-2xl">
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-4 scrollbar-hide">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 h-40 sm:h-48 md:h-60 lg:h-72 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    index === currentSlide ? 'ring-2 md:ring-4 ring-amber-400' : 'opacity-60 hover:opacity-85'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-start p-2 md:p-3 lg:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <span className="text-white font-serif text-xs md:text-lg lg:text-xl font-bold line-clamp-2">{slide.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-1 sm:left-2 md:left-3 lg:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg hover:shadow-xl hover:bg-amber-50 transition z-20"
            >
              <ChevronLeft className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-1 sm:right-2 md:right-3 lg:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg hover:shadow-xl hover:bg-amber-50 transition z-20"
            >
              <ChevronRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 md:gap-2 lg:gap-3 mt-3 md:mt-4 lg:mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition ${
                    index === currentSlide ? 'bg-amber-400 w-5 md:w-6 lg:w-8 h-2 md:h-2.5 lg:h-3' : 'bg-gray-500 hover:bg-gray-400 w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center md:hidden px-4 mt-6 md:mt-8">
          <button onClick={() => setShowGallery(true)} className="w-full bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-900 transition text-sm shadow-lg hover:shadow-xl">See all exhibitions</button>
        </div>
      </div>
      
      {showGallery && <ExhibitionGallery onClose={() => setShowGallery(false)} />}
    </section>
  );
}
