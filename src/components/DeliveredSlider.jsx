import React, { useState, useEffect } from 'react';
import '../styles/delivered-slider.css';

const DeliveredSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const deliveryProcess = [
    {
      id: 1,
      milestone: 'Delivery',
      title: 'Package Received',
      description:
        'Your artwork has arrived! The delivery agent is handing over your precious package at the doorstep. Please accept and verify the package condition.',
      image: new URL('../Screenshot from 2026-03-16 14-00-48.png', import.meta.url).href,
      animation: 'bounce',
    },
    {
      id: 2,
      milestone: 'Unboxing',
      title: 'Unwrapping the Joy',
      description:
        'Carefully unbox your artwork and discover the beautiful packaging inside. The protective layers ensure your piece arrived in perfect condition.',
      image: new URL('../Screenshot from 2026-03-16 14-01-02.png', import.meta.url).href,
      animation: 'slideIn',
    },
    {
      id: 3,
      milestone: 'Inspection',
      title: 'Quality Verification',
      description:
        'Check your artwork carefully to ensure it matches the description and is in perfect condition. Your masterpiece is now ready for display.',
      image: new URL('../Screenshot from 2026-03-16 14-01-07.png', import.meta.url).href,
      animation: 'scaleIn',
    },
    {
      id: 4,
      milestone: 'Placement',
      title: 'Finding the Perfect Spot',
      description:
        'Choose the ideal location in your home to display your artwork. Whether on a shelf, wall, or as a centerpiece, let it shine and captivate everyone.',
      image: new URL('../Screenshot from 2026-03-16 14-01-16.png', import.meta.url).href,
      animation: 'fadeIn',
    },
    {
      id: 5,
      milestone: 'Celebration',
      title: 'Celebration & Admiration',
      description:
        'Your guests are amazed by your exquisite choice! The artwork becomes the centerpiece of conversation and admiration. Your investment in beauty has paid off beautifully!',
      image: new URL('../Screenshot from 2026-03-16 14-01-22.png', import.meta.url).href,
      animation: 'celebrate',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deliveryProcess.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, deliveryProcess.length]);

  const handleNext = () => {
    const newSlide = (currentSlide + 1) % deliveryProcess.length;
    setCurrentSlide(newSlide);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + deliveryProcess.length) % deliveryProcess.length);
    setIsAutoPlay(false);
  };

  const current = deliveryProcess[currentSlide];

  return (
    <section className="delivered-section">
      <div className="delivered-header">
        <h2 className="delivered-title">Delivered with Joy</h2>
        <p className="delivered-subtitle">Your Artwork Completes Your Home</p>
      </div>

      <div className="delivered-journey-track">
        {deliveryProcess.map((step, index) => (
          <button
            key={step.id}
            className={`journey-node ${index <= currentSlide ? 'completed' : ''} ${
              index === currentSlide ? 'current' : ''
            }`}
            onClick={() => setCurrentSlide(index)}
            title={step.milestone}
          >
            <span className="node-icon">{step.icon}</span>
            <span className="node-label">{step.milestone}</span>
          </button>
        ))}
      </div>

      <div className="delivered-container">
        <div className="delivered-content">
          {/* Image */}
          <div className="delivered-image-wrapper">
            <div className="delivered-image-frame">
              <img
                src={current.image}
                alt={current.title}
                className="delivered-image"
              />
              <div className="frame-glow"></div>
            </div>
          </div>

          {/* Details */}
          <div className="delivered-details">
            <div className="milestone-badge">{current.milestone}</div>

            <h3 className="delivered-step-title">{current.title}</h3>

            <p className="delivered-step-description">{current.description}</p>

            <div className="delivered-success-box">
              <h4 className="success-heading">✓ Delivery Complete</h4>
              <ul className="success-items">
                <li className="success-item">Package securely delivered</li>
                <li className="success-item">Quality verified</li>
                <li className="success-item">Artwork in perfect condition</li>
                <li className="success-item">Your home is enriched with beauty</li>
              </ul>
            </div>

            {currentSlide === 4 && (
              <div className="thank-you-message">
                <p>
                  Thank you for choosing <strong>Ziguurats Company</strong>. Your artwork
                  will bring joy and elegance to your space for years to come. We hope you
                  enjoy this masterpiece!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="delivered-nav">
          <button
            className="delivered-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous milestone"
          >
            ←
          </button>

          <div className="milestone-progress">
            <div className="progress-steps">
              {deliveryProcess.map((_, index) => (
                <div
                  key={index}
                  className={`step-dot ${index <= currentSlide ? 'completed' : ''}`}
                ></div>
              ))}
            </div>
          </div>

          <button
            className="delivered-nav-btn next"
            onClick={handleNext}
            aria-label="Next milestone"
          >
            →
          </button>
        </div>

        <div className="milestone-counter">
          Milestone {currentSlide + 1} / {deliveryProcess.length}
        </div>
      </div>
    </section>
  );
};

export default DeliveredSlider;
