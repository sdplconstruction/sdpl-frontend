import hero from "../../assets/hero3.jpeg"; 

export default function ServiceHero() {
  return (
    <section
      className="services-hero"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="overlay"></div>
      
      <div className="services-wrapper">
        <div className="services-hero-content">
          <span className="hero-tag">Build With Confidence</span>
          <h1>
            Our Services
          </h1>
          <p>
            End-to-end construction solutions tailored to your needs. From
            approvals to 3D visualization, we build with precision and
            professionalism.
          </p>
        </div>
      </div>
    </section>
  );
}