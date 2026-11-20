import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, Shield, Lock, ArrowRight, Sparkles, Loader2, KeyRound, Terminal, Database, Brain } from 'lucide-react';
import { Button } from '../common/Button';
import { siteConfig } from '../../data/siteConfig';
import { useData } from '../../context/DataContext';

export const StartGate: React.FC = () => {
  const { setMode, loginAdmin } = useAuth();
  const { profile } = useData();
  const [selectedRole, setSelectedRole] = useState<'viewer' | 'admin' | null>(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleViewerEnter = () => setMode('viewer');

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (!password) { setError('Please enter the admin password'); return; }
    setIsLoading(true);
    setError(null);
    const res = await loginAdmin(password, email);
    setIsLoading(false);
    if (!res.success) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setError(res.error || 'Authentication failed');
      if (nextAttempts >= 4) {
        setIsLocked(true);
        setError('Too many failed attempts. Temporary lockout for 15 seconds.');
        setTimeout(() => { setIsLocked(false); setAttempts(0); setError(null); }, 15000);
      }
    }
  };

  const order = siteConfig.gateOrder || ['admin', 'photo', 'viewer'];

  // ── Side Cards (Slightly more compact for perfect visual balance) ─────────
  const adminCard = (
    <div
      key="admin"
      onClick={() => setSelectedRole('admin')}
      className="group cursor-pointer p-5 sm:p-6 rounded-3xl border border-amber-200 dark:border-amber-900/60
        bg-gradient-to-b from-white/95 to-amber-50/60 dark:from-slate-800/80 dark:to-amber-950/30
        hover:from-white hover:to-amber-100/80 dark:hover:from-slate-800 dark:hover:to-amber-900/50
        hover:border-amber-500 dark:hover:border-amber-400
        shadow-md hover:shadow-[0_12px_36px_-10px_rgba(245,158,11,0.3)]
        hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500
          flex items-center justify-center text-white shadow-lg shadow-amber-500/30
          mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
          <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white
            group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Admin Portal
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950
            text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold">
            Secure
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Authenticate to manage projects, edit technical skills, upload resumes/photos,
          and inspect incoming messages.
        </p>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 border-t border-amber-100 dark:border-white/10
        flex items-center justify-between text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400
        group-hover:translate-x-0.5 transition-transform">
        <span>Admin Login</span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-slate-700
          flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );

  const viewerCard = (
    <div
      key="viewer"
      onClick={handleViewerEnter}
      className="group cursor-pointer p-5 sm:p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900/60
        bg-gradient-to-b from-white/95 to-indigo-50/60 dark:from-slate-800/80 dark:to-indigo-950/40
        hover:from-white hover:to-indigo-100/80 dark:hover:from-slate-800 dark:hover:to-indigo-900/60
        hover:border-indigo-500 dark:hover:border-sky-400
        shadow-md hover:shadow-[0_12px_36px_-10px_rgba(99,102,241,0.3)]
        hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400
          flex items-center justify-center text-white shadow-lg shadow-indigo-500/30
          mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
          <Eye className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white
            group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors">
            Viewer Mode
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950
            text-cyan-700 dark:text-cyan-300 text-[10px] font-mono font-bold">
            Public
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore full portfolio, filter projects, review ML models, dynamic data stats,
          and submit contact inquiries.
        </p>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 border-t border-indigo-100 dark:border-white/10
        flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-600 dark:text-sky-400
        group-hover:translate-x-0.5 transition-transform">
        <span>Enter Portfolio</span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 dark:bg-slate-700
          flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );

  // ── Center Photo Column (Centered, larger, clean, no awkward crop) ────────
  const photoCol = (
    <div
      key="photo"
      className="flex flex-col items-center justify-center relative px-2 sm:px-4"
      style={{ alignSelf: 'stretch' }}
    >
      {/* Soft indigo/violet glow BEHIND the photo */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          height: 440,
          background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.12) 50%, transparent 80%)',
          filter: 'blur(35px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Photo container — perfectly centered portrait */}
      <div
        className="animate-float flex items-center justify-center"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '460px',
        }}
      >
        <img
          src="/assets/profile/gate-portrait-clean.png"
          alt="Andari Rohith"
          className="rounded-3xl filter contrast-[1.02]"
          style={{
            display: 'block',
            width: '100%',
            maxHeight: 'clamp(360px, 48vh, 560px)',
            objectFit: 'contain',
            objectPosition: 'center',
            opacity: 1,
          }}
        />
      </div>

      {/* Badges — below the photo, prominent & highlighted */}
      <div
        className="flex flex-col items-center gap-2.5 mt-4 relative z-10 w-full"
      >
        {/* Role badge — bold gradient pill */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            boxShadow: '0 6px 24px rgba(99,102,241,0.45)',
            fontWeight: 800,
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            letterSpacing: '0.01em',
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"
            style={{ animationDuration: '1.4s' }}
          />
          <span>{profile?.typingRoles?.[0] || 'Data Science Trainee'}</span>
        </div>

        {/* Inventateq chips */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span
            className="px-3 py-1 rounded-lg text-indigo-900 dark:text-indigo-100"
            style={{
              background: 'rgba(99,102,241,0.13)',
              fontWeight: 700,
              fontSize: 'clamp(13px, 1.4vw, 15px)',
            }}
          >
            Inventateq Bengaluru
          </span>
          <span className="text-slate-400 font-bold text-sm">•</span>
          <span
            className="px-3 py-1 rounded-lg text-indigo-900 dark:text-indigo-100"
            style={{
              background: 'rgba(99,102,241,0.13)',
              fontWeight: 700,
              fontSize: 'clamp(13px, 1.4vw, 15px)',
            }}
          >
            MCA 2026
          </span>
        </div>
      </div>
    </div>
  );

  const colMap: Record<string, JSX.Element> = {
    admin: adminCard,
    viewer: viewerCard,
    photo: photoCol,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5
        bg-gradient-to-br from-[#E0E7FF] via-[#F3E8FF] to-[#E0F2FE]
        dark:from-[#0B0F19] dark:via-[#161228] dark:to-[#0D1F2D]
        overflow-y-auto transition-colors duration-500"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/30 dark:bg-indigo-600/25 rounded-full blur-[100px] pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none animate-pulseGlow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/25 dark:bg-purple-600/20 rounded-full blur-[90px] pointer-events-none animate-floatSlow" />
      <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-pink-500/20 dark:bg-pink-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating micro tech tags */}
      <div className="hidden lg:flex absolute top-16 left-24 items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-indigo-200 dark:border-white/10 text-indigo-700 dark:text-indigo-300 text-xs font-mono shadow-sm animate-float">
        <Terminal className="w-3.5 h-3.5 text-indigo-500" /><span>Python &amp; SQL Pipelines</span>
      </div>
      <div className="hidden lg:flex absolute bottom-20 left-28 items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-cyan-200 dark:border-white/10 text-cyan-700 dark:text-cyan-300 text-xs font-mono shadow-sm animate-float" style={{ animationDelay: '1.5s' }}>
        <Database className="w-3.5 h-3.5 text-cyan-500" /><span>Telco Churn Analytics</span>
      </div>
      <div className="hidden lg:flex absolute top-20 right-28 items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-purple-200 dark:border-white/10 text-purple-700 dark:text-purple-300 text-xs font-mono shadow-sm animate-float" style={{ animationDelay: '3s' }}>
        <Brain className="w-3.5 h-3.5 text-purple-500" /><span>XGBoost &amp; Predictive ML</span>
      </div>

      {/* ── MAIN GATE CARD — 94vw up to 1400px, min 88vh ─────────────────── */}
      <div
        className="relative z-10 w-full bg-[#EEF2FE]/95 dark:bg-slate-900/95 backdrop-blur-3xl
          border border-indigo-200/80 dark:border-white/10 rounded-[2rem]
          shadow-[0_32px_80px_-20px_rgba(99,102,241,0.28)] dark:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85)]
          flex flex-col"
        style={{
          maxWidth: 'clamp(640px, 94vw, 1400px)',
          minHeight: 'clamp(560px, 88vh, 920px)',
          padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
        }}
      >
        {/* Decorative top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-b-full" />

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10
            dark:from-indigo-950/60 dark:to-cyan-950/60
            border border-indigo-300/60 dark:border-indigo-700/50
            text-indigo-700 dark:text-sky-300 text-xs font-mono font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive 3D Data Science Portfolio</span>
          </div>
          <h1
            className="font-extrabold tracking-tight text-slate-900 dark:text-white font-sans"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', lineHeight: 1.15 }}
          >
            Welcome to <span className="text-gradient-cosmic">Andari Rohith's</span> Space
          </h1>
          <p
            className="mt-2.5 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}
          >
            Choose your access mode to explore real-world machine learning models,
            predictive applications, and dynamic data analytics.
          </p>
        </div>

        {/* 3-Column grid OR Admin login form */}
        {selectedRole !== 'admin' ? (
          <div
            className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1.45fr_1fr] gap-6 items-center justify-items-stretch"
            style={{ minHeight: 0 }}
          >
            {order.map((slug) => colMap[slug])}
          </div>
        ) : (
          /* Admin Login Form */
          <div className="max-w-md mx-auto py-2 w-full">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                  <KeyRound className="w-4 h-4" />
                </div>
                Admin Access Verification
              </span>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="text-xs font-semibold text-indigo-600 dark:text-sky-400 hover:underline"
              >
                ← Back to choices
              </button>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/60 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked || isLoading}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/60 shadow-sm"
                />
              </div>
              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
                  {error}
                </div>
              )}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 shadow-lg shadow-amber-600/30"
                  disabled={isLocked || isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Verifying Credentials...</span></>
                  ) : (
                    <><Lock className="w-4 h-4" /><span>Authenticate as Admin</span></>
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-center text-slate-400 pt-1">
                Security note: Public sign-ups are strictly disabled. Only authorized admin account can log in.
              </p>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="mt-7 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You can toggle modes anytime using the{' '}
            <span className="font-semibold text-indigo-600 dark:text-sky-400">Switch mode</span>{' '}
            button in the top navigation bar.
          </p>
        </div>
      </div>
    </div>
  );
};
