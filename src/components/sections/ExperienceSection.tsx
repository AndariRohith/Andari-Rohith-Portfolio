import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Briefcase, MapPin, Calendar, CheckCircle2, Plus, Edit3 } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenAdminModal?: (tab?: string, item?: any) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenAdminModal }) => {
  const { experience } = useData();
  const { isAdmin } = useAuth();

  return (
    <section id="experience" className="py-20 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Professional Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Work Experience
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal?.('experience')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Experience
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/50 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 flex items-center justify-center shadow-md">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              </div>

              {/* Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm border border-portfolio-brush dark:border-white/10 hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                        Current
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => onOpenAdminModal?.('experience', item)}
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                  )}
                </div>

                {/* Company & Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {item.period}
                  </span>
                </div>

                {/* Points */}
                <ul className="space-y-2.5">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
