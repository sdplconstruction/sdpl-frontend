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
        threshold: 0.4,
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

    const duration = 2000;
    const interval = 20;

    const yearsStep = 7 / (duration / interval);
const projectsStep = 21 / (duration / interval);
const clientsStep = 100 / (duration / interval);

    let y = 0;
    let p = 0;
    let c = 0;

    const timer = setInterval(() => {
      y += yearsStep;
      p += projectsStep;
      c += clientsStep;

      setYears(y >= 7 ? 7 : Math.floor(y));
setProjects(p >= 21 ? 21 : Math.floor(p));
setClients(c >= 100 ? 100 : Math.floor(c));

if (y >= 7 && p >= 21 && c >= 100) {
  clearInterval(timer);
}
    }, interval);

    return () => clearInterval(timer);
  }, [startCounter]);

  return (
    <section className="about" ref={aboutRef}>

      <div className="about-image">
        <img src={aboutImage} alt="SDPL Construction" />
      </div>

      <div className="about-content">

        <p className="about-tag">
          ABOUT SDPL
        </p>

        <h2>
          Building Excellence,
          <br />
          One Project at a Time.
        </h2>

        <p className="about-text">
          SDPL Constructions is committed to delivering premium
          residential, commercial and industrial projects with
          superior quality, modern engineering and transparent
          execution. Our experienced professionals ensure every
          project is completed with precision, safety and trust.
        </p>

        <div className="about-stats">

          <div>
            <h3>{years}+</h3>
            <span>Years Experience</span>
          </div>

          <div>
            <h3>{projects}+</h3>
            <span>Projects Delivered</span>
          </div>

          <div>
            <h3>{clients}%</h3>
            <span>Client Satisfaction</span>
          </div>

        </div>

        <Link to="/about" className="about-btn">
  Know More
</Link>

      </div>

    </section>
  );
}