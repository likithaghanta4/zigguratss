import React, { useState, useEffect } from 'react';
import '../styles/artworks-slider.css';

const ArtworksSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const artworks = [
    {
      id: 1,
      title: 'Ancient Ziggurat',
      description: 'A magnificent ancient ziggurat sculpture crafted with meticulous detail. This extraordinary piece represents the architectural grandeur of ancient civilizations, standing as a testament to human ingenuity and artistic excellence.',
      image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$2,450',
    },
    {
      id: 2,
      title: 'Modern Sculpture',
      description: 'A contemporary sculpture blending abstract forms with classical inspiration. This piece captures the essence of modern artistic expression while honoring traditional sculptural techniques.',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$3,200',
    },
    {
      id: 3,
      title: 'Ethereal Tower',
      description: 'An enchanting tower sculpture that seems to defy gravity. With its elegant proportions and refined details, this artwork brings a sense of wonder and sophistication to any space.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$2,890',
    },
    {
      id: 4,
      title: 'Geometric Harmony',
      description: 'A stunning geometric composition that harmonizes form and space. This sculpture explores the interplay between light and shadow, creating a dynamic visual experience.',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$3,100',
    },
    {
      id: 5,
      title: 'Legacy Stone',
      description: 'An imposing stone sculpture that carries the weight of history and tradition. Its bold design and masterful execution make it a centerpiece worthy of any distinguished collection.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$4,150',
    },
    {
      id: 6,
      title: 'Crystal Abstraction',
      description: 'A breathtaking abstract sculpture featuring crystalline forms that refract light in mesmerizing ways. This piece represents the marriage of natural beauty and artistic vision.',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$3,750',
    },
    {
      id: 7,
      title: 'Monumental Presence',
      description: 'A powerful monumental sculpture that commands attention and admiration. Created with bold strokes and dramatic proportions, it symbolizes strength and permanence.',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$5,200',
    },
    {
      id: 8,
      title: 'Fluid Dynamics',
      description: 'A mesmerizing sculpture capturing the essence of movement and flow. Its sinuous curves and graceful lines create an impression of eternal motion frozen in time.',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$3,600',
    },
    {
      id: 9,
      title: 'Architectural Vision',
      description: 'A stunning architectural sculpture that blends modernist design with timeless elegance. This piece serves as both a visual focal point and a philosophical statement.',
      image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$4,500',
    },
    {
      id: 10,
      title: 'Essence of Nature',
      description: 'An organic sculpture inspired by natural forms and patterns. This artwork celebrates the inherent beauty found in nature through refined sculptural interpretation.',
      image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2000',
      artist: 'Ziguurats Company Artistry',
      price: '$3,950',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artworks.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, artworks.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % artworks.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + artworks.length) % artworks.length);
    setIsAutoPlay(false);
  };

  const artwork = artworks[currentSlide];

  return (
    <section className="artworks-slider-section">
      <div className="section-header">
        <h1 className="section-title">Your Exquisite Artwork Selection</h1>
        <p className="section-subtitle">from Ziguurats Company</p>
      </div>

      <div className="slider-container">
        <div className="slider-content">
          {/* Image Section - Left */}
          <div className="slider-image-wrapper">
            <div className="image-frame">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="artwork-image"
              />
              <div className="frame-border"></div>
            </div>
          </div>

          {/* Details Section - Right */}
          <div className="slider-details-wrapper">
            <div className="details-content">
              <div className="artwork-title-section">
                <h2 className="artwork-title">{artwork.title}</h2>
                <p className="artwork-artist">{artwork.artist}</p>
              </div>

              <div className="artwork-description">
                <p>{artwork.description}</p>
              </div>

              <div className="artwork-price">
                <span className="price-label">Investment</span>
                <span className="price-value">{artwork.price}</span>
              </div>

              <div className="artwork-specs">
                <div className="spec-item">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">Premium Stone & Resin</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Dimensions</span>
                  <span className="spec-value">H: 45cm × W: 35cm × D: 25cm</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Edition</span>
                  <span className="spec-value">Limited Edition {artwork.id}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - ONLY Indicators */}
        <div className="slider-navigation">
          <div className="slide-indicators">
            {artworks.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="slide-counter">
          {currentSlide + 1} / {artworks.length}
        </div>
      </div>
    </section>
  );
};

export default ArtworksSlider;
