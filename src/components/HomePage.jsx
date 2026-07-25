import React, { useState } from 'react';
import { Heart, ShoppingCart, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../assets/User-images/new1.png';
import image9 from '../assets/User-images/image 9.jpg';
import image12 from '../assets/User-images/image 12.jpg';
import image2 from '../assets/User-images/image2.jpg';
import image3 from '../assets/User-images/image3.jpg';
import image4 from '../assets/User-images/image4.jpg';
import image5 from '../assets/User-images/image5.jpg';
import image6 from '../assets/User-images/image6.jpg';
import image7 from '../assets/User-images/image7.jpg';
import image9new from '../assets/User-images/image9.jpg';
import collectionImage7 from '../assets/User-images/image7.jpg';
import collectionImage6 from '../assets/User-images/image6.jpg';
import collectionImage5 from '../assets/User-images/image5.jpg';
import collectionImage8 from '../assets/User-images/diff5.jpg';
import sky1 from '../assets/User-images/sky1.jpg';
import sky2 from '../assets/User-images/sky2.jpg';
import sky3 from '../assets/User-images/sky3.jpg';
import sky4 from '../assets/User-images/sky4.jpg';
import sky5 from '../assets/User-images/sky5.jpg';
import sky6 from '../assets/User-images/sky6.jpg';
import diff1 from '../assets/User-images/diif1.jpg';
import diff2 from '../assets/User-images/diff2.jpg';
import diff3 from '../assets/User-images/diff3.jpg';
import diff4 from '../assets/User-images/diff4.jpg';
import diff5 from '../assets/User-images/diff5.jpg';
import diff6 from '../assets/User-images/diff6.jpg';
import kudiImage from '../assets/User-images/kudi.png';
import sideImage from '../assets/User-images/sidev.png';

export function HomePage({ onNavigate, onAddToWishlist, onAddToCart }) {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('curator');

  // Featured artworks data
  const featuredArtworks = [
    {
      id: 1,
      title: 'Something in the Sky',
      artist: 'L. Joss',
      price: '₹651,350',
      originalPrice: '₹930,500',
      discount: '-30%',
      image: image9,
      category: 'Oil on Linen',
      dimensions: '116 x 89 cm'
    },
    {
      id: 2,
      title: '29 20',
      artist: 'Zaccheo Zilioli',
      price: '₹427,350',
      originalPrice: '₹610,500',
      discount: '-30%',
      image: image12,
      category: 'Acrylic, Pastel on Wood',
      dimensions: '80 x 60 cm'
    },
    {
      id: 3,
      title: 'The Beginning / Viva Red',
      artist: 'Mila Weis',
      price: '₹349,875',
      originalPrice: '₹466,500',
      discount: '-25%',
      image: image2,
      category: 'Acrylic on Canvas',
      dimensions: '100 x 100 cm'
    },
    {
      id: 4,
      title: 'Papyrus Somniferum',
      artist: 'Ada Chini',
      price: '₹462,000',
      originalPrice: '₹660,000',
      discount: '-30%',
      image: image3,
      category: 'Acrylic on Canvas',
      dimensions: '100 x 70 cm'
    },
    {
      id: 5,
      title: 'Wedge',
      artist: 'Paulina Wong',
      price: 'Contact Gallery',
      image: image4,
      category: 'Oil on Canvas',
      dimensions: '61 x 78 cm'
    }
  ];

  // Sky blue paintings data
  const skyBluePaintings = [
    {
      id: 101,
      title: 'Sky Dream 1',
      artist: 'Artist Name',
      price: '₹500,000',
      image: sky1,
      category: 'Acrylic on Canvas',
      dimensions: '120 x 100 cm'
    },
    {
      id: 102,
      title: 'Sky Dream 2',
      artist: 'Artist Name',
      price: '₹450,000',
      image: sky2,
      category: 'Oil on Canvas',
      dimensions: '100 x 80 cm'
    },
    {
      id: 103,
      title: 'Sky Dream 3',
      artist: 'Artist Name',
      price: '₹550,000',
      image: sky3,
      category: 'Watercolor',
      dimensions: '90 x 120 cm'
    },
    {
      id: 104,
      title: 'Sky Dream 4',
      artist: 'Artist Name',
      price: '₹480,000',
      image: sky4,
      category: 'Mixed Media',
      dimensions: '110 x 90 cm'
    },
    {
      id: 105,
      title: 'Sky Dream 5',
      artist: 'Artist Name',
      price: '₹520,000',
      image: sky5,
      category: 'Oil on Canvas',
      dimensions: '100 x 100 cm'
    }
  ];

  // Famous artist editions data
  const famousArtistEditions = [
    {
      id: 201,
      title: 'Famous Edition 1',
      artist: 'Renowned Artist',
      price: '₹750,000',
      originalPrice: '₹950,000',
      discount: '-20%',
      image: diff1,
      category: 'Limited Edition',
      dimensions: '100 x 120 cm'
    },
    {
      id: 202,
      title: 'Famous Edition 2',
      artist: 'Renowned Artist',
      price: '₹680,000',
      originalPrice: '₹850,000',
      discount: '-20%',
      image: diff2,
      category: 'Limited Edition',
      dimensions: '90 x 110 cm'
    },
    {
      id: 203,
      title: 'Famous Edition 3',
      artist: 'Renowned Artist',
      price: '₹720,000',
      originalPrice: '₹900,000',
      discount: '-20%',
      image: diff3,
      category: 'Limited Edition',
      dimensions: '110 x 130 cm'
    },
    {
      id: 204,
      title: 'Famous Edition 4',
      artist: 'Renowned Artist',
      price: '₹760,000',
      originalPrice: '₹950,000',
      discount: '-20%',
      image: diff4,
      category: 'Limited Edition',
      dimensions: '100 x 120 cm'
    },
    {
      id: 205,
      title: 'Famous Edition 5',
      artist: 'Renowned Artist',
      price: '₹800,000',
      originalPrice: '₹999,000',
      discount: '-20%',
      image: diff5,
      category: 'Limited Edition',
      dimensions: '120 x 140 cm'
    }
  ];

  const categories = [
    { id: 1, name: 'Abstract', image: image9 },
    { id: 2, name: 'Landscapes', image: image12 },
    { id: 3, name: 'Portraits', image: image2 },
    { id: 4, name: 'Large paintings', image: image3 },
    { id: 5, name: 'Special deals', image: image4 },
    { id: 6, name: 'Best-selling artists', image: image5 },
    { id: 7, name: 'Famous artists', image: image6 },
    { id: 8, name: 'Just sold', image: image7 }
  ];

  const priceRanges = [
    { label: '₹50,000 and under', value: 'under-50k' },
    { label: '₹50,000 - ₹200,000', value: '50k-200k' },
    { label: '₹200,000 - ₹400,000', value: '200k-400k' },
    { label: '₹400,000 - ₹800,000', value: '400k-800k' },
    { label: '₹800,000 and up', value: 'above-800k' },
    { label: 'Special deals', value: 'special' }
  ];

  const collections = [
    { id: 1, name: 'Ink drawings', label: 'BY MOODS', image: image9 },
    { id: 2, name: 'Spring trend watch: pastels', label: 'BY COLORS', image: collectionImage7 },
    { id: 3, name: 'Spring trend watch: botanical works', label: 'BY MOODS', image: collectionImage6 },
    { id: 4, name: 'April Ensemble', label: 'BY MOODS', image: collectionImage5 },
    { id: 5, name: 'Mid-century', label: 'BY INTERIOR', image: collectionImage8 }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Featured Offers */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
          {/* Main Hero Banner */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative z-10 text-center text-white px-8">
                <h1 className="text-5xl md:text-6xl font-black mb-4">Buy art from the world's best artists</h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200"></p>
                
              </div>
            </div>
          </div>

          {/* Side Offers */}
          <div className="space-y-4">
            {/* Special Offer */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-red-50 to-red-100 p-6 md:p-8">
              <div className="text-xs font-bold text-red-600 mb-2 uppercase">SPECIAL OFFER</div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">30% off — limited-time sale</h3>
              <p className="text-sm text-gray-700 mb-6">This week only — discover a wide selection of artworks at reduced prices</p>
              <button className="text-red-600 font-bold text-sm hover:text-red-700 flex items-center gap-1">
                Shop the sale <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Famous Artists */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8">
              <div className="text-xs font-bold text-green-600 mb-2 uppercase">FAMOUS ARTISTS ON SINGULART</div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">Collect the icons: Matisse, Kahlo, Basquiat and more</h3>
              <p className="text-sm text-gray-700 mb-6">Elevate your collection with authentic editions by legendary artists</p>
              <button className="text-green-600 font-bold text-sm hover:text-green-700 flex items-center gap-1">
                View famous artists <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artworks for Sale by Category */}
      <div className="py-16 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Artworks for sale by category</h2>
            <p className="text-gray-600 text-lg">Whatever your taste, style, or mood, find original art you love in these popular categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition duration-300 h-96 md:h-[450px]"
              >
                <div className="relative w-full h-full">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition flex items-end justify-start p-4">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => onNavigate('all-artworks')} className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition">
              Explore all categories
            </button>
          </div>
        </div>
      </div>

      {/* Shop by Price */}
      <div className="bg-gray-50">
        <div className="py-8 md:py-12">
          <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-8">Shop artworks by price</h2>
        </div>
        <div className="overflow-hidden bg-gray-50">
          <div className="flex gap-2 animate-scroll px-0">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition flex-shrink-0"
              >
                {range.label}
              </button>
            ))}
            {priceRanges.map((range) => (
              <button
                key={`${range.value}-dup`}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition flex-shrink-0"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Art for sale we love</h2>
            <p className="text-gray-600 text-lg">The artworks our experts have their eye on right now</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-12 border-b-2 border-gray-200 pb-4">
            <button 
              onClick={() => setActiveTab('curator')}
              className={`font-bold pb-4 border-b-4 transition ${activeTab === 'curator' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
            >
              Curator picks
            </button>
            <button 
              onClick={() => setActiveTab('sky')}
              className={`font-bold pb-4 border-b-4 transition ${activeTab === 'sky' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
            >
              Sky blue paintings
            </button>
            <button 
              onClick={() => setActiveTab('famous')}
              className={`font-bold pb-4 border-b-4 transition ${activeTab === 'famous' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
            >
              Famous artist editions
            </button>
          </div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {(activeTab === 'curator' ? featuredArtworks : activeTab === 'sky' ? skyBluePaintings : famousArtistEditions).map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden mb-4 h-80 md:h-96 bg-gray-100">
                  <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                  <button
                    onClick={() => onAddToWishlist({ id: artwork.id, title: artwork.title, artist: artwork.artist, price: artwork.price, image: artwork.image })}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-md"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  {artwork.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {artwork.discount}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{artwork.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{artwork.artist}</p>
                <p className="text-xs text-gray-500 mb-3">{artwork.category} - {artwork.dimensions}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black text-gray-900">{artwork.price}</p>
                    {artwork.originalPrice && (
                      <p className="text-xs text-gray-500 line-through">{artwork.originalPrice}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart({ id: artwork.id, title: artwork.title, artist: artwork.artist, price: artwork.price, image: artwork.image, quantity: 1 })}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => onNavigate('all-artworks')} className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition">
              Explore all artworks
            </button>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="py-16 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center text-blue-600 mb-12">Shop art by category</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Painting', 'Photography', 'Print', 'Sculpture'].map((cat) => (
              <button key={cat} className="px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-full transition text-lg">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Featured collections</h2>
            <p className="text-gray-600 text-lg">Art just for you, curated by theme, style, movement or color</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 px-4 md:px-8 lg:px-12">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                whileHover={{ scale: 1.05 }}
                className="rounded-3xl overflow-hidden cursor-pointer shadow-xl h-96 md:h-[500px] lg:h-[480px] group relative"
              >
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-6">
                  <div className="text-white text-xs font-bold opacity-80">{collection.label}</div>
                  <h3 className="text-white font-bold text-xl">{collection.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition">
              Explore all collections
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⏩</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Free returns</h3>
              <p className="text-gray-600">Up to 30 days from delivery</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Express global shipping</h3>
              <p className="text-gray-600">Professional front-door delivery</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Excellent reviews</h3>
              <p className="text-gray-600">By artists and collectors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Secure payments</h3>
              <p className="text-gray-600">Credit card, bank transfer, or installments with PayPal 4x free-of-charge or other partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-black text-blue-600 mb-6 leading-tight">Discover and Sell Art Online with Singulart</h2>
            <p className="text-base md:text-lg text-gray-900 mb-4 leading-relaxed">
              At Singulart, we believe every space deserves art as unique as the people who inhabit it. As the leading online art gallery, we make it easy and joyful to buy art online or sell art online — connecting a global community of art collectors and contemporary artists.
            </p>
            <p className="text-base md:text-lg text-gray-900 mb-6 leading-relaxed">
              Whether you're discovering your first piece of art for sale or offering your latest creation, we bring art lovers and artists together through thoughtful curation, powerful tools, and trusted global support.
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <p className="font-bold text-gray-900 mb-2 text-lg">For clients</p>
                <p className="text-gray-700 text-sm md:text-base">We offer expert guidance and personalised recommendations to help you find original art for sale that reflects your style, space, and story.</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2 text-lg">For artists</p>
                <p className="text-gray-700 text-sm md:text-base">We provide everything you need to sell art online with confidence—international exposure, marketing support, and the freedom to focus on creating.</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-blue-600 font-bold mb-8 leading-relaxed">
              Join Singulart and become part of a diverse and creative community—where art is more than decoration, it's self-expression.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('all-artworks')} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition transform hover:scale-105">
                Explore art
              </button>
              <button className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition transform hover:scale-105">
                Sell Your Art
              </button>
            </div>
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={kudiImage} alt="Artist showcasing art" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-blue-600 mb-4">Sign up and get 10% off your first order</h3>
            <p className="text-gray-600 mb-6 text-lg">Fresh arrivals, curator picks, exclusive features.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition inline-flex items-center justify-center gap-2">
                Get 10% off now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <img src={sideImage} alt="Newsletter" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
