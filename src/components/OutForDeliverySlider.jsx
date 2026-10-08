import React, { useState, useEffect } from 'react';
import '../styles/out-for-delivery-slider.css';
import FlightRadarMap from './FlightRadarMap';

const OutForDeliverySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [routeAnimation, setRouteAnimation] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentDestination, setCurrentDestination] = useState(null);

  const deliverySteps = [
    {
      id: 1,
      phase: 'Phase 1',
      title: 'Loaded on Air Cargo',
      description:
        'Your master artwork is securely placed in the pressurized, climate-controlled cabin of our dedicated air freight carrier, verified for direct flight to your state.',
      image: new URL('../Screenshot from 2026-03-16 13-50-54.png', import.meta.url).href,
      eta: 'Air Cargo Departure Ready',
    },
    {
      id: 2,
      phase: 'Phase 2',
      title: 'In Flight Transit',
      description:
        'The aeroplane is currently airborne, cruising at 34,000 feet directly towards your destination (e.g. Tamil Nadu / Regional Art Hub) with live satellite radar telemetry.',
      image: new URL('../Screenshot from 2026-03-16 13-51-13.png', import.meta.url).href,
      eta: 'Cruising to Your State',
    },
    {
      id: 3,
      phase: 'Phase 3',
      title: 'Air Terminal Arrival',
      description:
        'The flight has touched down at the regional art terminal. Our specialized courier team is receiving your artwork with white-glove handling.',
      image: new URL('../Screenshot from 2026-03-16 13-51-23.png', import.meta.url).href,
      eta: 'Arrived at Destination Airport',
    },
    {
      id: 4,
      phase: 'Phase 4',
      title: 'Dispatched to Address',
      description:
        'Your artwork is in the final delivery vehicle traveling from the airport directly to your street address with scheduled appointment tracking.',
      image: new URL('../Screenshot from 2026-03-16 13-51-37.png', import.meta.url).href,
      eta: 'Approaching Your Doorstep',
    },
    {
      id: 5,
      phase: 'Phase 5',
      title: 'Ready for Handover',
      description:
        'The delivery agent is at your doorstep with your authenticated artwork and Certificate of Provenance. Please be ready to receive and sign.',
      image: new URL('../Screenshot from 2026-03-16 13-51-47.png', import.meta.url).href,
      eta: 'Awaiting Your Signature',
    },
  ];

  // Auto-play functionality with extended duration for Step 3
  useEffect(() => {
    if (!isAutoPlay) return;

    // Step 3 (index 2: Air Terminal / Transit) gets extended 10,000ms duration
    const slideDuration = currentSlide === 2 ? 10000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % deliverySteps.length);
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentSlide, deliverySteps.length]);

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
        <h2 className="delivery-title">Worldwide Air Cargo Delivery</h2>
        <p className="delivery-subtitle">Live Global Flight Radar & Worldwide Delivery Circuit</p>
      </div>

      {/* Visible Global Flight Radar Map */}
      <div className="w-full max-w-5xl mb-10 px-2 sm:px-4">
        <FlightRadarMap />
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
