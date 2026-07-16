import { useState, useEffect } from "react";

import hero from "../assets/hero.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.jpeg";
import hero4 from "../assets/hero4.jpeg";


import SearchPanel from "../components/SearchPanel";

import "../styles/hero.css";

export default function Hero() {

  const images = [
    hero,
    hero2,
    hero3,
    hero4,

  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % images.length
      );

    }, 5000); // every 5 seconds

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="hero">

      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Construction"
          className={`hero-image ${
            index === currentImage ? "active" : ""
          }`}
        />
      ))}

      <div className="hero-overlay">

        <div className="hero-content">

        <div className="hero-tag">
  <span className="hero-tag-red">
    BUILD WITH PRIDE
  </span>

  <span className="hero-separator">|</span>

  <span className="hero-tag-white">
    DELIVER WITH CONFIDENCE
  </span>
</div>
          <h1>
            Building Dreams,
            <br />
            <span>Creating Lasting Value.</span>
          </h1>

          <p className="hero-text">
            From residential homes to commercial buildings,
            SDPL delivers quality construction with trusted engineering and transparent pricing.
          </p>

        </div>

      </div>

      <SearchPanel />


    </section>
  );
}