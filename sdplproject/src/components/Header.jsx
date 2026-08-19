import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/header.css";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const isProjectsActive = location.pathname.startsWith("/projects");

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
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="SDPL Constructions" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>

          <div className={`dropdown ${isProjectsActive ? "active" : ""}`}>
            <button className="dropbtn" onClick={handleProjectsClick}>
              Projects
              <FaChevronDown className="arrow" />
            </button>

            <div className="dropdown-menu">
              <Link to="/projects/ongoing">Ongoing Projects</Link>
              <Link to="/projects/upcoming">Upcoming Projects</Link>
              <Link to="/projects/completed">Completed Projects</Link>
            </div>
          </div>

          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </nav>

        {/* Header Right Actions Container */}
        <div className="right-actions">
          <button
            className="enquire-btn"
            onClick={() => navigate("/login")}
          >
            Budget Calculator
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </button>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink>

        <button
          className="mobile-project-btn"
          onClick={() => setProjectOpen(!projectOpen)}
        >
          Projects
          <FaChevronDown className={projectOpen ? "rotate" : ""} />
        </button>

        {projectOpen && (
          <div className="mobile-submenu">
            <Link to="/projects/ongoing" onClick={() => setMenuOpen(false)}>
              Ongoing Projects
            </Link>
            <Link to="/projects/upcoming" onClick={() => setMenuOpen(false)}>
              Upcoming Projects
            </Link>
            <Link to="/projects/completed" onClick={() => setMenuOpen(false)}>
              Completed Projects
            </Link>
          </div>
        )}

        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>

        <button
          className="mobile-quote"
          onClick={() => {
            navigate("/login");
            setMenuOpen(false);
          }}
        >
          Budget Calculator
        </button>
      </div>
    </header>
  );
}