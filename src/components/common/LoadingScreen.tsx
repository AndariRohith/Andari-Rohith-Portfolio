import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#EEF0FA] dark:bg-[#0F1115] transition-colors duration-500">
      <div className="relative flex flex-col items-center">
        {/* Monogram AR */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-pulse">
            <span className="text-3xl font-extrabold text-white tracking-wider font-sans">AR</span>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-lg -z-10" />
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold tracking-tight text-[#0F1115] dark:text-[#EEF0FA] mb-1 font-sans">
          Andari Rohith
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6">
          Aspiring Data Scientist
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-2 font-mono text-xs text-slate-400">
          {progress}%
        </span>
      </div>
    </div>
  );
};
