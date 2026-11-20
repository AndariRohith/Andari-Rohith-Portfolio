import React from 'react';

export const CanvasFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl" />
    </div>
  );
};
