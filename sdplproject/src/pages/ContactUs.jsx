import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ContactUs.css';
import contactImg from '../assets/contactus.jpg';

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxsvuv33SGzuL92iMu2qf0o7bX7KXZZPhdwGvOxHMkgTx-GdsF0Kx5bfVmCEzzNPNJe/exec";

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear the error for this field as soon as the user changes the text
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let currentErrors = {};

    // 1. Name validation (No whitespace-only strings, minimum 2 characters)
    if (!form.name.trim() || form.name.trim().length < 2) {
      currentErrors.name = "Please enter a valid name (at least 2 characters).";
    }

    // 2. Email Validation (Standard standard-compliant pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      currentErrors.email = "Please enter a valid email address.";
    }

    // 3. Phone Validation (Allows optional country code prefix, 10-digit primary mobile number)
    const phoneRegex = /^(?:\+91[\-\s]?)?[6789]\d{9}$/;
    if (!phoneRegex.test(form.phone.replace(/\s+/g, ''))) {
      currentErrors.phone = "Please enter a valid 10-digit Indian phone number.";
    }

    // 4. Subject Validation
    if (!form.subject.trim()) {
      currentErrors.subject = "Subject cannot be blank.";
    }

    // 5. Message Validation
    if (!form.message.trim() || form.message.trim().length < 10) {
      currentErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  body: JSON.stringify(form),
});

    const result = await response.json();

    if (result.success) {
      alert(
        `Thank you ${form.name.trim()}. Your message has been sent successfully.`
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to send message.");
  }
};

  return (
    <>
      {/* 1. Global Navigation Header */}


      <div className="subha-contact-page">
        {/* Header Banner Hero Section */}
        <section className="contact-hero-banner">
          <div className="banner-overlay-content">
            <span className="pill-accent-tag">GET IN TOUCH</span>
            <h1>Contact <span>Us</span></h1>
            <p>We are here to help you build your dream space. Reach out to us for enquiries, collaborations or project consultations.</p>
          </div>
          <div className="banner-visual-frame">
            <img src={contactImg} alt="Subharambha Modern Elevation Layout" />
          </div>
        </section>

        {/* 2. Horizontal Quick Info Badges Grid */}
        <section className="quick-info-grid-row">
          <div className="info-badge-card">
            <div className="badge-icon-circle phone-clr">📞</div>
            <div className="badge-info-text">
              <h4>Call Us</h4>
              <p>+91 94394 67820</p>
              <p>+91 70087 11934</p>
            </div>
          </div>

          <div className="info-badge-card">
            <div className="badge-icon-circle email-clr">✉️</div>
            <div className="badge-info-text">
              <h4>Email Us</h4>
              <p>info@sdplconstructions.com</p>
              <p>sdplconstruction1@gmail.com</p>
            </div>
          </div>

          <div className="info-badge-card">
            <div className="badge-icon-circle geo-clr">📍</div>
            <div className="badge-info-text">
              <h4>Office Address</h4>
              <p>Plot No. 82/2164, Patrapada, Bhubaneswar,</p>
              <p>Khorda, Odisha - 751019</p>
            </div>
          </div>

          <div className="info-badge-card">
            <div className="badge-icon-circle time-clr">🕒</div>
            <div className="badge-info-text">
              <h4>Working Hours</h4>
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </section>

        {/* 3. Midsection: Interactive Form vs Live Map Embed Matrix */}
        <section className="interactive-split-matrix">
          {/* Contact Input Panel */}
          <div className="interactive-form-card">
            <h3>Send Us a Message</h3>
            <div className="accent-underline"></div>

            <form onSubmit={handleFormSubmit} className="subha-native-form" noValidate>
              <div className="input-field-duo">
                <div className="input-container-block">
                  <div className={`icon-input-wrapper ${errors.name ? 'input-error-border' : ''}`}>
                    <span className="field-glyph">👤</span>
                    <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleInput} />
                  </div>
                  {errors.name && <span className="error-text-span">{errors.name}</span>}
                </div>

                <div className="input-container-block">
                  <div className={`icon-input-wrapper ${errors.email ? 'input-error-border' : ''}`}>
                    <span className="field-glyph">✉️</span>
                    <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleInput} />
                  </div>
                  {errors.email && <span className="error-text-span">{errors.email}</span>}
                </div>
              </div>

              <div className="input-field-duo">
                <div className="input-container-block">
                  <div className={`icon-input-wrapper ${errors.phone ? 'input-error-border' : ''}`}>
                    <span className="field-glyph">📞</span>
                    <input type="tel" name="phone" placeholder="Your Phone" value={form.phone} onChange={handleInput} />
                  </div>
                  {errors.phone && <span className="error-text-span">{errors.phone}</span>}
                </div>

                <div className="input-container-block">
                  <div className={`icon-input-wrapper ${errors.subject ? 'input-error-border' : ''}`}>
                    <span className="field-glyph">📋</span>
                    <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleInput} />
                  </div>
                  {errors.subject && <span className="error-text-span">{errors.subject}</span>}
                </div>
              </div>

              <div className="input-container-block">
                <div className={`icon-input-wrapper textarea-modifier ${errors.message ? 'input-error-border' : ''}`}>
                  <span className="field-glyph-textarea">✏️</span>
                  <textarea name="message" rows="5" placeholder="Your Message" value={form.message} onChange={handleInput}></textarea>
                </div>
                {errors.message && <span className="error-text-span">{errors.message}</span>}
              </div>

              <button type="submit" className="form-action-trigger-btn">
                Send Message <span>🚀</span>
              </button>
            </form>
          </div>

          {/* Live Interactive Map Frame Component */}
          <div className="interactive-map-card">
            <iframe
              title="Subharambha Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d29946.847002866536!2d85.76723435000001!3d20.2440704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a19a9f8c47eb8d9%3A0x33d432026d6d543e!2sSubharambha%2C%20Plot%20no-%2082%2F2164%2C%20Kalinga%20Vihar%2C%20Patrapada%2C%20Bhubaneswar%2C%20Odisha%20751019!3m2!1d20.241950199999998!2d85.7656738!5e0!3m2!1sen!2sin!4v1783683961891!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* 4. Bottom Callback Strip */}
        <div className="footer-callback-strip-panel">
          <div className="strip-left-meta">
            <div className="callback-headset-icon">🎧</div>
            <div>
              <h4>Have any Questions?</h4>
              <p>We're happy to assist you!</p>
            </div>
          </div>
          {/* <div className="strip-center-meta">
            <span>Call us directly</span>
            <h3>+91 94394 67820</h3>
          </div> */}
          <div className="strip-right-action">
            <a href="tel:+919439467820" className="callback-action-btn">
           📞 Dial Now
          </a>
          </div>
        </div>
      </div>
      
      {/* 5. Global Brand Footer */}
      <Footer />
    </>
  );
}