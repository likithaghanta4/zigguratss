import React, { useState, useEffect } from 'react';
import '../styles/out-for-delivery-slider.css';

const OutForDeliverySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [routeAnimation, setRouteAnimation] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const deliverySteps = [
    {
      id: 1,
      phase: 'Phase 1',
      title: 'Loaded for Delivery',
      description:
        'Your package has been loaded onto the delivery van along with other parcels destined for your area. The delivery route is being optimized for efficiency.',
      image: new URL('../Screenshot from 2026-03-16 13-50-54.png', import.meta.url).href,
      eta: 'Starting delivery route',
    },
    {
      id: 2,
      phase: 'Phase 2',
      title: 'On the Route',
      description:
        'Your delivery vehicle is traveling through the city, making stops to deliver packages to customers. Your package is safely secured in the van.',
      image: new URL('../Screenshot from 2026-03-16 13-51-13.png', import.meta.url).href,
      eta: 'Approaching your area',
    },
    {
      id: 3,
      phase: 'Phase 3',
      title: 'Getting Closer',
      description:
        'The delivery vehicle is now in your neighborhood and approaching your address. The driver has your package ready for delivery.',
      image: new URL('../Screenshot from 2026-03-16 13-51-23.png', import.meta.url).href,
      eta: 'Next in delivery queue',
    },
    {
      id: 4,
      phase: 'Phase 4',
      title: 'At Your Location',
      description:
        'The delivery van has arrived at your address. The driver is carefully extracting your package and preparing it for hand-over to you.',
      image: new URL('../Screenshot from 2026-03-16 13-51-37.png', import.meta.url).href,
      eta: 'Driver approaching',
    },
    {
      id: 5,
      phase: 'Phase 5',
      title: 'Ready for Handover',
      description:
        'The delivery agent is at your doorstep with your precious artwork. Please be ready to receive and sign for your package.',
      image: new URL('../Screenshot from 2026-03-16 13-51-47.png', import.meta.url).href,
      eta: 'Awaiting your confirmation',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deliverySteps.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, deliverySteps.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % deliverySteps.length);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + deliverySteps.length) % deliverySteps.length);
    setIsAutoPlay(false);
  };

  const current = deliverySteps[currentSlide];

  return (
    <section className="out-delivery-section">
      <div className="delivery-header">
        <h2 className="delivery-title">Out for Delivery</h2>
        <p className="delivery-subtitle">Almost At Your Doorstep</p>
      </div>

      {/* Animated Route Map */}
      <div className="delivery-map-container">
        <div className={`delivery-map ${routeAnimation ? 'animate' : ''}`}>
          <div className="map-vehicle">
            <span className="vehicle-icon">🚐</span>
          </div>
          <div className="map-route"></div>
          <div className="map-destination">
            <span className="destination-icon">🏠</span>
          </div>
        </div>
      </div>

      <div className="delivery-container">
        <div className="delivery-phase-track">
          {deliverySteps.map((step, index) => (
            <button
              key={step.id}
              className={`phase-marker ${index <= currentSlide ? 'completed' : ''} ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
              title={step.title}
            >
              <span className="marker-number">{index + 1}</span>
            </button>
          ))}
        </div>

        <div className="delivery-content-wrapper">
          {/* Image */}
          <div className="delivery-image-section">
            <div className="delivery-image-box">
              <img
                src={current.image}
                alt={current.title}
                className="delivery-image"
              />
            </div>
          </div>

          {/* Information */}
          <div className="delivery-info-section">
            <div className="phase-label">{current.phase}</div>

            <h3 className="delivery-step-title">{current.title}</h3>

            <p className="delivery-step-description">{current.description}</p>

            <div className="eta-box">
              <span className="eta-label">Status:</span>
              <span className="eta-value">{current.eta}</span>
            </div>

            <div className="delivery-progress-bar">
              <div
                className="progress-indicator"
                style={{
                  width: `${((currentSlide + 1) / deliverySteps.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="delivery-checklist">
              <h4 className="checklist-title">Delivery Checklist:</h4>
              <ul className="checklist-items">
                <li className="checklist-item completed">
                  <span className="check-icon">✓</span>
                  <span>Order Confirmed</span>
                </li>
                <li className="checklist-item completed">
                  <span className="check-icon">✓</span>
                  <span>Packed & Ready</span>
                </li>
                <li className={`checklist-item ${currentSlide >= 2 ? 'completed' : ''}`}>
                  <span className="check-icon">✓</span>
                  <span>Dispatched</span>
                </li>
                <li className={`checklist-item ${currentSlide >= 4 ? 'completed' : 'active'}`}>
                  <span className="check-icon">→</span>
                  <span>Out for Delivery</span>
                </li>
                <li className={`checklist-item ${currentSlide >= 5 ? 'completed' : ''}`}>
                  <span className="check-icon">✓</span>
                  <span>Delivered</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="delivery-navigation">
          <button
            className="delivery-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous phase"
          >
            ←
          </button>

          <span className="phase-counter">
            Phase {currentSlide + 1} / {deliverySteps.length}
          </span>

          <button
            className="delivery-nav-btn next"
            onClick={handleNext}
            aria-label="Next phase"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default OutForDeliverySlider;
