import { useMemo, useState } from "react";
import { projects } from "./data/projects";
import type { ProjectCategory, ProjectStatus } from "./types";
import {
  filterAndSortProjects,
  getFeaturedProjects,
  getProjectStats,
  type FilterState,
  type SortMode,
} from "./lib/projectUtils";

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "AI",
  "Audio",
  "Vision",
  "Interface",
  "Tooling",
  "Research",
  "Experimental",
];

const statuses: Array<ProjectStatus | "All"> = [
  "All",
  "active",
  "prototype",
  "research",
  "archived",
];

const sortModes: Array<{ value: SortMode; label: string }> = [
  { value: "priority", label: "Priority" },
  { value: "updated", label: "Recently Updated" },
  { value: "stars", label: "Stars" },
  { value: "name", label: "Name" },
];

const statusClassMap: Record<ProjectStatus, string> = {
  active: "status-active",
  prototype: "status-prototype",
  research: "status-research",
  archived: "status-archived",
};

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

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function App() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    category: "All",
    status: "All",
    featuredOnly: false,
    sortMode: "priority",
  });

  const featuredProjects = useMemo(() => getFeaturedProjects(projects), []);
  const stats = useMemo(() => getProjectStats(projects), []);
  const visibleProjects = useMemo(
    () => filterAndSortProjects(projects, filters),
    [filters]
  );

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app-shell">
      <div className="background-grid" />
      <div className="background-glow background-glow-a" />
      <div className="background-glow background-glow-b" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-kicker">Massive Magnetics</div>
          <div className="brand-title">Launch Console</div>
        </div>
        <nav className="topnav">
          <a href="#featured">Flagships</a>
          <a href="#start-here">Start Here</a>
          <a href="#catalog">Repo Database</a>
        </nav>
      </header>

      <main className="container">
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
              <a className="btn btn-primary" href="#start-here">
                Start here
              </a>
              <a className="btn btn-secondary" href="#catalog">
                Explore the repo database
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

        <section className="stats-grid">
          <StatCard label="Total projects" value={String(stats.total)} />
          <StatCard label="Flagships" value={String(stats.featured)} />
          <StatCard label="Active systems" value={String(stats.active)} />
          <StatCard label="Research tracks" value={String(stats.research)} />
        </section>

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
              <article key={project.id} className="project-card featured-card">
                <div className="project-topline">
                  <span className="category-pill">{project.category}</span>
                  <span
                    className={`status-pill ${statusClassMap[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3>{project.name}</h3>
                <p className="tagline">{project.tagline}</p>
                <p className="description">{project.description}</p>
                <div className="tag-row">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="mini-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="link-row">
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
              </article>
            ))}
          </div>
        </section>

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
                <a className="inline-link" href="#catalog">
                  Open the catalog
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="catalog" className="panel section-block">
          <div className="section-head">
            <div>
              <div className="eyebrow">SEARCHABLE REPO DATABASE</div>
              <h2>Everything organized, searchable, and ranked</h2>
            </div>
            <p>
              Search by concept, stack, category, or mission. Filter the noise.
              Pull signal forward.
            </p>
          </div>
          <div className="controls-grid">
            <label className="control control-search">
              <span>Search</span>
              <input
                type="text"
                placeholder="Search projects, tags, stack, category..."
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
              />
            </label>
            <label className="control">
              <span>Category</span>
              <select
                value={filters.category}
                onChange={(e) =>
                  updateFilter(
                    "category",
                    e.target.value as ProjectCategory | "All"
                  )
                }
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="control">
              <span>Status</span>
              <select
                value={filters.status}
                onChange={(e) =>
                  updateFilter(
                    "status",
                    e.target.value as ProjectStatus | "All"
                  )
                }
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="control">
              <span>Sort by</span>
              <select
                value={filters.sortMode}
                onChange={(e) =>
                  updateFilter("sortMode", e.target.value as SortMode)
                }
              >
                {sortModes.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="control control-checkbox">
              <input
                type="checkbox"
                checked={filters.featuredOnly}
                onChange={(e) =>
                  updateFilter("featuredOnly", e.target.checked)
                }
              />
              <span>Flagships only</span>
            </label>
          </div>

          <div className="catalog-meta">
            Showing <strong>{visibleProjects.length}</strong> of{" "}
            <strong>{projects.length}</strong> projects
          </div>

          {visibleProjects.length === 0 ? (
            <div className="empty-state">
              <p>No projects match your current filters.</p>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setFilters({
                    query: "",
                    category: "All",
                    status: "All",
                    featuredOnly: false,
                    sortMode: "priority",
                  })
                }
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {visibleProjects.map((project) => (
                <article key={project.id} className="project-card catalog-card">
                  <div className="project-topline">
                    <span className="category-pill">{project.category}</span>
                    <span
                      className={`status-pill ${statusClassMap[project.status]}`}
                    >
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
                    {project.tags.slice(0, 4).map((tag) => (
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
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repo
                      </a>
                      {project.docsUrl && (
                        <a
                          href={project.docsUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Docs
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="brand-kicker">Massive Magnetics</span>
            <span className="footer-tagline">
              Building systems people can actually understand.
            </span>
          </div>
          <nav className="footer-nav">
            <a
              href="https://github.com/MASSIVEMAGNETICS"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a href="#featured">Flagships</a>
            <a href="#catalog">All Projects</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
