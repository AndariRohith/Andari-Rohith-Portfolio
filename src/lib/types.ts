export interface ProfileData {
  id?: string;
  name: string;
  headline: string;
  typingRoles: string[];
  seeking: string;
  location: string;
  email: string;
  phone: string;
  socials: {
    linkedin: string;
    github: string;
    [key: string]: string;
  };
  resumeFile: string;
  photo: string;
  heroCover: string;
  bio: string;
  mcaCgpa: number;
  personalInfo: {
    languages: string[];
    hobbies: string[];
    nationality: string;
    currentlyDoing: string;
  };
}

export interface SkillItem {
  id?: string;
  name: string;
  icon: string;
  level: number;
  category?: string;
}

export interface SkillCategoryGroup {
  id?: string;
  category: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  period: string;
  featured: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
}

export interface EducationItem {
  id?: string;
  degree: string;
  major?: string;
  institution: string;
  period: string;
  score: string;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  type: "certification" | "training" | "achievement";
}

export interface SiteSettings {
  id?: string;
  title: string;
  description: string;
  nav: string[];
  heroTextSide: "left" | "right";
  showPhone: boolean;
  enable3D: boolean;
  sections: {
    about: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    certifications: boolean;
    contact: boolean;
    testimonials: boolean;
    blog: boolean;
  };
  theme: {
    default: "light" | "dark";
    accent: string;
    accentSky: string;
  };
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  isRead?: boolean;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  subtext?: string;
}
