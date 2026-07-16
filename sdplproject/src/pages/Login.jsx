import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaChevronRight, FaArrowLeft, FaShieldAlt, FaAward, FaTruck } from "react-icons/fa";
import building from "../assets/login-building.png";
import logo from "../assets/logo.png";
import "../styles/login.css";

// ⚠️ CONFIGURATION VALUES:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVSr1nPgoY0JjuJcxG0Q8FWoraZ2YCNU8KSFknjDg8hQdZ-bpahS01gnzwX9rObPMw/exec";
const FAST2SMS_API_KEY = "lyX20DwrcKkT9QUYjAiGo1Rsuqa7PSJH3vEpZez85tnNWFdCBxUXEWMe1DTsHtfJ4SbuA6xiCY9dQRv2";

export default function Login() {
  const navigate = useNavigate();
  const routeLocation = useLocation();

  // Retrieve the variables forwarded from previous pages
  const estimateData = routeLocation.state?.estimateData || null;
  const returnedContact = routeLocation.state?.contact || "";
  const returnedMethod = routeLocation.state?.method || "mobile";

  const [activeTab, setActiveTab] = useState("mobile");

  // Input tracking states
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌟 EFFECT: Pre-fill contact details if returning via "Change Details"
  useEffect(() => {
    if (returnedContact) {
      setActiveTab(returnedMethod);
      if (returnedMethod === "mobile") {
        // Remove '+91 ' prefix for local input display
        setMobileNumber(returnedContact.replace("+91 ", "").trim());
      } else {
        setEmailAddress(returnedContact);
      }
    }
  }, [returnedContact, returnedMethod]);

  // Generates a secure random 6-digit numeric OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Validation & OTP Dispatch execution handler
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setIsSubmitting(true);

    const otp = generateOTP();
    let contactValue = "";

    // --- MOBILE VERIFICATION ROUTE ---
    if (activeTab === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileNumber) {
        setError("Please enter your mobile number.");
        setIsSubmitting(false);
        return;
      }
      if (!mobileRegex.test(mobileNumber)) {
        setError("Please enter a valid 10-digit mobile number.");
        setIsSubmitting(false);
        return;
      }

      contactValue = `+91 ${mobileNumber}`;

      try {
        const fast2smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API_KEY}&route=q&message=Your SDPL verification OTP code is ${otp}&numbers=${mobileNumber}`;

        const response = await fetch(fast2smsUrl, {
          method: "GET",
          headers: {
            "accept": "application/json"
          }
        });

        const data = await response.json();

        if (data.return) {
          alert(`Success! OTP has been sent to +91 ${mobileNumber}`);
          goToVerificationPage(contactValue, otp, "mobile");
        } else {
          setError("SMS gateway error: " + (data.message || "Unable to send SMS."));
        }
      } catch (err) {
        console.error("Fast2SMS API failed: ", err);
        setError("Unable to send SMS. Checking connectivity...");
      } finally {
        setIsSubmitting(false);
      }

    // --- EMAIL VERIFICATION ROUTE ---
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailAddress) {
        setError("Please enter your email address.");
        setIsSubmitting(false);
        return;
      }
      if (!emailRegex.test(emailAddress)) {
        setError("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      contactValue = emailAddress;

      try {
        const formData = new URLSearchParams();
        formData.append("action", "sendEmailOTP");
        formData.append("email", contactValue);
        formData.append("otp", otp);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Required to prevent CORS policy blocks from Apps Script
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString()
        });

        alert(`Verification email has been sent to ${contactValue}!`);
        goToVerificationPage(contactValue, otp, "email");
      } catch (err) {
        console.error("Gmail App Script failed: ", err);
        setError("Failed to send verification email. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 🌟 FIXED: Replaced non-existent variables with function parameters
  const goToVerificationPage = (contactValue, generatedOTP, method) => {
    navigate("/verify-otp", {
      state: {
        contact: contactValue,
        method: method,
        actualOTP: generatedOTP,
        estimateData: estimateData
      }
    });
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
          <form onSubmit={handleSendOTP}>
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

            <button type="submit" className="otp-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"} <FaChevronRight size={11} style={{ marginLeft: "6px" }} />
            </button>
          </form>

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