import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactInfo.css';

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const mapRef = useRef(null);
  const callBoxRef = useRef(null);
  const locationEmojiRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !callBoxRef.current) return;

    gsap.fromTo(
      mapRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      callBoxRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: callBoxRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  const handleLocationClick = () => {
    setShowMap(true);
  };

  return (
    <div className="contact-info-wrapper">
      <div className="contact-card" ref={callBoxRef}>
        <div className="contact-copy">
          <p className="contact-eyebrow">Contact</p>
          <h2>Visit or reach out to the Zigguratss team</h2>
          <p className="contact-lead">
            Tap the location card below to open the map, or use the contact details for a quick response.
          </p>
        </div>

        <div className="map-section" ref={mapRef}>
          {!showMap ? (
            <div className="location-preview" onClick={handleLocationClick}>
              <div className="location-icon-wrapper">
                <span className="location-emoji" ref={locationEmojiRef}>📍</span>
                <div className="location-pulse"></div>
              </div>
              <h3>Our Location</h3>
              <p>New Delhi, India</p>
              <p className="click-hint">Click to view map</p>
            </div>
          ) : (
            <div className="map-iframe-container">
              <iframe
                title="Zigguratss Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.48596292737!2d77.04417!3d28.52758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1644000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;         