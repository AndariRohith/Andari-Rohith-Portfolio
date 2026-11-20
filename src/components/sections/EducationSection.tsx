import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, GraduationCap, Award, Calendar, Plus, Edit3 } from 'lucide-react';

interface EducationSectionProps {
  onOpenAdminModal?: (tab?: string, item?: any) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenAdminModal }) => {
  const { education } = useData();
  const { isAdmin } = useAuth();

  return (
    <section id="education" className="py-20 relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-t border-b border-portfolio-brush/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Foundations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Education
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal?.('education')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Education
            </button>
          )}
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={item.id || idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl shadow-sm border border-portfolio-brush dark:border-white/10 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-sky-400 font-mono text-xs font-bold border border-indigo-600/20">
                    {item.score}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-1">
                  {item.degree}
                </h3>
                {item.major && (
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Major: {item.major}
                  </p>
                )}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.institution}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>

                {isAdmin && (
                  <button
                    onClick={() => onOpenAdminModal?.('education', item)}
                    className="text-xs text-indigo-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
