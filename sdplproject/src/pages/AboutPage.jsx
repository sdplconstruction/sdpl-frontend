import aboutBanner from "../assets/about-banner.png";
import {
  FaLightbulb,
  FaAward,
  FaShieldAlt,
  FaHardHat,
  FaHandshake,
  FaCheckCircle,
  FaComments,
  FaDraftingCompass,
  FaClipboardCheck,
  FaSearch,
  FaKey,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#222", background: "#fff", overflowX: "hidden" }}>
      
      {/* GLOBAL ANIMATION STYLES */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Utility class to trigger smooth rendering */
        .animate-fade-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-fade-left {
          animation: fadeInLeft 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-fade-right {
          animation: fadeInRight 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-scale {
          animation: scaleIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          height: "500px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={aboutBanner}
          alt="SDPL Banner"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
          }}
        />
        <div
          className="animate-fade-up"
          style={{
            position: "relative",
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto",
            color: "#fff",
            zIndex: 10,
          }}
        >
          <p
            style={{
              color: "#D62828",
              letterSpacing: "3px",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            About Us
          </p>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.2",
              marginBottom: "20px",
              maxWidth: "700px",
            }}
          >
            Building Excellence, <br />One Project at a Time.
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "600px",
              opacity: "0.9",
            }}
          >
            SDPL Constructions delivers premium residential, commercial, and industrial projects with an unyielding commitment to quality, innovation, and total transparency.
          </p>
        </div>
      </section>

      {/* COMPANY INTRO SECTION */}
      <section
        style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "100px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div className="animate-fade-left">
          <p
            style={{
              color: "#D62828",
              fontWeight: "700",
              letterSpacing: "2px",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            WHO WE ARE
          </p>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#111",
              lineHeight: "1.2",
              marginBottom: "24px",
            }}
          >
            Creating Spaces That Inspire Generations.
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            SDPL Constructions specializes in residential, commercial, and industrial construction with a core focus on structural reliability, architectural elegance, and punctual project completion.
          </p>
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            Every project is mapped carefully down to the finest detail, executed with absolute precision, and handed over with seamless operational clarity to guarantee lasting client delight.
          </p>
        </div>

        {/* FOUNDER'S VISION CARD WITH PLACEHOLDER */}
        <div
          className="animate-fade-right"
          style={{
            background: "#fdfdfd",
            borderLeft: "5px solid #D62828",
            borderRadius: "16px",
            padding: "40px 30px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div 
            style={{ 
              flexShrink: 0,
              width: "120px",
              height: "140px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f5f5f5, #e9e9e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              border: "1px solid #e0e0e0",
              overflow: "hidden"
            }}
          >
            {/* <img src={founderImg} alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
            <span style={{ fontSize: "40px", opacity: 0.4 }}>👤</span>
          </div>
          
          <div style={{ flex: "1", minWidth: "250px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#111", marginBottom: "2px" }}>
              Founder's Vision
            </h3>
            <p
              style={{
                color: "#D62828",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "16px"
              }}
            >
              MD. BABAJI CHARAN MALLICK — Managing Director
            </p>
            <p style={{ color: "#444", fontSize: "16px", fontStyle: "italic", lineHeight: "1.7", margin: 0 }}>
              "We don't just construct properties; we map dreams into functional milestones, building unshakeable trust and spatial assets that sustainably elevate communities."
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section style={{ background: "#fcfcfc", padding: "100px 0" }}>
        <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ color: "#D62828", fontWeight: "700", letterSpacing: "2px", fontSize: "14px" }}>
              EXPERTISE BEHIND SDPL
            </p>
            <h2 style={{ fontSize: "38px", fontWeight: "850", color: "#111", marginTop: "10px" }}>
              Meet Our Leadership Team
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              { role: "Managing Director" },
              { role: "Chief Architect" },
              { role: "Project Manager" },
              { role: "Structural Engineer" },
              { role: "Site Engineer" },
              { role: "Interior Designer" },
            ].map((member, index) => (
              <div
                key={index}
                className="animate-fade-up"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)";
                }}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "35px 25px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s ease",
                  animationDelay: `${index * 0.1}s`, // Sequential stagger effect
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #fdfdfd, #f1f1f1)",
                    border: "2px solid #D62828",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "36px",
                  }}
                >
                  👤
                </div>
                <h4 style={{ fontSize: "19px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                  {member.role.split(" ")[0]} Expert
                </h4>
                <span style={{ color: "#D62828", fontSize: "14px", fontWeight: "600" }}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={{ width: "90%", maxWidth: "1200px", margin: "100px auto" }}>
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ color: "#D62828", fontWeight: "700", letterSpacing: "2px", fontSize: "14px" }}>
            OUR VALUES
          </p>
          <h2 style={{ fontSize: "38px", fontWeight: "850", color: "#111", marginTop: "10px" }}>
            Company Vision & Core Values
          </h2>
          <p style={{ color: "#666", maxWidth: "650px", margin: "15px auto 0", lineHeight: "1.7" }}>
            Our vision is to remain Odisha's benchmark construction partner through continuous technological integration, rigid quality metrics, and ethical practices.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {[
            { title: "Innovation", icon: <FaLightbulb />, desc: "Integrating advanced building frameworks and green materials." },
            { title: "Quality", icon: <FaAward />, desc: "Zero compromise on standard configurations and engineering testing." },
            { title: "Integrity", icon: <FaShieldAlt />, desc: "Transparent workflows and contracts without hidden variables." },
            { title: "Safety", icon: <FaHardHat />, desc: "Rigid on-site health standards protecting our vast field workforce." },
            { title: "Transparency", icon: <FaHandshake />, desc: "Consistent project phase updates clear to all stakeholders." },
            { title: "Commitment", icon: <FaCheckCircle />, desc: "Punctual handover schedules prioritizing clients' timelines." },
          ].map((item, index) => (
            <div
              key={index}
              className="animate-scale"
              style={{
                background: "#fff",
                border: "1px solid #eaeaea",
                borderRadius: "16px",
                padding: "30px",
                display: "flex",
                gap: "20px",
                alignItems: "start",
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "rgba(214, 40, 40, 0.08)",
                  color: "#D62828",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                  {item.title}
                </h4>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONSTRUCTION PROCESS */}
      <section style={{ background: "#f9f9f9", padding: "100px 0" }}>
        <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ color: "#D62828", fontWeight: "700", letterSpacing: "2px", fontSize: "14px" }}>
              OUR WORKFLOW
            </p>
            <h2 style={{ fontSize: "38px", fontWeight: "850", color: "#111", marginTop: "10px" }}>
              How We Build Your Dream
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "25px",
            }}
          >
            {[
  {
    no: "01",
    title: "Consultation",
    icon: <FaComments size={42} color="#D62828" />,
    text: "Deep dive into your structural concepts and project constraints.",
  },
  {
    no: "02",
    title: "Planning",
    icon: <FaDraftingCompass size={42} color="#D62828" />,
    text: "Architectural, mechanical, and heavy structural engineering designs.",
  },
  {
    no: "03",
    title: "Approvals",
    icon: <FaClipboardCheck size={42} color="#D62828" />,
    text: "Navigating regulatory protocols and documentation smoothly.",
  },
  {
    no: "04",
    title: "Construction",
    icon: <FaHardHat size={42} color="#D62828" />,
    text: "Premium execution phase backed by rigorous supervision.",
  },
  {
    no: "05",
    title: "Inspection",
    icon: <FaSearch size={42} color="#D62828" />,
    text: "Multi-point structural audits guaranteeing maximum safety compliance.",
  },
  {
    no: "06",
    title: "Handover",
    icon: <FaKey size={42} color="#D62828" />,
    text: "Handing over pristine spaces optimized for immediate occupancy.",
  },
].map((step, index) => (
              <div
                key={index}
                className="animate-fade-up"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "30px 20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
                  border: "1px solid #eee",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
  key={index}
  className="animate-fade-up workflow-card"
  style={{
    background: "#fff",
    borderRadius: "22px",
    padding: "32px",
    border: "1px solid #ececec",
    boxShadow: "0 18px 45px rgba(0,0,0,0.05)",
    position: "relative",
    overflow: "hidden",
    transition: "all .35s ease",
    animationDelay: `${index * 0.1}s`,
  }}
>
  {/* Number */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
    }}
  >
    <div
      style={{
        width: "62px",
        height: "62px",
        borderRadius: "50%",
        background: "#D62828",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "26px",
        fontWeight: "700",
        boxShadow: "0 8px 20px rgba(214,40,40,.25)",
      }}
    >
      {step.no}
    </div>

    <div
      style={{
        flex: 1,
        height: "2px",
        marginLeft: "18px",
        background: "#f1c8c8",
      }}
    />
  </div>

  {/* Icon */}
  <div
    style={{
      width: "110px",
      height: "110px",
      margin: "0 auto",
      borderRadius: "50%",
      background: "rgba(214,40,40,.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "28px",
    }}
  >
    {step.icon}
  </div>

  <h3
    style={{
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "700",
      color: "#111",
      marginBottom: "14px",
    }}
  >
    {step.title}
  </h3>

  <div
    style={{
      width: "55px",
      height: "4px",
      background: "#D62828",
      borderRadius: "50px",
      margin: "0 auto 22px",
    }}
  />

  <p
    style={{
      textAlign: "center",
      color: "#666",
      lineHeight: "1.8",
      fontSize: "15px",
    }}
  >
    {step.text}
  </p>
</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section style={{ width: "90%", maxWidth: "1200px", margin: "100px auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            { number: "7+", title: "Years Experience", delay: "0s" },
            { number: "21+", title: "Projects Delivered", delay: "0.4s" },
            { number: "100%", title: "Client Satisfaction", delay: "0.8s" },
            { number: "50+", title: "Expert Professionals", delay: "1.2s" },
          ].map((item, index) => (
            <div
              key={index}
              className="animate-scale"
              style={{
                background: "linear-gradient(180deg, #fff, #fafafa)",
                padding: "40px 20px",
                borderRadius: "16px",
                border: "1px solid #f0f0f0",
                textAlign: "center",
                animationDelay: `${index * 0.12}s`,
              }}
            >
              {/* Flex wrapper allows inline-block element to align beautifully center */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                <h2
                  className="typewriter-stat"
                  style={{
                    color: "#D62828",
                    fontSize: "54px",
                    fontWeight: "800",
                    lineHeight: "1.1",
                    margin: 0,
                    animationDelay: item.delay, // Staggers the typing start time per card
                  }}
                >
                  {item.number}
                </h2>
              </div>
              <p style={{ color: "#444", fontSize: "15px", fontWeight: "600", margin: 0 }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION (CTA) */}
      <section
        className="animate-fade-up"
        style={{
          width: "90%",
          maxWidth: "1100px",
          margin: "100px auto",
          background: "linear-gradient(135deg, #D62828, #b31d1d)",
          borderRadius: "24px",
          padding: "60px 40px",
          textAlign: "center",
          color: "#fff",
          boxShadow: "0 20px 40px rgba(214, 40, 40, 0.2)",
        }}
      >
        <h2 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px" }}>
          Ready to Build Your Dream Project?
        </h2>
        <p style={{ fontSize: "17px", maxWidth: "600px", margin: "0 auto 35px", lineHeight: "1.7", opacity: "0.95" }}>
          Whether it's a sleek modern residential layout, an expansive commercial plaza, or industrial infrastructure, SDPL turns blueprints into landmarks.
        </p>
       <button
  onClick={() => navigate("/contact-us")} // <--- Updated from "/contact" to "/contact-us"
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    background: "#fff",
    color: "#D62828",
    border: "none",
    padding: "16px 40px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }}
>
  Contact Us Today
</button>
      </section>
    </div>
  );
}
{/* GLOBAL ANIMATION STYLES */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* --- NEW TYPEWRITER ANIMATIONS ADDED HERE --- */
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #D62828; }
        }

        .typewriter-stat {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid transparent;
          margin: 0 auto;
          animation: 
            typing 1.5s steps(10, end) both,
            blink-caret 0.75s step-end 3;
        }
        /* ------------------------------------------- */

        .animate-fade-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-fade-left {
          animation: fadeInLeft 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-fade-right {
          animation: fadeInRight 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        .animate-scale {
          animation: scaleIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
      `}</style>