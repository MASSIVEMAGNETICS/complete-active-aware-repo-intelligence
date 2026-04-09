import { Link } from "react-router-dom";
import type { Project, ProjectStatus } from "../types";

const statusClassMap: Record<ProjectStatus, string> = {
  active: "status-active",
  prototype: "status-prototype",
  research: "status-research",
  archived: "status-archived",
};

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "catalog";
}

export default function ProjectCard({ project, variant = "catalog" }: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className={`project-card ${isFeatured ? "featured-card" : "catalog-card"}`}>
      <div className="project-topline">
        <span className="category-pill">{project.category}</span>
        <span className={`status-pill ${statusClassMap[project.status]}`}>
          {project.status}
        </span>
        {project.featured && (
          <span className="featured-badge">flagship</span>
        )}
      </div>

      <h3>{project.name}</h3>
      <p className="tagline">{project.tagline}</p>
      <p className="description">{project.description}</p>

      <div className="tag-row">
        {project.tags.slice(0, isFeatured ? 5 : 4).map((tag) => (
          <span key={tag} className="mini-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="card-footer">
        <div className="stack-row">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="stack-chip">
              {tech}
            </span>
          ))}
        </div>
        <div className="link-row">
          <Link to={`/projects/${project.slug}`} className="link-detail">
            Details →
          </Link>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repo
          </a>
          {project.docsUrl && (
            <a href={project.docsUrl} target="_blank" rel="noreferrer">
              Docs
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
