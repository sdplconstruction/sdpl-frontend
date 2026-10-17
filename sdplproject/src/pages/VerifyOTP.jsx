
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../styles/verifyotp.css";

// API CONFIGURATION STRINGS
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVSr1nPgoY0JjuJcxG0Q8FWoraZ2YCNU8KSFknjDg8hQdZ-bpahS01gnzwX9rObPMw/exec";
const FAST2SMS_API_KEY = "YOUR_FAST2SMS_API_KEY";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.returnTo || "/";

  // Retrieve the variables forwarded from the login page
  const contactInfo = location.state?.contact || "+91 98XXXXXX45";
  const method = location.state?.method || "mobile";
  const initialOTP = location.state?.actualOTP || "";
  const estimateData = location.state?.estimateData || null;
  const fullName = location.state?.fullName || "Valued Client";

  const autoDownloadBudgetPDF =
    location.state?.autoDownloadBudgetPDF === true;

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

    setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward if we typed a digit
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // AUTO-SUBMIT: If all six digits have been entered
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

    const newGeneratedOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (method === "mobile") {
      const cleanMobile = contactInfo.replace("+91 ", "").trim();

      try {
        // NOTE: Move this API request to your backend before production.
        const fast2smsUrl =
          `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_API_KEY}` +
          `&route=q&message=Your SDPL verification OTP code is ${newGeneratedOTP}` +
          `&numbers=${cleanMobile}`;

        const response = await fetch(fast2smsUrl, {
          method: "GET",
        });

        const data = await response.json();

        if (data.return) {
          setCurrentOTP(newGeneratedOTP);
          setTimeLeft(60);
        } else {
          setError(
            "SMS Gateway failed: " +
              (data.message || "Limit exceeded.")
          );
        }
      } catch (err) {
        console.error("SMS Resend error:", err);
        setError("Network error sending SMS.");
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
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        setCurrentOTP(newGeneratedOTP);
        setTimeLeft(60);
      } catch (err) {
        console.error("Email Resend error:", err);
        setError("Failed to resend confirmation email.");
      } finally {
        setIsResending(false);
      }
    }
  };

  // PDF Generator Function
  const downloadBudgetPDF = () => {
    const doc = new jsPDF();

    // Document Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(214, 40, 40);
    doc.text("SDPL CONSTRUCTIONS", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Official Construction Budget Estimation Report",
      20,
      28
    );

    doc.setLineWidth(0.5);
    doc.line(20, 34, 190, 34);

    // Client Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(26, 26, 26);
    doc.text("Client Information:", 20, 46);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Full Name: ${fullName}`, 20, 54);
    doc.text(`Contact: ${contactInfo}`, 20, 62);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);

    // Estimate Breakdown
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Estimation Breakdown:", 20, 86);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let startY = 96;

    if (estimateData) {
      Object.entries(estimateData).forEach(([key, value]) => {
        // Add a new page if the content approaches the footer.
        if (startY > 265) {
          doc.addPage();
          startY = 20;
        }

        doc.text(`${key}: ${String(value)}`, 20, startY);
        startY += 8;
      });
    } else {
      doc.text(
        "Standard Residential Package Estimation Configured.",
        20,
        startY
      );
      startY += 8;
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);

    const pageCount = doc.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);

      doc.text(
        "Thank you for choosing SDPL Constructions. For queries, contact support@sdpl.com",
        20,
        285,
        { maxWidth: 170 }
      );
    }

    // Trigger file download
    doc.save(
      `SDPL_Budget_Estimate_${fullName.replace(/\s+/g, "_")}.pdf`
    );
  };

  // Reusable verification runner for Auto-Submit and Button Submit
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
      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 0);

      return;
    }

    setIsVerifying(true);

    const payload = {
      Name: fullName,
      Location:
        estimateData?.location ||
        estimateData?.city ||
        "Direct Visit",
      PlotUnit:
        estimateData?.plotUnit ||
        estimateData?.unit ||
        "N/A",
      BuiltUpArea:
        estimateData?.builtUpArea ||
        estimateData?.area ||
        "N/A",
      ConstructionType:
        estimateData?.constructionType ||
        estimateData?.buildingType ||
        "N/A",
      PropertyType:
        estimateData?.propertyType ||
        estimateData?.type ||
        "N/A",
      ContactMethod: method === "mobile" ? "Mobile" : "Email",
      ContactValue: contactInfo,
    };

    try {
      const formData = new URLSearchParams();

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      // Mark the user as logged in only after OTP verification succeeds.
      // Keep login for the current browser session only.
      sessionStorage.setItem("isLoggedIn", "true");

      if (autoDownloadBudgetPDF) {
        // Preserve the one-time PDF download request.
        sessionStorage.setItem(
          "pendingBudgetPDFDownload",
          "true"
        );

        // BudgetPlanner.jsx will generate the full PDF.
        navigate(returnTo, {
          replace: true,
          state: null,
        });
      } else {
        // Preserve the existing PDF behavior for other login flows.
        downloadBudgetPDF();

        setTimeout(() => {
          navigate(returnTo, {
            replace: true,
            state: null,
          });
        }, 1000);
      }
    } catch (err) {
      console.error("Database connection failure: ", err);

      setError(
        "Database connection error. Your details could not be saved."
      );
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
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="verify-btn"
            disabled={isVerifying || isResending}
          >
            {isVerifying
              ? "Processing & Downloading..."
              : "Verify & Download PDF"}
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
          disabled={
            timeLeft > 0 ||
            isResending ||
            isVerifying
          }
          style={{
            cursor:
              timeLeft > 0 ? "not-allowed" : "pointer",
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
                fullName,
                autoDownloadBudgetPDF,
                returnTo,
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
