export type ProjectStatus = "active" | "prototype" | "research" | "archived";
export type ProjectCategory =
  | "AI"
  | "Audio"
  | "Vision"
  | "Interface"
  | "Tooling"
  | "Research"
  | "Experimental";

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  priority: number;
  stars: number;
  updatedAt: string;
  tags: string[];
  stack: string[];
  repoUrl: string;
  demoUrl?: string;
  docsUrl?: string;
}
