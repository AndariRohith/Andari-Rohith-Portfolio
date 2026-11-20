import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { isValidUrl } from '../../lib/utils';

export const Footer: React.FC = () => {
  const { profile } = useData();
  const { switchToGate, isAdmin } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasGithub = isValidUrl(profile?.socials.github);
  const hasLinkedin = isValidUrl(profile?.socials.linkedin);

  return (
    <footer className="border-t border-portfolio-brush/60 dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-md py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold text-lg tracking-tight text-portfolio-dark dark:text-white">
                {profile?.name || 'Andari Rohith'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-sky-400 font-mono font-medium">
                Data Science
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              MCA 2026 graduate specializing in predictive analytics, ML pipelines, and automated intelligence.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            {hasGithub && (
              <a
                href={profile?.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 shadow-sm hover:shadow transition-all border border-slate-200 dark:border-slate-700"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {hasLinkedin && (
              <a
                href={profile?.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 shadow-sm hover:shadow transition-all border border-slate-200 dark:border-slate-700"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 shadow-sm hover:shadow transition-all border border-slate-200 dark:border-slate-700"
                aria-label="Email Andari Rohith"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Andari Rohith. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for Data Science
            </span>
            <span>•</span>
            <button
              onClick={switchToGate}
              className="hover:underline hover:text-indigo-600 dark:hover:text-sky-400 transition-colors"
            >
              {isAdmin ? 'Mode: Admin' : 'Mode: Viewer'} (Switch)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
