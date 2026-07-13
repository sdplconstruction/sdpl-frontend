import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import "../styles/projects.css";

export default function CompletedProjects() {
  const completedProjects = projects.filter(
    (project) => project.category === "completed"
  );

  return (
    <>
      <Header />

      <section className="projects-section">
        <div className="projects-header">
          <h2>Completed Projects</h2>
        </div>

        <div className="projects-grid">
          {completedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}