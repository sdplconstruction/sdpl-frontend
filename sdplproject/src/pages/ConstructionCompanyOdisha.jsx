import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/construction-company.css";

import {
  FaBuilding,
  FaHome,
  FaCity,
  FaHardHat,
  FaCheckCircle,
  FaArrowRight,
  FaPhoneAlt,
  FaUsers,
  FaAward,
  FaStar,
} from "react-icons/fa";

const ConstructionCompanyOdisha = () => {
  return (
    <>
      {/* =======================================================
          HERO SECTION (Centered, No Right Card)
      ======================================================== */}
      <section className="sdpl-hero-section">
        <div className="sdpl-container sdpl-hero-wrapper">
          <div className="sdpl-hero-content">
            <span className="sdpl-hero-badge">
              <span className="sdpl-badge-dot"></span> SDPL CONSTRUCTIONS • ODISHA
            </span>

            <h1>
              Best Construction <br />
              <span className="sdpl-text-highlight">Company in Odisha</span>
            </h1>

            <p>
              <strong>SDPL Constructions</strong> is a trusted construction
              company in Odisha delivering high-quality residential, commercial,
              civil, and building construction solutions. With a focus on
              innovation, quality workmanship, and timely project delivery, we
              create strong and sustainable structures.
            </p>

            <div className="sdpl-hero-buttons">
              <Link to="/contact-us" className="sdpl-btn-primary">
                Get Free Consultation
                <FaArrowRight />
              </Link>

              <a href="tel:+919439467820" className="sdpl-btn-secondary">
                <FaPhoneAlt />
                +91 94394 67820
              </a>
            </div>

            <div className="sdpl-hero-rating">
              <div className="sdpl-rating-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

             
            </div>
          </div>
        </div>

        {/* ==================== HERO STATS BAR ==================== */}
        <div className="sdpl-stats-container">
          <div className="sdpl-stats-grid">
            <div className="sdpl-stat-card">
              <FaBuilding />
              <div>
                <h3>150+</h3>
                <p>Projects Completed</p>
              </div>
            </div>

            <div className="sdpl-stat-card">
              <FaAward />
              <div>
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="sdpl-stat-card">
              <FaUsers />
              <div>
                <h3>300+</h3>
                <p>Happy Clients</p>
              </div>
            </div>

            <div className="sdpl-stat-card">
              <FaCheckCircle />
              <div>
                <h3>98%</h3>
                <p>On Time Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          MAIN CONTENT
      ======================================================== */}
      <main className="sdpl-main-wrapper">
        <div className="sdpl-container">
          {/* OVERVIEW */}
          <section className="sdpl-overview-box">
            <div className="sdpl-section-heading">
              <span>WHY CHOOSE SDPL</span>
              <h2>Leading Construction Company in Odisha</h2>
            </div>

            <p>
              Choosing the right construction partner is essential for building
              a safe and long-lasting structure. As one of the reliable builders
              in Odisha, SDPL Constructions provides complete construction
              solutions, from project planning and execution to final completion.
            </p>
            <p>
              Our experienced team ensures every project is completed with
              precision, safety, and attention to detail.
            </p>
          </section>

          {/* SERVICES */}
          <section className="sdpl-services-section">
            <div className="sdpl-section-heading">
              <span>OUR EXPERTISE</span>
              <h2>Our Construction Services in Odisha</h2>
            </div>

            <div className="sdpl-services-grid">
              <div className="sdpl-service-card">
                <div className="sdpl-service-icon">
                  <FaHome />
                </div>
                <h3>Residential Construction Services</h3>
                <p>
                  Customized living spaces including independent houses, duplex
                  homes, and multi-family residential complexes built to last.
                </p>
              </div>

              <div className="sdpl-service-card">
                <div className="sdpl-service-icon">
                  <FaBuilding />
                </div>
                <h3>Villa Construction Services</h3>
                <p>
                  Premium villa development featuring contemporary designs, luxury
                  amenities, custom layouts, and fine craftsmanship.
                </p>
              </div>

              <div className="sdpl-service-card">
                <div className="sdpl-service-icon">
                  <FaCity />
                </div>
                <h3>Commercial Building Construction</h3>
                <p>
                  Structural construction for offices, retail stores, and
                  commercial complexes engineered for durability and business
                  utility.
                </p>
              </div>

              <div className="sdpl-service-card">
                <div className="sdpl-service-icon">
                  <FaHardHat />
                </div>
                <h3>Civil Construction Works</h3>
                <p>
                  Comprehensive structural engineering, RCC foundation work, and
                  core infrastructure development managed by experts.
                </p>
              </div>
            </div>
          </section>

          {/* CIVIL CONSTRUCTION SECTION */}
          <section className="sdpl-content-box">
            <div className="sdpl-section-heading sdpl-align-left">
              <span>CIVIL CONSTRUCTION</span>
              <h2>Civil Construction Company in Odisha</h2>
            </div>

            <p>
              We provide reliable Civil Construction Services in Odisha for
              residential, commercial, and infrastructure projects. Our expertise
              in structural works, RCC construction, and building execution
              ensures strong, durable, and high-quality structures built to last
              generations.
            </p>
          </section>

          {/* RESIDENTIAL CONSTRUCTION SECTION */}
          <section className="sdpl-content-box">
            <div className="sdpl-section-heading sdpl-align-left">
              <span>RESIDENTIAL CONSTRUCTION</span>
              <h2>Residential Construction Company in Odisha</h2>
            </div>

            <p>
              As an experienced residential construction company in Odisha, we
              focus on creating comfortable and functional living spaces. From
              design planning to final construction, we ensure every home reflects
              quality, modern design, and customer requirements.
            </p>

            <div className="sdpl-feature-grid">
              <div className="sdpl-feature-card">
                <div className="sdpl-feature-icon">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3>Independent House Construction</h3>
                  <p>
                    Tailored standalone home layouts constructed to meet custom
                    spatial requirements.
                  </p>
                </div>
              </div>

              <div className="sdpl-feature-card">
                <div className="sdpl-feature-icon">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3>Duplex & Luxury Home Construction</h3>
                  <p>
                    Elegant multi-level modern living spaces built with premium
                    structural materials.
                  </p>
                </div>
              </div>

              <div className="sdpl-feature-card">
                <div className="sdpl-feature-icon">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3>Residential Building Development</h3>
                  <p>
                    End-to-end execution of modern apartment complexes and
                    multi-tenant residences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* VILLA CONSTRUCTION SECTION */}
          <section className="sdpl-content-box">
            <div className="sdpl-section-heading sdpl-align-left">
              <span>VILLA CONSTRUCTION</span>
              <h2>Villa Construction Services in Odisha</h2>
            </div>

            <p>
              Specializing in villa construction in Odisha, we deliver premium
              homes designed around modern lifestyles and individual preferences.
            </p>
            <p>
              Our services include customized layouts, contemporary designs,
              quality finishing, and complete project management to create
              elegant, durable, and comfortable living spaces.
            </p>

            <div className="sdpl-badge-group">
              <div className="sdpl-chip-badge">
                <FaCheckCircle />
                Customized Villa Design & Construction
              </div>

              <div className="sdpl-chip-badge">
                <FaCheckCircle />
                Premium Residential Solutions
              </div>
            </div>
          </section>

          {/* BUILDING CONSTRUCTION SECTION */}
          <section className="sdpl-content-box">
            <div className="sdpl-section-heading sdpl-align-left">
              <span>BUILDING CONSTRUCTION</span>
              <h2>Building Construction Company in Odisha</h2>
            </div>

            <p>
              As a trusted building construction company in Odisha, we provide
              reliable construction solutions for residential and commercial
              developments.
            </p>
            <p>
              With a focus on strong structures, efficient execution, and superior
              construction standards, our experienced team manages every stage of
              the project while ensuring quality control and timely completion.
            </p>

            <div className="sdpl-badge-group">
              <div className="sdpl-chip-badge">
                <FaCheckCircle />
                Residential Building Projects
              </div>

              <div className="sdpl-chip-badge">
                <FaCheckCircle />
                Commercial Building Development
              </div>
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section className="sdpl-cta-block">
            <div className="sdpl-cta-body">
              <span className="sdpl-cta-tag">BUILD WITH CONFIDENCE</span>

              <h2>Build Your Dream Structure with SDPL</h2>

              <p>
                Connect with Odisha's top civil and residential construction
                experts for quotes, architectural layout advice, and project
                planning.
              </p>

              <div className="sdpl-cta-actions">
                <Link to="/contact-us" className="sdpl-btn-primary sdpl-btn-white">
                  Get Free Project Quote
                  <FaArrowRight />
                </Link>

                <a href="tel:+919439467820" className="sdpl-btn-secondary sdpl-btn-outline-white">
                  <FaPhoneAlt />
                  +91 94394 67820
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ConstructionCompanyOdisha;