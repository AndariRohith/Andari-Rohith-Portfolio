import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { CanvasFallback } from '../3d/CanvasFallback';
import { isValidUrl } from '../../lib/utils';
import { 
  ArrowDown, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  FileText, 
  Briefcase,
  Edit3
} from 'lucide-react';

// Lazy load 3D scene for performance
const DataNetworkScene = lazy(() => import('../3d/DataNetworkScene'));

interface HeroSectionProps {
  onOpenAdminModal?: (tab?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAdminModal }) => {
  const { profile, settings } = useData();
  const { isAdmin } = useAuth();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = profile?.typingRoles || [
    'Data Science Trainee',
    'Python & SQL Developer',
    'ML Model Builder',
    'Data Storyteller'
  ];

  // Typing effect
  useEffect(() => {
    const fullText = roles[currentRoleIndex] || '';
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  const heroSide = settings?.heroTextSide || 'left';
  const hasResume = isValidUrl(profile?.resumeFile);
  const hasGithub = isValidUrl(profile?.socials.github);
  const hasLinkedin = isValidUrl(profile?.socials.linkedin);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-[#EEF0FA] dark:bg-[#0F1115] transition-colors"
    >
      {/* 3D Wireframe Scene */}
      {settings?.enable3D !== false && (
        <Suspense fallback={<CanvasFallback />}>
          <DataNetworkScene />
        </Suspense>
      )}

      {/* Decorative 3D vibrant ambient gradients */}
      <div className="absolute top-1/4 left-5 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-cyan-400/25 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulseGlow" />
      <div className="absolute bottom-10 right-5 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulseGlow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Admin quick edit indicator */}
      {isAdmin && (
        <div className="absolute top-24 right-6 z-20">
          <button
            onClick={() => onOpenAdminModal?.('profile')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/90 dark:bg-slate-800/90 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 shadow-md hover:scale-105 transition-transform"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Hero Content
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[75vh] ${
            heroSide === 'right' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* TEXT SIDE (Left by default, over the empty space in the photo) */}
          <div
            className={`lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-2 lg:order-1 ${
              heroSide === 'right' ? 'lg:col-start-7 lg:order-2' : ''
            }`}
          >
            {/* Seeking Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 dark:from-indigo-950/60 dark:to-cyan-950/60 backdrop-blur-md border border-indigo-200 dark:border-indigo-800/60 w-fit mb-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-indigo-950 dark:text-cyan-200">
                {profile?.seeking || 'Seeking Data Science Internship'}
              </span>
            </div>

            {/* Greeting */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 font-bold">
                Hello, I am
              </span>
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            {/* Name with animated cosmic 3D gradient */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-sans mb-3">
              Andari <span className="text-gradient-cosmic">Rohith</span>
            </h1>

            {/* Dynamic Typing Role */}
            <div className="h-10 flex items-center mb-4">
              <span className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 font-sans">
                {displayedText}
              </span>
              <span className="inline-block w-0.5 h-6 ml-1 bg-indigo-600 dark:bg-sky-400 animate-pulse" />
            </div>

            {/* Short Tagline / Headline */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
              {profile?.bio?.split('.')[0] || 'MCA 2026 graduate & Data Science trainee specializing in Python, SQL, and predictive machine learning models.'}.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button
                variant="primary"
                size="md"
                href="#projects"
                icon={<Briefcase className="w-4 h-4" />}
              >
                View Projects
              </Button>

              {hasResume && (
                <Button
                  variant="outline"
                  size="md"
                  href={profile?.resumeFile}
                  download="Andari_Rohith_Resume.pdf"
                  icon={<FileText className="w-4 h-4" />}
                >
                  Download Resume
                </Button>
              )}

              <Button
                variant="ghost"
                size="md"
                href="#contact"
                icon={<Mail className="w-4 h-4" />}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Connect:
              </span>
              {hasGithub && (
                <a
                  href={profile?.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 hover:scale-110 transition-all shadow-sm"
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
                  className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 hover:scale-110 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 hover:scale-110 transition-all shadow-sm"
                  aria-label="Email Andari Rohith"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* PHOTO SIDE (Right by default, anchored so face is never cropped) */}
          <div
            className={`lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2 ${
              heroSide === 'right' ? 'lg:col-start-1 lg:col-span-6 lg:order-1 lg:justify-start' : ''
            }`}
          >
            <div className="relative w-full max-w-lg lg:max-w-none flex items-center lg:items-end justify-center lg:justify-end">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-sky-400/10 rounded-full blur-3xl transform scale-90 -z-10" />

              {/* Cover Photo */}
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] xl:h-[650px] flex items-center lg:items-end justify-center lg:justify-end overflow-hidden">
                <img
                  src={profile?.heroCover || '/assets/profile/hero-cover.png'}
                  alt={profile?.name || 'Andari Rohith'}
                  className="w-full h-full object-contain sm:object-cover sm:object-right filter drop-shadow-2xl transition-all duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-slate-400 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 text-indigo-500" />
        </div>
      </div>
    </section>
  );
};
