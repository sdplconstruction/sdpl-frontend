import { useState, useEffect, useRef } from "react";
import aboutImage from "../assets/about.png";
import "../styles/about.css";
import { Link } from "react-router-dom";

export default function About() {
  // Counter States
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);

  // Start animation only when visible
  const [startCounter, setStartCounter] = useState(false);

  // Reference to About section
  const aboutRef = useRef(null);

  // Detect when About section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          observer.disconnect(); // Run only once
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter Animation
  useEffect(() => {
    if (!startCounter) return;

    const duration = 1800; 
    const interval = 20;
    const totalSteps = duration / interval;

    const yearsStep = 10 / totalSteps;
    const projectsStep = 21 / totalSteps;
    const clientsStep = 100 / totalSteps;

    let y = 0;
    let p = 0;
    let c = 0;

    const timer = setInterval(() => {
      y += yearsStep;
      p += projectsStep;
      c += clientsStep;

      const currentY = y >= 10 ? 10 : Math.floor(y);
      const currentP = p >= 21 ? 21 : Math.floor(p);
      const currentC = c >= 100 ? 100 : Math.floor(c);

      setYears(currentY);
      setProjects(currentP);
      setClients(currentC);

      if (currentY === 10 && currentP === 21 && currentC === 100) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [startCounter]);

  return (
    <section className="about" ref={aboutRef}>
      <div className="about-image">
        <img src={aboutImage} alt="SDPL Construction Builders" />
      </div>

      <div className="about-content">
        <div className="about-tag-container">
          <span className="about-tag">ABOUT SDPL</span>
        </div>

        <h2>
          Building Excellence,<br />
          One Project at a Time.
        </h2>

        <p className="about-text">
          SDPL Constructions is one of Odisha's trusted builder with{" "}
          <span className="about-highlight">10+ years of expertise</span>. 
          Powered by <span className="about-highlight-red">Aramva</span>, we deliver superior residential, 
          commercial, and industrial projects with total transparency and timely execution.
        </p>

        <div className="about-stats">
          <div className="stat-card">
            <h3>{years}+</h3>
            <span>Years Experience</span>
          </div>

          <div className="stat-card">
            <h3>{projects}+</h3>
            <span>Projects Delivered</span>
          </div>

          <div className="stat-card">
            <h3>{clients}%</h3>
            <span>Client Satisfaction</span>
          </div>
        </div>

        <Link to="/about" className="about-btn">
          <span>Know More</span>
          <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}