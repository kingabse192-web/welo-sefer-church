import React, { useEffect, useState } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none overflow-hidden">
      <div
        className="h-full rounded-r-full transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #CFB53B, #e8d06a, #CFB53B)',
          boxShadow: '0 0 8px rgba(207,181,59,0.45)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
