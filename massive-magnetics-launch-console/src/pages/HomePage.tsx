import { useMemo } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { getFeaturedProjects, getProjectStats } from "../lib/projectUtils";
import ProjectCard from "../components/ProjectCard";
import StatCard from "../components/StatCard";

const startPaths = [
  {
    title: "For partners",
    copy: "See the most credible systems first, understand the mission, and skip the repo graveyard.",
  },
  {
    title: "For builders",
    copy: "Jump straight into core architectures, tools, and research directions without guessing what matters.",
  },
  {
    title: "For press & curious humans",
    copy: "Get the story, the strongest projects, and the public-facing signal without drowning in dev debris.",
  },
];

export default function HomePage() {
  const featuredProjects = useMemo(() => getFeaturedProjects(projects), []);
  const stats = useMemo(() => getProjectStats(projects), []);

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero panel">
        <div className="hero-copy">
          <div className="eyebrow">WORLD-FACING FRONT DOOR</div>
          <h1>
            One clean machine <br /> pointed at the world.
          </h1>
          <p className="hero-text">
            Massive Magnetics builds frontier systems across AI, cognition,
            audio, interface design, and experimental architecture research.
            This console turns repo chaos into signal, surfaces the strongest
            projects first, and gives people one place to start.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/projects">
              Explore all projects
            </Link>
            <a
              className="btn btn-secondary"
              href="https://github.com/MASSIVEMAGNETICS"
              target="_blank"
              rel="noreferrer"
            >
              GitHub org ↗
            </a>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-card pulse-card">
            <span className="hero-card-label">Core thesis</span>
            <strong>Build systems people can actually understand.</strong>
            <p>
              No more public repo graveyard. No more random first impressions.
              No more making humans guess where the real work lives.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        <StatCard label="Total projects" value={String(stats.total)} />
        <StatCard label="Flagships" value={String(stats.featured)} />
        <StatCard label="Active systems" value={String(stats.active)} />
        <StatCard label="Research tracks" value={String(stats.research)} />
        <StatCard label="Total stars" value={String(stats.totalStars)} />
      </section>

      {/* Featured */}
      <section id="featured" className="panel section-block">
        <div className="section-head">
          <div>
            <div className="eyebrow">FEATURED LAUNCH STACK</div>
            <h2>The strongest public surface first</h2>
          </div>
          <p>
            These are the projects that should carry the narrative, not get
            buried under random repo sediment.
          </p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </div>
      </section>

      {/* Start Here */}
      <section id="start-here" className="panel section-block">
        <div className="section-head">
          <div>
            <div className="eyebrow">START HERE</div>
            <h2>Different doors for different humans</h2>
          </div>
          <p>
            Not everybody landing here wants the same thing. That's why this
            section exists instead of dumping everyone into raw source-code
            hell.
          </p>
        </div>
        <div className="start-grid">
          {startPaths.map((item) => (
            <article key={item.title} className="start-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link className="inline-link" to="/projects">
                Open the catalog
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
