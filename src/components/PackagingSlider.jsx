import React, { useState, useEffect } from 'react';
import '../styles/packaging-slider.css';

const PackagingSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const packagingSteps = [
    {
      id: 1,
      step: 'Step 1',
      title: 'Quality Inspection & Wrapping',
      description:
        'Our skilled team carefully inspects your precious artwork and begins the wrapping process with premium protective materials. Each layer is applied with meticulous care to ensure maximum protection during transit.',
      image: new URL('../Screenshot from 2026-03-16 11-23-42.png', import.meta.url).href,
      highlights: ['Detailed Inspection', 'Premium Materials', 'Protective Layers'],
    },
    {
      id: 2,
      step: 'Step 2',
      title: 'Ribbon & Presentation',
      description:
        'An elegant silk ribbon is carefully tied around the wrapped artwork, adding a luxurious touch. Every detail is considered to make your unboxing experience truly special and memorable.',
      image: new URL('../Screenshot from 2026-03-16 11-23-54.png', import.meta.url).href,
      highlights: ['Premium Silk Ribbon', 'Elegant Bow', 'Custom Branding'],
    },
    {
      id: 3,
      step: 'Step 3',
      title: 'Box Packaging',
      description:
        'Your beautifully wrapped artwork is placed into our custom-designed premium box. The box is lined with foam padding and cushioning materials to provide extra protection during delivery.',
      image: new URL('../Screenshot from 2026-03-16 11-24-06.png', import.meta.url).href,
      highlights: ['Custom Box', 'Foam Padding', 'Inner Cushioning'],
    },
    {
      id: 4,
      step: 'Step 4',
      title: 'Final Seal & Ready',
      description:
        'The package is sealed with our signature seal and labeled with all necessary shipping information and care instructions. Your artwork is now ready for its safe journey to your doorstep!',
      image: new URL('../Screenshot from 2026-03-16 11-24-20.png', import.meta.url).href,
      highlights: ['Signature Seal', 'Shipping Label', 'Care Instructions'],
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % packagingSteps.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, packagingSteps.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % packagingSteps.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + packagingSteps.length) % packagingSteps.length);
    setIsAutoPlay(false);
  };

  const currentStep = packagingSteps[currentSlide];

  return (
    <section className="packaging-slider-section">
      <div className="packaging-header">
        <h2 className="packaging-title">Packaging Process</h2>
        <p className="packaging-subtitle">Every Detail Matters</p>
      </div>

      <div className="packaging-timeline">
        {packagingSteps.map((step, index) => (
          <div
            key={step.id}
            className={`timeline-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="timeline-number">{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="packaging-container">
        <div className="packaging-content">
          {/* Image Section */}
          <div className="packaging-image-section">
            <div className="image-wrapper">
              <img
                src={currentStep.image}
                alt={currentStep.title}
                className="packaging-image"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="packaging-details-section">
            <div className="step-badge">{currentStep.step}</div>

            <h3 className="packaging-step-title">{currentStep.title}</h3>

            <p className="packaging-step-description">
              {currentStep.description}
            </p>

            <div className="highlights-list">
              <h4 className="highlights-title">Key Points:</h4>
              <ul className="highlights-items">
                {currentStep.highlights.map((highlight, idx) => (
                  <li key={idx} className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span className="highlight-text">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="packaging-navigation">
          <button
            className="pkg-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous step"
          >
            ←
          </button>

          <span className="step-counter">
            {currentSlide + 1} / {packagingSteps.length}
          </span>

          <button
            className="pkg-nav-btn next"
            onClick={handleNext}
            aria-label="Next step"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackagingSlider;
