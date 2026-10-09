import React from 'react';

interface OrnamentDividerProps {
  className?: string;
}

const OrnamentDivider: React.FC<OrnamentDividerProps> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 300 28"
    fill="none"
    className={`mx-auto h-6 w-full max-w-[280px] text-church-gold ${className}`}
  >
    <path d="M14 14h94" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
    <circle cx="118" cy="14" r="1.8" fill="currentColor" fillOpacity="0.75" />
    <path d="M150 4l7 10-7 10-7-10z" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M150 9.5v9M145.5 14h9" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="182" cy="14" r="1.8" fill="currentColor" fillOpacity="0.75" />
    <path d="M192 14h94" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export default OrnamentDivider;