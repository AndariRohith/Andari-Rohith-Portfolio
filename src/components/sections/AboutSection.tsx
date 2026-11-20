import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  Languages, 
  Smile, 
  GraduationCap, 
  Sparkles,
  Edit3
} from 'lucide-react';

interface AboutSectionProps {
  onOpenAdminModal?: (tab?: string) => void;
}

// Animated rolling counter
const RollingCounter: React.FC<{ value: number; decimals?: number; suffix?: string }> = ({
  value,
  decimals = 0,
  suffix = ''
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white font-sans tracking-tight">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAdminModal }) => {
  const { profile, stats } = useData();
  const { isAdmin } = useAuth();

  return (
    <section id="about" className="py-20 relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-t border-b border-portfolio-brush/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Background & Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              About Me
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal?.('profile')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Bio & Info
            </button>
          )}
        </div>

        {/* Bio & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Bio text card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-sky-400" />
              MCA Graduate & Data Science Trainee
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile?.bio}
            </p>

            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-sky-400 mt-1.5 shrink-0 animate-ping" />
                <div>
                  <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Currently Doing
                  </h4>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-0.5">
                    {profile?.personalInfo.currentlyDoing}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Highlights Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Personal Snapshot
            </h3>

            <div className="space-y-4 text-xs">
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-sky-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Location</p>
                  <p className="text-slate-500 dark:text-slate-400">{profile?.location}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-sky-400 shrink-0">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Languages Known</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {profile?.personalInfo.languages.join(', ')}
                  </p>
                </div>
              </div>

              {/* Hobbies */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-sky-400 shrink-0">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">Hobbies & Interests</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {profile?.personalInfo.hobbies.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Computed Stats Grid with 3D Colors */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-sky-400 font-bold">
              ⚡ Real-Time Live Database Analytics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, idx) => {
              const themes = [
                { border: 'border-cyan-400/40 hover:border-cyan-400', bg: 'bg-gradient-to-b from-cyan-500/10 to-transparent', num: 'text-cyan-600 dark:text-cyan-400', shadow: 'hover:shadow-glow-cyan' },
                { border: 'border-purple-400/40 hover:border-purple-400', bg: 'bg-gradient-to-b from-purple-500/10 to-transparent', num: 'text-purple-600 dark:text-purple-400', shadow: 'hover:shadow-glow-purple' },
                { border: 'border-indigo-400/40 hover:border-indigo-400', bg: 'bg-gradient-to-b from-indigo-500/10 to-transparent', num: 'text-indigo-600 dark:text-indigo-400', shadow: 'hover:shadow-glow-indigo' },
                { border: 'border-amber-400/40 hover:border-amber-400', bg: 'bg-gradient-to-b from-amber-500/10 to-transparent', num: 'text-amber-600 dark:text-amber-400', shadow: 'hover:shadow-glow-amber' },
                { border: 'border-emerald-400/40 hover:border-emerald-400', bg: 'bg-gradient-to-b from-emerald-500/10 to-transparent', num: 'text-emerald-600 dark:text-emerald-400', shadow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]' }
              ];
              const t = themes[idx % themes.length];

              return (
                <div
                  key={stat.label + idx}
                  className={`p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-md backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1.5 ${t.bg} ${t.border} ${t.shadow} bg-white/70 dark:bg-slate-900/70`}
                >
                  <div className={t.num}>
                    <RollingCounter
                      value={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {stat.label}
                  </span>
                  {stat.subtext && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {stat.subtext}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
