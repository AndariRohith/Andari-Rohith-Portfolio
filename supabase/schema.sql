-- ==============================================================================
-- ANDARI ROHITH PORTFOLIO - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Andari Rohith',
    headline TEXT NOT NULL DEFAULT 'Aspiring Data Scientist',
    typing_roles TEXT[] NOT NULL DEFAULT ARRAY['Data Science Trainee', 'Python & SQL Developer', 'ML Model Builder', 'Data Storyteller'],
    seeking TEXT NOT NULL DEFAULT 'Data Science Internship / Entry-level Data Science role',
    location TEXT NOT NULL DEFAULT 'Bengaluru, Karnataka, India',
    email TEXT NOT NULL DEFAULT 'andarirohith12@gmail.com',
    phone TEXT DEFAULT '+91 9392436199',
    socials JSONB DEFAULT '{"linkedin": "https://www.linkedin.com/in/andarirohith-894784320", "github": "https://github.com/AndariRohith"}'::jsonb,
    resume_url TEXT DEFAULT '/assets/resume/Andari_Rohith_Resume.pdf',
    photo_url TEXT DEFAULT '/assets/profile/photo.jpg',
    hero_cover_url TEXT DEFAULT '/assets/profile/hero-cover.png',
    bio TEXT NOT NULL,
    mca_cgpa NUMERIC(4,2) DEFAULT 9.37,
    personal_info JSONB DEFAULT '{"languages": ["English", "Telugu", "Tamil"], "hobbies": ["Listening to Music", "Playing Team Sports", "Traveling"], "nationality": "Indian", "currentlyDoing": "Data Science training at Inventateq, Bengaluru"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    period TEXT NOT NULL,
    featured BOOLEAN DEFAULT true,
    summary TEXT NOT NULL,
    highlights TEXT[] NOT NULL DEFAULT '{}',
    tech TEXT[] NOT NULL DEFAULT '{}',
    images TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Skill Categories Table
CREATE TABLE IF NOT EXISTS public.skill_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.skill_categories(id) ON DELETE CASCADE,
    category_name TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'code',
    level INT CHECK (level >= 0 AND level <= 100) DEFAULT 80,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    period TEXT NOT NULL,
    current BOOLEAN DEFAULT false,
    points TEXT[] NOT NULL DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    major TEXT,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    score TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Certifications Table (Certs, Training & Achievements)
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    credential_id TEXT,
    url TEXT,
    type TEXT NOT NULL CHECK (type IN ('certification', 'training', 'achievement')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_text_side TEXT DEFAULT 'left' CHECK (hero_text_side IN ('left', 'right')),
    show_phone BOOLEAN DEFAULT false,
    enable_3d BOOLEAN DEFAULT true,
    theme_accent TEXT DEFAULT '#6366F1',
    theme_accent_sky TEXT DEFAULT '#38BDF8',
    sections_visible JSONB DEFAULT '{"about": true, "skills": true, "projects": true, "experience": true, "education": true, "certifications": true, "contact": true, "testimonials": false, "blog": false}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ (Anyone can view the portfolio)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skill Categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);

-- 2. PUBLIC INSERT ON MESSAGES (Anyone can submit contact form)
CREATE POLICY "Public Insert Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- 3. ADMIN FULL ACCESS (Only authenticated admin can insert, update, delete content and view messages)
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Skill Categories" ON public.skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Certifications" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Site Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Read & Delete Messages" ON public.messages FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE BUCKETS SETUP
-- ==============================================================================
-- Run these in Supabase SQL editor to create public read buckets with admin write
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Portfolio Assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets' OR bucket_id = 'resumes');
CREATE POLICY "Admin Upload Portfolio Assets" ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'portfolio-assets' OR bucket_id = 'resumes') AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update Portfolio Assets" ON storage.objects FOR UPDATE USING ((bucket_id = 'portfolio-assets' OR bucket_id = 'resumes') AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Portfolio Assets" ON storage.objects FOR DELETE USING ((bucket_id = 'portfolio-assets' OR bucket_id = 'resumes') AND auth.role() = 'authenticated');
