import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaChevronRight, FaArrowLeft, FaShieldAlt, FaAward, FaTruck } from "react-icons/fa";
import building from "../assets/login-building.png";
import logo from "../assets/logo.png";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("mobile");
  
  // Input tracking states
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");

  // Validation execution handler
  const handleSendOTP = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    if (activeTab === "mobile") {
      // Basic validation for 10-digit Indian numbers
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileNumber) {
        setError("Please enter your mobile number.");
        return;
      }
      if (!mobileRegex.test(mobileNumber)) {
        setError("Please enter a valid 10-digit mobile number.");
        return;
      }
    } else {
      // Standard email regex format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailAddress) {
        setError("Please enter your email address.");
        return;
      }
      if (!emailRegex.test(emailAddress)) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    // If everything passes verification, proceed to the OTP screen!
    navigate("/verify-otp");
  };

  // Switch tabs cleanly and reset errors
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  return (
    <div className="login-page">
      
      {/* LEFT SIDE: HERO BRANDING */}
      <div className="login-left">
        <img src={building} alt="Building Under Construction" className="bg-image" />
        <div className="login-overlay"></div>
        
        <div className="login-content">
          <span className="welcome-tag">BUILDING EXCELLENCE</span>
          <h1 className="hero-title">
            Building Dreams,
            <br />
            <span className="accent-text">Creating Legacies.</span>
          </h1>
          <p className="hero-description">
            SDPL Constructions delivers premium residential, commercial and industrial projects with quality, innovation and complete transparency.
          </p>
          <div className="login-features">
            <div className="feature-item">
              <span className="feature-icon"><FaShieldAlt /></span>
              <h4>Trusted Company</h4>
            </div>
            <div className="feature-item">
              <span className="feature-icon"><FaAward /></span>
              <h4>Quality Assurance</h4>
            </div>
            <div className="feature-item">
              <span className="feature-icon"><FaTruck /></span>
              <h4>On-Time Delivery</h4>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: CARDS PANEL */}
      <div className="login-right">
        <div className="login-card">
          
          {/* INLINE BACK TO HOME BUTTON */}
          <div className="back-to-home-inline" onClick={() => navigate("/")}>
            <FaArrowLeft className="back-arrow" /> <span>Back to Home</span>
          </div>
          
          <h2 className="card-title">Welcome!</h2>
          <p className="card-subtitle">Enter your mobile number or email to continue</p>
          
          <div className="tab-container">
            <button 
              className={`tab-btn ${activeTab === "mobile" ? "active" : ""}`}
              onClick={() => handleTabChange("mobile")}
            >
              <FaPhoneAlt size={12} style={{ marginRight: "6px" }} /> Mobile Number
            </button>
            <button 
              className={`tab-btn ${activeTab === "email" ? "active" : ""}`}
              onClick={() => handleTabChange("email")}
            >
              <FaEnvelope size={12} style={{ marginRight: "6px" }} /> Email Address
            </button>
          </div>

          {/* DYNAMIC FORM INPUTS */}
          {activeTab === "mobile" ? (
            <div className={`input-box ${error ? "input-error-border" : ""}`}>
              <div className="country-code-selector">
                <img src="https://flagcdn.com/w20/in.png" alt="India Flag" className="flag-img" />
                <span>+91</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              <input 
                type="tel" 
                placeholder="Enter mobile number" 
                className="form-input" 
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))} // Only allow digits
              />
            </div>
          ) : (
            <div className={`input-box plain-input ${error ? "input-error-border" : ""}`}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="form-input" 
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
          )}

          {/* LIVE ERROR NOTIFICATION BLOCK */}
          {error && <div className="validation-error-msg">⚠️ {error}</div>}

          <button className="otp-btn" onClick={handleSendOTP}>
  Send OTP <FaChevronRight size={11} style={{ marginLeft: "6px" }} />
</button>

          <div className="divider-line">
            <span>OR CONTINUE WITH</span>
          </div>

          <button className="google-sso-btn" type="button">
            <img 
              src="https://www.vectorlogo.zone/logos/google/google-icon.svg" 
              alt="Google Logo" 
              className="google-icon" 
            />
            Continue with Google
          </button>

          <div className="login-footer">
            <p className="secure-data-info">🛡 Your data is safe with us.</p>
           <p className="terms-text">
  By continuing, you agree to our{" "}
  <Link to="/terms-and-conditions" className="link-span">
    Terms
  </Link>{" "}
  &{" "}
  <Link to="/privacy-policy" className="link-span">
    Privacy Policy
  </Link>
  .
</p>
          </div>
        </div>

      </div>
    </div>
  );
}