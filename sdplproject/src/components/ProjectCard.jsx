import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building } from "lucide-react"; // Added Building icon
import "../styles/projects.css";

export default function ProjectCard({ project }) {
  // Check if project is upcoming
  const isUpcoming = project.category === "upcoming";

  return (
    <div className="project-card">
      <div className="project-image-wrapper">
        {isUpcoming ? (
          /* Placeholder for Upcoming Projects */
          <div className="project-image-placeholder">
            <Building size={48} />
          </div>
        ) : (
          /* Real Image for Ongoing/Completed */
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        )}

        <span className={`project-badge ${project.category}`}>
          {project.category.charAt(0).toUpperCase() +
            project.category.slice(1)}
        </span>
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>

        <p className="project-location">
          <MapPin size={16} />
          {project.location}
        </p>

        {project.category === "ongoing" && (
          <>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <p className="progress-text">
              {project.progress}% Completed
            </p>
          </>
        )}
      </div>
    </div>
  );
}