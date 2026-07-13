import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/testimonials.css';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const clientReviews = [
    {
      quote: "SDPL transformed our dream home into reality. The quality of construction and attention to detail is outstanding. We couldn't be happier!",
      name: "Rajesh Kumar",
      location: "Bhubaneswar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Professional team, transparent process and on-time delivery. SDPL made the entire construction journey smooth and stress-free.",
      name: "Priya Mohanty",
      location: "Cuttack",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Excellent workmanship and premium quality materials. Our villa is beyond beautiful. Highly recommend SDPL to everyone!",
      name: "Amit Sahoo",
      location: "Puri",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Exceptional commercial project delivery. Their engineer tracking updates kept our core board members aligned perfectly throughout.",
      name: "Sanjay Das",
      location: "Rourkela",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    }
  ];

  // Logic to handle next slide transition
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % clientReviews.length);
  };

  // Logic to handle previous slide transition
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + clientReviews.length) % clientReviews.length);
  };

  // Autoplay Effect Loop with custom cursor detection
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 4000); // 🔄 Moves automatically every 4 seconds
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

        {/* Header Block */}
        <div className="testimonials-header">
          <span className="section-subtitle">TESTIMONIALS</span>
          <h2>What <span>Our Clients</span> Say</h2>
          <p className="section-desc">
            Real stories from real people who trusted SDPL to build their dream spaces.
          </p>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div
          className="carousel-viewport-wrapper"
          onMouseEnter={() => setIsPaused(true)}  // 🛑 Stops timer when cursor rolls in
          onMouseLeave={() => setIsPaused(false)} // ▶️ Resumes timer when cursor rolls out
        >
          {/* Arrow Controllers */}
          <button className="carousel-arrow arrow-left" onClick={handlePrev} aria-label="Previous review">
            <FaChevronLeft />
          </button>
          <button className="carousel-arrow arrow-right" onClick={handleNext} aria-label="Next review">
            <FaChevronRight />
          </button>

          {/* Testimonials Slider Inner Track */}
          <div className="testimonials-carousel-track">
            {clientReviews.map((review, index) => {
              // Calculate relative slide position offsets
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
                    <img src={review.avatar} alt={review.name} className="client-avatar" />
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

        {/* Interactive Indicator Navigation Dots */}
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