import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/footer.css';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaChevronRight,
  FaBuilding
} from 'react-icons/fa';

import { FaHelmetSafety } from 'react-icons/fa6';
import footerLogo from '../assets/logo.png';

// Import your custom logo assets
import facebookIcon from "../assets/facebooklogo.svg";
import instagramIcon from "../assets/instagramlogo.png";
import youtubeIcon from "../assets/youtubelogo.jpg";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to projects section if already on Home, otherwise redirect with the hash tag
  const handleProjectsClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/" || location.pathname === "/home") {
      const element = document.getElementById("homepage-projects-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#homepage-projects-section");
    }
  };

  return (
    <footer className="sdpl-footer">

      {/* --- TOP CTA BANNER STRIP --- */}
      <div className="footer-cta-strip">
        <div className="cta-left">
          <div className="cta-icon-wrapper">
            <FaHelmetSafety className="cta-react-icon" />
          </div>
          <div className="cta-text">
            <h3>Have a project in mind?</h3>
            <p>Let's build something great together.</p>
          </div>
        </div>

        <div className="cta-divider"></div>

        <div className="cta-right">
          <Link to="/execution-plan" className="footer-quote-btn">
            <FaBuilding /> EXPLORE OUR WORKFLOW
          </Link>
        </div>
      </div>

      {/* --- MAIN LINKS MATRIX --- */}
      <div className="footer-main-grid">

        {/* Column 1: Brand & Socials */}
        <div className="footer-brand-col">
          <div className="footer-logo-block">
            <img src={footerLogo} alt="SDPL Construction Logo" className="footer-logo" />
          </div>
          <p className="brand-description">
            SDPL Construction is committed to delivering high-quality construction solutions with integrity, innovation, and excellence. Building your dreams, brick by brick.
          </p>

          <div className="footer-social-row">
            <a href="https://www.facebook.com/profile.php?id=61588532075702" target="_blank" rel="noopener noreferrer" className="social-circle" title="Facebook">
              <img src={facebookIcon} alt="Facebook" className="social-logo-img" />
            </a>
            <a href="https://www.instagram.com/sdplconstruction/" target="_blank" rel="noopener noreferrer" className="social-circle" title="Instagram">
              <img src={instagramIcon} alt="Instagram" className="social-logo-img" />
            </a>
            <a href="https://www.youtube.com/@sdplconstruction" target="_blank" rel="noopener noreferrer" className="social-circle" title="YouTube">
              <img src={youtubeIcon} alt="YouTube" className="social-logo-img" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links-col">
          <h3>QUICK LINKS</h3>
          <div className="red-underline"></div>
          <ul>
            <li><Link to="/"> <FaChevronRight className="link-arrow" /> Home</Link></li>
            <li><Link to="/about"> <FaChevronRight className="link-arrow" /> About Us</Link></li>
            <li><Link to="/services"> <FaChevronRight className="link-arrow" /> Our Services</Link></li>

            <li>
              <a href="#homepage-projects-section" onClick={handleProjectsClick}>
                <FaChevronRight className="link-arrow" /> Projects
              </a>
            </li>

            <li><Link to="/login"> <FaChevronRight className="link-arrow" /> Budget Planner</Link></li>
            <li><Link to="/contact-us"> <FaChevronRight className="link-arrow" /> Contact Us</Link></li>

            {/* <li><Link to="/construction-company-bhubaneswar-cuttack"> <FaChevronRight className="link-arrow" /> Construction Company in Bhubaneswar & Cuttack</Link></li> */}


            {/* NEW LANDING PAGE LINK */}

          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div className="footer-links-col">
          <h3>OUR SERVICES</h3>
          <div className="red-underline"></div>

          <ul>
             <li>
              <Link to="/services#civil-construction">
                <FaChevronRight className="link-arrow" />
                Construction
              </Link>
            </li>
            <li>
              <Link to="/services#interior-design">
                <FaChevronRight className="link-arrow" />
                Interior Design
              </Link>
            </li>
            <li>
              <Link to="/services#building-approvals">
                <FaChevronRight className="link-arrow" />
                Building Approvals
              </Link>
            </li>

            <li>
              <Link to="/services#structural-design">
                <FaChevronRight className="link-arrow" />
                Structural Design
              </Link>
            </li>

            <li>
              <Link to="/services#layout-ideas">
                <FaChevronRight className="link-arrow" />
                Layout Ideas
              </Link>
            </li>

            <li>
              <Link to="/services#plan-approval">
                <FaChevronRight className="link-arrow" />
                Plan Approval
              </Link>
            </li>

            <li>
              <Link to="/services#elevation-3d">
                <FaChevronRight className="link-arrow" />
                Elevation <br />
                3D Model & Videos
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-links-col contact-info-col">
          <h3>CONTACT US</h3>
          <div className="red-underline"></div>
          <ul className="contact-details-list">
            <li>
              <FaMapMarkerAlt className="contact-react-icon" />
              <p>Plot No:- 82/2164, Patrapada<br />Bhubaneswar, Khorda, Odisha - 751019</p>
            </li>
            <li>
              <FaPhoneAlt className="contact-react-icon" />
              <p>+91 94394 67820<br />+91 70087 11934</p>
            </li>
            <li>
              <FaEnvelope className="contact-react-icon" />
              <p>info@sdplconstructions.com<br/>sdplconstruction1@gmail.com</p>
            </li>
            <li>
              <FaGlobe className="contact-react-icon" />
              <p>www.sdplconstructions.com</p>
            </li>
          </ul>
        </div>

      </div>

      {/* --- BOTTOM RIGHTS PANEL --- */}
      <div className="footer-bottom-bar">
        <p className="copyright-txt">© 2026 SDPL Construction. All Rights Reserved.</p>
        <div className="bottom-legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="pipe-divider">|</span>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}