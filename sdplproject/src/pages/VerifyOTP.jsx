import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/verifyotp.css";

// API CONFIGURATION STRINGS
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVSr1nPgoY0JjuJcxG0Q8FWoraZ2YCNU8KSFknjDg8hQdZ-bpahS01gnzwX9rObPMw/exec";
const FAST2SMS_API_KEY = "lyX20DwrcKkT9QUYjAiGo1Rsuqa7PSJH3vEpZez85tnNWFdCBxUXEWMe1DTsHtfJ4SbuA6xiCY9dQRv2";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the variables forwarded from the login page
  const contactInfo = location.state?.contact || "+91 98XXXXXX45";
  const method = location.state?.method || "mobile";
  const initialOTP = location.state?.actualOTP || "";
  const estimateData = location.state?.estimateData || null;

  // State variables
  const [currentOTP, setCurrentOTP] = useState(initialOTP);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  // TIMER STATE: 60 seconds
  const [timeLeft, setTimeLeft] = useState(60);

  // Use a ref to keep track of the current values for auto-submit
  const stateRef = useRef({ currentOTP, isVerifying });
  stateRef.current = { currentOTP, isVerifying };

  // EFFECT HOOK: Runs the countdown clock smoothly every second
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format the seconds nicely into MM:SS display style
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Manage individual input focus changes + Auto-submit
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    setError(""); // Clear error on typing

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward if we typed a digit
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // AUTO-SUBMIT: If the user filled the last digit (index 5)
    const fullyEnteredOTP = newOtp.join("");
    if (fullyEnteredOTP.length === 6) {
      setTimeout(() => {
        triggerVerification(newOtp);
      }, 50);
    }
  };

  // Handle backspace deleting & focus moving backward
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Dynamic Resend Dispatcher
  const handleResendOTP = async () => {
    setError("");
    setIsResending(true);
    setOtp(["", "", "", "", "", ""]);

    const newGeneratedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    if (method === "mobile") {
      const cleanMobile = contactInfo.replace("+91 ", "").trim();

      try {
        const fast2smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API_KEY}&route=q&message=Your SDPL verification OTP code is ${newGeneratedOTP}&numbers=${cleanMobile}`;
        const response = await fetch(fast2smsUrl, { method: "GET" });
        const data = await response.json();

        if (data.return) {
          setCurrentOTP(newGeneratedOTP);
          setTimeLeft(60);
          alert(`Success! A fresh verification code has been dispatched to +91 ${cleanMobile}`);
        } else {
          setError("SMS Gateway failed: " + (data.message || "Limit exceeded."));
        }
      } catch (err) {
        console.error("SMS Resend error:", err);
        setError("Network error sending SMS string.");
      } finally {
        setIsResending(false);
      }
    } else {
      // Email Route Resend
      try {
        const formData = new URLSearchParams();
        formData.append("action", "sendEmailOTP");
        formData.append("email", contactInfo);
        formData.append("otp", newGeneratedOTP);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString()
        });

        setCurrentOTP(newGeneratedOTP);
        setTimeLeft(60);
        alert(`Verification email resent successfully to ${contactInfo}`);
      } catch (err) {
        console.error("Email Resend error:", err);
        setError("Failed to resend confirmation email.");
      } finally {
        setIsResending(false);
      }
    }
  };

  // Reusable verification runner for both Auto-Submit and Button Submit
  const triggerVerification = async (currentOtpArray) => {
    if (stateRef.current.isVerifying) return;

    setError("");
    const enteredOTP = currentOtpArray.join("");

    if (enteredOTP.length < 6) {
      setError("Please fill out all 6 digits.");
      return;
    }

    if (enteredOTP !== stateRef.current.currentOTP) {
  setError("Invalid OTP code. Please try again.");

  // Clear OTP boxes
  setOtp(["", "", "", "", "", ""]);

  // Focus back to first input
  setTimeout(() => {
    document.getElementById("otp-0")?.focus();
  }, 0);

  return;
}
    setIsVerifying(true);

    // ROBUST DATA MAPPING
    const payload = {
      Location: estimateData?.location || estimateData?.city || "Direct Visit",
      PlotUnit: estimateData?.plotUnit || estimateData?.unit || "N/A",
      BuiltUpArea: estimateData?.builtUpArea || estimateData?.area || "N/A",
      ConstructionType: estimateData?.constructionType || estimateData?.buildingType || "N/A",
      PropertyType: estimateData?.propertyType || estimateData?.type || "N/A",
      ContactMethod: method === "mobile" ? "Mobile" : "Email",
      ContactValue: contactInfo,
    };

    try {
      // Convert mapping directly into URL parameters
      const formData = new URLSearchParams();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      // FIX: Keeps native form fields for your original script, but strips
      // strict headers/modes that trigger local adblock drops.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      // Login validation tracking flag setup
      localStorage.setItem("isLoggedIn", "true");
      alert("Verification successful! Your budget estimation has been logged.");
      navigate("/budget-planner");

    } catch (err) {
      console.error("Database connection failure: ", err);
      setError("Database connection error. Your details could not be saved.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    triggerVerification(otp);
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <div className="lock-icon">🔒</div>

        <h2>Verify OTP</h2>
        <p>Enter the 6-digit OTP sent to</p>
        <h4>{contactInfo}</h4>

        <form onSubmit={handleVerifySubmit}>
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
      onKeyDown={(e) => handleKeyDown(e, index)}
      required
    />
  ))}
</div>

<button
  type="submit"
  className="verify-btn"
  disabled={isVerifying || isResending}
>
  {isVerifying ? "Loading Budget Planner..." : "Verify & Continue"}
</button>

{error && (
  <div className="validation-error-msg">
    ⚠️ {error}
  </div>
)}
        </form>



        <button
          className="resend-btn"
          type="button"
          onClick={handleResendOTP}
          disabled={timeLeft > 0 || isResending || isVerifying}
          style={{
            cursor: timeLeft > 0 ? "not-allowed" : "pointer",
            opacity: timeLeft > 0 ? 0.6 : 1,
          }}
        >
          {isResending
            ? "Resending..."
            : timeLeft > 0
            ? `Resend OTP in ${formatTime(timeLeft)}`
            : "Resend OTP"}
        </button>

        <button
          className="change-btn"
          type="button"
          onClick={() =>
            navigate("/login", {
              state: {
                estimateData,
                contact: contactInfo,
                method,
              },
            })
          }
        >
          &larr; Change Details
        </button>
      </div>
    </div>
  );
}