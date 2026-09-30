import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';
import PremiumButton from './PremiumButton';

interface Props { lang: Language }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const WelcomeHero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].hero;
  const welcome =
    lang === 'am'
      ? 'እንኳን ወደ ወሎ ሰፈር ቅድስት ማርያም በደህና መጡ'
      : 'Welcome to Welo Sefer St. Maryam';
  const word = lang === 'am' ? 'ወሎ ሰፈር' : 'Welo Sefer';

  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, -rect.top / rect.height)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f2440 45%, #002366 100%)' }}
    >
      {/* Watermark zones — language-aware, no layer overlaps another */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Top center: masthead watermark */}
        <span
          className="absolute left-1/2 top-[13%] font-serif font-black italic text-[7vw] leading-none whitespace-nowrap"
          style={{
            color: 'rgba(207,181,59,0.04)',
            WebkitTextStroke: '1.5px rgba(207,181,59,0.25)',
            transform: 'translateX(-50%)',
          }}
        >
          {word}
        </span>
        {/* Bottom-left: filled wordmark, bleeds off the corner */}
        <span
          className="absolute left-0 bottom-[7%] font-serif font-black italic text-[11vw] leading-none whitespace-nowrap"
          style={{ color: 'rgba(207,181,59,0.08)', transform: 'translateX(-24%) rotate(-5deg)' }}
        >
          {word}
        </span>
        {/* Bottom-right: outlined wordmark, bleeds off the opposite corner */}
        <span
          className="absolute right-0 bottom-[8%] font-serif font-black italic text-[9vw] leading-none whitespace-nowrap"
          style={{
            color: 'rgba(207,181,59,0.03)',
            WebkitTextStroke: '1.5px rgba(207,181,59,0.18)',
            transform: 'translateX(24%) rotate(4deg)',
          }}
        >
          {word}
        </span>
        {/* Big cross that drifts downward while scrolling */}
        <svg
          className="absolute left-1/2 top-1/2 w-[42vw] max-w-[420px]"
          viewBox="0 0 300 480"
          style={{
            transform: `translate(-50%, calc(-50% + ${progress * 150}px)) scale(${1 + progress * 0.08})`,
            opacity: 0.1,
          }}
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
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="block w-12 h-px bg-church-gold mx-auto mb-9" />

          <motion.h1 variants={item} className="font-serif leading-[1.08]">
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
          </motion.h1>

          <motion.div variants={item} className="mt-7 flex items-center justify-center gap-4 text-church-gold/80">
            <span className="font-serif italic text-base md:text-lg">{t.strength} {t.inFaith}</span>
            <span className="h-4 w-px bg-church-gold/40" />
            <span className="font-serif italic text-base md:text-lg">{t.peace} {t.inPrayer}</span>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-xl mx-auto mt-7 text-sm md:text-base text-white/65 font-sans font-light leading-relaxed"
          >
            {t.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PremiumButton to="/events">
              {t.ctaServices}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </PremiumButton>
            <PremiumButton to="/history" variant="ghost">
              {t.ctaHistory}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </PremiumButton>
          </motion.div>
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
