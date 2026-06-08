import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeSplash: React.FC<{ lang: string; onFinish: () => void }> = ({ lang, onFinish }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 3000);
    const hideTimer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinish, 1000);
    }, 9000);
    return () => { clearTimeout(logoTimer); clearTimeout(hideTimer); };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-church-cream dark:bg-slate-950"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-serif font-bold text-church-blue dark:text-church-gold text-center px-6 leading-tight"
          >
            {lang === 'am'
              ? 'እንኳን ወደ ወሎ ሰፈር ቅድስት ማርያም በደህና መጡ'
              : 'Welcome to Welo Sefer St. Maryam'}
          </motion.h1>

          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut', type: 'spring', stiffness: 60 }}
                className="mt-10"
              >
                <img
                  src="logo-profile.png"
                  alt="Church Logo"
                  className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSplash;
