import { Link, useParams, Navigate } from "react-router-dom";
import { projects } from "../data/projects";
import { getProjectBySlug } from "../lib/projectUtils";
import type { ProjectStatus } from "../types";

const statusClassMap: Record<ProjectStatus, string> = {
  active: "status-active",
  prototype: "status-prototype",
  research: "status-research",
  archived: "status-archived",
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(projects, slug ?? "");

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="container">
      <section className="panel section-block">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/projects">Projects</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{project.name}</span>
        </nav>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-topline">
            <span className="category-pill">{project.category}</span>
            <span className={`status-pill ${statusClassMap[project.status]}`}>
              {project.status}
            </span>
            {project.featured && (
              <span className="featured-badge">flagship</span>
            )}
          </div>
          <h1 className="detail-title">{project.name}</h1>
          <p className="detail-tagline">{project.tagline}</p>
        </div>

        {/* Body */}
        <div className="detail-body">
          <div className="detail-main">
            <div className="detail-section">
              <h2 className="detail-section-title">Overview</h2>
              <p className="detail-description">{project.description}</p>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Deep Dive</h2>
              <p className="detail-long">{project.longDescription}</p>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Tags</h2>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="mini-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Stack</h3>
              <div className="stack-row stack-row-vertical">
                {project.stack.map((tech) => (
                  <span key={tech} className="stack-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Meta</h3>
              <dl className="meta-list">
                <dt>Priority</dt>
                <dd>{project.priority}</dd>
                <dt>Stars</dt>
                <dd>⭐ {project.stars}</dd>
                <dt>Updated</dt>
                <dd>{project.updatedAt}</dd>
              </dl>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Links</h3>
              <div className="sidebar-links">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-link"
                >
                  <span className="sidebar-link-icon">⬡</span>
                  Repository
                </a>
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sidebar-link"
                  >
                    <span className="sidebar-link-icon">◈</span>
                    Documentation
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sidebar-link"
                  >
                    <span className="sidebar-link-icon">▶</span>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <Link to="/projects" className="btn btn-secondary back-btn">
              ← Back to all projects
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
