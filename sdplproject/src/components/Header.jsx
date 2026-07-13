import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();   // <-- This line was missing

  const isProjectsActive = location.pathname.startsWith("/projects");

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
            <button className="dropbtn">
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

        {/* Enquire Button */}
        <button
          className="enquire-btn"
          onClick={() => navigate("/login")}
        >
         Get Quote 
        </button>

      </div>
    </header>
  );
}