import aboutBanner from "../assets/about-banner.png";
import {
  FaLightbulb,
  FaAward,
  FaShieldAlt,
  FaHardHat,
  FaHandshake,
  FaCheckCircle,
  FaComments,
  FaDraftingCompass,
  FaClipboardCheck,
  FaSearch,
  FaKey,
} from "react-icons/fa";
import director1Img from "../assets/Team/ManagingDirector1.jpeg";
import director2Img from "../assets/Team/ManagingDirector2.jpeg";
import financedirectorImg from "../assets/Team/FinanceDirector.jpeg";
import procurementdirectorImg from "../assets/Team/ProcurementDirector.jpeg";
import salesheadImg from "../assets/Team/SalesHead.jpeg";
import projectarchitectImg from "../assets/Team/ProjectArchitect.jpeg";
import civilengineerImg from "../assets/Team/CivilEngineer.jpeg";

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/aboutpage.css";

export default function AboutPage() {
  const navigate = useNavigate();
  const teamMembers = [
    { name: "Mr. Babaji Charan Mallick", designation: "Managing Director", image: director1Img },
    { name: "Mrs. Rajashree Swain", designation: "Managing Director", image: director2Img },
    { name: "Mr. Sushant Mallick", designation: "CFO", image: financedirectorImg },
    { name: "Mr. Muktikant Swain", designation: "COO", image: procurementdirectorImg },
    { name: "Mr. Jayant Kumar Rout", designation: "Sales Head", image: salesheadImg },
    { name: "Mr. Priyaranjan Behera", designation: "Chief Architect", image:projectarchitectImg },
    { name: "Mr. Debasish Mohakud", designation: "Civil Engineer", image:civilengineerImg },
    { name: "Mrs. Sasmita Nayak", designation: "Legal Advisor", image:null},
     { name: "Mr. Suryakumar", designation: "Sr. Engg.", image:null},


  ];

  return (
    <div className="about-page-wrapper">
      
      {/* HERO SECTION */}
      <section className="about-banner">
        <img src={aboutBanner} alt="SDPL Banner" className="about-banner-image" />
        <div className="about-banner-overlay" />
        <div className="about-banner-content animate-fade-up">
          <p className="about-banner-tag">About Us</p>
          <h1>Building Excellence, <br />One Project at a Time.</h1>
          <p>
            SDPL Constructions delivers premium residential, commercial, and industrial projects with an unyielding commitment to quality, innovation, and total transparency.
          </p>
        </div>
      </section>

      {/* COMPANY INTRO & VISION */}
      <section className="intro-section">
        <div className="intro-left animate-fade-left">
          <p className="section-tag">WHO WE ARE</p>
          <h2>Creating Spaces That Inspire Generations.</h2>
          <p className="desc-paragraph">
            SDPL Constructions specializes in residential, commercial, and industrial construction with a core focus on structural reliability, architectural elegance, and punctual project completion.
          </p>
          <p className="desc-paragraph">
            Every project is mapped carefully down to the finest detail, executed with absolute precision, and handed over with seamless operational clarity to guarantee lasting client delight.
          </p>
        </div>

        {/* FOUNDERS' VISION */}
        <div className="vision-card animate-fade-right">
          <h3>Founders' Vision</h3>
          <div className="founders-flex">
            {/* Founder 1 */}
            <div className="founder-block">
              <div className="founder-img-wrapper">
                <img src={director1Img} alt="Mr. Babaji Charan Mallick" />
              </div>
              <h4>Mr. Babaji Charan Mallick</h4>
              <span className="founder-role">Managing Director</span>
            </div>

            {/* Founder 2 */}
            <div className="founder-block">
              <div className="founder-img-wrapper">
                <img src={director2Img} alt="Mrs. Rajashree Swain" />
              </div>
              <h4>Mrs. Rajashree Swain</h4>
              <span className="founder-role">Managing Director</span>
            </div>
          </div>
          <div className="vision-quote">
            <p>
              "Our vision is to build trusted landmarks across Odisha through
              innovation, transparency, and uncompromising quality while
              transforming the construction experience with <strong>Aramva</strong>—
              from planning and budgeting to project completion."
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header animate-fade-up">
            <p className="section-tag-center">EXPERTISE BEHIND SDPL</p>
            <h2>Meet Our Leadership Team</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="team-img-circle">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <span className="placeholder-avatar">👤</span>
                  )}
                </div>
                <h4>{member.name}</h4>
                <span className="team-role">{member.designation}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="values-section">
        <div className="section-header animate-fade-up">
          <p className="section-tag-center">OUR VALUES</p>
          <h2>Company Vision & Core Values</h2>
          <p className="section-subtitle-dark">
            Our vision is to remain Odisha's benchmark construction partner through continuous technological integration, rigid quality metrics, and ethical practices.
          </p>
        </div>
        <div className="values-grid">
          {[
            { title: "Innovation", icon: <FaLightbulb />, desc: "Integrating advanced building frameworks and green materials." },
            { title: "Quality", icon: <FaAward />, desc: "Zero compromise on standard configurations and engineering testing." },
            { title: "Integrity", icon: <FaShieldAlt />, desc: "Transparent workflows and contracts without hidden variables." },
            { title: "Safety", icon: <FaHardHat />, desc: "Rigid on-site health standards protecting our vast field workforce." },
            { title: "Transparency", icon: <FaHandshake />, desc: "Consistent project phase updates clear to all stakeholders." },
            { title: "Commitment", icon: <FaCheckCircle />, desc: "Punctual handover schedules prioritizing clients' timelines." },
          ].map((item, index) => (
            <div key={index} className="value-card animate-scale" style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="value-icon-box">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONSTRUCTION PROCESS */}
      <section className="workflow-section">
        <div className="section-container">
          <div className="section-header animate-fade-up">
            <p className="section-tag-center">OUR WORKFLOW</p>
            <h2>How We Build Your Dream</h2>
          </div>
          <div className="workflow-grid">
            {[
              { no: "01", title: "Consultation", icon: <FaComments />, text: "Deep dive into your structural concepts and project constraints." },
              { no: "02", title: "Planning", icon: <FaDraftingCompass />, text: "Architectural, mechanical, and heavy structural engineering designs." },
              { no: "03", title: "Approvals", icon: <FaClipboardCheck />, text: "Navigating regulatory protocols and documentation smoothly." },
              { no: "04", title: "Construction", icon: <FaHardHat />, text: "Premium execution phase backed by rigorous supervision." },
              { no: "05", title: "Inspection", icon: <FaSearch />, text: "Multi-point structural audits guaranteeing maximum safety compliance." },
              { no: "06", title: "Handover", icon: <FaKey />, text: "Handing over pristine spaces optimized for immediate occupancy." },
            ].map((step, index) => (
              <div key={index} className="workflow-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="workflow-card-header">
                  <div className="workflow-number">{step.no}</div>
                  <div className="workflow-line" />
                </div>
                <div className="workflow-icon-circle">{step.icon}</div>
                <h3>{step.title}</h3>
                <div className="workflow-divider" />
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING RED STATS & CTA BOX CONTAINER */}
      <section className="about-cta-stats-section">
        <div className="about-cta-stats-banner">
          {/* Top half: Statistics Grid */}
          <div className="stats-grid">
            {[
              { number: "10+", title: "Years Experience" },
              { number: "21+", title: "Projects Delivered" },
              { number: "100%", title: "Client Satisfaction" },
              { number: "50+", title: "Expert Professionals" },
            ].map((item, index) => (
              <div key={index} className="stat-box animate-scale">
                <h2>{item.number}</h2>
                <p>{item.title}</p>
              </div>
            ))}
          </div>

          {/* Bottom half: CTA Information & Button */}
          <div className="cta-content animate-fade-up">
            <h2>Ready to Build Your Dream Project?</h2>
            <p>
              Whether it's a sleek modern residential layout, an expansive commercial plaza, or industrial infrastructure, SDPL turns blueprints into landmarks.
            </p>
            <button className="cta-btn-white" onClick={() => navigate("/contact-us")}>
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}