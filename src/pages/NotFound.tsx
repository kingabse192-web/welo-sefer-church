import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Language } from '../translations';
import PremiumButton from '../components/PremiumButton';
import OrnamentDivider from '../components/OrnamentDivider';

interface NotFoundProps {
  lang: Language;
}

const NotFound: React.FC<NotFoundProps> = ({ lang }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-church-cream dark:bg-church-night transition-colors duration-500 px-6 pt-28 pb-20">
      {/* Ambient watermarks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <svg
          className="absolute left-[6%] top-[14%] w-[10vw] max-w-[90px] opacity-[0.07]"
          viewBox="0 0 300 480"
          style={{ transform: 'rotate(-8deg)' }}
        >
          <rect x="125" y="0" width="50" height="480" fill="#CFB53B" />
          <rect x="40" y="130" width="220" height="50" fill="#CFB53B" />
        </svg>
        <span
          className="absolute right-0 top-[10%] font-serif font-black italic text-[12vw] leading-none whitespace-nowrap"
          style={{
            color: 'rgba(207,181,59,0.04)',
            WebkitTextStroke: '1.5px rgba(207,181,59,0.25)',
            transform: 'translateX(22%) rotate(4deg)',
          }}
        >
          {lang === 'am' ? 'ወሎ ሰፈር' : 'Welo Sefer'}
        </span>
        <span
          className="absolute left-0 bottom-[12%] font-serif font-black uppercase text-[11vw] leading-none whitespace-nowrap text-[rgba(0,35,102,0.05)] dark:text-[rgba(255,255,255,0.045)]"
          style={{ transform: 'translateX(-22%) rotate(-5deg)' }}
        >
          {lang === 'am' ? 'ወሎ ሰፈር' : 'Welo Sefer'}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-serif text-7xl sm:text-8xl md:text-9xl font-black leading-none text-church-blue/10 dark:text-church-gold/10 tracking-tight select-none"
          aria-hidden="true"
        >
          404
        </motion.p>

        <div className="relative -mt-6 sm:-mt-8 mb-8">
          <span className="relative z-10 inline-block rounded-2xl border border-church-gold/25 bg-church-gold/10 px-6 py-3 shadow-gold-soft dark:bg-church-gold/15">
            <span className="font-serif font-bold text-4xl sm:text-5xl text-church-blue dark:text-church-gold">
              404
            </span>
          </span>
        </div>

        <OrnamentDivider className="mb-7 text-church-gold/90" />

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl font-serif font-bold text-church-blue dark:text-church-gold leading-tight px-2"
        >
          {lang === 'am' ? 'ገፁ አልተገኘም' : 'Page Not Found'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-md mx-auto text-church-blue/60 dark:text-gray-400 text-base sm:text-lg font-sans leading-relaxed px-2"
        >
          {lang === 'am'
            ? 'የሚፈልጉት ገፅ የለም ወይም ተወግዷል። ወደ መነሻ ገፅ ይመለሱ።'
            : 'The page you\'re looking for doesn\'t exist or has been moved. Return home and explore from there.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <PremiumButton to="/">
            <Home className="w-5 h-5" />
            {lang === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}
          </PremiumButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;