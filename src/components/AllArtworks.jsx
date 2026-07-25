import React, { useState } from 'react';
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

// Import images
import image2 from '../assets/User-images/image2.jpg';
import image1 from '../assets/User-images/image 1.jpg';

import image3 from '../assets/User-images/image3.jpg';
import image4 from '../assets/User-images/image4.jpg';
import image5 from '../assets/User-images/image5.jpg';
import image6 from '../assets/User-images/image6.jpg';
import image7 from '../assets/User-images/image7.jpg';
import image8 from '../assets/User-images/image 8.jpg';
import image9 from '../assets/User-images/image 9.jpg';
import image11 from '../assets/User-images/image 11.jpg';
import image12 from '../assets/User-images/image 12.jpg';
import image13 from '../assets/User-images/image13.jpg';
import image15 from '../assets/User-images/image15.jpg';
import image16 from '../assets/User-images/image16.jpg';
import image17 from '../assets/User-images/image17.jpg';
import image18 from '../assets/User-images/image18.jpg';

export function AllArtworks({ onNavigate, onAddToWishlist, onAddToCart }) {
  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Comprehensive artwork data
  const artworks = [
    {
      id: 1,
      title: 'Krishna Leela',
      artist: 'Sekhar Roy',
      price: '₹ 299,000',
      category: 'Painting',
      subcategory: 'Religious',
      type: 'Acrylic on Canvas',
      dimensions: '152.40 x 121.92 cm',
      image: image1,
      description: 'A mesmerizing depiction of Krishna\'s divine play with beautiful traditional elements.'
    },
    {
      id: 2,
      title: 'Meditating Buddha',
      artist: 'Spiritual Creator',
      price: '₹ 185,500',
      category: 'Painting',
      subcategory: 'Spiritualism',
      type: 'Acrylic',
      dimensions: '120 x 100 cm',
      image: image2,
      description: 'Serene representation of inner peace and spiritual awakening.'
    },
    {
      id: 3,
      title: 'Abstract Harmony',
      artist: 'Contemporary Artisan',
      price: '₹ 245,000',
      category: 'Painting',
      subcategory: 'Abstract',
      type: 'Mixed Media',
      dimensions: '140 x 110 cm',
      image: image3,
      description: 'A stunning blend of colors and forms creating visual harmony.'
    },
    {
      id: 4,
      title: 'Urban Visions',
      artist: 'Marcus Reid',
      price: '₹ 189,000',
      category: 'Painting',
      subcategory: 'Contemporary',
      type: 'Acrylic',
      dimensions: '130 x 100 cm',
      image: image4,
      description: 'Modern interpretation of city life with bold colors and dynamic composition.'
    },
    {
      id: 5,
      title: 'Nature\'s Whisper',
      artist: 'Luna Sky',
      price: '₹ 275,000',
      category: 'Painting',
      subcategory: 'Landscape',
      type: 'Oil on Canvas',
      dimensions: '160 x 120 cm',
      image: image5,
      description: 'Capturing the essence of nature\'s quiet beauty and tranquility.'
    },
    {
      id: 6,
      title: 'Eternal Essence',
      artist: 'Spiritual Creator',
      price: '₹ 190,000',
      category: 'Painting',
      subcategory: 'Spiritual',
      type: 'Mixed Media',
      dimensions: '110 x 90 cm',
      image: image6,
      description: 'An introspective piece exploring the essence of existence.'
    },
    {
      id: 7,
      title: 'Colorful Expressions',
      artist: 'Modern Sculptor',
      price: '₹ 350,000',
      category: 'Sculpture',
      subcategory: 'Contemporary',
      type: 'Mixed Materials',
      dimensions: '80 x 60 x 40 cm',
      image: image7,
      description: 'Bold sculptural work expressing raw emotion through form and color.'
    },
    {
      id: 8,
      title: 'Heritage Memories',
      artist: 'Cultural Artist',
      price: '₹ 280,000',
      category: 'Painting',
      subcategory: 'Cultural',
      type: 'Acrylic on Canvas',
      dimensions: '150 x 120 cm',
      image: image8,
      description: 'Nostalgic representation of traditional heritage and cultural values.'
    },
    {
      id: 9,
      title: 'Urban Dreams',
      artist: 'City Artist',
      price: '₹ 220,000',
      category: 'Painting',
      subcategory: 'Contemporary',
      type: 'Digital Art',
      dimensions: '140 x 100 cm',
      image: image9,
      description: 'Dreamlike depiction of city landscapes and modern life.'
    },
    {
      id: 10,
      title: 'Serenity Flow',
      artist: 'Eva Bloom',
      price: '₹ 195,000',
      category: 'Painting',
      subcategory: 'Abstract',
      type: 'Acrylic',
      dimensions: '120 x 100 cm',
      image: image11,
      description: 'Flowing abstract forms creating a sense of peace and movement.'
    },
    {
      id: 11,
      title: 'Ocean Vibes',
      artist: 'David Blue',
      price: '₹ 220,000',
      category: 'Painting',
      subcategory: 'Landscape',
      type: 'Oil on Canvas',
      dimensions: '150 x 110 cm',
      image: image12,
      description: 'Vibrant ocean scene capturing the essence of maritime beauty.'
    },
    {
      id: 12,
      title: 'Mountain Peak',
      artist: 'Emma Stone',
      price: '₹ 255,000',
      category: 'Painting',
      subcategory: 'Landscape',
      type: 'Acrylic on Canvas',
      dimensions: '140 x 120 cm',
      image: image13,
      description: 'Majestic mountain landscape with dramatic lighting and composition.'
    },
    {
      id: 13,
      title: 'Cosmic Energy',
      artist: 'Sofia Rossi',
      price: '₹ 320,000',
      category: 'Painting',
      subcategory: 'Abstract',
      type: 'Mixed Media',
      dimensions: '160 x 130 cm',
      image: image15,
      description: 'Explosive abstract representation of cosmic forces and energy.'
    },
    {
      id: 14,
      title: 'Digital Sunset',
      artist: 'James North',
      price: '₹ 210,000',
      category: 'Painting',
      subcategory: 'Digital',
      type: 'Digital Art',
      dimensions: '130 x 100 cm',
      image: image16,
      description: 'Modern digital artwork depicting the beauty of sunset.'
    },
    {
      id: 15,
      title: 'Sacred Geometry',
      artist: 'Spiritual Creator',
      price: '₹ 285,000',
      category: 'Painting',
      subcategory: 'Spiritual',
      type: 'Acrylic',
      dimensions: '140 x 140 cm',
      image: image17,
      description: 'Intricate geometric patterns with spiritual significance.'
    },
    {
      id: 16,
      title: 'Cultural Fusion',
      artist: 'Cultural Artist',
      price: '₹ 290,000',
      category: 'Painting',
      subcategory: 'Cultural',
      type: 'Mixed Media',
      dimensions: '150 x 120 cm',
      image: image18,
      description: 'Blend of traditional and contemporary artistic styles.'
    },
  ];

  const categories = ['All', 'Painting', 'Sculpture', 'Digital Art'];
  
  const filteredArtworks = selectedFilter === 'All' 
    ? artworks 
    : artworks.filter(art => art.category === selectedFilter);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header with Back Button */}
      <div className="relative bg-gradient-to-b from-amber-100 to-white py-8 md:py-12 border-b-4 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          {/* Back Button */}
          <motion.button
            onClick={() => onNavigate && onNavigate('my-purchases')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-8 left-4 w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition duration-300 shadow-lg z-10"
            title="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Title Section - Centered */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs md:text-sm uppercase tracking-widest text-gray-600 mb-2 font-semibold">EXPLORE COLLECTION</p>
              <h1 className="text-5xl md:text-6xl font-serif italic font-bold text-amber-900 mb-2">
                The Collection
              </h1>
              <p className="text-base text-gray-700 font-semibold">CURATED TO EXPLORE</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-0 bg-white border-b-2 border-gray-800 py-4 px-4 md:px-8 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 justify-center md:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 border-2 ${
                  selectedFilter === category
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-800 hover:border-black'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Artworks Masonry Grid */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid gap-5 md:gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gridAutoRows: 'auto'
            }}
          >
            {filteredArtworks.map((artwork, index) => {
              // Masonry effect - some cards span 2 columns or 2 rows
              const isWide = (index + 1) % 5 === 0;
              const isTall = (index + 1) % 7 === 0;
              const spanCols = isWide ? 2 : 1;
              const spanRows = isTall ? 2 : 1;

              return (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group cursor-pointer"
                  style={{
                    gridColumn: `span ${spanCols}`,
                    gridRow: `span ${spanRows}`
                  }}
                >
                  {/* Artwork Card with Border */}
                  <div className={`relative w-full h-full rounded-lg overflow-hidden border-4 border-gray-800 bg-black hover:border-amber-600 transition-colors duration-300 shadow-xl hover:shadow-2xl`}>
                    {/* Image Container */}
                    <div className={`w-full h-full ${isWide || isTall ? 'min-h-96' : 'aspect-square'}`}>
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3C/svg%3E';
                        }}
                      />

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Title & Artist */}
                        <div className="text-white">
                          <h3 className="font-serif text-lg md:text-xl font-bold mb-1">{artwork.title}</h3>
                          <p className="text-sm text-gray-300">{artwork.artist}</p>
                        </div>

                        {/* Bottom Info */}
                        <div className="space-y-3">
                          {/* Details */}
                          <div className="text-white text-xs space-y-1">
                            <p><span className="text-gray-400">Type:</span> <span className="font-semibold">{artwork.type}</span></p>
                            <p><span className="text-gray-400">Dimensions:</span> <span className="font-semibold">{artwork.dimensions}</span></p>
                          </div>

                          {/* Price & Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                            <div>
                              <p className="text-gray-400 text-xs">PRICE</p>
                              <p className="text-white font-bold text-lg">{artwork.price}</p>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  toggleFavorite(artwork.id);
                                  onAddToWishlist && onAddToWishlist(artwork);
                                }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  favorites.includes(artwork.id)
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/40'
                                }`}
                              >
                                <Heart className="w-5 h-5" fill={favorites.includes(artwork.id) ? 'currentColor' : 'none'} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onAddToCart && onAddToCart(artwork)}
                                className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-colors"
                              >
                                <ShoppingCart className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Empty State */}
          {filteredArtworks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">No artworks found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-amber-100 py-12 md:py-16 border-t-4 border-b-4 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-5xl md:text-6xl font-black text-amber-900 mb-2">
                {filteredArtworks.length}+
              </p>
              <p className="text-gray-800 font-semibold text-lg">ARTWORKS</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-5xl md:text-6xl font-black text-amber-900 mb-2">193+</p>
              <p className="text-gray-800 font-semibold text-lg">ARTISTS</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-5xl md:text-6xl font-black text-amber-900 mb-2">100%</p>
              <p className="text-gray-800 font-semibold text-lg">AUTHENTIC</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
