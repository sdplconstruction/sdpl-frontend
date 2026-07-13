import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/privacypolicy.css';

// React Icons matching the visual design tags
import {
  FaUserShield,
  FaRegFileAlt,
  FaHandshakeSlash,
  FaLock,
  FaUserCheck,
  FaCookieBite,
  FaSyncAlt,
  FaPhoneVolume,
  FaEnvelope
} from 'react-icons/fa';

import privacyBgImg from '../assets/hero.jpeg';

const PrivacyPolicy = () => {
  return (
    <>
      

      {/* --- ASYMMETRIC MODERN HERO BANNER --- */}
      <div className="sdpl-privacy-hero-container">
        <div className="privacy-hero-inner-split">
          <div className="privacy-hero-text-block">
            <div className="privacy-priority-tag">
              <FaUserShield className="priority-icon" /> YOUR PRIVACY, OUR PRIORITY
            </div>
            <h1>Privacy Policy</h1>
            <p>
              At SDPL Construction, we value your privacy and are committed to protecting your personal information.
              This policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
          <div
            className="privacy-hero-image-block"
            style={{ backgroundImage: `url(${privacyBgImg})` }}
          ></div>
        </div>
      </div>

      {/* --- BREADCRUMB NAVIGATION STRIP --- */}
      <div className="privacy-breadcrumb-strip">
        <div className="breadcrumb-wrapper">
          <Link to="/">🏠 Home</Link> <span>&gt;</span> <span className="active-crumb">Privacy Policy</span>
        </div>
      </div>

      {/* --- CORE DATA PRESENTATION CONTAINER --- */}
      <div className="privacy-document-layout">

        <div className="document-section-intro">
          <h2>How We Protect & Use Your Information</h2>
          <div className="golden-accent-divider"><span></span></div>
          <p>This Privacy Policy applies to all information collected through our website and services provided by SDPL Construction.</p>
        </div>

        {/* List Matrix Row 1 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-mint">
              <FaRegFileAlt />
            </div>
            <h3>1. Information We Collect</h3>
          </div>
          <div className="row-card-center-text">
            <p>We collect personal information such as your name, email address, phone number, and project details when you contact us or use our services.</p>
          </div>
          {/* <div className="row-card-right-num">01</div> */}
        </div>

        {/* List Matrix Row 2 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-blue">
              <FaUserShield />
            </div>
            <h3>2. How We Use Your Information</h3>
          </div>
          <div className="row-card-center-text">
            <p>Your information is used to provide and improve our services, respond to your inquiries, and communicate with you regarding our projects or service requests.</p>
          </div>
          {/* <div className="row-card-right-num">02</div> */}
        </div>

        {/* List Matrix Row 3 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-purple">
              <FaHandshakeSlash />
            </div>
            <h3>3. Information Sharing</h3>
          </div>
          <div className="row-card-center-text">
            <p>We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website or delivering services, under confidentiality agreements.</p>
          </div>
          {/* <div className="row-card-right-num">03</div> */}
        </div>

        {/* List Matrix Row 4 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-orange">
              <FaLock />
            </div>
            <h3>4. Data Security</h3>
          </div>
          <div className="row-card-center-text">
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          </div>
          {/* <div className="row-card-right-num">04</div> */}
        </div>

        {/* List Matrix Row 5 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-teal">
              <FaUserCheck />
            </div>
            <h3>5. Your Rights</h3>
          </div>
          <div className="row-card-center-text">
            <p>You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications from us.</p>
          </div>
          {/* <div className="row-card-right-num">05</div> */}
        </div>

        {/* List Matrix Row 6 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-yellow">
              <FaCookieBite />
            </div>
            <h3>6. Cookies</h3>
          </div>
          <div className="row-card-center-text">
            <p>Our website uses cookies to enhance user experience and analyze website traffic. You can choose to disable cookies through your browser settings.</p>
          </div>
          {/* <div className="row-card-right-num">06</div> */}
        </div>

        {/* List Matrix Row 7 */}
        <div className="privacy-row-card">
          <div className="row-card-left-meta">
            <div className="row-card-icon-frame bg-red">
              <FaSyncAlt />
            </div>
            <h3>7. Changes to This Policy</h3>
          </div>
          <div className="row-card-center-text">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.</p>
          </div>
          {/* <div className="row-card-right-num">07</div> */}
        </div>

        {/* --- BOTTOM QUESTIONS CONTACT BANNER --- */}
        <div className="privacy-contact-cta-banner">
          <div className="cta-banner-left">
            <div className="cta-phone-icon-bubble">
              <FaPhoneVolume />
            </div>
            <div className="cta-banner-text-block">
              <h3>Have Questions?</h3>
              <p>If you have any questions about this Privacy Policy, feel free to contact us.</p>
            </div>
          </div>
          <Link to="/contact-us" className="cta-banner-button">
            <FaEnvelope /> Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;