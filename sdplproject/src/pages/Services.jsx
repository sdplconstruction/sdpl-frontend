import Footer from "../components/Footer";
import ServiceHero from "../components/services/ServiceHero";
import ServiceSection from "../components/services/ServiceSection";
import { services } from "../data/serviceData";
import "../styles/services.css";

export default function Services() {
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
      <Footer/>
    </>
  );
}