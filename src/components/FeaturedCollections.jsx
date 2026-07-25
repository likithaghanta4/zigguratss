import React from 'react';
import image9 from '../image9.jpg';
import image7 from '../image7.jpg';
import image6 from '../image6.jpg';
import image5 from '../image5.jpg';

export function FeaturedCollections() {
  const collections = [
    { id: 1, name: 'Ink drawings', image: image9 },
    { id: 2, name: 'Spring trend watch: pastels', image: image7 },
    { id: 3, name: 'Spring trend watch: botanical works', image: image6 },
    { id: 4, name: 'April Ensemble', image: image5 },
  ];

  return (
    <section className="py-8 md:py-16 lg:py-24">
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 lg:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 md:mb-4">
            Featured collections
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Art just for you, curated by theme, style, movement or color
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="rounded-2xl overflow-hidden aspect-square flex items-end p-4 md:p-6 text-white hover:shadow-xl transition-shadow cursor-pointer group relative"
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-sm md:text-base lg:text-lg font-bold text-center w-full">
                  {collection.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="flex justify-center">
          <button className="px-6 md:px-8 py-2 md:py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
            Explore all collections
          </button>
        </div>
      </div>
    </section>
  );
}
