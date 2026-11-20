-- ==============================================================================
-- ANDARI ROHITH PORTFOLIO - INITIAL DATABASE SEED SCRIPT
-- Mirrors portfolio-content.md exactly
-- ==============================================================================

-- 1. Profiles Seed
INSERT INTO public.profiles (name, headline, typing_roles, seeking, location, email, phone, socials, resume_url, photo_url, hero_cover_url, bio, mca_cgpa, personal_info)
VALUES (
    'Andari Rohith',
    'Aspiring Data Scientist',
    ARRAY['Data Science Trainee', 'Python & SQL Developer', 'ML Model Builder', 'Data Storyteller'],
    'Data Science Internship / Entry-level Data Science role',
    'Bengaluru, Karnataka, India',
    'andarirohith12@gmail.com',
    '+91 9392436199',
    '{"linkedin": "https://www.linkedin.com/in/andarirohith-894784320", "github": "https://github.com/AndariRohith"}'::jsonb,
    '/assets/resume/Andari_Rohith_Resume.pdf',
    '/assets/profile/photo.jpg',
    '/assets/profile/hero-cover.png',
    'MCA 2026 graduate (CGPA 9.37) and Data Science trainee skilled in Python, SQL, Scikit-learn and XGBoost. I built a Telco churn analysis on 7,043 records that traced ~82% of churned monthly revenue to Fiber optic subscribers, and deployed a churn prediction app on Streamlit. I am seeking a Data Science internship to apply EDA, statistics and predictive modeling to real-world data.',
    9.37,
    '{"languages": ["English", "Telugu", "Tamil"], "hobbies": ["Listening to Music", "Playing Team Sports", "Traveling"], "nationality": "Indian", "currentlyDoing": "Data Science training at Inventateq, Bengaluru"}'::jsonb
);

-- 2. Skill Categories & Skills
WITH cat_prog AS (
    INSERT INTO public.skill_categories (name, display_order) VALUES ('Programming & Databases', 1) RETURNING id
),
cat_analysis AS (
    INSERT INTO public.skill_categories (name, display_order) VALUES ('Data Analysis', 2) RETURNING id
),
cat_ml AS (
    INSERT INTO public.skill_categories (name, display_order) VALUES ('Machine Learning', 3) RETURNING id
),
cat_viz AS (
    INSERT INTO public.skill_categories (name, display_order) VALUES ('Visualization', 4) RETURNING id
)
INSERT INTO public.skills (category_id, category_name, name, icon, level, display_order) VALUES
((SELECT id FROM cat_prog), 'Programming & Databases', 'Python', 'python', 85, 1),
((SELECT id FROM cat_prog), 'Programming & Databases', 'SQL', 'database', 80, 2),
((SELECT id FROM cat_prog), 'Programming & Databases', 'Object Oriented Programming (OOP)', 'code', 75, 3),

((SELECT id FROM cat_analysis), 'Data Analysis', 'Pandas', 'table', 85, 1),
((SELECT id FROM cat_analysis), 'Data Analysis', 'NumPy', 'binary', 80, 2),
((SELECT id FROM cat_analysis), 'Data Analysis', 'Data Analytics', 'bar-chart-3', 80, 3),

((SELECT id FROM cat_ml), 'Machine Learning', 'Machine Learning', 'brain', 75, 1),
((SELECT id FROM cat_ml), 'Machine Learning', 'XGBoost', 'cpu', 70, 2),

((SELECT id FROM cat_viz), 'Visualization', 'Matplotlib', 'pie-chart', 80, 1),
((SELECT id FROM cat_viz), 'Visualization', 'Seaborn', 'line-chart', 80, 2),
((SELECT id FROM cat_viz), 'Visualization', 'Tableau', 'layout-dashboard', 55, 3);

-- 3. Projects
INSERT INTO public.projects (slug, title, category, period, featured, summary, highlights, tech, images, live_url, github_url, display_order) VALUES
(
    'telco-churn-prediction-app',
    'Telco Customer Churn Prediction App',
    'Machine Learning',
    'Sep 2026 - Oct 2026',
    true,
    'End-to-end ML project: an XGBoost churn classifier served through a live Streamlit web app.',
    ARRAY[
        'Built an XGBoost classifier on 7,043 customer records with 19 features, reaching ~0.80 accuracy on a held-out test set.',
        'Combined preprocessing (ColumnTransformer) and the model into a single scikit-learn Pipeline, so raw inputs produce predictions directly with no data leakage.',
        'Developed a Streamlit app that returns a stay/churn prediction and deployed it on Streamlit Community Cloud with auto-redeploy from GitHub.'
    ],
    ARRAY['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'GitHub'],
    ARRAY['/assets/projects/churn-app-1.png'],
    'TODO_STREAMLIT_URL',
    'TODO_GITHUB_REPO_URL',
    1
),
(
    'telco-churn-revenue-analysis',
    'Telco Customer Churn & Revenue Risk Analysis',
    'Data Analysis',
    'Aug 2026 - Sep 2026',
    true,
    'End-to-end EDA that quantified where churn puts the most revenue at risk.',
    ARRAY[
        'Performed EDA on 7,043 records (21 columns): fixed data types, flagged 11 blank TotalCharges values, checked duplicates and reviewed outliers with boxplots.',
        'Quantified revenue at risk: Fiber optic subscribers made up ~82% of churned monthly revenue (~$114K of ~$139K) and month-to-month contracts ~87%.',
        'Found churned customers had a median tenure of 10 months vs. 38 for retained customers; recommended contract-upgrade incentives and early-tenure engagement.'
    ],
    ARRAY['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    ARRAY['/assets/projects/churn-analysis-1.png'],
    '',
    'TODO_GITHUB_REPO_URL',
    2
),
(
    'academic-management-qp-generator',
    'Academic Management System & Automated Question Paper Generator',
    'NLP & Automation',
    'Dec 2025 - Apr 2026',
    true,
    'A platform that manages academic data and auto-generates regulation-compliant exam papers.',
    ARRAY[
        'Built a platform to manage faculty records, subjects and university regulations.',
        'Used regex and NLP-based PDF parsing to classify questions by Bloom''s Taxonomy level, Course Outcome (CO) and marks, stored in a relational MySQL schema.',
        'Designed a constraint-based algorithm that generates balanced exam papers automatically, cutting manual effort by ~80% with ~98% selection accuracy.'
    ],
    ARRAY['Python', 'MySQL', 'NLP', 'Regex'],
    ARRAY['/assets/projects/question-paper-1.png'],
    '',
    'TODO_GITHUB_REPO_URL',
    3
);

-- 4. Experience
INSERT INTO public.experience (role, company, location, period, current, points, display_order) VALUES
(
    'Data Science Trainee',
    'Inventateq',
    'Bengaluru, Karnataka, India',
    'May 2026 - Present',
    true,
    ARRAY[
        'Training in Python, SQL and Scikit-learn with hands-on regression (Linear, Polynomial, Lasso, Ridge, SVR) and classification (Logistic Regression, SVC, KNN, Naive Bayes, Decision Tree, Random Forest).',
        'Analyzed the Telco churn dataset (7,043 records) and found Fiber optic subscribers made up ~82% of churned monthly revenue.',
        'Built an XGBoost churn prediction model (~0.80 accuracy) and deployed it as a Streamlit app on Streamlit Community Cloud with auto-redeploy from GitHub.'
    ],
    1
);

-- 5. Education
INSERT INTO public.education (degree, major, institution, period, score, display_order) VALUES
('Master of Computer Applications (MCA)', 'Computer Application', 'Siddharth Institute of Engineering & Technology, Puttur', '2024 - 2026', 'CGPA 9.37 / 10', 1),
('Bachelor of Science (B.Sc)', 'Mathematics, Electronics & Computer Science', 'SV Arts College, Tirupati', '2020 - 2023', 'CGPA 6.93 / 10', 2),
('Intermediate (MPC)', NULL, 'A.P. Model School & Junior College, KVB Puram', '2018 - 2020', 'CGPA 9.80 / 10', 3),
('Secondary School (SSC)', NULL, 'A.P. Model School & Junior College, KVB Puram', '2017 - 2018', 'CGPA 9.20 / 10', 4);

-- 6. Certifications & Achievements
INSERT INTO public.certifications (title, issuer, date, credential_id, url, type, display_order) VALUES
('Data Science Training', 'Inventateq, Bengaluru', 'May 2026 - Present', NULL, NULL, 'training', 1),
('Deloitte Australia Data Analytics Job Simulation', 'Forage', 'Mar 2026', 'H7SXPQ6NxQG3RjiP', 'TODO', 'certification', 2),
('SQL (Certified)', 'HackerRank', 'Apr 2026 - May 2026', NULL, 'TODO', 'certification', 3),
('Python (Certified)', 'HackerRank', 'Apr 2026 - May 2026', NULL, 'TODO', 'certification', 4),
('Python', 'Simplilearn', 'Nov 2024 - Dec 2024', NULL, 'TODO', 'certification', 5),
('Research Paper Presentation: Robotics, IoT and AI', 'AAROHAN 3.0', 'Aug 2025', NULL, NULL, 'achievement', 6),
('Participant, Siddharth Hackfest 2K26', 'Siddharth Institute', '2026', NULL, NULL, 'achievement', 7),
('Participant, Siddharth Quest 2K25 & 2K26', 'Siddharth Institute', '2025 - 2026', NULL, NULL, 'achievement', 8),
('Workshop on Data Warehousing and ETL Tools', 'Workshop attendee', '', NULL, NULL, 'achievement', 9);

-- 7. Site Settings
INSERT INTO public.site_settings (hero_text_side, show_phone, enable_3d, theme_accent, theme_accent_sky)
VALUES ('left', false, true, '#6366F1', '#38BDF8');
