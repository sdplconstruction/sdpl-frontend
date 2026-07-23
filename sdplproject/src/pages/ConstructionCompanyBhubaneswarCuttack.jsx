import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Header from "../components/Header";
import Footer from "../components/Footer";

// Local image imports
import seoImage2 from "../assets/seoimage2.avif";
import seoImageCard1 from "../assets/seoimagecard1.avif";
import seoImageCard2 from "../assets/seoimagecard2.avif";
import seoImageCard3 from "../assets/seoimagecard3.avif";

import "../styles/construction-company-bhubaneswar-cuttack.css";

const ConstructionCompanyBhubaneswarCuttack = () => {
  return (
    <>
      <Helmet>
        <title>
          Construction Company in Bhubaneswar & Cuttack | House & Commercial
        </title>

        <meta
          name="description"
          content="Leading reputed construction company in Bhubaneswar & Cuttack. We specialize in house construction, duplexes, apartments, and commercial projects. Get a free estimate!"
        />

        <meta
          name="keywords"
          content="Construction Company in Bhubaneswar, Construction Company in Cuttack, House Construction in Bhubaneswar, House Construction Cuttack, Duplex House Construction, Apartment Construction Company, Commercial Building Construction Bhubaneswar"
        />

        <link
          rel="canonical"
          href="https://sdplconstructions.com/construction-company-bhubaneswar-cuttack"
        />
      </Helmet>

      {/* <Header/> */}

      {/* ================= HERO SECTION ================= */}
      <section className="sdpl-hero">
        <div className="sdpl-hero-overlay"></div>
        <div className="sdpl-container sdpl-hero-content">
          <span className="sdpl-hero-badge">PREMIER BUILDERS IN ODISHA</span>
          <h1 className="sdpl-hero-title">
            SDPL Constructions – Reliable Building & House Construction in{" "}
            <span className="sdpl-text-highlight">Bhubaneswar & Cuttack</span>
          </h1>

          <p className="sdpl-hero-desc">
            Turning a piece of land into a solid, beautiful home requires a
            builder who listens, plans meticulously, and delivers on time.
          </p>

          <div className="sdpl-hero-actions">
            {/* Updated path to /login */}
            <Link to="/login" className="sdpl-hero-primary-btn">
              Get Free Estimate &rarr;
            </Link>
            <a href="#sdpl-what-we-build" className="sdpl-hero-secondary-btn">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="sdpl-intro">
        <div className="sdpl-container">
          <div className="sdpl-intro-grid">
            <div className="sdpl-intro-text">
              <h2>Reliable Building & House Construction in Bhubaneswar & Cuttack</h2>
              <p>
                Turning a piece of land into a solid, beautiful home requires a builder
                who listens, plans meticulously, and delivers on time. Backed by
                Subharambha Developers, SDPL Constructions brings over a decade of
                hands-on experience as a reputed construction company in Bhubaneswar.
                From single-family homes to large-scale commercial developments, we help
                clients build with peace of mind across the Twin Cities.
              </p>
              <p>
                Whether you need end-to-end management for house construction in
                Cuttack or are looking for a trusted partner for commercial building
                construction in Bhubaneswar, our team manages the entire process from
                structural design to handover.
              </p>
            </div>
            <div className="sdpl-intro-image-wrapper">
              <img
                src={seoImage2}
                alt="Reliable Building Construction in Bhubaneswar and Cuttack"
                className="sdpl-intro-img"
              />
              <div className="sdpl-experience-badge">
                <span className="sdpl-years">10+</span>
                <span className="sdpl-label">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE BUILD ================= */}
      <section className="sdpl-what-we-build" id="sdpl-what-we-build">
        <div className="sdpl-container">
          <div className="sdpl-section-title">
            <span>OUR SERVICES</span>
            <h2>What We Build</h2>
            <p>
              We provide complete residential and commercial construction solutions
              across Bhubaneswar and Cuttack with quality craftsmanship and
              end-to-end project management.
            </p>
          </div>

          <div className="sdpl-service-grid">
            {/* Service 1: House Construction */}
            <div className="sdpl-service-card">
              <div
                className="sdpl-card-bg-img"
                style={{ backgroundImage: `url(${seoImageCard1})` }}
              ></div>
              <div className="sdpl-card-overlay"></div>
              <div className="sdpl-card-inner">
                <div className="sdpl-card-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3>Single-Family Homes & Residential Projects</h3>

                <h4>House Construction in Bhubaneswar & Cuttack</h4>
                <p>
                  Complete residential design and construction tailored to your plot,
                  budget, and lifestyle while considering Vastu principles and local
                  site conditions.
                </p>

                <h4>Duplex House Construction</h4>
                <p>
                  Elegant duplex homes designed with spacious interiors, modern
                  architecture, and maximum natural lighting.
                </p>

                <h4>House Construction in Cuttack</h4>
                <p>
                  Turnkey house construction services for residential projects in
                  Trisulia, CDA, and nearby developing locations.
                </p>
              </div>
            </div>

            {/* Service 2: Apartment Construction */}
            <div className="sdpl-service-card">
              <div
                className="sdpl-card-bg-img"
                style={{ backgroundImage: `url(${seoImageCard2})` }}
              ></div>
              <div className="sdpl-card-overlay"></div>
              <div className="sdpl-card-inner">
                <div className="sdpl-card-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                </div>
                <h3>Multi-Unit & Apartment Construction</h3>

                <h4>Apartment Construction Company</h4>
                <p>
                  Construction of apartments, S+3 residential buildings, and gated
                  communities using modern engineering standards.
                </p>

                <h4>End-to-End Project Management</h4>
                <p>
                  From planning and approvals to structural engineering, execution,
                  and interior finishing, we manage every stage efficiently.
                </p>
              </div>
            </div>

            {/* Service 3: Commercial Construction */}
            <div className="sdpl-service-card">
              <div
                className="sdpl-card-bg-img"
                style={{ backgroundImage: `url(${seoImageCard3})` }}
              ></div>
              <div className="sdpl-card-overlay"></div>
              <div className="sdpl-card-inner">
                <div className="sdpl-card-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>
                </div>
                <h3>Commercial Development</h3>

                <h4>Commercial Building Construction in Bhubaneswar</h4>
                <p>
                  We build office buildings, retail spaces, warehouses, and commercial
                  projects across Patrapada, Khandagiri, Hanspal, and other prime
                  locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTIVE & REGIONAL PROJECTS ================= */}
      <section className="sdpl-regional-projects">
        <div className="sdpl-container">
          <div className="sdpl-section-title">
            <span>OUR PRESENCE</span>
            2 Active & Regional Projects
            <p>
              SDPL Constructions is actively delivering residential and commercial
              projects across Bhubaneswar and Cuttack with quality workmanship and
              timely execution.
            </p>
          </div>

          <div className="sdpl-project-grid">
            <div className="sdpl-project-card">
              <div className="sdpl-project-tag">Ongoing</div>
              <h3>Cuttack Developments</h3>
              <p>
                We are currently undertaking residential construction projects in the
                rapidly developing Trisulia region, delivering modern homes designed
                for long-term comfort and durability.
              </p>
            </div>

            <div className="sdpl-project-card">
              <div className="sdpl-project-tag">Upcoming</div>
              <h3>Bhubaneswar Developments</h3>
              <p>
                Our ongoing projects include core housing in Madanpur, upcoming
                triplex developments in Hanspal, and multi-storey residential
                construction in Patrapada.
              </p>
            </div>

            <div className="sdpl-project-card">
              <div className="sdpl-project-tag sdpl-tag-success">Delivered</div>
              <h3>Delivered Projects</h3>
              <p>
                We have successfully completed ready-to-move residential projects in
                Sundarpada and Bhagwanpur, earning the trust of homeowners through
                quality construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE SDPL ================= */}
      <section className="sdpl-why-section">
        <div className="sdpl-container">
          <div className="sdpl-section-title">
            <span>WHY CHOOSE US</span>
            <h2>Why Property Owners Work With SDPL</h2>
          </div>

          <div className="sdpl-why-grid">
            <div className="sdpl-why-card">
              <div className="sdpl-why-icon-box">01</div>
              <h3>Clear Communication</h3>
              <p>
                Honest pricing, transparent project updates, and zero hidden charges
                throughout the construction process.
              </p>
            </div>

            <div className="sdpl-why-card">
              <div className="sdpl-why-icon-box">02</div>
              <h3>Approval Guidance</h3>
              <p>
                Assistance with municipal approvals, soil testing, structural safety,
                and construction documentation.
              </p>
            </div>

            <div className="sdpl-why-card">
              <div className="sdpl-why-icon-box">03</div>
              <h3>Local Expertise</h3>
              <p>
                Deep understanding of Odisha's soil conditions, construction
                standards, climate, and quality material sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="sdpl-cta-section">
        <div className="sdpl-cta-glow"></div>
        <div className="sdpl-container sdpl-cta-content">
          <h2>Ready to Build Your Dream Home?</h2>
          <p>
            Whether you're planning a house, duplex, apartment, or commercial
            building, our team is here to guide you from planning to handover.
          </p>
          {/* Updated path to /login */}
          <Link to="/login" className="sdpl-cta-btn">
            Get Free Estimate &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ConstructionCompanyBhubaneswarCuttack;