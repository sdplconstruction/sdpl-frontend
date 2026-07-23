import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// Image Imports
import heroBg from "../assets/seoimage2.avif";
import serviceImg1 from "../assets/seoimagecard1.avif";
import serviceImg2 from "../assets/seoimagecard2.avif";
import serviceImg3 from "../assets/seoimagecard3.avif";

import "../styles/civil-contractor-bhubaneswar-odisha.css";

const CivilContractorBhubaneswarOdisha = () => {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 } // Triggers when 15% of element is visible
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Leading Civil Contractor in Odisha | Residential & Commercial Builders
        </title>
        <meta
          name="description"
          content="Build your dream home with SDPL Constructions, a trusted civil contractor and home builder in Bhubaneswar, Odisha."
        />
        <link
          rel="canonical"
          href="https://sdplconstructions.com/civil-contractor-bhubaneswar-odisha"
        />
      </Helmet>

      {/* <Header /> */}

      {/* ================= HERO (SLIDE FROM TOP) ================= */}
      <section className="civil-hero">
        <div className="civil-hero-overlay"></div>
        <div className="container civil-hero-content animate-on-scroll from-top">
          <h1>
            Build Your Dream Space with Bhubaneswar's Premier Civil Contractor
          </h1>
          <p>
            SDPL Constructions delivers high-quality residential and commercial
            construction services with modern engineering, experienced
            professionals, and a commitment to timely project delivery.
          </p>
        </div>
      </section>

      {/* ================= INTRODUCTION (LEFT & RIGHT) ================= */}
      <section className="civil-intro">
        <div className="container">
          <div className="civil-intro-grid">
            {/* Text slides in from Left */}
            <div className="civil-intro-text animate-on-scroll from-left">
              <h2>Complete Civil & Construction Solutions in Bhubaneswar</h2>
              <p>
                Building a home or commercial property is one of life's most
                significant investments. It requires meticulous planning,
                uncompromising quality, and above all, a construction partner you
                can rely on.
              </p>
              <p>
                At SDPL Constructions, we bring years of expertise, modern
                engineering practices, and an unwavering commitment to quality to
                every project we undertake.
              </p>
            </div>

            {/* Image slides in from Right */}
            <div className="civil-intro-image-wrapper animate-on-scroll from-right">
              <img
                src={heroBg}
                alt="Civil Contractor in Bhubaneswar"
                className="civil-intro-img"
              />
              <div className="civil-badge">
                <span>10+ Years</span>
                <p>Industry Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES (SLIDE FROM BOTTOM) ================= */}
      <section className="civil-services">
        <div className="container">
          <div className="section-title animate-on-scroll from-top">
            <span>OUR EXPERTISE</span>
            <h2>Complete Civil & Construction Solutions</h2>
          </div>

          <div className="service-card single-feature-card animate-on-scroll from-bottom">
            <h3>End-to-End Construction Services</h3>
            <p>
              A successful build relies on strong foundations and seamless
              execution. As a full-service civil contractor in Bhubaneswar,
              SDPL Constructions handles every phase of the construction
              lifecycle so you don't have to manage multiple vendors.
            </p>
            <p>
              We prioritize transparent pricing, clear timelines, and rigorous
              quality checks at every milestone.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SPECIALIZED SERVICES (STAGGERED BOTTOM) ================= */}
      <section className="specialized-services">
        <div className="container">
          <div className="section-title animate-on-scroll from-top">
            <span>WHAT WE BUILD</span>
            <h2>Specialized Building Services</h2>
          </div>

          <div className="service-grid">
            {/* Card 1: Slide from Left */}
            <div className="service-card image-card animate-on-scroll from-left delay-100">
              <div className="card-image-box">
                <img src={serviceImg1} alt="Home Builders in Bhubaneswar" />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body">
                <h3>Expert Home Builders in Bhubaneswar</h3>
                <p>
                  Your home should reflect your lifestyle. As experienced home
                  builders in Bhubaneswar, we focus on creating safe, comfortable,
                  and functional living spaces.
                </p>
              </div>
            </div>

            {/* Card 2: Slide from Bottom */}
            <div className="service-card image-card animate-on-scroll from-bottom delay-200">
              <div className="card-image-box">
                <img src={serviceImg2} alt="Residential Builder in Bhubaneswar" />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body">
                <h3>Premier Residential Builder in Bhubaneswar</h3>
                <p>
                  Whether you are planning a modern villa, a multi-storey
                  apartment, or a custom independent residence, SDPL
                  Constructions delivers quality.
                </p>
              </div>
            </div>

            {/* Card 3: Slide from Right */}
            <div className="service-card image-card animate-on-scroll from-right delay-300">
              <div className="card-image-box">
                <img src={serviceImg3} alt="Commercial Builder in Bhubaneswar" />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body">
                <h3>Strategic Commercial Builder in Bhubaneswar</h3>
                <p>
                  We construct corporate offices, retail spaces, commercial
                  buildings, and business infrastructure that combine modern
                  architecture with structural strength.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA (SLIDE FROM BOTTOM) ================= */}
      <section className="civil-cta">
        <div className="civil-cta-glow"></div>
        <div className="container civil-cta-content animate-on-scroll from-bottom">
          <h2>Ready to Build Your Dream Project?</h2>
          <p>
            Let's discuss your residential or commercial construction
            requirements with our experienced team.
          </p>
          <Link to="/login" className="primary-btn">
            Get Free Estimate &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CivilContractorBhubaneswarOdisha;