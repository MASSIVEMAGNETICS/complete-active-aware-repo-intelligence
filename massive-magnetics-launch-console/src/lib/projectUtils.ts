import type { Project, ProjectCategory, ProjectStatus } from "../types";

export type SortMode = "priority" | "updated" | "stars" | "name";

export interface FilterState {
  query: string;
  category: ProjectCategory | "All";
  status: ProjectStatus | "All";
  featuredOnly: boolean;
  sortMode: SortMode;
}

export interface ProjectStats {
  total: number;
  featured: number;
  active: number;
  research: number;
  totalStars: number;
}

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

const matchesQuery = (project: Project, rawQuery: string): boolean => {
  const query = normalize(rawQuery);
  if (!query) return true;
  const haystack = normalize(
    [
      project.name,
      project.slug,
      project.tagline,
      project.description,
      project.longDescription,
      project.category,
      project.status,
      ...project.tags,
      ...project.stack,
    ].join(" ")
  );
  return haystack.includes(query);
};

const compareByUpdated = (a: Project, b: Project): number =>
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

const compareByPriority = (a: Project, b: Project): number => {
  if (b.priority !== a.priority) return b.priority - a.priority;
  if (b.featured !== a.featured) return Number(b.featured) - Number(a.featured);
  return compareByUpdated(a, b);
};

const compareByStars = (a: Project, b: Project): number => {
  if (b.stars !== a.stars) return b.stars - a.stars;
  return compareByPriority(a, b);
};

const compareByName = (a: Project, b: Project): number =>
  a.name.localeCompare(b.name);

export const filterAndSortProjects = (
  projects: Project[],
  filters: FilterState
): Project[] => {
  const filtered = projects.filter((project) => {
    if (filters.category !== "All" && project.category !== filters.category) {
      return false;
    }
    if (filters.status !== "All" && project.status !== filters.status) {
      return false;
    }
    if (filters.featuredOnly && !project.featured) {
      return false;
    }
    return matchesQuery(project, filters.query);
  });

  const sorted = [...filtered];
  switch (filters.sortMode) {
    case "updated":
      sorted.sort(compareByUpdated);
      break;
    case "stars":
      sorted.sort(compareByStars);
      break;
    case "name":
      sorted.sort(compareByName);
      break;
    case "priority":
    default:
      sorted.sort(compareByPriority);
      break;
  }
  return sorted;
};

export const getFeaturedProjects = (projects: Project[]): Project[] =>
  [...projects]
    .filter((project) => project.featured)
    .sort((a, b) => b.priority - a.priority);

export const getProjectStats = (projects: Project[]): ProjectStats => {
  return projects.reduce<ProjectStats>(
    (acc, project) => {
      acc.total += 1;
      acc.totalStars += project.stars;
      if (project.featured) acc.featured += 1;
      if (project.status === "active") acc.active += 1;
      if (project.status === "research") acc.research += 1;
      return acc;
    },
    { total: 0, featured: 0, active: 0, research: 0, totalStars: 0 }
  );
};

export const getProjectBySlug = (
  projects: Project[],
  slug: string
): Project | undefined => projects.find((p) => p.slug === slug);
