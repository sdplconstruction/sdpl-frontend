import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/blog.css";

// AOS Animation Library
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaCheckCircle,
  FaCalculator,
  FaPhoneAlt,
  FaClock,
  FaUserTie,
  FaCompass,
  FaFileContract,
  FaHardHat,
  FaCubes,
  FaPaintRoller,
  FaKey,
  FaArrowRight
} from "react-icons/fa";

// Import Local Images
import architecturalDesignImg from "../assets/ArchitecturalDesign.avif";
import civilEngineerImg from "../assets/CivilEngineer.avif";
import interiorDesignImg from "../assets/InteriorDesign.avif";
import snaggingHandoverImg from "../assets/Snagging&Handover.avif";

const ModernOdishaHomeBlog = () => {
  useEffect(() => {
    document.title = "From 3D Elevation to Key Handover | SDPL Constructions";
    window.scrollTo(0, 0);

    // Initialize Scroll Animations
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <div className="blog-wrapper">
        {/* HERO BANNER SECTION */}
        <header className="blog-hero">
          <div className="blog-hero-overlay"></div>
          <div className="blog-hero-content" data-aos="zoom-in" data-aos-duration="1000">
            <span className="blog-badge">EXPERT INSIGHTS</span>
            <h1>From 3D Elevation to Key Handover: What Goes Into a Modern Odisha Home</h1>

            <div className="blog-meta">
              <span><FaUserTie /> By SDPL Engineering Team</span>
              <span className="meta-dot">•</span>
              <span><FaClock /> 5 Min Read</span>
            </div>
          </div>
        </header>

        {/* MAIN BLOG CONTAINER */}
        <article className="blog-container">
          <div className="blog-content">

            {/* INTRO LEAD - FADE UP */}
            <p className="blog-lead" data-aos="fade-up">
              Building a home in Odisha today is no longer just about putting up four brick walls—it is about crafting a modern, functional, and climate-resilient sanctuary. From the bustling streets of Bhubaneswar to coastal pockets like Puri, homeowners want modern architecture seamlessly blended with practical space planning and Vastu compliance.
            </p>

            <p data-aos="fade-up" data-aos-delay="100">
              If you are planning your dream project, understanding the complete journey from initial architectural concepts to the final key handover is essential. Here is a breakdown of what goes into creating a modern Odisha home.
            </p>

            {/* SECTION 1 - SLIDE RIGHT */}
            <section className="blog-section-card" data-aos="fade-right">
              <div className="section-header">
                <h2><FaCompass className="section-icon" /> 1. 3D Elevation & Smart Architectural Design</h2>
              </div>
              <p>
                Every modern home starts with a clear visual blueprint. Advanced architectural planning uses 3D exterior elevation models to give you a realistic preview of your home’s aesthetic, finishes, and layout before construction even begins.
              </p>

              <div className="image-card-wrapper" data-aos="zoom-in" data-aos-delay="150">
                <img
                  src={architecturalDesignImg}
                  alt="3D Exterior Elevation Render and Architectural Design"
                  className="blog-section-image"
                />
                <span className="image-caption">Realistic 3D Elevation Render Preview</span>
              </div>

              <div className="feature-grid">
                <div className="feature-box" data-aos="fade-up" data-aos-delay="200">
                  <h4><FaCompass /> Vastu & Climate Optimization</h4>
                  <p>Maximizing natural sunlight, cross-ventilation, and proper directional alignment tailored to Odisha's tropical climate.</p>
                </div>
                <div className="feature-box" data-aos="fade-up" data-aos-delay="300">
                  <h4><FaFileContract /> Seamless Approvals</h4>
                  <p>Navigating required building permits through local municipal authorities like the BDA or CDA without delays.</p>
                </div>
              </div>
            </section>

            {/* SECTION 2 - SLIDE LEFT */}
            <section className="blog-section-card" data-aos="fade-left">
              <div className="section-header">
                <h2><FaHardHat className="section-icon" /> 2. Precision Engineering & Robust Civil Work</h2>
              </div>
              <p>
                Odisha’s weather demands strong structural integrity. From heavy monsoons to cyclone-prone coastal conditions, modern homes must be engineered with long-term durability in mind.
              </p>

              <div className="image-card-wrapper" data-aos="zoom-in" data-aos-delay="150">
                <img
                  src={civilEngineerImg}
                  alt="Structural Engineering & Civil Execution"
                  className="blog-section-image"
                />
                <span className="image-caption">High-Grade TMT Steel & Reinforced Concrete Foundation</span>
              </div>

              <div className="feature-grid">
                <div className="feature-box" data-aos="fade-up" data-aos-delay="200">
                  <h4><FaCubes /> Soil Testing</h4>
                  <p>Customizing foundation depth based on plot-specific soil conditions.</p>
                </div>
                <div className="feature-box" data-aos="fade-up" data-aos-delay="300">
                  <h4><FaHardHat /> High-Grade Materials</h4>
                  <p>Utilizing certified TMT steel, fly-ash bricks, and multi-layer waterproofing across roof slabs and damp-prone zones.</p>
                </div>
              </div>
            </section>

            {/* QUOTE CARD - FLIP UP */}
            <blockquote className="blog-quote-card" data-aos="flip-up">
              <div className="quote-accent-bar"></div>
              <p>
                "This is where expert supervision makes all the difference. At SDPL Constructions, we combine structural engineering expertise with turnkey civil execution to guarantee safety, transparency, and top-tier quality at every milestone."
              </p>
            </blockquote>

            {/* SECTION 3 - SLIDE RIGHT */}
            <section className="blog-section-card" data-aos="fade-right">
              <div className="section-header">
                <h2><FaPaintRoller className="section-icon" /> 3. Early Interior Design Integration</h2>
              </div>
              <p>
                Modern interior design shouldn't be an afterthought. Integrating false ceilings, modular kitchen plumbing, concealed wiring, and lighting layouts during the civil phase prevents expensive wall cuts and structural re-work later.
              </p>

              <div className="image-card-wrapper" data-aos="zoom-in" data-aos-delay="150">
                <img
                  src={interiorDesignImg}
                  alt="Modern Interior Design Integration"
                  className="blog-section-image"
                />
                <span className="image-caption">Early Electrical & Interior Layout Execution</span>
              </div>
            </section>

            {/* SECTION 4 - SLIDE LEFT */}
            <section className="blog-section-card" data-aos="fade-left">
              <div className="section-header">
                <h2><FaKey className="section-icon" /> 4. Quality Snagging & Key Handover</h2>
              </div>
              <p>
                Before you step into your brand-new home, a comprehensive final inspection ensures everything operates perfectly:
              </p>

              <ul className="check-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <FaCheckCircle className="check-icon" />
                  <span><strong>Electrical Audits:</strong> Testing electrical circuits, DB boxes, and proper grounding.</span>
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <FaCheckCircle className="check-icon" />
                  <span><strong>Plumbing & Finishing:</strong> Verifying plumbing pressure, tile alignment, and exterior paint sealants.</span>
                </li>
              </ul>

              <div className="image-card-wrapper" data-aos="zoom-in" data-aos-delay="150">
                <img
                  src={snaggingHandoverImg}
                  alt="Quality Snagging Inspection & Key Handover"
                  className="blog-section-image"
                />
                <span className="image-caption">Snagging Audit & Key Handover Stage</span>
              </div>
            </section>

            {/* CALL TO ACTION BOX - ZOOM IN */}
            <div className="blog-cta-box" data-aos="zoom-in-up">
              <div className="cta-content">
                <h3>Build Your Dream Home Today</h3>
                <p>
                  From raw plot assessments and 3D design to turnkey construction and interior finishing, build with absolute peace of mind.
                </p>

                <div className="blog-cta-buttons">
                  <Link
                    to="/login"
                    state={{ redirectTo: "/budget-planner" }}
                    className="btn-primary"
                  >
                    <FaCalculator /> Try Online Budget Planner
                  </Link>

                  <Link to="/contact-us" className="btn-secondary">
                    <FaPhoneAlt /> Contact Us <FaArrowRight className="btn-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </>
  );
};

export default ModernOdishaHomeBlog;