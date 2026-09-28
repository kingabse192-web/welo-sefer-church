import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Language, translations } from '../translations';

interface Props { lang: Language }

const ParallaxHero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].hero;
  const nav = translations[lang].nav;

  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0a1628 0%, #0f2440 45%, #002366 100%)',
      }}
    >
      {/* Static cross motif — no scroll animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg
          width="420"
          height="640"
          viewBox="0 0 420 640"
          className="w-[45vw] max-w-[420px] opacity-[0.07]"
        >
          <rect x="180" y="0" width="60" height="640" fill="#CFB53B" />
          <rect x="60" y="170" width="300" height="60" fill="#CFB53B" />
        </svg>
      </div>

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,10,20,0.55) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block w-10 h-px bg-church-gold mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.1]">
            <span className="text-church-gold italic block md:inline">{t.strength}</span> {t.inFaith}
            <br />
            <span className="block md:inline">{t.peace} {t.inPrayer}</span>
          </h1>
          <p className="max-w-xl mx-auto text-base md:text-lg text-white/70 font-sans font-light leading-relaxed mt-6">
            {t.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {[
              { label: nav.history, to: '/history' },
              { label: nav.gallery, to: '/gallery' },
              { label: nav.events, to: '/events' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 border-b border-transparent pb-1 hover:text-church-gold hover:border-church-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute inset-x-0 -bottom-2 flex justify-center"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-church-gold/50 text-church-gold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxHero;
