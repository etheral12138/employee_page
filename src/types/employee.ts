export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  personalWebsite?: string;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  timezone: string;
  lastUpdated: Date;
  socialLinks: SocialLinks;
  skills: Skill[];
  projects: Project[];
}