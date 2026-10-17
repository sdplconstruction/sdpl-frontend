import React from "react";
import {
  FaCalculator,
  FaDraftingCompass,
  FaUserCheck,
  FaAward,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

import "../styles/WhyChooseUs.css";

const features = [
  {
    id: 1,
    icon: <FaCalculator />,
    title: "Transparent Budgeting",
    description:
      "Get accurate estimates upfront using our BuildSmart365 calculator—no hidden charges or unexpected costs during construction.",
  },
  {
    id: 2,
    icon: <FaDraftingCompass />,
    title: "Customized Architectural Designs",
    description:
      "Tailored floor plans and modern 3D elevations designed to suit your lifestyle and maximize space utilization.",
  },
  {
    id: 3,
    icon: <FaClock />,
    title: "On-Time Project Delivery",
    description:
      "Rigorous project tracking ensures your dream home or commercial space is handed over on schedule.",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Uncompromising Quality Control",
    description:
      "We source certified high-grade raw materials and follow multi-tier quality checks across every phase of construction.",
  },
  {
    id: 5,
    icon: <FaUserCheck />,
    title: "Dedicated Project Managers",
    description:
      "A single point of contact for real-time progress updates, seamless site oversight, and hassle-free management.",
  },
  {
    id: 6,
    icon: <FaAward />,
    title: "Proven Industry Experience",
    description:
      "Backed by years of experience executing residential and commercial construction projects.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="why-choose-container">
        {/* Section Header */}
        <div className="why-choose-header">
          <h2 className="why-choose-title">
            Why Choose <span>SDPL Constructions?</span>
          </h2>

          <div className="why-choose-divider"></div>

          <p className="why-choose-description">
            We blend engineering precision, high-standard craftsmanship, and
            complete pricing transparency to turn your vision into enduring
            reality.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="why-choose-grid">
          {features.map((feature) => (
            <div className="why-choose-card" key={feature.id}>
              <div className="why-choose-icon-wrapper">
                {feature.icon}
              </div>

              <h3 className="why-choose-card-title">
                {feature.title}
              </h3>

              <p className="why-choose-card-desc">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
