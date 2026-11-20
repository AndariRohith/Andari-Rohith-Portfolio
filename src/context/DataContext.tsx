import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type {
  ProfileData,
  SkillCategoryGroup,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  SiteSettings,
  StatItem
} from '../lib/types';
import * as api from '../lib/api';

interface DataContextType {
  profile: ProfileData | null;
  skillCategories: SkillCategoryGroup[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  settings: SiteSettings | null;
  stats: StatItem[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateProfile: (updated: Partial<ProfileData>) => Promise<void>;
  saveProject: (project: ProjectItem) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveSkill: (category: string, skill: { name: string; icon: string; level: number }) => Promise<void>;
  deleteSkill: (category: string, skillName: string) => Promise<void>;
  saveCertification: (cert: CertificationItem) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  saveExperience: (item: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveEducation: (item: EducationItem) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  updateSettings: (updated: Partial<SiteSettings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategoryGroup[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAll = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [p, sc, pr, exp, edu, cert, st] = await Promise.all([
        api.getProfile(),
        api.getSkillCategories(),
        api.getProjects(),
        api.getExperience(),
        api.getEducation(),
        api.getCertifications(),
        api.getSettings()
      ]);
      setProfile(p);
      setSkillCategories(sc);
      setProjects(pr);
      setExperience(exp);
      setEducation(edu);
      setCertifications(cert);
      setSettings(st);
    } catch (err: any) {
      console.error('Failed to load portfolio data:', err);
      setError('Failed to load portfolio content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Live Computed Stats
  const stats = useMemo<StatItem[]>(() => {
    const totalProjects = projects.length;
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    const totalCategories = skillCategories.length;
    
    // Unique tech tags across all projects
    const uniqueTech = new Set<string>();
    projects.forEach(p => {
      p.tech.forEach(t => uniqueTech.add(t.trim()));
    });
    const totalTech = uniqueTech.size;

    const totalCerts = certifications.length;
    const mcaScore = profile?.mcaCgpa || 9.37;

    return [
      {
        label: "Live Projects",
        value: totalProjects,
        subtext: "End-to-end ML & Data apps"
      },
      {
        label: "Technical Skills",
        value: totalSkills,
        suffix: "+",
        subtext: `${totalCategories} core categories`
      },
      {
        label: "Tech Stack Tools",
        value: totalTech,
        suffix: "+",
        subtext: "Python, SQL, ML libraries"
      },
      {
        label: "Certifications & Honors",
        value: totalCerts,
        subtext: "Verified credentials"
      },
      {
        label: "MCA CGPA",
        value: mcaScore,
        decimals: 2,
        subtext: "Academic distinction"
      }
    ];
  }, [projects, skillCategories, certifications, profile]);

  // Operations
  const handleUpdateProfile = async (updated: Partial<ProfileData>) => {
    const res = await api.updateProfile(updated);
    setProfile(res);
  };

  const handleSaveProject = async (proj: ProjectItem) => {
    await api.saveProject(proj);
    const updated = await api.getProjects();
    setProjects(updated);
  };

  const handleDeleteProject = async (id: string) => {
    await api.deleteProject(id);
    const updated = await api.getProjects();
    setProjects(updated);
  };

  const handleSaveSkill = async (category: string, skill: { name: string; icon: string; level: number }) => {
    await api.saveSkill(category, skill);
    const updated = await api.getSkillCategories();
    setSkillCategories(updated);
  };

  const handleDeleteSkill = async (category: string, skillName: string) => {
    await api.deleteSkill(category, skillName);
    const updated = await api.getSkillCategories();
    setSkillCategories(updated);
  };

  const handleSaveCertification = async (cert: CertificationItem) => {
    await api.saveCertification(cert);
    const updated = await api.getCertifications();
    setCertifications(updated);
  };

  const handleDeleteCertification = async (id: string) => {
    await api.deleteCertification(id);
    const updated = await api.getCertifications();
    setCertifications(updated);
  };

  const handleSaveExperience = async (item: ExperienceItem) => {
    await api.saveExperience(item);
    const updated = await api.getExperience();
    setExperience(updated);
  };

  const handleDeleteExperience = async (id: string) => {
    await api.deleteExperience(id);
    const updated = await api.getExperience();
    setExperience(updated);
  };

  const handleSaveEducation = async (item: EducationItem) => {
    await api.saveEducation(item);
    const updated = await api.getEducation();
    setEducation(updated);
  };

  const handleDeleteEducation = async (id: string) => {
    await api.deleteEducation(id);
    const updated = await api.getEducation();
    setEducation(updated);
  };

  const handleUpdateSettings = async (updated: Partial<SiteSettings>) => {
    const res = await api.updateSettings(updated);
    setSettings(res);
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        skillCategories,
        projects,
        experience,
        education,
        certifications,
        settings,
        stats,
        isLoading,
        error,
        refreshData: loadAll,
        updateProfile: handleUpdateProfile,
        saveProject: handleSaveProject,
        deleteProject: handleDeleteProject,
        saveSkill: handleSaveSkill,
        deleteSkill: handleDeleteSkill,
        saveCertification: handleSaveCertification,
        deleteCertification: handleDeleteCertification,
        saveExperience: handleSaveExperience,
        deleteExperience: handleDeleteExperience,
        saveEducation: handleSaveEducation,
        deleteEducation: handleDeleteEducation,
        updateSettings: handleUpdateSettings
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
