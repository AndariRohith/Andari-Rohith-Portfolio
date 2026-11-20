import { supabase, isSupabaseConfigured } from './supabase';
import { profile as seedProfile } from '../data/profile';
import { skillCategories as seedSkillCategories } from '../data/skills';
import { projects as seedProjects } from '../data/projects';
import { experience as seedExperience } from '../data/experience';
import { education as seedEducation } from '../data/education';
import { certifications as seedCertifications } from '../data/certifications';
import { siteConfig as seedSiteConfig } from '../data/siteConfig';
import type {
  ProfileData,
  SkillCategoryGroup,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  SiteSettings,
  ContactMessage
} from './types';

// In-memory cache & local storage fallback so offline/demo changes persist during the session
const STORAGE_PREFIX = 'ar_portfolio_';

function getLocalData<T>(key: string, defaultData: T): T {
  try {
    const val = localStorage.getItem(STORAGE_PREFIX + key);
    if (val) return JSON.parse(val);
  } catch {
    // ignore
  }
  return defaultData;
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------
// PROFILES
// ---------------------------------------------------------
export async function getProfile(): Promise<ProfileData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          headline: data.headline,
          typingRoles: data.typing_roles,
          seeking: data.seeking,
          location: data.location,
          email: data.email,
          phone: data.phone,
          socials: data.socials,
          resumeFile: data.resume_url,
          photo: data.photo_url,
          heroCover: data.hero_cover_url,
          bio: data.bio,
          mcaCgpa: Number(data.mca_cgpa) || 9.37,
          personalInfo: data.personal_info
        };
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<ProfileData>('profile', seedProfile as ProfileData);
}

export async function updateProfile(updated: Partial<ProfileData>): Promise<ProfileData> {
  const current = await getProfile();
  const merged: ProfileData = { ...current, ...updated };

  if (isSupabaseConfigured && supabase) {
    try {
      if (merged.id) {
        await supabase.from('profiles').update({
          name: merged.name,
          headline: merged.headline,
          typing_roles: merged.typingRoles,
          seeking: merged.seeking,
          location: merged.location,
          email: merged.email,
          phone: merged.phone,
          socials: merged.socials,
          resume_url: merged.resumeFile,
          photo_url: merged.photo,
          hero_cover_url: merged.heroCover,
          bio: merged.bio,
          mca_cgpa: merged.mcaCgpa,
          personal_info: merged.personalInfo,
          updated_at: new Date().toISOString()
        }).eq('id', merged.id);
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('profile', merged);
  return merged;
}

// ---------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------
export async function getProjects(): Promise<ProjectItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          title: d.title,
          category: d.category,
          period: d.period,
          featured: d.featured,
          summary: d.summary,
          highlights: d.highlights || [],
          tech: d.tech || [],
          images: d.images || [],
          liveUrl: d.live_url || '',
          githubUrl: d.github_url || ''
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<ProjectItem[]>('projects', seedProjects);
}

export async function saveProject(project: ProjectItem): Promise<ProjectItem> {
  const current = await getProjects();
  const existingIdx = current.findIndex(p => p.id === project.id);
  let updatedProjects: ProjectItem[];

  if (isSupabaseConfigured && supabase) {
    try {
      if (existingIdx >= 0) {
        await supabase.from('projects').update({
          title: project.title,
          category: project.category,
          period: project.period,
          featured: project.featured,
          summary: project.summary,
          highlights: project.highlights,
          tech: project.tech,
          images: project.images,
          live_url: project.liveUrl,
          github_url: project.githubUrl,
          updated_at: new Date().toISOString()
        }).eq('id', project.id);
      } else {
        const { data } = await supabase.from('projects').insert({
          slug: project.id,
          title: project.title,
          category: project.category,
          period: project.period,
          featured: project.featured,
          summary: project.summary,
          highlights: project.highlights,
          tech: project.tech,
          images: project.images,
          live_url: project.liveUrl,
          github_url: project.githubUrl,
          display_order: current.length + 1
        }).select().single();
        if (data) project.id = data.id;
      }
    } catch {
      // Fallback
    }
  }

  if (existingIdx >= 0) {
    updatedProjects = [...current];
    updatedProjects[existingIdx] = project;
  } else {
    updatedProjects = [...current, project];
  }

  setLocalData('projects', updatedProjects);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const current = await getProjects();
  const filtered = current.filter(p => p.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }

  setLocalData('projects', filtered);
}

// ---------------------------------------------------------
// SKILLS & CATEGORIES
// ---------------------------------------------------------
export async function getSkillCategories(): Promise<SkillCategoryGroup[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: cats } = await supabase
        .from('skill_categories')
        .select('*')
        .order('display_order', { ascending: true });
      const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (cats && skills && cats.length > 0) {
        return cats.map((cat: any) => ({
          id: cat.id,
          category: cat.name,
          skills: skills
            .filter((s: any) => s.category_id === cat.id || s.category_name === cat.name)
            .map((s: any) => ({
              id: s.id,
              name: s.name,
              icon: s.icon,
              level: s.level
            }))
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<SkillCategoryGroup[]>('skills', seedSkillCategories);
}

export async function saveSkill(categoryName: string, skill: SkillItem): Promise<void> {
  const current = await getSkillCategories();
  let found = false;

  const updated = current.map(cat => {
    if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
      found = true;
      const sIdx = cat.skills.findIndex(s => s.name.toLowerCase() === skill.name.toLowerCase());
      if (sIdx >= 0) {
        const newSkills = [...cat.skills];
        newSkills[sIdx] = skill;
        return { ...cat, skills: newSkills };
      } else {
        return { ...cat, skills: [...cat.skills, skill] };
      }
    }
    return cat;
  });

  if (!found) {
    updated.push({
      category: categoryName,
      skills: [skill]
    });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      // Supabase sync
      let catId: string | undefined;
      const { data: catData } = await supabase
        .from('skill_categories')
        .select('id')
        .eq('name', categoryName)
        .maybeSingle();

      if (catData) {
        catId = catData.id;
      } else {
        const { data: newCat } = await supabase
          .from('skill_categories')
          .insert({ name: categoryName, display_order: updated.length })
          .select()
          .single();
        if (newCat) catId = newCat.id;
      }

      if (catId) {
        const { data: existingSkill } = await supabase
          .from('skills')
          .select('id')
          .eq('name', skill.name)
          .maybeSingle();

        if (existingSkill) {
          await supabase.from('skills').update({
            level: skill.level,
            icon: skill.icon,
            category_id: catId,
            category_name: categoryName
          }).eq('id', existingSkill.id);
        } else {
          await supabase.from('skills').insert({
            name: skill.name,
            icon: skill.icon,
            level: skill.level,
            category_id: catId,
            category_name: categoryName
          });
        }
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('skills', updated);
}

export async function deleteSkill(categoryName: string, skillName: string): Promise<void> {
  const current = await getSkillCategories();
  const updated = current.map(cat => {
    if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
      return {
        ...cat,
        skills: cat.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
      };
    }
    return cat;
  }).filter(cat => cat.skills.length > 0);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('skills').delete().eq('name', skillName);
    } catch {
      // Fallback
    }
  }

  setLocalData('skills', updated);
}

// ---------------------------------------------------------
// CERTIFICATIONS & ACHIEVEMENTS
// ---------------------------------------------------------
export async function getCertifications(): Promise<CertificationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          title: d.title,
          issuer: d.issuer,
          date: d.date,
          credentialId: d.credential_id,
          url: d.url,
          type: d.type
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<CertificationItem[]>('certifications', seedCertifications);
}

export async function saveCertification(cert: CertificationItem): Promise<void> {
  const current = await getCertifications();
  const existingIdx = current.findIndex(c => c.id === cert.id || c.title === cert.title);
  let updated: CertificationItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = cert;
  } else {
    updated = [...current, { ...cert, id: cert.id || `cert-${Date.now()}` }];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      if (cert.id && existingIdx >= 0) {
        await supabase.from('certifications').update({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          credential_id: cert.credentialId,
          url: cert.url,
          type: cert.type
        }).eq('id', cert.id);
      } else {
        await supabase.from('certifications').insert({
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          credential_id: cert.credentialId,
          url: cert.url,
          type: cert.type,
          display_order: current.length + 1
        });
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('certifications', updated);
}

export async function deleteCertification(idOrTitle: string): Promise<void> {
  const current = await getCertifications();
  const filtered = current.filter(c => c.id !== idOrTitle && c.title !== idOrTitle);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certifications').delete().or(`id.eq.${idOrTitle},title.eq.${idOrTitle}`);
    } catch {
      // Fallback
    }
  }

  setLocalData('certifications', filtered);
}

// ---------------------------------------------------------
// EXPERIENCE
// ---------------------------------------------------------
export async function getExperience(): Promise<ExperienceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          role: d.role,
          company: d.company,
          location: d.location,
          period: d.period,
          current: d.current,
          points: d.points || []
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<ExperienceItem[]>('experience', seedExperience);
}

export async function saveExperience(item: ExperienceItem): Promise<void> {
  const current = await getExperience();
  const existingIdx = current.findIndex(e => e.id === item.id);
  let updated: ExperienceItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [...current, { ...item, id: item.id || `exp-${Date.now()}` }];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      if (item.id && existingIdx >= 0) {
        await supabase.from('experience').update({
          role: item.role,
          company: item.company,
          location: item.location,
          period: item.period,
          current: item.current,
          points: item.points
        }).eq('id', item.id);
      } else {
        await supabase.from('experience').insert({
          role: item.role,
          company: item.company,
          location: item.location,
          period: item.period,
          current: item.current,
          points: item.points,
          display_order: current.length + 1
        });
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('experience', updated);
}

export async function deleteExperience(id: string): Promise<void> {
  const current = await getExperience();
  const filtered = current.filter(e => e.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('experience').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }

  setLocalData('experience', filtered);
}

// ---------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------
export async function getEducation(): Promise<EducationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          degree: d.degree,
          major: d.major,
          institution: d.institution,
          period: d.period,
          score: d.score
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<EducationItem[]>('education', seedEducation);
}

export async function saveEducation(item: EducationItem): Promise<void> {
  const current = await getEducation();
  const existingIdx = current.findIndex(e => e.id === item.id);
  let updated: EducationItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [...current, { ...item, id: item.id || `edu-${Date.now()}` }];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      if (item.id && existingIdx >= 0) {
        await supabase.from('education').update({
          degree: item.degree,
          major: item.major,
          institution: item.institution,
          period: item.period,
          score: item.score
        }).eq('id', item.id);
      } else {
        await supabase.from('education').insert({
          degree: item.degree,
          major: item.major,
          institution: item.institution,
          period: item.period,
          score: item.score,
          display_order: current.length + 1
        });
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('education', updated);
}

export async function deleteEducation(id: string): Promise<void> {
  const current = await getEducation();
  const filtered = current.filter(e => e.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('education').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }

  setLocalData('education', filtered);
}

// ---------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------
export async function getSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      if (!error && data) {
        return {
          id: data.id,
          title: seedSiteConfig.title,
          description: seedSiteConfig.description,
          nav: seedSiteConfig.nav,
          heroTextSide: data.hero_text_side || 'left',
          showPhone: data.show_phone ?? false,
          enable3D: data.enable_3d ?? true,
          sections: {
            ...seedSiteConfig.sections,
            ...(data.sections_visible || {})
          },
          theme: {
            default: seedSiteConfig.theme.default,
            accent: data.theme_accent || '#6366F1',
            accentSky: data.theme_accent_sky || '#38BDF8'
          }
        };
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<SiteSettings>('settings', seedSiteConfig as SiteSettings);
}

export async function updateSettings(updated: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSettings();
  const merged: SiteSettings = { ...current, ...updated };

  if (isSupabaseConfigured && supabase) {
    try {
      if (merged.id) {
        await supabase.from('site_settings').update({
          hero_text_side: merged.heroTextSide,
          show_phone: merged.showPhone,
          enable_3d: merged.enable3D,
          theme_accent: merged.theme.accent,
          theme_accent_sky: merged.theme.accentSky,
          sections_visible: merged.sections,
          updated_at: new Date().toISOString()
        }).eq('id', merged.id);
      }
    } catch {
      // Fallback
    }
  }

  setLocalData('settings', merged);
  return merged;
}

// ---------------------------------------------------------
// MESSAGES (CONTACT FORM)
// ---------------------------------------------------------
export async function getMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((m: any) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          message: m.message,
          isRead: m.is_read,
          createdAt: m.created_at
        }));
      }
    } catch {
      // Fallback
    }
  }
  return getLocalData<ContactMessage[]>('messages', [
    {
      id: 'demo-1',
      name: 'Priya Sharma (Tech Recruiter)',
      email: 'priya@datastaffing.io',
      message: 'Hi Rohith, impressed by your Telco churn ML project and MCA CGPA of 9.37! We have an opening for a Data Science Intern.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      isRead: false
    }
  ]);
}

export async function submitContactMessage(msg: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('messages').insert({
        name: msg.name,
        email: msg.email,
        message: msg.message,
        is_read: false
      });
      if (error) throw error;
      return { success: true, message: 'Your message has been sent successfully! Rohith will reach out to you shortly.' };
    } catch (e: any) {
      console.warn('Supabase message error, falling back locally:', e);
    }
  }

  // Fallback locally
  const current = await getMessages();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: msg.name,
    email: msg.email,
    message: msg.message,
    createdAt: new Date().toISOString(),
    isRead: false
  };
  setLocalData('messages', [newMsg, ...current]);
  return { success: true, message: 'Your message has been sent successfully! Rohith will reach out to you shortly.' };
}

export async function deleteMessage(id: string): Promise<void> {
  const current = await getMessages();
  const filtered = current.filter(m => m.id !== id);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('messages').delete().eq('id', id);
    } catch {
      // Fallback
    }
  }

  setLocalData('messages', filtered);
}
