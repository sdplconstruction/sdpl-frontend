import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import "../styles/projects.css";

export default function UpcomingProjects() {
  const upcomingProjects = projects.filter(
    (project) => project.category === "upcoming"
  );

  return (
    <>
    

      <section className="projects-section">
        <div className="projects-header">
          <h2>Upcoming Projects</h2>
        </div>

        <div className="projects-grid">
          {upcomingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}