import React from 'react';
import { Heart } from 'lucide-react';
import image13 from '../assets/User-images/image13.jpg';
import image10 from '../assets/User-images/image10.jpg';
import image9 from '../assets/User-images/image9.jpg';
import image7 from '../assets/User-images/image7.jpg';
import image6 from '../assets/User-images/image6.jpg';

export function BestsellerProducts({ onNavigate }) {
  const products = [
    {
      id: 1,
      name: 'Guardian At The Window',
      artist: 'Nandini Saha Ghosh',
      price: '$3,500',
      oldPrice: '$4,200',
      image: image13,
      category: 'Painting',
    },
    {
      id: 2,
      name: 'Celebration-7',
      artist: 'Pradip Sarkar',
      price: '$2,800',
      oldPrice: '$3,500',
      image: image10,
      category: 'Cubism',
    },
    {
      id: 3,
      name: 'Tranquil Awakening',
      artist: 'Sonaly Gandhi',
      price: '$2,200',
      oldPrice: '$2,800',
      image: image9,
      category: 'Digital Art',
    },
    {
      id: 4,
      name: 'The Queen',
      artist: 'Sudip Chandra',
      price: '$4,500',
      oldPrice: '',
      image: image7,
      category: 'Sculpture',
    },
    {
      id: 5,
      name: 'Split Soul',
      artist: 'Tarvinder Singh',
      price: '$3,200',
      oldPrice: '$4,000',
      image: image6,
      category: 'Sculpture',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="luxury-container">
        <div className="mb-16">
          <p className="section-subtitle">Curated Collection</p>
          <h2 className="section-title">Bestsellers</h2>
          <p className="text-gray-700 text-base">Discover the most coveted artifacts and artworks from our exclusive collection</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="w-full aspect-square rounded-lg overflow-hidden relative hover:shadow-xl transition-all duration-300 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist Icon */}
                <button className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2 shadow-md hover:bg-yellow-500 transition opacity-0 group-hover:opacity-100 duration-300">
                  <Heart className="w-4 h-4 text-black" fill="currentColor" />
                </button>
                
                {/* Sale Badge */}
                {product.oldPrice && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm text-black group-hover:text-gray-700 transition">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-1">{product.artist}</p>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">{product.category}</p>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-black">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => onNavigate && onNavigate('artifacts-gallery')} className="luxury-button">All artifacts →</button>
        </div>
      </div>
    </section>
  );
}
