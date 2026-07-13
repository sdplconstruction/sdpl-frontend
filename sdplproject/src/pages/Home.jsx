

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

import Hero from "../components/Hero";
import About from "../components/About";
import ProjectSection from "../components/ProjectSection";
import Footer from "../components/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    // If the URL has the #homepage-projects-section hash, scroll smoothly to it
    if (location.hash === "#homepage-projects-section") {
      setTimeout(() => {
        const element = document.getElementById("homepage-projects-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200); // Small timeout to ensure elements are rendered first
    }
  }, [location]);

  return (
    <>
     

      <Hero />
      <About />

      {/* WRAPPED IN AN ID CONTAINER FOR SMOOTH LINK TARGETING */}
      <div id="homepage-projects-section">
        <ProjectSection
          title="Ongoing Projects"
          category="ongoing"
        />

        <ProjectSection
          title="Upcoming Projects"
          category="upcoming"
        />

        <ProjectSection
          title="Completed Projects"
          category="completed"
        />
      </div>

      <Footer />
    </>
  );
}

export default App;