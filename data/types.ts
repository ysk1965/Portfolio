export interface Project {
  slug: string;
  title: string;
  category: "career" | "side";
  subCategory?: "app" | "web";
  company?: string;
  publisher?: string;
  period: string;
  role: string;
  shortDescription: string;
  description: string;
  achievements: Achievement[];
  techStack: string[];
  responsibilities: string[];
  links: ProjectLink[];
  image: string;
  icon?: string;
  media: string[];
  order: number;
  detailSections?: DetailSection[];
}

export interface DetailSection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Achievement {
  label: string;
  value: string;
  icon?: string;
}

export interface CareerEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  company?: string;
  description: string;
  details?: string;
  type: "join" | "project" | "role-change" | "milestone";
  icon?: string;
  tags?: string[];
  metric?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  type: "tech" | "management";
  subCategories?: SkillSubCategory[];
  items?: SkillItem[];
  description?: string;
}

export interface SkillSubCategory {
  title: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  category?: string;
}

export interface SharingItem {
  id: string;
  title: string;
  description: string;
  tag: "internal" | "external";
  tagLabel: string;
  links: ProjectLink[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  socials: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface EducationItem {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: "education" | "award" | "activity" | "certificate" | "launch" | "join";
  icon?: string;
}

export interface GameJamProject {
  title: string;
  description: string;
  youtubeId: string;
  order: number;
}
