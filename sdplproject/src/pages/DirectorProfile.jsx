import "../styles/directorprofile.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTie,
} from "react-icons/fa";

export default function DirectorProfile() {
  return (
    <section className="director-profile">
      <div className="director-container">
        
        {/* Profile Card / Photo Frame */}
        <div className="director-image-placeholder">
          <div className="avatar-wrapper">
            <FaUserTie />
          </div>
          <p>Director Photo</p>
        </div>

        {/* Profile Details & Contact Info */}
        <div className="director-content">
          <div className="content-border">
            <span className="director-tag">DIRECTOR</span>

            <h1>Mr. Director Name</h1>
            <h3>Founder & Managing Director</h3>

            <p className="director-description">
              Welcome to SDPL Constructions. We believe every home should reflect quality, 
              trust, and craftsmanship. Our mission is to deliver exceptional construction 
              services with complete transparency and customer satisfaction.
            </p>

            <p className="director-quote">
              "Building trust through quality construction."
            </p>

            <div className="director-details">
              <a href="tel:+919876543210" className="detail-link">
                <FaPhoneAlt />
                <span>+91 9876543210</span>
              </a>

              <a href="mailto:director@sdpl.com" className="detail-link">
                <FaEnvelope />
                <span>director@sdpl.com</span>
              </a>

              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>Bhubaneswar, Odisha</span>
              </div>

              <a href="https://www.sdplconstructions.com" target="_blank" rel="noopener noreferrer" className="detail-link">
                <FaGlobe />
                <span>www.sdplconstructions.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}