import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import type { ProjectCategory, ProjectStatus } from "../types";
import {
  filterAndSortProjects,
  type FilterState,
  type SortMode,
} from "../lib/projectUtils";
import ProjectCard from "../components/ProjectCard";

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

const defaultFilters: FilterState = {
  query: "",
  category: "All",
  status: "All",
  featuredOnly: false,
  sortMode: "priority",
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

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
    <main className="container">
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
                updateFilter("category", e.target.value as ProjectCategory | "All")
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
                updateFilter("status", e.target.value as ProjectStatus | "All")
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
              onChange={(e) => updateFilter("featuredOnly", e.target.checked)}
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
              onClick={() => setFilters(defaultFilters)}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="catalog" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
