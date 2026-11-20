import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { isValidUrl } from '../../lib/utils';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut, 
  FileText, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';

interface NavbarProps {
  onOpenAdminModal?: (tab?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminModal }) => {
  const { mode, isAdmin, logout, switchToGate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { profile, settings } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home', show: true },
    { label: 'About', href: '#about', show: settings?.sections.about ?? true },
    { label: 'Skills', href: '#skills', show: settings?.sections.skills ?? true },
    { label: 'Projects', href: '#projects', show: settings?.sections.projects ?? true },
    { label: 'Experience', href: '#experience', show: settings?.sections.experience ?? true },
    { label: 'Education', href: '#education', show: settings?.sections.education ?? true },
    { label: 'Certifications', href: '#certifications', show: settings?.sections.certifications ?? true },
    { label: 'Contact', href: '#contact', show: settings?.sections.contact ?? true },
  ].filter(item => item.show);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlight
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const hasResume = isValidUrl(profile?.resumeFile);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-indigo-200/60 dark:border-white/10 shadow-lg shadow-indigo-500/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              AR
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors">
                {profile?.name || 'Andari Rohith'}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-cyan-400 font-bold -mt-0.5">
                Data Science
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-200/60 dark:border-white/10 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button (hidden if empty or TODO) */}
            {hasResume && (
              <a
                href={profile?.resumeFile}
                download="Andari_Rohith_Resume.pdf"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </a>
            )}

            {/* Admin Controls / Switch Mode */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-300 dark:border-slate-700">
                <button
                  onClick={() => onOpenAdminModal?.('projects')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                  title="Open Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={switchToGate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-sky-400 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                title="Switch mode to Gate / Admin Login"
              >
                <Layers className="w-3.5 h-3.5" />
                Switch mode
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#EEF0FA]/95 dark:bg-[#0F1115]/95 backdrop-blur-xl border-b border-portfolio-brush dark:border-white/10 shadow-xl space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {hasResume && (
              <a
                href={profile?.resumeFile}
                download="Andari_Rohith_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            )}
            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminModal?.('projects');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/30"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  switchToGate();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                <Layers className="w-4 h-4" />
                Switch Mode (Admin / Viewer)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
