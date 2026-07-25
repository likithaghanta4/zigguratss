import React, { useState, useEffect } from 'react';
import '../styles/dispatch-slider.css';

const DispatchSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const dispatchSteps = [
    {
      id: 1,
      step: 'Stage 1',
      title: 'Warehouse Preparation',
      description:
        'Your package is brought to our dispatch center where it is scanned, verified, and prepared for handover to the logistics partner.',
      image: new URL('../Screenshot from 2026-03-16 12-11-03.png', import.meta.url).href,
      details: ['Package Verification', 'Barcode Scanning', 'Logistics Assignment'],
    },
    {
      id: 2,
      step: 'Stage 2',
      title: 'Carrier Pickup',
      description:
        'Our trusted logistics partner arrives at the warehouse and carefully collects your package for the journey to your doorstep.',
      image: new URL('../Screenshot from 2026-03-16 12-11-12.png', import.meta.url).href,
      details: ['Logistics Handover', 'Safety Check', 'Documentation'],
    },
    {
      id: 3,
      step: 'Stage 3',
      title: 'Sorting & Routing',
      description:
        'Your package arrives at the distribution center where it is sorted and routed based on your delivery address for optimal delivery timing.',
      image: new URL('../Screenshot from 2026-03-16 12-11-19.png', import.meta.url).href,
      details: ['Address Sorting', 'Route Planning', 'Hub Processing'],
    },
    {
      id: 4,
      step: 'Stage 4',
      title: 'Regional Distribution',
      description:
        'Your package is transported through our regional distribution network, getting closer to your location with each step.',
      image: new URL('../Screenshot from 2026-03-16 12-11-28.png', import.meta.url).href,
      details: ['Regional Hub Transfer', 'Vehicle Loading', 'Transit Tracking'],
    },
    {
      id: 5,
      step: 'Stage 5',
      title: 'Ready for Delivery',
      description:
        'Your package has reached the local delivery station and is now ready to be dispatched to your address today!',
      image: new URL('../Screenshot from 2026-03-16 12-11-34.png', import.meta.url).href,
      details: ['Local Hub Arrival', 'Delivery Assignment', 'Final Verification'],
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dispatchSteps.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, dispatchSteps.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % dispatchSteps.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + dispatchSteps.length) % dispatchSteps.length);
    setIsAutoPlay(false);
  };

  const currentDispatch = dispatchSteps[currentSlide];

  return (
    <section className="dispatch-slider-section">
      <div className="dispatch-header">
        <h2 className="dispatch-title">Dispatch Process</h2>
        <p className="dispatch-subtitle">On Its Way to You</p>
      </div>

      <div className="dispatch-progress-track">
        {dispatchSteps.map((step, index) => (
          <div key={step.id} className="progress-step">
            <div
              className={`progress-circle ${index <= currentSlide ? 'completed' : ''} ${
                index === currentSlide ? 'current' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="step-number">{index + 1}</span>
              {index < currentSlide && <span className="step-checkmark">✓</span>}
            </div>
            {index < dispatchSteps.length - 1 && (
              <div
                className={`progress-line ${index < currentSlide ? 'completed' : ''}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="dispatch-container">
        <div className="dispatch-content">
          {/* Image */}
          <div className="dispatch-image-wrapper">
            <div className="dispatch-image-frame">
              <img
                src={currentDispatch.image}
                alt={currentDispatch.title}
                className="dispatch-image"
              />
            </div>
          </div>

          {/* Details */}
          <div className="dispatch-info">
            <div className="dispatch-stage-badge">{currentDispatch.step}</div>
            <h3 className="dispatch-step-title">{currentDispatch.title}</h3>
            <p className="dispatch-description">{currentDispatch.description}</p>

            <div className="dispatch-details-box">
              <h4 className="details-heading">What Happens Now:</h4>
              <ul className="dispatch-list">
                {currentDispatch.details.map((detail, idx) => (
                  <li key={idx} className="dispatch-list-item">
                    <span className="list-icon">→</span>
                    <span className="list-text">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="dispatch-controls">
          <button
            className="dispatch-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous stage"
          >
            ←
          </button>
          <span className="stage-label">Stage {currentSlide + 1} of {dispatchSteps.length}</span>
          <button
            className="dispatch-btn next-btn"
            onClick={handleNext}
            aria-label="Next stage"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DispatchSlider;
