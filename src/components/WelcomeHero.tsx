import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';

interface Props { lang: Language }

const WelcomeHero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].hero;
  const welcome =
    lang === 'am'
      ? 'እንኳን ወደ ወሎ ሰፈር ቅድስት ማርያም በደህና መጡ'
      : 'Welcome to Welo Sefer St. Maryam';

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f2440 45%, #002366 100%)' }}
    >
      {/* Overlapping watermark composition — outline + filled wordmarks + cross */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Back layer: oversized filled wordmark, bleeds off edges */}
        <span
          className="absolute left-1/2 top-1/2 font-serif font-black italic text-[26vw] leading-none whitespace-nowrap"
          style={{
            color: 'rgba(207,181,59,0.07)',
            transform: 'translate(-58%, -72%) rotate(-8deg)',
          }}
        >
          Welo Sefer
        </span>
        {/* Front layer: outlined wordmark crossing the back layer */}
        <span
          className="absolute left-1/2 top-1/2 font-serif font-black italic text-[17vw] leading-none whitespace-nowrap"
          style={{
            color: 'rgba(207,181,59,0.03)',
            WebkitTextStroke: '1.5px rgba(207,181,59,0.20)',
            transform: 'translate(-42%, -24%) rotate(5deg)',
          }}
        >
          Welo Sefer
        </span>
        {/* Cross intersecting the wordmark crossing point */}
        <svg
          className="absolute left-1/2 top-1/2 w-[34vw] max-w-[320px]"
          viewBox="0 0 300 480"
          style={{ transform: 'translate(-72%, -55%) rotate(-8deg)', opacity: 0.06 }}
        >
          <rect x="125" y="0" width="50" height="480" fill="#CFB53B" />
          <rect x="40" y="130" width="220" height="50" fill="#CFB53B" />
        </svg>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,10,20,0.6) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block w-12 h-px bg-church-gold mx-auto mb-9" />

          <h1 className="font-serif leading-[1.08]">
            {lang === 'am' ? (
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-white">{welcome}</span>
            ) : (
              <>
                <span className="block text-xl sm:text-2xl md:text-3xl italic font-normal text-church-gold mb-2">
                  Welcome to
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  Welo Sefer St. Maryam
                </span>
              </>
            )}
          </h1>

          <div className="mt-7 flex items-center justify-center gap-4 text-church-gold/80">
            <span className="font-serif italic text-base md:text-lg">{t.strength} {t.inFaith}</span>
            <span className="h-4 w-px bg-church-gold/40" />
            <span className="font-serif italic text-base md:text-lg">{t.peace} {t.inPrayer}</span>
          </div>

          <p className="max-w-xl mx-auto mt-7 text-sm md:text-base text-white/65 font-sans font-light leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute inset-x-0 bottom-6 flex justify-center"
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

export default WelcomeHero;
