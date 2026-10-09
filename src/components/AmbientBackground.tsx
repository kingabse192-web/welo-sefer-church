import React from 'react';

const GrainOverlay = (
  <div
    aria-hidden="true"
    className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

const AmbientBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
  >
    <div className="absolute -top-40 right-[-8%] h-[44rem] w-[44rem] rounded-full bg-church-blue/45 blur-[140px]" />
    <div className="absolute bottom-[-20%] left-[-10%] h-[48rem] w-[48rem] rounded-full bg-church-gold/[0.10] blur-[160px]" />
    <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-church-blue/30 blur-[130px]" />
    {GrainOverlay}
  </div>
);

export default AmbientBackground;