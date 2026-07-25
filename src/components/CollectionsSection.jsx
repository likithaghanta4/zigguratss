import React from 'react';
import image1 from '../assets/User-images/image 1.jpg';
import image8 from '../assets/User-images/image 8.jpg';
import image9 from '../assets/User-images/image 9.jpg';
import image11 from '../assets/User-images/image 11.jpg';
import image12 from '../assets/User-images/image 12.jpg';
import image2 from '../assets/User-images/image2.jpg';

export function CollectionsSection() {
  const collections = [
    { id: 1, name: 'Ancient Civilizations', description: 'Artifacts from Egypt, Mesopotamia, and beyond', image: image1 },
    { id: 2, name: 'Asian Heritage', description: 'Treasures from India, China, and Southeast Asia', image: image8 },
    { id: 3, name: 'European Classics', description: 'Art and artifacts from Renaissance to Modern', image: image9 },
    { id: 4, name: 'Contemporary Works', description: 'Modern interpretations of heritage themes', image: image11 },
    { id: 5, name: 'Rare Manuscripts', description: 'Historical documents and illuminated texts', image: image12 },
  ];

  return (
    <section className="py-8 md:py-16 lg:py-24">
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-2 md:mb-3">Curated Collections</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black">Collection Highlights</h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="rounded-lg overflow-hidden aspect-square flex items-end p-3 md:p-4 lg:p-6 text-white hover:shadow-xl transition-shadow cursor-pointer group relative"
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="font-serif text-xs md:text-sm lg:text-lg font-bold">{collection.name}</h3>
                <p className="text-xs opacity-90 group-hover:opacity-100 transition line-clamp-2">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
