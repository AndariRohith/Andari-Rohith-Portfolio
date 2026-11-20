import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-400 transition-all duration-75 ease-out shadow-sm shadow-indigo-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
