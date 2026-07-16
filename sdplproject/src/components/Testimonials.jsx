import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import '../styles/testimonials.css';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const clientReviews = [
    {
      quote: "SDPL transformed our dream home into reality. The quality of construction and attention to detail is outstanding. We couldn't be happier!",
      name: "Rajesh Kumar",
      location: "Bhubaneswar"
    },
    {
      quote: "Professional team, transparent process and on-time delivery. SDPL made the entire construction journey smooth and stress-free.",
      name: "Priya Mohanty",
      location: "Cuttack"
    },
    {
      quote: "Excellent workmanship and premium quality materials. Our villa is beyond beautiful. Highly recommend SDPL to everyone!",
      name: "Amit Sahoo",
      location: "Puri"
    },
    {
      quote: "Exceptional commercial project delivery. Their engineer tracking updates kept our core board members aligned perfectly throughout.",
      name: "Sanjay Das",
      location: "Bhubaneswar"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % clientReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + clientReviews.length) % clientReviews.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, isPaused]);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2>What <span>Our Clients</span> Say</h2>
          <p className="section-desc">
            Real stories from real people who trusted SDPL to build their dream spaces.
          </p>
        </div>

        <div
          className="carousel-viewport-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-arrow arrow-left" onClick={handlePrev} aria-label="Previous review">
            <FaChevronLeft />
          </button>
          <button className="carousel-arrow arrow-right" onClick={handleNext} aria-label="Next review">
            <FaChevronRight />
          </button>

          <div className="testimonials-carousel-track">
            {clientReviews.map((review, index) => {
              let positionClass = "slide-next";
              if (index === activeIndex) {
                positionClass = "slide-active";
              } else if (index === (activeIndex - 1 + clientReviews.length) % clientReviews.length) {
                positionClass = "slide-prev";
              }

              return (
                <div key={index} className={`testimonial-card-slide ${positionClass}`}>
                  <div className="quote-icon-box">
                    <FaQuoteLeft />
                  </div>
                  <p className="review-text">{review.quote}</p>
                  <div className="accent-line"></div>
                  <div className="client-profile-row">
                    <div className="client-avatar-icon">
                      <FaUser />
                    </div>
                    <div className="client-meta">
                      <h4>{review.name}</h4>
                      <span className="client-loc">
                        <FaMapMarkerAlt className="pin-icon" /> {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="slider-dots-row">
          {clientReviews.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${activeIndex === index ? 'dot-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}