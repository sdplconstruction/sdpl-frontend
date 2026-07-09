import React, { useState } from 'react';
import '../styles/ContactUs.css';
import contactImg from '../assets/contactus.jpg';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${form.name}. Your message regarding "${form.subject}" has been delivered to the Subharambha construction desk.`);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="subha-contact-page">
      {/* 1. Header Banner Hero Section */}
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
            <p>+91 12345 67890</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className="info-badge-card">
          <div className="badge-icon-circle email-clr">✉️</div>
          <div className="badge-info-text">
            <h4>Email Us</h4>
            <p>info@subharambha.com</p>
            <p>sales@subharambha.com</p>
          </div>
        </div>

        <div className="info-badge-card">
          <div className="badge-icon-circle geo-clr">📍</div>
          <div className="badge-info-text">
            <h4>Office Address</h4>
            <p>Plot No. 123, Patia, Bhubaneswar,</p>
            <p>Odisha - 751024</p>
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

          <form onSubmit={handleFormSubmit} className="subha-native-form">
            <div className="input-field-duo">
              <div className="icon-input-wrapper">
                <span className="field-glyph">👤</span>
                <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleInput} />
              </div>
              <div className="icon-input-wrapper">
                <span className="field-glyph">✉️</span>
                <input type="email" name="email" placeholder="Your Email" required value={form.email} onChange={handleInput} />
              </div>
            </div>

            <div className="input-field-duo">
              <div className="icon-input-wrapper">
                <span className="field-glyph">📞</span>
                <input type="tel" name="phone" placeholder="Your Phone" required value={form.phone} onChange={handleInput} />
              </div>
              <div className="icon-input-wrapper">
                <span className="field-glyph">📋</span>
                <input type="text" name="subject" placeholder="Subject" required value={form.subject} onChange={handleInput} />
              </div>
            </div>

            <div className="icon-input-wrapper textarea-modifier">
              <span className="field-glyph-textarea">✏️</span>
              <textarea name="message" rows="5" placeholder="Your Message" required value={form.message} onChange={handleInput}></textarea>
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
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3015.49611172929!2d85.76687009617572!3d20.24346162142164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3a19a9f8c47eb8d9%3A0x33d432026d6d543e!2sAramva.in%2C%20Plot%20no-%2082%2F2164%2C%20Kalinga%20Vihar%2C%20Patrapada%2C%20Bhubaneswar%2C%20Odisha%20751019!3m2!1d20.241950199999998!2d85.7656738!4m5!1s0x3a19a9f8c47eb8d9%3A0x33d432026d6d543e!2sAramva.in%2C%20Plot%20no-%2082%2F2164%2C%20Kalinga%20Vihar%2C%20Patrapada%2C%20Bhubaneswar%2C%20Odisha%20751019!3m2!1d20.241950199999998!2d85.7656738!5e0!3m2!1sen!2sin!4v1783509365625!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* 4. Bottom Footer Callback Strip Banner */}
      <footer className="footer-callback-strip-panel">
        <div className="strip-left-meta">
          <div className="callback-headset-icon">🎧</div>
          <div>
            <h4>Have any Questions?</h4>
            <p>We're happy to assist you!</p>
          </div>
        </div>
        <div className="strip-center-meta">
          <span>Call us directly</span>
          <h3>+91 12345 67890</h3>
        </div>
        <div className="strip-right-action">
          <a href="tel:+911234567890" className="callback-action-btn">
            📞 Request a Callback
          </a>
        </div>
      </footer>
    </div>
  );
}