export interface SkillItem {
  id?: string;
  name: string;
  icon: string;
  level: number;
}

export interface SkillCategoryGroup {
  id?: string;
  category: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategoryGroup[] = [
  {
    category: "Programming & Databases",
    skills: [
      { name: "Python", icon: "python", level: 85 },
      { name: "SQL", icon: "database", level: 80 },
      { name: "Object Oriented Programming (OOP)", icon: "code", level: 75 },
    ],
  },
  {
    category: "Data Analysis",
    skills: [
      { name: "Pandas", icon: "table", level: 85 },
      { name: "NumPy", icon: "binary", level: 80 },
      { name: "Data Analytics", icon: "bar-chart-3", level: 80 },
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "Machine Learning", icon: "brain", level: 75 },
      { name: "XGBoost", icon: "cpu", level: 70 },
    ],
  },
  {
    category: "Visualization",
    skills: [
      { name: "Matplotlib", icon: "pie-chart", level: 80 },
      { name: "Seaborn", icon: "line-chart", level: 80 },
      { name: "Tableau", icon: "layout-dashboard", level: 55 },
    ],
  },
];
