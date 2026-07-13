import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import "../styles/projects.css";

export default function OngoingProjects() {
  const ongoingProjects = projects.filter(
    (project) => project.category === "ongoing"
  );

  return (
    <>
      

      <section className="projects-section">
        <div className="projects-header">
          <h2>Ongoing Projects</h2>
        </div>

        <div className="projects-grid">
          {ongoingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}