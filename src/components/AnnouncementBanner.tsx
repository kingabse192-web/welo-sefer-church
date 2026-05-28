import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Megaphone } from 'lucide-react';
import { Language } from '../translations';

const announcements = {
  en: [
    'Ginbot 21 (May 30) — Monthly Feast of St. Mary. Join us for Holy Liturgy!',
    'All are welcome to our weekly Sunday School program at 10:30 AM.',
    'Follow us for updates on upcoming feasts and community events.',
  ],
  am: [
    'ግንቦት ፳፩ (May 30) — ወርሃዊ የቅድስት ማርያም በዓል። በቅዱስ ቅዳሴ ይሳተፉ!',
    'ሁሉም በየሳምንቱ በሰንበት ትምህርት ቤት እንዲሳተፉ በደህና መጡ።',
    'ስለ መጪ በዓላት እና የማህበረሰብ ክንውኖች ዘምን ያግኙ።',
  ],
};

interface AnnouncementBannerProps {
  lang: Language;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ lang }) => {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('announcement-dismissed') === 'true';
    }
    return false;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = announcements[lang];

  useEffect(() => {
    if (dismissed || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dismissed, items.length]);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  return (
    <div className="relative bg-gradient-to-r from-church-gold/15 via-church-gold/5 to-church-blue/5 dark:from-church-gold/10 dark:via-church-gold/5 dark:to-church-blue/10 border-b border-church-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-3">
        <Megaphone className="w-4 h-4 text-church-gold flex-shrink-0" />
        <div className="flex-1 overflow-hidden relative h-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-church-blue/70 dark:text-gray-300 font-sans absolute inset-0 flex items-center"
            >
              {items[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        {items.length > 1 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setCurrentIndex(prev => (prev - 1 + items.length) % items.length)}
              className="p-0.5 hover:bg-church-gold/10 rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-church-blue/50 dark:text-gray-400" />
            </button>
            <span className="text-[10px] text-church-blue/40 dark:text-gray-500 font-mono">
              {currentIndex + 1}/{items.length}
            </span>
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % items.length)}
              className="p-0.5 hover:bg-church-gold/10 rounded-full transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 text-church-blue/50 dark:text-gray-400" />
            </button>
          </div>
        )}
        <button
          onClick={handleDismiss}
          className="p-0.5 hover:bg-church-gold/10 rounded-full transition-colors cursor-pointer flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5 text-church-blue/40 dark:text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
