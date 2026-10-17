import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaUser, FaChevronRight, FaArrowLeft, FaShieldAlt, FaAward, FaTruck } from "react-icons/fa";
import building from "../assets/login-building.png";
import "../styles/login.css";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVSr1nPgoY0JjuJcxG0Q8FWoraZ2YCNU8KSFknjDg8hQdZ-bpahS01gnzwX9rObPMw/exec";
const FAST2SMS_API_KEY = "lyX20DwrcKkT9QUYjAiGo1Rsuqa7PSJH3vEpZez85tnNWFdCBxUXEWMe1DTsHtfJ4SbuA6xiCY9dQRv2";

export default function Login() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const returnTo =
  routeLocation.state?.returnTo || "/";

  const estimateData = routeLocation.state?.estimateData || null;
  const returnedContact = routeLocation.state?.contact || "";
  const returnedMethod = routeLocation.state?.method || "mobile";
  const returnedName = routeLocation.state?.fullName || "";
  const autoDownloadBudgetPDF =
  routeLocation.state?.autoDownloadBudgetPDF === true ||
  localStorage.getItem("autoDownloadPdf") === "true";

  const [activeTab, setActiveTab] = useState("mobile");
  const [fullName, setFullName] = useState(returnedName);
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (returnedContact) {
      setActiveTab(returnedMethod);
      if (returnedMethod === "mobile") {
        setMobileNumber(returnedContact.replace("+91 ", "").trim());
      } else {
        setEmailAddress(returnedContact);
      }
    }
  }, [returnedContact, returnedMethod]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = fullName.trim();
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (!nameRegex.test(trimmedName)) {
      setError("Please enter a valid name (letters and spaces only).");
      return;
    }

    setIsSubmitting(true);
    const otp = generateOTP();
    let contactValue = "";

    if (activeTab === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/;
      const isRepeatingDigits = /^(\d)\1{9}$/.test(mobileNumber);

      if (!mobileNumber || !mobileRegex.test(mobileNumber) || isRepeatingDigits) {
        setError("Please enter a valid 10-digit mobile number.");
        setIsSubmitting(false);
        return;
      }

      contactValue = `+91 ${mobileNumber}`;

      try {
        const fast2smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API_KEY}&route=q&message=Hi ${trimmedName}, Your SDPL verification OTP code is ${otp}&numbers=${mobileNumber}`;
        const response = await fetch(fast2smsUrl);
        const data = await response.json();

        if (data.return) {
          goToVerificationPage(contactValue, otp, "mobile", trimmedName);
        } else {
          setError("SMS gateway error: " + (data.message || "Unable to send SMS."));
        }
      } catch (err) {
        console.error("Fast2SMS API failed: ", err);
        setError("Unable to send SMS. Checking connectivity...");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailAddress || !emailRegex.test(emailAddress)) {
        setError("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      contactValue = emailAddress;

      try {
        const formData = new URLSearchParams();
        formData.append("action", "sendEmailOTP");
        formData.append("email", contactValue);
        formData.append("name", trimmedName);
        formData.append("otp", otp);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString()
        });

        goToVerificationPage(contactValue, otp, "email", trimmedName);
      } catch (err) {
        console.error("Gmail App Script failed: ", err);
        setError("Failed to send verification email. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const goToVerificationPage = (
  contactValue,
  generatedOTP,
  method,
  name
) => {
  navigate("/verify-otp", {
    state: {
      contact: contactValue,
      method,
      actualOTP: generatedOTP,
      fullName: name,
      estimateData,
      autoDownloadBudgetPDF,
      returnTo
    }
  });
};

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={building} alt="Building Under Construction" className="bg-image" />
        <div className="login-overlay"></div>
        <div className="login-content">
          <span className="welcome-tag">BUILDING EXCELLENCE</span>
          <h1 className="hero-title">Building Dreams,<br /><span className="accent-text">Creating Legacies.</span></h1>
          <p className="hero-description">SDPL Constructions delivers premium residential, commercial and industrial projects with quality, innovation and complete transparency.</p>
          <div className="login-features">
            <div className="feature-item"><span className="feature-icon"><FaShieldAlt /></span><h4>Trusted Company</h4></div>
            <div className="feature-item"><span className="feature-icon"><FaAward /></span><h4>Quality Assurance</h4></div>
            <div className="feature-item"><span className="feature-icon"><FaTruck /></span><h4>On-Time Delivery</h4></div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="back-to-home-inline" onClick={() => navigate("/")}>
            <FaArrowLeft className="back-arrow" /> <span>Back to Home</span>
          </div>

          <h2 className="card-title">Welcome!</h2>
          <p className="card-subtitle">Enter your details to continue</p>

          <div className="tab-container">
            <button className={`tab-btn ${activeTab === "mobile" ? "active" : ""}`} onClick={() => handleTabChange("mobile")}>
              <FaPhoneAlt size={12} style={{ marginRight: "6px" }} /> Mobile Number
            </button>
            <button className={`tab-btn ${activeTab === "email" ? "active" : ""}`} onClick={() => handleTabChange("email")}>
              <FaEnvelope size={12} style={{ marginRight: "6px" }} /> Email Address
            </button>
          </div>

          <form onSubmit={handleSendOTP}>
            <div className="input-box plain-input" style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "0 12px" }}>
                <FaUser size={14} color="#888" style={{ marginRight: "10px" }} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                />
              </div>
            </div>

            {activeTab === "mobile" ? (
              <div className="input-box">
                <div className="country-code-selector">
                  <img src="https://flagcdn.com/w20/in.png" alt="India Flag" className="flag-img" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="form-input"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            ) : (
              <div className="input-box plain-input">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="form-input"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
            )}

            {error && <div className="validation-error-msg">⚠️ {error}</div>}

            <button type="submit" className="otp-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"} <ChevronRightIcon />
            </button>
          </form>

          <div className="login-footer">
            <p className="secure-data-info">🛡 Your data is safe with us.</p>
            <p className="terms-text">
              By continuing, you agree to our <Link to="/terms-and-conditions" className="link-span">Terms</Link> & <Link to="/privacy-policy" className="link-span">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return <FaChevronRight size={11} style={{ marginLeft: "6px" }} />;
}