import React from 'react';

const AmbientBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block"
  >
    <div className="absolute -top-40 right-[-8%] h-[44rem] w-[44rem] rounded-full bg-church-blue/45 blur-[140px]" />
    <div className="absolute bottom-[-20%] left-[-10%] h-[48rem] w-[48rem] rounded-full bg-church-gold/[0.10] blur-[160px]" />
    <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-church-blue/30 blur-[130px]" />
  </div>
);

export default AmbientBackground;