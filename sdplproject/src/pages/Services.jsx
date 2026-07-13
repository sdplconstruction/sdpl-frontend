import Footer from "../components/Footer";
import ServiceHero from "../components/services/ServiceHero";
import ServiceSection from "../components/services/ServiceSection";
import { services } from "../data/serviceData";
import "../styles/services.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Services() {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }
  }, [location]);

  return (
    <>
      <ServiceHero />

      <div className="services-wrapper">
        {services.map((service) => (
          <ServiceSection
            key={service.id}
            service={service}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}