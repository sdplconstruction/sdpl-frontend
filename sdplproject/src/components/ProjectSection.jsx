import React from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";
import "../styles/projects.css";

export default function ProjectSection({
  title,
  category,
  limit = 3,
}) {
  const filteredProjects = projects
    .filter((project) => project.category === category)
    .slice(0, limit);

  return (
    <section id={`${category}-projects`} className="projects-section">
      <div className="projects-header">
        <h2>{title}</h2>

        <Link
          to={`/projects/${category}`}
          className="view-all-btn"
        >
          View All →
        </Link>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}