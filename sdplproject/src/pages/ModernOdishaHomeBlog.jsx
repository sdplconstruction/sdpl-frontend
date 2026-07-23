import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/blog.css";
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
  FaKey
} from "react-icons/fa";

const ModernOdishaHomeBlog = () => {
  useEffect(() => {
    document.title = "From 3D Elevation to Key Handover | SDPL Constructions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="blog-wrapper">
        {/* HERO BANNER SECTION */}
        <div className="blog-hero">
          <div className="blog-hero-content">
            <span className="blog-badge">EXPERT INSIGHTS</span>
            <h1>From 3D Elevation to Key Handover: What Goes Into a Modern Odisha Home</h1>
            
            <div className="blog-meta">
              <span><FaUserTie /> By SDPL Engineering Team</span>
              <span className="meta-dot">•</span>
              <span><FaClock /> 5 Min Read</span>
            </div>
          </div>
        </div>

        {/* MAIN BLOG CONTAINER */}
        <article className="blog-container">
          <div className="blog-content">
            <p className="blog-lead">
              Building a home in Odisha today is no longer just about putting up four brick walls—it is about crafting a modern, functional, and climate-resilient sanctuary. From the bustling streets of Bhubaneswar to coastal pockets like Puri, homeowners want modern architecture seamlessly blended with practical space planning and Vastu compliance.
            </p>

            <p>
              If you are planning your dream project, understanding the complete journey from initial architectural concepts to the final key handover is essential. Here is a breakdown of what goes into creating a modern Odisha home.
            </p>

            {/* SECTION 1 */}
            <div className="blog-section-card">
              <h2><FaCompass className="section-icon" /> 1. 3D Elevation & Smart Architectural Design</h2>
              <p>
                Every modern home starts with a clear visual blueprint. Advanced architectural planning uses 3D exterior elevation models to give you a realistic preview of your home’s aesthetic, finishes, and layout before construction even begins.
              </p>
              <div className="feature-grid">
                <div className="feature-box">
                  <h4><FaCompass /> Vastu & Climate Optimization</h4>
                  <p>Maximizing natural sunlight, cross-ventilation, and proper directional alignment tailored to Odisha's tropical climate.</p>
                </div>
                <div className="feature-box">
                  <h4><FaFileContract /> Seamless Approvals</h4>
                  <p>Navigating required building permits through local municipal authorities like the BDA or CDA without delays.</p>
                </div>
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="blog-section-card">
              <h2><FaHardHat className="section-icon" /> 2. Precision Engineering & Robust Civil Work</h2>
              <p>
                Odisha’s weather demands strong structural integrity. From heavy monsoons to cyclone-prone coastal conditions, modern homes must be engineered with long-term durability in mind.
              </p>
              <div className="feature-grid">
                <div className="feature-box">
                  <h4><FaCubes /> Soil Testing</h4>
                  <p>Customizing foundation depth based on plot-specific soil conditions.</p>
                </div>
                <div className="feature-box">
                  <h4><FaHardHat /> High-Grade Materials</h4>
                  <p>Utilizing certified TMT steel, fly-ash bricks, and multi-layer waterproofing across roof slabs and damp-prone zones.</p>
                </div>
              </div>
            </div>

            {/* QUOTE CARD */}
            <blockquote className="blog-quote-card">
              <p>
                "This is where expert supervision makes all the difference. At SDPL Constructions, we combine structural engineering expertise with turnkey civil execution to guarantee safety, transparency, and top-tier quality at every milestone."
              </p>
            </blockquote>

            {/* SECTION 3 */}
            <div className="blog-section-card">
              <h2><FaPaintRoller className="section-icon" /> 3. Early Interior Design Integration</h2>
              <p>
                Modern interior design shouldn't be an afterthought. Integrating false ceilings, modular kitchen plumbing, concealed wiring, and lighting layouts during the civil phase prevents expensive wall cuts and structural re-work later.
              </p>
            </div>

            {/* SECTION 4 */}
            <div className="blog-section-card">
              <h2><FaKey className="section-icon" /> 4. Quality Snagging & Key Handover</h2>
              <p>
                Before you step into your brand-new home, a comprehensive final inspection ensures everything operates perfectly:
              </p>
              <ul className="check-list">
                <li>
                  <FaCheckCircle className="check-icon" />
                  <span><strong>Electrical Audits:</strong> Testing electrical circuits, DB boxes, and proper grounding.</span>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" />
                  <span><strong>Plumbing & Finishing:</strong> Verifying plumbing pressure, tile alignment, and exterior paint sealants.</span>
                </li>
              </ul>
            </div>

            {/* CALL TO ACTION BOX */}
<div className="blog-cta-box">
  <h3>Build Your Dream Home Today</h3>
  <p>
    From raw plot assessments and 3D design to turnkey construction and interior finishing...
  </p>
  
  <div className="blog-cta-buttons">
    {/* REDIRECT TO LOGIN WITH TARGET STATE */}
    <Link 
      to="/login" 
      state={{ redirectTo: "/budget-planner" }} 
      className="btn-primary"
    >
      <FaCalculator /> Try Online Budget Planner
    </Link>

    <Link to="/contact-us" className="btn-secondary">
      <FaPhoneAlt /> Contact Us
    </Link>
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