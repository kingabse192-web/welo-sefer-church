import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, Sun, Moon, Menu, X, Landmark } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '../translations';
import PremiumButton from './PremiumButton';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'px-3.5 -my-1 rounded-full font-semibold text-gold-deep bg-church-gold/15 transition-all hover:scale-[1.03] active:scale-95'
    : 'px-3.5 -my-1 rounded-full text-church-blue/70 dark:text-gray-400 hover:text-church-gold hover:bg-church-gold/10 transition-all active:scale-95';

interface NavbarProps {
  lang: Language;
  theme: 'light' | 'dark';
  toggleLang: () => void;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, theme, toggleLang, toggleTheme }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFeastPopup, setShowFeastPopup] = useState(false);
  const navigate = useNavigate();
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const navItems = [
    { path: '/history', label: t.nav.history },
    { path: '/gallery', label: t.nav.gallery },
    { path: '/events', label: t.nav.events },
    { path: '/location', label: t.nav.location },
    { path: '/contact', label: t.nav.contact },
    { path: '/developer', label: t.contact.devProfile },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    drawerCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!showFeastPopup) return;
    const timer = setTimeout(() => setShowFeastPopup(false), 10000);
    return () => clearTimeout(timer);
  }, [showFeastPopup]);

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
      scrolled
        ? 'bg-church-cream/85 dark:bg-church-night/85 backdrop-blur-xl border-b border-church-gold/10 shadow-lg'
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setShowFeastPopup(true)} className="w-10 h-10 overflow-hidden rounded-full border-2 border-church-gold shadow-sm cursor-pointer flex-shrink-0 active:scale-95 transition-all duration-200 hover:ring-2 hover:ring-church-gold/50">
            <img src="logo.png" alt="Church Logo" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
          </button>
          <NavLink to="/" className="flex items-center gap-3 min-w-0" onClick={closeDrawer}>
            <span className="hidden min-[430px]:inline font-serif font-bold text-lg md:text-xl tracking-tight text-church-blue dark:text-church-gold truncate transition-colors">Welo Sefer Church</span>
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 font-sans text-sm font-medium text-church-blue/70 dark:text-gray-400">
          <NavLink to="/history" className={navLinkClass}>{t.nav.history}</NavLink>
          <NavLink to="/gallery" className={navLinkClass}>{t.nav.gallery}</NavLink>
          <NavLink to="/events" className={navLinkClass}>{t.nav.events}</NavLink>
          <NavLink to="/location" className={navLinkClass}>{t.nav.location}</NavLink>
          <NavLink to="/contact" className={navLinkClass}>{t.nav.contact}</NavLink>
          <NavLink to="/developer" className={navLinkClass}>{t.contact.devProfile}</NavLink>

          <div className="flex items-center gap-2 pl-4 ml-2 border-l border-church-gold/20">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center text-church-blue dark:text-church-gold hover:bg-church-gold/10 rounded-xl transition-colors cursor-pointer"
              title={theme === 'light' ? 'Switch to Night' : 'Switch to Day'}
              aria-label={theme === 'light' ? 'Switch to Night' : 'Switch to Day'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleLang}
              className="h-9 px-3 flex items-center gap-1.5 text-church-blue dark:text-gray-300 text-xs font-bold uppercase tracking-wider hover:text-church-gold hover:bg-church-gold/10 rounded-xl transition-colors cursor-pointer"
              title="Change Language"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'AM' : 'EN'}</span>
            </button>
            <PremiumButton onClick={() => navigate('/contact')} className="!px-5 !py-2 !text-[10px]">
              {t.nav.donation}
            </PremiumButton>
          </div>
        </div>

        {/* Mobile controls & Hamburger trigger */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-church-gold bg-church-gold/15 rounded-xl transition-all active:scale-90 cursor-pointer hover:bg-church-gold hover:text-white shadow-md"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-[18px] h-[18px]" strokeWidth={2} /> : <Sun className="w-[18px] h-[18px]" strokeWidth={2} />}
          </button>
          <button 
            onClick={toggleLang}
            className="h-10 flex items-center gap-1.5 text-church-gold font-bold px-3 bg-church-gold/15 rounded-xl active:scale-90 cursor-pointer hover:bg-church-gold hover:text-white transition-all shadow-md"
            aria-label="Toggle Language"
          >
            <Globe className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="uppercase text-[11px] font-extrabold">{lang === 'en' ? 'አማ' : 'EN'}</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90 cursor-pointer shadow-md ${
              isOpen
                ? 'bg-church-gold text-white shadow-church-gold/30 rotate-90'
                : 'bg-church-gold/15 text-church-gold hover:bg-church-gold hover:text-white hover:shadow-church-gold/20'
            }`}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Brand Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 z-[85]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full flex-col overflow-y-auto bg-gradient-to-b from-church-night via-[#0c1d3e] to-church-nightDeep text-white shadow-2xl"
              style={{ width: 'min(88vw, 28rem)' }}
            >
              <div className="relative overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-church-blue/50 blur-[100px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-church-gold/15 blur-[90px]" />

                <div className="relative flex items-center justify-between px-6 py-6 sm:px-8">
                  <div className="flex items-center gap-3">
                    <img src="logo.png" alt="" className="h-11 w-11 rounded-full border-2 border-church-gold/60 object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-serif font-bold text-lg leading-tight text-church-gold">
                        {lang === 'am' ? 'ወሎ ሰፈር' : 'Welo Sefer'}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 leading-tight">
                        {lang === 'am' ? 'ቅድስት ማርያም' : 'St. Maryam Church'}
                      </p>
                    </div>
                  </div>
                  <button
                    ref={drawerCloseRef}
                    onClick={closeDrawer}
                    aria-label={lang === 'am' ? 'ዝጋ' : 'Close menu'}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/15 transition-all hover:bg-church-gold hover:text-white active:scale-90"
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                </div>

                <div className="relative mx-6 h-px bg-gradient-to-r from-transparent via-church-gold/40 to-transparent sm:mx-8" />

                <nav className="relative flex flex-col gap-1 px-4 py-6 sm:px-6" aria-label="Mobile navigation">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.42, delay: 0.12 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={closeDrawer}
                        className={({ isActive }) => `
                          flex items-center justify-between rounded-xl px-4 py-3.5 font-sans text-base font-semibold transition-all active:scale-[0.98]
                          ${isActive
                            ? 'border-l-2 border-church-gold bg-church-gold/15 text-church-gold pl-3.5'
                            : 'text-white/75 hover:bg-white/5 hover:text-church-gold'
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-xs font-bold text-church-gold/40">0{idx + 1}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="mt-auto">
                <div className="px-6 pb-6 sm:px-8">
                  <div className="flex items-center justify-center gap-2 text-church-gold/40" aria-hidden="true">
                    <span className="h-px flex-1 bg-church-gold/20" />
                    <span className="font-serif text-lg leading-none">✦</span>
                    <span className="h-px flex-1 bg-church-gold/20" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3 px-6 pb-10"
                >
                  <div className="flex gap-3">
                    <button
                      onClick={() => { toggleTheme(); }}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-white/5 text-white/85 ring-1 ring-white/10 transition-all hover:bg-white/10 active:scale-95"
                    >
                      {theme === 'light' ? <Moon className="w-4 h-4 text-church-gold" /> : <Sun className="w-4 h-4 text-church-gold" />}
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {theme === 'light' ? (lang === 'am' ? 'ሌሊት' : 'Night') : (lang === 'am' ? 'ቀን' : 'Day')}
                      </span>
                    </button>
                    <button
                      onClick={() => { toggleLang(); }}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-white/5 text-white/85 ring-1 ring-white/10 transition-all hover:bg-white/10 active:scale-95"
                    >
                      <Globe className="w-4 h-4 text-church-gold" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {lang === 'am' ? 'English' : 'አማርኛ'}
                      </span>
                    </button>
                  </div>
                  <PremiumButton
                    shape="soft"
                    fullWidth
                    onClick={() => {
                      closeDrawer();
                      navigate('/contact');
                    }}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>{t.nav.donation}</span>
                  </PremiumButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feast Info Popup */}
      <AnimatePresence>
        {showFeastPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowFeastPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg bg-white dark:bg-church-night rounded-3xl shadow-2xl shadow-church-blue/20 dark:shadow-black/40 border border-church-gold/20 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
                className="bg-gradient-to-r from-church-gold/10 to-church-blue/5 dark:from-church-gold/10 dark:to-church-blue/10 p-6 border-b border-church-gold/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-church-gold tracking-[0.3em]">
                    {lang === 'am' ? 'ወርሃዊ የንግሥ በዓላት' : 'Monthly Feast Schedule'}
                  </span>
                  <button 
                    onClick={() => setShowFeastPopup(false)}
                    className="p-1.5 hover:bg-church-gold/10 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-church-blue/50 dark:text-gray-400" />
                  </button>
                </div>
                <h3 className="font-serif font-bold text-lg text-church-blue dark:text-church-gold">
                  {lang === 'am' ? 'የቅዱስ ገብርኤል እና የቅድስት ማርያም ወርሃዊ በዓላት' : 'Monthly Feasts of St. Gabriel & St. Mary'}
                </h3>
              </motion.div>
              <div className="p-6 space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-church-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-church-gold font-bold text-sm">19</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-church-blue dark:text-white text-sm mb-1">
                      {lang === 'am' ? 'የቅዱስ ገብርኤል በዓል' : 'Feast of St. Gabriel'}
                    </h4>
                    <p className="text-xs text-church-blue/65 dark:text-gray-400 leading-relaxed">
                      {lang === 'am'
                        ? 'በየወሩ በ19 (በተለይም የታህሳስ 19 እና የሃምሌ 19 ዓመታዊ በዓላት በጣም ደማቅ ናቸው)።'
                        : 'Every month on the 19th (especially Tahsas 19 and Hamle 19 are celebrated with great grandeur).'}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-church-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-church-gold font-bold text-sm">21</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-church-blue dark:text-white text-sm mb-1">
                      {lang === 'am' ? 'የቅድስት ማርያም በዓል' : 'Feast of St. Mary'}
                    </h4>
                    <p className="text-xs text-church-blue/65 dark:text-gray-400 leading-relaxed">
                      {lang === 'am'
                        ? 'በየወሩ በ21 (በተለይም የህዳር 21 ጽዮን ማርያም እና የግንቦት 21 ደማቅ በዓላት ናቸው)።'
                        : 'Every month on the 21st (especially Hidar 21 Zion Mary and Ginbot 21 are grand celebrations).'}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="pt-3 border-t border-church-gold/10 flex items-center justify-between"
                >
                  <span className="text-[10px] text-church-blue/40 dark:text-gray-500 font-sans">
                    {lang === 'am' ? 'መረጃው ከ10 ሰከንድ በኋላ ይዘጋል' : 'Auto-closes in 10s'}
                  </span>
                  <div className="w-20 h-1.5 bg-church-gold/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-church-gold rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
