import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroVideo from "../videos/background.mp4";
import SearchPanel from "./SearchPanel";
import "../styles/hero.css";

const slidesData = [
  {
    lang: "en",
    tagRed: "BUILD WITH PRIDE",
    tagWhite: "DELIVER WITH CONFIDENCE",
    headingLine1: "Building Dreams,",
    headingLine2: "Creating Lasting Value."
  },
  {
    lang: "or",
    tagRed: "ଗର୍ବର ସହିତ ନିର୍ମାଣ",
    tagWhite: "ଭରସା ସହିତ ସଫଳତା",
    headingLine1: "ଘର ବନାଇବା ଆହୁରି ହେଲା ସହଜ,",
    headingPart1: "ନିଜ ସ୍ୱପ୍ନର ଘର ନିଜ ",
    highlightWord: "Budget",
    headingPart2: " ଭିତରେ ବନାନ୍ତୁ।"
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
        setFade(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slidesData[currentSlide];
  const isOdia = slide.lang === "or";

  return (
    <section className="hero">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Overlay */}
      <div className="hero-overlay">
        <div className={`hero-content ${fade ? "fade-in" : "fade-out"}`}>
          <div className="hero-tag">
            <span className={isOdia ? "hero-tag-white" : "hero-tag-red"}>{slide.tagRed}</span>
            <span className="hero-separator">|</span>
            <span className="hero-tag-white">{slide.tagWhite}</span>
          </div>

          <h1>
            {slide.headingLine1}
            <br />
            {isOdia ? (
              <>
                {slide.headingPart1}
                <span className="budget-green">{slide.highlightWord}</span>
                {slide.headingPart2}
              </>
            ) : (
              <span className="text-all-white">{slide.headingLine2}</span>
            )}
          </h1>

          {/* Prominent Featured CTA Button */}
          <div className="hero-cta-buttons">
            <button
              className="hero-btn featured-calc-btn"
              onClick={() => navigate("/budget-planner")}
            >
              BuildSmart365 Calculator
            </button>
          </div>
        </div>
      </div>

      {/* <SearchPanel /> */}
    </section>
  );
}