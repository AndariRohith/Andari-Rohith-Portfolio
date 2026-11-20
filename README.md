# Andari Rohith | Personal Portfolio & Data Science Showcase

A modern, high-performance personal portfolio website built with **React, Vite, TypeScript, Tailwind CSS, Three.js (@react-three/fiber), and Supabase**. Features 3D floating neural and wireframe geometries, dynamic computed real-time database metrics, and a dual **Viewer / Admin** access system with PostgreSQL Row Level Security (RLS).

---

## 🚀 Features

- **Initial Mode Gate**: Sleek interactive entrance allowing guests to choose **Viewer Mode** (instant read-only browsing) or **Admin Portal** (password-protected management). Switch modes at any time from the top navigation bar.
- **Hero & Aesthetic Color-Graded**: Light lavender palette (`#EEF0FA`) precisely sampled from the hero photograph's edge for seamless image blending, brushed grey accents, interactive 3D particle nodes positioned behind content so facial visibility is never obscured, and an animated role typing effect.
- **Dynamic Computed Stats Engine**: Real-time counter metrics for *Projects*, *Skills*, *Categories*, *Tech Stack Tools*, *Certifications*, and *MCA CGPA (9.37)* calculated reactively from live database records.
- **Project Filter & Modal**: Category filters, 3D tilt interaction cards, and detailed modal views with key technical highlights and outcomes. Empty and `TODO` links are automatically hidden.
- **Interactive Technical Skills**: Organized by domain (Programming, Data Analysis, Machine Learning, Visualization) with level indicators and animated progress bars.
- **Academic & Experience Timelines**: Vertical timelines with active status badges for Inventateq Data Science training and MCA academic scores.
- **Admin Management Suite**:
  - Floating action dock for authenticated admin.
  - CRUD operations for Projects, Skills, Certifications, Experience, and Education.
  - Profile and Asset Management (Bio, typing roles, photo URLs, resume file).
  - Site Settings toggles (Section visibility, 3D Canvas on/off, phone number privacy toggle, hero text side).
  - Contact Form Inbox to view and manage inquiries with spam honeypot guard.
- **Zero-Config Seed Fallback**: Fully functional out of the box with offline mock persistence if Supabase credentials are not yet configured.

---

## 🛠️ Step-by-Step Setup Guide

### 1. Supabase Setup
1. Log in to [Supabase](https://supabase.com) and create a new project (e.g. `andari-rohith-portfolio`).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository, paste the entire SQL content, and click **Run**. This creates:
   - All relational tables (`profiles`, `projects`, `skills`, `skill_categories`, `experience`, `education`, `certifications`, `site_settings`, `messages`).
   - Row Level Security (RLS) policies allowing public read and authenticated admin-only mutations.
   - Storage buckets (`portfolio-assets` and `resumes`).
4. In the SQL Editor, open `supabase/seed.sql`, paste the content, and click **Run**. This populates the database with Rohith's real seed data from `portfolio-content.md`.

### 2. Configure Admin Authentication & Security
1. In the Supabase dashboard, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**:
   - Email: `andarirohith12@gmail.com`
   - Set a secure admin password.
   - Toggle **Auto Confirm User** to `ON`.
3. In **Authentication** -> **Providers** -> **Email**:
   - Uncheck **Enable Signups** (disabling public registrations so nobody else can create an admin account).
4. In **Project Settings** -> **API**, copy:
   - `Project URL`
   - `anon public` key

### 3. Local Environment
1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your keys:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🛡️ How to Use the Admin Portal

1. On the Start Gate screen, select **Admin Portal** (or click **Switch mode** in the navigation bar).
2. Enter your authorized admin email and password.
3. Once logged in, you will see:
   - Inline **Edit** / **Delete** controls on cards throughout the portfolio.
   - The floating **Admin Dock** at the bottom of the screen.
4. **Manage Content**:
   - **Projects**: Click the **Projects** tab or inline edit on any card. Update title, summary, highlights, tech tags, or GitHub/Demo URLs.
   - **Skills**: Add new tools or adjust proficiency sliders.
   - **Certifications**: Add new verified credentials or research papers.
   - **Profile & Assets**: Update bio, typing roles, and resume URL.
   - **Settings**: Toggle visibility for sections or enable the contact phone number.
   - **Inbox**: View and delete incoming messages sent through the contact form.

---

## 📋 Items to Provide / Replace Before Production Deploy

- **Resume PDF**: Place your actual resume PDF in `public/assets/resume/Andari_Rohith_Resume.pdf`.
- **Project Links**:
  - Telco Churn Prediction Streamlit App URL.
  - GitHub repository links for Telco Churn Analysis and Academic Exam Paper Generator.
- **Certifications**: Credential URLs for HackerRank SQL/Python and Simplilearn.
- **Supabase Credentials**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting provider's dashboard (e.g., Vercel / Netlify environment variables).

---

## 🚢 Deploy (Vercel & Supabase Setup)

Follow these step-by-step instructions to deploy to production:

### 1. Build Verification
Test the build locally to ensure everything compiles cleanly:
```bash
npm run build
```

### 2. Push to GitHub
Initialize your local Git repository and push to GitHub:
```bash
git init
git add .
git commit -m "feat: complete production portfolio with 3D animation and admin system"
git branch -M main
git remote add origin https://github.com/AndariRohith/portfolio.git
git push -u origin main
```

### 3. Import Repository on Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project** and import your `portfolio` repository.
3. Framework Preset will auto-detect as **Vite**.
4. Root Directory: `./` (default).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.

### 4. Configure Environment Variables in Vercel
Under the **Environment Variables** section in Vercel, add:
- `VITE_SUPABASE_URL`: Your Supabase Project URL (e.g. `https://your-project-id.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous API key

### 5. Deploy
Click **Deploy**. Vercel will build and deploy your portfolio to a custom `*.vercel.app` domain. The provided `vercel.json` ensures that single-page client routing (including `/admin`) serves `index.html` seamlessly without 404 errors on page refresh.

### 6. Set Site URL & Redirect URLs in Supabase
Once your Vercel deployment URL is live (e.g., `https://andari-rohith-portfolio.vercel.app`):
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Navigate to **Authentication** -> **URL Configuration**.
3. Set **Site URL** to your production Vercel URL:
   ```
   https://your-app.vercel.app
   ```
4. Under **Redirect URLs**, add your deployment URL and local development URLs:
   ```
   https://your-app.vercel.app/**
   http://localhost:5173/**
   ```
5. Click **Save**.

Now you can authenticate as Admin from anywhere on the web, and all updates to projects, skills, certifications, and settings will update live in real-time!
