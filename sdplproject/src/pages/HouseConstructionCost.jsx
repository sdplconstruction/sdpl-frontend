import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/house-construction-cost.css";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaCheckCircle,
  FaCalculator,
  FaChartLine,
  FaShieldAlt,
  FaHardHat,
} from "react-icons/fa";

const HouseConstructionCost = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      "House Construction Cost Calculator | New Home Cost Estimate";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      "Calculate your house construction cost per square foot with our free house construction cost calculator and get an accurate estimate for your new home construction cost.";
  }, []);

  return (
    <>
      {/* HERO SECTION WITH VISUAL ESTIMATOR CARD */}
      <section className="sdpl-calc-hero-section">
        <div className="sdpl-calc-container sdpl-calc-hero-wrapper">
          
          {/* LEFT: SEO HEADINGS & CONTENT */}
          <div className="sdpl-calc-hero-content">
            <span className="sdpl-calc-hero-badge">
              <span className="sdpl-calc-badge-dot"></span> SDPL COST ESTIMATOR
            </span>

            <h1>
              House Construction Cost Calculator: Estimate Your New Home Cost Per Square Foot
            </h1>

            <p>
              Planning your dream home? Get accurate insights on House construction cost per square foot and understand every expense before you build. Our New home construction cost guide helps you estimate your budget easily. Use our smart House construction cost calculator to plan, compare, and build your perfect home with confidence.
            </p>

            <div className="sdpl-calc-hero-buttons">
              <Link to="/login" className="sdpl-calc-btn-primary">
                Calculate Now
                <FaArrowRight />
              </Link>

              <a href="tel:+919439467820" className="sdpl-calc-btn-secondary">
                <FaPhoneAlt />
                +91 94394 67820
              </a>
            </div>

            
            </div>
          

          {/* RIGHT: VISUAL CALCULATOR PREVIEW CARD */}
          <div className="sdpl-calc-preview-card">
            <div className="sdpl-calc-card-header">
              <div className="sdpl-calc-card-icon">
                <FaCalculator />
              </div>
              <div>
                <h3>Smart Budget Estimator</h3>
                <p>Instant per square foot calculation</p>
              </div>
            </div>

            <div className="sdpl-calc-grid-preview">
              <div className="sdpl-preview-box">
                <label>Built-up Area</label>
                <span>1,500 sq. ft.</span>
              </div>
              <div className="sdpl-preview-box">
                <label>Package Type</label>
                <span>Premium Quality</span>
              </div>
              <div className="sdpl-preview-box">
                <label>Avg. Cost / Sq. Ft.</label>
                <span>₹1,650 - ₹1,950</span>
              </div>
              <div className="sdpl-preview-box">
                <label>Est. Timeline</label>
                <span>6 - 8 Months</span>
              </div>
            </div>

            <div className="sdpl-calc-card-cta">
              <p>Ready to customize your dimensions & materials?</p>
              <button onClick={() => navigate("/login")}>
                Unlock Interactive Calculator
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <main className="sdpl-calc-main-wrapper">
        <div className="sdpl-calc-container">
          
          <div className="sdpl-calc-info-grid">
            <div className="sdpl-calc-feature-card">
              <div className="sdpl-calc-feat-icon">
                <FaChartLine />
              </div>
              <h3>Transparent Material Pricing</h3>
              <p>
                Get real-time rates for cement, steel, bricks, flooring, and paint tailored to current market conditions in Odisha.
              </p>
            </div>

            <div className="sdpl-calc-feature-card">
              <div className="sdpl-calc-feat-icon">
                <FaShieldAlt />
              </div>
              <h3>No Hidden Charges</h3>
              <p>
                Our estimation framework accounts for structural design, labor costs, finishing, and approvals without surprise add-ons.
              </p>
            </div>

            <div className="sdpl-calc-feature-card">
              <div className="sdpl-calc-feat-icon">
                <FaHardHat />
              </div>
              <h3>Civil Engineering Precision</h3>
              <p>
                Calculations are modeled by experienced SDPL engineers to ensure your budget aligns with safety and structural integrity.
              </p>
            </div>
          </div>

          {/* CALL TO ACTION BLOCK */}
          <section className="sdpl-calc-cta-block">
            <div className="sdpl-calc-cta-body">
              <h2>Need a Customized Structural Estimate?</h2>
              <p>
                Sign in to customize your plot sizes, floor levels, and material preferences in our interactive calculator.
              </p>
              <Link to="/login" className="sdpl-calc-btn-primary sdpl-calc-btn-white">
                Launch Budget Calculator
                <FaArrowRight />
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default HouseConstructionCost;