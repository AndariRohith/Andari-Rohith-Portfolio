export interface SiteConfig {
  title: string;
  description: string;
  nav: string[];
  heroTextSide: "left" | "right";
  /** Gate column order — controls which card is left/center/right */
  gateOrder: ["admin" | "photo" | "viewer", "admin" | "photo" | "viewer", "admin" | "photo" | "viewer"];
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

export const siteConfig: SiteConfig = {
  title: "Andari Rohith | Aspiring Data Scientist",
  description: "Portfolio of Andari Rohith, Data Science trainee skilled in Python, SQL, Scikit-learn and XGBoost.",
  nav: ["Home", "About", "Skills", "Projects", "Experience", "Education", "Certifications", "Contact"],
  heroTextSide: "left", // Configurable left or right as requested
  /** Gate column order — swap cards without touching StartGate.tsx */
  gateOrder: ["admin", "photo", "viewer"] as ["admin" | "photo" | "viewer", "admin" | "photo" | "viewer", "admin" | "photo" | "viewer"],
  showPhone: false, // Default false; admin can toggle in Settings
  enable3D: true,
  sections: {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true,
    contact: true,
    testimonials: false,
    blog: false
  },
  theme: {
    default: "light",
    accent: "#6366F1",
    accentSky: "#38BDF8"
  },
};
