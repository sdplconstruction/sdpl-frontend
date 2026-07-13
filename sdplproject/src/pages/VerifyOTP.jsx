import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import "../styles/verifyOtp.css";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the contact info passed from the login screen, or use a default fallback
  const contactInfo = location.state?.contact || "+91 98XXXXXX45";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <div className="lock-icon">🔒</div>

        <h2>Verify OTP</h2>
        <p>Enter the 6-digit OTP sent to</p>
        
        {/* Dynamic target text! */}
        <h4>{contactInfo}</h4> 

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button
          className="verify-btn"
          onClick={() => navigate("/budget-planner")}
        >
          Verify & Continue
        </button>

        <button className="resend-btn" type="button">
          Resend OTP
        </button>

        <button
          className="change-btn"
          onClick={() => navigate("/login")}
          type="button"
        >
          ← Change Details
        </button>
      </div>
    </div>
  );
}