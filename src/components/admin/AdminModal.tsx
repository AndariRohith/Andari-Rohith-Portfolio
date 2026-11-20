import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  FolderGit2, 
  Cpu, 
  Award, 
  Briefcase, 
  GraduationCap, 
  User, 
  Sliders, 
  Mail, 
  Trash2, 
  Plus, 
  Check, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../common/Button';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { getMessages, deleteMessage } from '../../lib/api';
import type { ProjectItem, CertificationItem, ExperienceItem, EducationItem, ContactMessage } from '../../lib/types';

interface AdminModalProps {
  isOpen: boolean;
  initialTab?: string;
  initialItem?: any;
  onClose: () => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  initialTab = 'projects',
  initialItem,
  onClose,
  onShowToast
}) => {
  const { 
    projects, saveProject, deleteProject,
    skillCategories, saveSkill, deleteSkill,
    certifications, saveCertification, deleteCertification,
    experience, saveExperience, deleteExperience,
    education, saveEducation, deleteEducation,
    profile, updateProfile,
    settings, updateSettings
  } = useData();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; type: string; id: string; name: string }>({
    isOpen: false,
    type: '',
    id: '',
    name: ''
  });

  // Project form state
  const [projectForm, setProjectForm] = useState<ProjectItem>({
    id: '',
    title: '',
    category: 'Machine Learning',
    period: '',
    featured: true,
    summary: '',
    highlights: [''],
    tech: [''],
    images: [''],
    liveUrl: '',
    githubUrl: ''
  });

  // Skill form state
  const [skillForm, setSkillForm] = useState({
    category: 'Programming & Databases',
    name: '',
    icon: 'code',
    level: 80
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    headline: '',
    typingRoles: '',
    seeking: '',
    location: '',
    email: '',
    phone: '',
    bio: '',
    mcaCgpa: 9.37,
    resumeFile: '',
    heroCover: '',
    linkedin: '',
    github: ''
  });

  // Cert form state
  const [certForm, setCertForm] = useState<CertificationItem>({
    title: '',
    issuer: '',
    date: '',
    credentialId: '',
    url: '',
    type: 'certification'
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (initialItem && initialTab === 'projects') {
      setProjectForm(initialItem);
    }
  }, [initialItem, initialTab]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || '',
        headline: profile.headline || '',
        typingRoles: (profile.typingRoles || []).join(', '),
        seeking: profile.seeking || '',
        location: profile.location || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        mcaCgpa: profile.mcaCgpa || 9.37,
        resumeFile: profile.resumeFile || '',
        heroCover: profile.heroCover || '',
        linkedin: profile.socials?.linkedin || '',
        github: profile.socials?.github || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (activeTab === 'messages') {
      getMessages().then(setMessages);
    }
  }, [activeTab]);

  if (!isOpen) return null;

  // Handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = projectForm.id || `proj-${Date.now()}`;
      await saveProject({ ...projectForm, id });
      onShowToast(`Project "${projectForm.title}" saved successfully`, 'success');
      setProjectForm({
        id: '',
        title: '',
        category: 'Machine Learning',
        period: '',
        featured: true,
        summary: '',
        highlights: [''],
        tech: [''],
        images: [''],
        liveUrl: '',
        githubUrl: ''
      });
    } catch {
      onShowToast('Failed to save project', 'error');
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSkill(skillForm.category, {
        name: skillForm.name,
        icon: skillForm.icon,
        level: Number(skillForm.level)
      });
      onShowToast(`Skill "${skillForm.name}" updated`, 'success');
      setSkillForm({ ...skillForm, name: '' });
    } catch {
      onShowToast('Failed to save skill', 'error');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: profileForm.name,
        headline: profileForm.headline,
        typingRoles: profileForm.typingRoles.split(',').map(s => s.trim()).filter(Boolean),
        seeking: profileForm.seeking,
        location: profileForm.location,
        email: profileForm.email,
        phone: profileForm.phone,
        bio: profileForm.bio,
        mcaCgpa: Number(profileForm.mcaCgpa),
        resumeFile: profileForm.resumeFile,
        heroCover: profileForm.heroCover,
        socials: {
          linkedin: profileForm.linkedin,
          github: profileForm.github
        }
      });
      onShowToast('Profile information updated successfully', 'success');
    } catch {
      onShowToast('Failed to update profile', 'error');
    }
  };

  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveCertification(certForm);
      onShowToast(`Certification "${certForm.title}" saved`, 'success');
      setCertForm({
        title: '',
        issuer: '',
        date: '',
        credentialId: '',
        url: '',
        type: 'certification'
      });
    } catch {
      onShowToast('Failed to save certification', 'error');
    }
  };

  const confirmDelete = async () => {
    const { type, id, name } = deleteConfirm;
    try {
      if (type === 'project') await deleteProject(id);
      if (type === 'cert') await deleteCertification(id);
      if (type === 'message') {
        await deleteMessage(id);
        setMessages(prev => prev.filter(m => m.id !== id));
      }
      onShowToast(`Deleted ${name} successfully`, 'success');
    } catch {
      onShowToast(`Failed to delete ${name}`, 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, type: '', id: '', name: '' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#181A20] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs">ADMIN</span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Portfolio Content Manager
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-50 dark:bg-slate-900/50">
          {[
            { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
            { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" /> },
            { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
            { id: 'profile', label: 'Profile & Assets', icon: <User className="w-4 h-4" /> },
            { id: 'settings', label: 'Site Settings', icon: <Sliders className="w-4 h-4" /> },
            { id: 'messages', label: `Messages (${messages.length})`, icon: <Mail className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-sky-400 bg-white dark:bg-slate-800'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <form onSubmit={handleProjectSubmit} className="glass-panel p-5 rounded-2xl border space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-500" />
                  {projectForm.id ? 'Edit Project' : 'Add New Project'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="e.g. Telco Churn Predictor"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Category *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.category}
                      onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="Machine Learning / Data Analysis"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Period</label>
                    <input
                      type="text"
                      value={projectForm.period}
                      onChange={e => setProjectForm({ ...projectForm, period: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="e.g. Sep 2026 - Oct 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.tech.join(', ')}
                      onChange={e => setProjectForm({ ...projectForm, tech: e.target.value.split(',').map(s => s.trim()) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="Python, Scikit-learn, XGBoost, Streamlit"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Live Demo URL (Leave blank or TODO to hide)</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">GitHub Repo URL (Leave blank or TODO to hide)</label>
                    <input
                      type="text"
                      value={projectForm.githubUrl}
                      onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Summary *</label>
                  <textarea
                    rows={2}
                    required
                    value={projectForm.summary}
                    onChange={e => setProjectForm({ ...projectForm, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    placeholder="Brief description of the model and results..."
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Highlights (one per line)</label>
                  <textarea
                    rows={3}
                    value={projectForm.highlights.join('\n')}
                    onChange={e => setProjectForm({ ...projectForm, highlights: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    placeholder="Enter key bullets..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                    Save Project
                  </Button>
                  {projectForm.id && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setProjectForm({
                        id: '',
                        title: '',
                        category: 'Machine Learning',
                        period: '',
                        featured: true,
                        summary: '',
                        highlights: [''],
                        tech: [''],
                        images: [''],
                        liveUrl: '',
                        githubUrl: ''
                      })}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>

              {/* Current Projects List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Existing Projects ({projects.length})
                </h4>
                {projects.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{p.title}</p>
                      <p className="text-slate-400">{p.category} • {p.period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setProjectForm(p)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ isOpen: true, type: 'project', id: p.id, name: p.title })}
                        className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <form onSubmit={handleSkillSubmit} className="glass-panel p-5 rounded-2xl border space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-500" />
                  Add or Update Skill
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={skillForm.category}
                      onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Skill Name *</label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="e.g. Scikit-learn"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Icon Key</label>
                    <input
                      type="text"
                      value={skillForm.icon}
                      onChange={e => setSkillForm({ ...skillForm, icon: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="python, code, brain, cpu"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Level (0 - 100)%</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={skillForm.level}
                      onChange={e => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                  Save Skill
                </Button>
              </form>

              {/* Skills list grouped */}
              <div className="space-y-4">
                {skillCategories.map(cat => (
                  <div key={cat.category} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-sky-400 uppercase tracking-wider">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(s => (
                        <div key={s.name} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{s.name} ({s.level}%)</span>
                          <button
                            onClick={() => deleteSkill(cat.category, s.name)}
                            className="text-slate-400 hover:text-rose-500 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <form onSubmit={handleCertSubmit} className="glass-panel p-5 rounded-2xl border space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-indigo-500" />
                  Add Certification / Achievement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Issuer *</label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={e => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Type</label>
                    <select
                      value={certForm.type}
                      onChange={e => setCertForm({ ...certForm, type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    >
                      <option value="certification">Certification</option>
                      <option value="training">Training</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={certForm.date}
                      onChange={e => setCertForm({ ...certForm, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="e.g. Mar 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Credential URL</label>
                    <input
                      type="text"
                      value={certForm.url}
                      onChange={e => setCertForm({ ...certForm, url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Credential ID</label>
                    <input
                      type="text"
                      value={certForm.credentialId}
                      onChange={e => setCertForm({ ...certForm, credentialId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                  Save Credential
                </Button>
              </form>

              <div className="space-y-2">
                {certifications.map(c => (
                  <div key={c.id || c.title} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
                      <p className="text-slate-400">{c.issuer} • {c.date} ({c.type})</p>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm({ isOpen: true, type: 'cert', id: c.id || c.title, name: c.title })}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE & ASSETS TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Headline</label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={e => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Typing Roles (comma separated)</label>
                  <input
                    type="text"
                    value={profileForm.typingRoles}
                    onChange={e => setProfileForm({ ...profileForm, typingRoles: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Seeking Goal</label>
                  <input
                    type="text"
                    value={profileForm.seeking}
                    onChange={e => setProfileForm({ ...profileForm, seeking: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Resume File Path / URL</label>
                  <input
                    type="text"
                    value={profileForm.resumeFile}
                    onChange={e => setProfileForm({ ...profileForm, resumeFile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Hero Cover Image URL</label>
                  <input
                    type="text"
                    value={profileForm.heroCover}
                    onChange={e => setProfileForm({ ...profileForm, heroCover: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profileForm.linkedin}
                    onChange={e => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={profileForm.github}
                    onChange={e => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Bio</label>
                <textarea
                  rows={4}
                  value={profileForm.bio}
                  onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80"
                />
              </div>

              <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                Save Profile Changes
              </Button>
            </form>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-xs">
              <div className="glass-panel p-5 rounded-2xl border space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Section Visibility Toggles
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(settings?.sections || {}).map(([sec, isVis]) => (
                    <label key={sec} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <input
                        type="checkbox"
                        checked={isVis}
                        onChange={e => {
                          if (settings) {
                            updateSettings({
                              sections: {
                                ...settings.sections,
                                [sec]: e.target.checked
                              }
                            });
                          }
                        }}
                        className="rounded text-indigo-600"
                      />
                      <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{sec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Interactive Features & Layout
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Show Phone Number on Contact Section</p>
                      <p className="text-slate-400">Default is hidden for privacy</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings?.showPhone ?? false}
                      onChange={e => updateSettings({ showPhone: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Enable 3D Wireframe Canvas</p>
                      <p className="text-slate-400">Low-poly 3D nodes and floating particle field</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings?.enable3D ?? true}
                      onChange={e => updateSettings({ enable3D: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                  </label>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Hero Text Alignment Side</p>
                      <p className="text-slate-400">Default is left (over photo empty space)</p>
                    </div>
                    <select
                      value={settings?.heroTextSide || 'left'}
                      onChange={e => updateSettings({ heroTextSide: e.target.value as any })}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800"
                    >
                      <option value="left">Left (Recommended)</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES INBOX TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Incoming Contact Form Inquiries
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {messages.length} messages
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                  No messages in your inbox yet.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{msg.name}</span>
                        <span className="text-slate-400 ml-2">&lt;{msg.email}&gt;</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-400">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                        </span>
                        <button
                          onClick={() => setDeleteConfirm({ isOpen: true, type: 'message', id: msg.id!, name: `Message from ${msg.name}` })}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, type: '', id: '', name: '' })}
      />
    </div>
  );
};
