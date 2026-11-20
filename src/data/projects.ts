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

export const projects: ProjectItem[] = [
  {
    id: "telco-churn-prediction-app",
    title: "Telco Customer Churn Prediction App",
    category: "Machine Learning",
    period: "Sep 2026 - Oct 2026",
    featured: true,
    summary: "End-to-end ML project: an XGBoost churn classifier served through a live Streamlit web app.",
    highlights: [
      "Built an XGBoost classifier on 7,043 customer records with 19 features, reaching ~0.80 accuracy on a held-out test set.",
      "Combined preprocessing (ColumnTransformer) and the model into a single scikit-learn Pipeline, so raw inputs produce predictions directly with no data leakage.",
      "Developed a Streamlit app that returns a stay/churn prediction and deployed it on Streamlit Community Cloud with auto-redeploy from GitHub.",
    ],
    tech: ["Python", "Scikit-learn", "XGBoost", "Streamlit", "GitHub"],
    images: ["/assets/projects/churn-app-1.png"],
    liveUrl: "TODO_STREAMLIT_URL",
    githubUrl: "TODO_GITHUB_REPO_URL",
  },
  {
    id: "telco-churn-revenue-analysis",
    title: "Telco Customer Churn & Revenue Risk Analysis",
    category: "Data Analysis",
    period: "Aug 2026 - Sep 2026",
    featured: true,
    summary: "End-to-end EDA that quantified where churn puts the most revenue at risk.",
    highlights: [
      "Performed EDA on 7,043 records (21 columns): fixed data types, flagged 11 blank TotalCharges values, checked duplicates and reviewed outliers with boxplots.",
      "Quantified revenue at risk: Fiber optic subscribers made up ~82% of churned monthly revenue (~$114K of ~$139K) and month-to-month contracts ~87%.",
      "Found churned customers had a median tenure of 10 months vs. 38 for retained customers; recommended contract-upgrade incentives and early-tenure engagement.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    images: ["/assets/projects/churn-analysis-1.png"],
    liveUrl: "",
    githubUrl: "TODO_GITHUB_REPO_URL",
  },
  {
    id: "academic-management-qp-generator",
    title: "Academic Management System & Automated Question Paper Generator",
    category: "NLP & Automation",
    period: "Dec 2025 - Apr 2026",
    featured: true,
    summary: "A platform that manages academic data and auto-generates regulation-compliant exam papers.",
    highlights: [
      "Built a platform to manage faculty records, subjects and university regulations.",
      "Used regex and NLP-based PDF parsing to classify questions by Bloom's Taxonomy level, Course Outcome (CO) and marks, stored in a relational MySQL schema.",
      "Designed a constraint-based algorithm that generates balanced exam papers automatically, cutting manual effort by ~80% with ~98% selection accuracy.",
    ],
    tech: ["Python", "MySQL", "NLP", "Regex"],
    images: ["/assets/projects/question-paper-1.png"],
    liveUrl: "",
    githubUrl: "TODO_GITHUB_REPO_URL",
  },
];
