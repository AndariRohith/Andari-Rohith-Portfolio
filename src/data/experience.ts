export interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "inventateq-trainee",
    role: "Data Science Trainee",
    company: "Inventateq",
    location: "Bengaluru, Karnataka, India",
    period: "May 2026 - Present",
    current: true,
    points: [
      "Training in Python, SQL and Scikit-learn with hands-on regression (Linear, Polynomial, Lasso, Ridge, SVR) and classification (Logistic Regression, SVC, KNN, Naive Bayes, Decision Tree, Random Forest).",
      "Analyzed the Telco churn dataset (7,043 records) and found Fiber optic subscribers made up ~82% of churned monthly revenue.",
      "Built an XGBoost churn prediction model (~0.80 accuracy) and deployed it as a Streamlit app on Streamlit Community Cloud with auto-redeploy from GitHub.",
    ],
  },
];
