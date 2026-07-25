import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import address from '../assets/User-images/address.jpg';
import back1 from '../assets/User-images/back 1.jpg';
import back2 from '../assets/User-images/back2.jpg';
import birds from '../assets/User-images/birds.jpg';
import image14 from '../assets/User-images/imaeg14.jpg';
import image1 from '../assets/User-images/image 1.jpg';
import image8 from '../assets/User-images/image 8.jpg';
import image9 from '../assets/User-images/image 9.jpg';
import image11 from '../assets/User-images/image 11.jpg';
import image12 from '../assets/User-images/image 12.jpg';
import image2 from '../assets/User-images/image2.jpg';
import image3 from '../assets/User-images/image3.jpg';
import image4 from '../assets/User-images/image4.jpg';
import image5 from '../assets/User-images/image5.jpg';
import image6 from '../assets/User-images/image6.jpg';
import image7 from '../assets/User-images/image7.jpg';

export function ArtifactsGallery({ isOpen, onClose, isFullPage = false, onNavigate }) {
  const artifacts = [
    {
      id: 1,
      name: 'Urban Address',
      category: 'Photography',
      image: address,
    },
    {
      id: 2,
      name: 'Behind The Scenes',
      category: 'Digital Art',
      image: back1,
    },
    {
      id: 3,
      name: 'Reflection',
      category: 'Photography',
      image: back2,
    },
    {
      id: 4,
      name: 'Nature\'s Wings',
      category: 'Photography',
      image: birds,
    },
    {
      id: 5,
      name: 'Artistic Vision',
      category: 'Digital Art',
      image: image14,
    },
    {
      id: 6,
      name: 'Golden Hour',
      category: 'Photography',
      image: image1,
    },
    {
      id: 7,
      name: 'Abstract Dream',
      category: 'Abstract',
      image: image8,
    },
    {
      id: 8,
      name: 'Contemporary Art',
      category: 'Modern',
      image: image9,
    },
    {
      id: 9,
      name: 'Ethereal Moments',
      category: 'Fine Art',
      image: image11,
    },
    {
      id: 10,
      name: 'Timeless Beauty',
      category: 'Classic',
      image: image12,
    },
    {
      id: 11,
      name: 'Minimalist Form',
      category: 'Sculpture',
      image: image2,
    },
    {
      id: 12,
      name: 'Urban Landscape',
      category: 'Photography',
      image: image3,
    },
    {
      id: 13,
      name: 'Mystic Vibes',
      category: 'Digital Art',
      image: image4,
    },
    {
      id: 14,
      name: 'Color Harmony',
      category: 'Painting',
      image: image5,
    },
    {
      id: 15,
      name: 'Sculptural Grace',
      category: 'Sculpture',
      image: image6,
    },
    {
      id: 16,
      name: 'Royal Expression',
      category: 'Fine Art',
      image: image7,
    },
  ];

  // For modal view
  if (!isFullPage && !isOpen) return null;

  const galleryContent = (
    <>
      {/* Header */}
      <div className={`${isFullPage ? 'p-8 md:p-12 border-b border-gray-200 text-center' : 'p-8 border-b border-gray-200 flex justify-between items-center'}`}>
        <div className={isFullPage ? 'w-full' : ''}>
          <h2 className={`${isFullPage ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl'} font-black text-black`}>All Artifacts</h2>
          <p className={`${isFullPage ? 'text-lg md:text-xl text-gray-700 mt-3' : 'text-gray-600 mt-2'}`}>Explore our complete collection of exclusive artworks</p>
        </div>
        {!isFullPage && (
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 transition p-2 rounded-full flex-shrink-0"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        )}
      </div>

      {/* Grid Container */}
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artifacts.map((artifact) => (
            <div
              key={artifact.id}
              className="group cursor-pointer"
            >
              {/* Artifact Card */}
              <div className="h-full flex flex-col">
                {/* Image Container */}
                <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-300">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

                  {/* Wishlist Icon */}
                  <button className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2.5 shadow-lg hover:bg-yellow-500 transition opacity-0 group-hover:opacity-100 duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Heart className="w-5 h-5 text-black" fill="currentColor" />
                  </button>
                </div>

                {/* Info Section */}
                <div className="mt-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm text-black group-hover:text-gray-700 transition line-clamp-2">
                    {artifact.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">
                    {artifact.category}
                  </p>
                  
                  {/* View Details Button */}
                  <button className="mt-auto pt-3 text-xs font-semibold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gray-600">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!isFullPage && (
        <div className="px-8 py-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            Close Gallery
          </button>
        </div>
      )}

      {isFullPage && (
        <div className="px-8 py-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={() => onNavigate && onNavigate('creative-hub')}
            className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            Back to Creative Hub
          </button>
        </div>
      )}
    </>
  );

  // For full page view
  if (isFullPage) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="luxury-container px-4 md:px-6">
          {galleryContent}
        </div>
      </section>
    );
  }

  // For modal view
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center overflow-y-auto pt-8 pb-8">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl mx-4">
        {galleryContent}
      </div>
    </div>
  );
}
