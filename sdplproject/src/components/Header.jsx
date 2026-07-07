import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

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

          <NavLink to="/about">About Us</NavLink>

          <div
            className="dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >

            <button className="dropbtn">
              Projects
              <FaChevronDown
                className={`arrow ${open ? "rotate" : ""}`}
              />
            </button>

            <div className={`dropdown-menu ${open ? "show" : ""}`}>

              <Link to="/projects/ongoing">
                Ongoing Projects
              </Link>

              <Link to="/projects/upcoming">
                Upcoming Projects
              </Link>

              <Link to="/projects/completed">
                Completed Projects
              </Link>

            </div>

          </div>

          <NavLink to="/gallery">Gallery</NavLink>

          <NavLink to="/contact">Contact Us</NavLink>

        </nav>

        {/* Button */}
        <button className="enquire-btn">
          Enquire Now
        </button>

      </div>

    </header>
  );
}