import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/termandcondition.css';
// 1. IMPORT YOUR IMAGE HERE:
import legalBgImg from '../assets/hero2.jpeg';

const TermAndCondition = () => {
  const [activeSection, setActiveSection] = useState('terms-intro');

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      

      {/* 2. PASS THE IMAGE AS A DYNAMIC CSS VARIABLE */}
      <div
        className="legal-hero-banner"
        style={{ '--banner-bg': `url(${legalBgImg})` }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <span className="legal-badge">SDPL TRUST & SAFETY</span>
          <h1>Terms & Conditions</h1>
          <p>Transparent, fair, and simple terms governing your calculations, plans, and workspace usage.</p>
        </div>
      </div>

      <div className="legal-wrapper">
        {/* Interactive Sticky Navigation Sidebar */}
        <aside className="legal-sidebar">
          <h3>Document Index</h3>
          <ul className="sidebar-links-list">
            <li className={activeSection === 'terms-intro' ? 'active' : ''}>
              <a href="#terms-intro" onClick={(e) => { e.preventDefault(); handleNavClick('terms-intro'); }}>
                <span className="nav-num">01</span> Agreement to Terms
              </a>
            </li>
            <li className={activeSection === 'terms-accounts' ? 'active' : ''}>
              <a href="#terms-accounts" onClick={(e) => { e.preventDefault(); handleNavClick('terms-accounts'); }}>
                <span className="nav-num">02</span> User Accounts & Security
              </a>
            </li>
            <li className={activeSection === 'terms-ip' ? 'active' : ''}>
              <a href="#terms-ip" onClick={(e) => { e.preventDefault(); handleNavClick('terms-ip'); }}>
                <span className="nav-num">03</span> Intellectual Property
              </a>
            </li>
            <li className={activeSection === 'privacy-data' ? 'active' : ''}>
              <a href="#privacy-data" onClick={(e) => { e.preventDefault(); handleNavClick('privacy-data'); }}>
                <span className="nav-num">04</span> Data We Collect
              </a>
            </li>
            <li className={activeSection === 'privacy-rights' ? 'active' : ''}>
              <a href="#privacy-rights" onClick={(e) => { e.preventDefault(); handleNavClick('privacy-rights'); }}>
                <span className="nav-num">05</span> Your Data Rights
              </a>
            </li>
          </ul>
          <div className="last-updated-badge">
            <span>📅 Revised: July 2026</span>
          </div>
        </aside>

        {/* Legal Body Text Container */}
        <main className="legal-content-body">
          {/* Section 1 */}
          <section id="terms-intro" className="legal-section">
            <div className="section-header">
              <span className="section-icon">🤝</span>
              <h2>1. Agreement to Terms</h2>
            </div>
            <div className="tldr-summary-box">
              <div className="tldr-tag">QUICK SUMMARY</div>
              <p>By browsing, estimating construction metrics, or using this planning calculator, you agree to follow our service rules.</p>
            </div>
            <p className="legal-text-p">
              Welcome to our Budget Planner. By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the calculation interfaces or build reports.
            </p>
          </section>

          {/* Section 2 */}
          <section id="terms-accounts" className="legal-section">
            <div className="section-header">
              <span className="section-icon">🔒</span>
              <h2>2. User Accounts & Security</h2>
            </div>
            <div className="tldr-summary-box">
              <div className="tldr-tag">QUICK SUMMARY</div>
              <p>You are fully responsible for the setups and actions that happen under your account workspace credentials.</p>
            </div>
            <p className="legal-text-p">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your platform access.
            </p>
          </section>

          {/* Section 3 */}
          <section id="terms-ip" className="legal-section">
            <div className="section-header">
              <span className="section-icon">🏗️</span>
              <h2>3. Intellectual Property</h2>
            </div>
            <div className="tldr-summary-box">
              <div className="tldr-tag">QUICK SUMMARY</div>
              <p>All formulas, styling, calculator design modules, layouts, and brand logos belong entirely to us.</p>
            </div>
            <p className="legal-text-p">
              The service and its original content, features, layout modules, and calculation logic engines are and will remain the exclusive property of our organization and its licensors.
            </p>
          </section>

          {/* Section 4 */}
          <section id="privacy-data" className="legal-section">
            <div className="section-header">
              <span className="section-icon">📊</span>
              <h2>4. Data We Collect</h2>
            </div>
            <div className="tldr-summary-box">
              <div className="tldr-tag">QUICK SUMMARY</div>
              <p>We save account info and calculation selections purely to generate your dynamic construction estimates.</p>
            </div>
            <p className="legal-text-p">
              We collect several different types of information for various purposes to provide and improve our Service to you. This includes personal identifiers (such as email addresses) and technical payload specifications (such as input area constraints and selected finish qualities).
            </p>
          </section>

          {/* Section 5 */}
          <section id="privacy-rights" className="legal-section">
            <div className="section-header">
              <span className="section-icon">🛡️</span>
              <h2>5. Your Data Rights</h2>
            </div>
            <div className="tldr-summary-box">
              <div className="tldr-tag">QUICK SUMMARY</div>
              <p>You own your data. You can request a copy of your records or permanently wipe your account configurations at any time.</p>
            </div>
            <p className="legal-text-p">
              We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. Whenever made possible, you can update your Personal Data directly within your account settings section.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default TermAndCondition;