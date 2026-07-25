import React, { useState, useEffect } from 'react';
import '../styles/celebration-slider.css';
import greenTickGif from '../assets/Orders-images/greentick.gif';
import celebrateImg from '../assets/Orders-images/celebrate.jpg';
import congratsImg from '../assets/Orders-images/congracts.jpg';
import wrappingImg from '../assets/Orders-images/wrapping.jpg';

const CelebrationSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: 'Order Placed!',
      description: 'Your exquisite artwork order has been confirmed and received. Thank you for choosing Ziguurats Company!',
      image: greenTickGif,
      isGif: true,
      icon: '✓',
      color: '#4CAF50',
    },
    {
      id: 2,
      description: 'The joy of your purchase brings happiness to our entire creative team. Your artwork journey is beginning!',
      image: celebrateImg,
      icon: '🎉',
      color: '#FF6B6B',
    },
    {
      id: 3,
      title: 'Congratulations!',
      description: 'We celebrate with you! Your investment in art is a beautiful choice that will bring joy for years to come.',
      image: congratsImg,
      icon: '🏆',
      color: '#FFD700',
    },
    {
      id: 4,
      title: 'Wrapping with Love',
      description: 'Your precious artwork is being carefully wrapped with premium materials and silk ribbons for safe delivery.',
      image: wrappingImg,
      icon: '🎁',
      color: '#FF69B4',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="celebration-slider-section">
      <div className="celebration-content">
        <div className="icon-badge" style={{ borderColor: slide.color }}>
          <span className="icon-emoji">{slide.icon}</span>
        </div>

        <div className={`slide-image-container ${slide.isGif ? 'gif-container' : ''}`}>
          <img
            src={slide.image}
            alt={slide.title}
            className={slide.isGif ? 'celebration-gif' : 'celebration-image'}
          />
          {!slide.isGif && <div className="image-overlay"></div>}
        </div>

        <div className="text-content">
          <h2 className="slide-title" style={{ color: slide.color }}>
            {slide.title}
          </h2>
          <p className="slide-description">{slide.description}</p>
        </div>
      </div>

      <div className="celebration-navigation">
        <button
          className="nav-btn-celebration prev-btn"
          onClick={handlePrev}
          aria-label="Previous"
        >
          ←
        </button>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        <button
          className="nav-btn-celebration next-btn"
          onClick={handleNext}
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div className="slide-dots-celebration">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            style={{
              backgroundColor: index === currentSlide ? slide.color : '#ddd',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CelebrationSlider;
