import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { isValidUrl } from '../../lib/utils';
import { Button } from '../common/Button';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Calendar, 
  X,
  Layers
} from 'lucide-react';
import type { ProjectItem } from '../../lib/types';

interface ProjectsSectionProps {
  onOpenAdminModal?: (tab?: string, item?: any) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAdminModal }) => {
  const { projects, deleteProject } = useData();
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-t border-b border-portfolio-brush/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Applied Machine Learning & Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Featured Projects
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal?.('projects')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Project
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-portfolio-brush dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const hasLive = isValidUrl(project.liveUrl);
            const hasGithub = isValidUrl(project.githubUrl);

            return (
              <div
                key={project.id}
                className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 border border-indigo-200/60 dark:border-white/10 group relative bg-white/80 dark:bg-slate-900/80"
              >
                {/* Admin card actions */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 p-1.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => onOpenAdminModal?.('projects', project)}
                      className="p-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400"
                      title="Edit project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="p-1 text-slate-600 dark:text-slate-300 hover:text-rose-600"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div>
                  {/* Category & Period */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-indigo-700 dark:text-cyan-300 font-bold border border-indigo-200 dark:border-cyan-800/50">
                      {project.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" />
                      {project.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-2 mb-2"
                  >
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-xl bg-indigo-50/70 dark:bg-slate-800 text-indigo-900 dark:text-slate-200 text-[11px] font-mono border border-indigo-100 dark:border-slate-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-bold text-indigo-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Details & Highlights</span>
                    <span>→</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/25 hover:scale-110 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 shadow-sm hover:scale-110 transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#181A20] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-sky-400 font-semibold">
                  {activeModalProject.category}
                </span>
                <span className="text-slate-400 font-mono text-xs">
                  {activeModalProject.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {activeModalProject.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {activeModalProject.summary}
              </p>

              {/* Highlights */}
              <div className="mb-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Key Technical Highlights & Outcomes
                </h4>
                <div className="space-y-2">
                  {activeModalProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Hide if TODO or empty) */}
              <div className="flex items-center gap-3">
                {isValidUrl(activeModalProject.liveUrl) && (
                  <Button
                    variant="primary"
                    size="md"
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Open Live App
                  </Button>
                )}
                {isValidUrl(activeModalProject.githubUrl) && (
                  <Button
                    variant="secondary"
                    size="md"
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    icon={<Github className="w-4 h-4" />}
                  >
                    View Source Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
