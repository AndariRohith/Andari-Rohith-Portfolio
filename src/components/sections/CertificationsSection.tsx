import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { isValidUrl } from '../../lib/utils';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  Trophy, 
  ExternalLink, 
  Calendar, 
  Plus, 
  Edit3, 
  FileText
} from 'lucide-react';

interface CertificationsSectionProps {
  onOpenAdminModal?: (tab?: string, item?: any) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onOpenAdminModal }) => {
  const { certifications } = useData();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'certification' | 'training' | 'achievement'>('all');

  const tabs: { label: string; value: 'all' | 'certification' | 'training' | 'achievement' }[] = [
    { label: 'All Credentials', value: 'all' },
    { label: 'Certifications', value: 'certification' },
    { label: 'Trainings', value: 'training' },
    { label: 'Achievements', value: 'achievement' },
  ];

  const filtered = activeTab === 'all'
    ? certifications
    : certifications.filter(c => c.type === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certification': return <Award className="w-5 h-5 text-indigo-500" />;
      case 'training': return <BookOpen className="w-5 h-5 text-sky-500" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-amber-500" />;
      default: return <Award className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id="certifications" className="py-20 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Qualifications & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Certifications & Achievements
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal?.('certifications')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Certification
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-portfolio-brush dark:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert) => {
            const isResearchHighlight = cert.issuer.includes('AAROHAN');
            const hasCredentialUrl = isValidUrl(cert.url);

            return (
              <div
                key={cert.id || cert.title}
                className={`glass-panel p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border relative ${
                  isResearchHighlight
                    ? 'border-indigo-500/50 dark:border-sky-400/50 bg-gradient-to-br from-indigo-50/40 to-sky-50/20 dark:from-indigo-950/20 dark:to-slate-900/40 ring-1 ring-indigo-500/30'
                    : 'border-portfolio-brush dark:border-white/10'
                }`}
              >
                {/* Research spotlight tag */}
                {isResearchHighlight && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Spotlight Research
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                      {getTypeIcon(cert.type)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {cert.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                    {cert.issuer}
                  </p>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-slate-400 mb-2">
                      ID: <span className="text-slate-600 dark:text-slate-300">{cert.credentialId}</span>
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    {cert.date && <Calendar className="w-3 h-3" />}
                    {cert.date || 'Completed'}
                  </span>

                  <div className="flex items-center gap-2">
                    {hasCredentialUrl && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-sky-400 hover:underline"
                      >
                        Verify <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => onOpenAdminModal?.('certifications', cert)}
                        className="text-xs text-slate-400 hover:text-indigo-600 ml-1"
                        title="Edit certification"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
