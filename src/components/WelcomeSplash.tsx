import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../translations';

const WelcomeSplash: React.FC<{ lang: Language; onFinish: () => void }> = ({ lang, onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 600);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-church-nightDeep via-[#0b1a38] to-church-nightDeep"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-church-blue/40 blur-[130px]" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-[-18%] left-[15%] h-[26rem] w-[26rem] rounded-full bg-church-gold/[0.12] blur-[120px]" />

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative block h-24 w-24"
          >
            <motion.span
              className="absolute left-[calc(50%-1.5px)] top-0 h-full w-[3px] rounded-full bg-church-gold"
              style={{ transformOrigin: 'top' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute left-0 top-[calc(50%-1.5px)] h-[3px] w-full rounded-full bg-church-gold"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.35 }}
            />
            <motion.span
              className="absolute left-[calc(50%-1.5px)] top-[calc(50%-1.5px)] h-[calc(50%-1.5px)] w-[3px] origin-top rounded-full bg-church-gold"
              style={{ transformOrigin: 'top' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.7 }}
            />
          </motion.div>

          <motion.img
            src="logo.png"
            alt={lang === 'am' ? 'የቤተ ክርስቲያን አርማ' : 'Church Logo'}
            initial={{ opacity: 0, scale: 0.72, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, type: 'spring', stiffness: 70, damping: 17 }}
            className="mt-8 w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6, ease: 'easeOut' }}
            className="mt-6 text-center"
          >
            <h1 className="px-6 font-serif text-3xl md:text-5xl font-bold text-church-gold leading-tight">
              Welo Sefer
            </h1>
            <div className="mt-2 text-[11px] md:text-sm font-sans uppercase tracking-[0.42em] text-church-gold/70">
              St. Maryam Church
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
            className="mt-8 px-6 text-center font-sans text-sm md:text-base text-white/65 max-w-sm leading-relaxed"
          >
            {lang === 'am'
              ? 'እንኳን ወደ ወሎ ሰፈር ቅድስት ማርያም በደህና መጡ'
              : 'Welcome to Welo Sefer St. Maryam'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;