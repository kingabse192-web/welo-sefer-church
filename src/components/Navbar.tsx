import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, Menu, X, Landmark, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '../translations';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  lang: Language;
  theme: 'light' | 'dark';
  toggleLang: () => void;
  toggleTheme: () => void;
}

const navAuthTranslations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    welcome: 'Welcome'
  },
  am: {
    signIn: 'ግባ',
    signUp: 'ተመዝገብ',
    signOut: 'ውጣ',
    welcome: 'ሰላምታ'
  }
};

const Navbar: React.FC<NavbarProps> = ({ lang, theme, toggleLang, toggleTheme }) => {
  const t = translations[lang];
  const authTrans = navAuthTranslations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFeastPopup, setShowFeastPopup] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!showFeastPopup) return;
    const timer = setTimeout(() => setShowFeastPopup(false), 10000);
    return () => clearTimeout(timer);
  }, [showFeastPopup]);

  return (
    <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
      scrolled
        ? 'bg-church-cream/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-church-gold/10 shadow-lg'
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFeastPopup(true)} className="w-10 h-10 overflow-hidden rounded-full border-2 border-church-gold shadow-sm cursor-pointer flex-shrink-0 hover:ring-2 hover:ring-church-gold/50 transition-all">
            <img src="logo-profile.png" alt="Church Logo" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
          </button>
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <span className="font-serif font-bold text-xl tracking-tight text-church-blue dark:text-church-gold transition-colors">Welo Sefer Church</span>
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-church-blue/70 dark:text-gray-400">
          <NavLink to="/history" className={({ isActive }) => isActive ? "text-church-gold font-bold" : "hover:text-church-blue dark:hover:text-white transition-colors"}>{t.nav.history}</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-church-gold font-bold" : "hover:text-church-blue dark:hover:text-white transition-colors"}>{t.nav.gallery}</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "text-church-gold font-bold" : "hover:text-church-blue dark:hover:text-white transition-colors"}>{t.nav.events}</NavLink>
          <NavLink to="/location" className={({ isActive }) => isActive ? "text-church-gold font-bold" : "hover:text-church-blue dark:hover:text-white transition-colors"}>{t.nav.location}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-church-gold font-bold" : "hover:text-church-blue dark:hover:text-white transition-colors"}>{t.nav.contact}</NavLink>
          <NavLink to="/developer" className={({ isActive }) => isActive ? "text-church-gold font-bold border-l border-church-gold/20 pl-4" : "hover:text-church-blue dark:hover:text-white transition-colors border-l border-church-gold/20 pl-4"}>{t.contact.devProfile}</NavLink>
          
          <div className="flex items-center gap-4 pl-4 border-l border-church-gold/20">
            <button 
              onClick={toggleTheme}
              className="p-2 text-church-blue dark:text-church-gold hover:bg-church-gold/10 rounded-full transition-all flex items-center gap-2 pr-4 cursor-pointer"
              title={theme === 'light' ? 'Switch to Night' : 'Switch to Day'}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 ml-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 ml-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Day Mode</span>
                </>
              )}
            </button>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-church-blue dark:text-gray-300 font-bold hover:text-church-gold transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase text-xs">{lang === 'en' ? 'AM' : 'EN'}</span>
            </button>
            <button className="bg-church-gold text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-church-gold/90 transition-all shadow-lg shadow-church-gold/20 cursor-pointer">
              {t.nav.donation}
            </button>

            {/* User Profile / Auth Desk Menu */}
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-church-gold/20">
                <div className="flex items-center gap-2" title={user.email || ''}>
                  <div className="w-8 h-8 rounded-full bg-church-gold/15 dark:bg-church-gold/25 border border-church-gold/30 flex items-center justify-center text-church-gold font-bold text-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '?')}
                  </div>
                  <span className="text-xs font-semibold text-church-blue/85 dark:text-gray-300 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-1.5 text-church-blue/65 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer"
                  title={authTrans.signOut}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-4 border-l border-church-gold/20">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="text-church-blue dark:text-gray-300 hover:text-church-gold dark:hover:text-church-gold px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {authTrans.signIn}
                </button>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-church-gold text-white hover:bg-church-gold/90 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {authTrans.signUp}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile controls & Hamburger trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-church-blue dark:text-church-gold bg-church-gold/10 rounded-full transition-all active:scale-95 cursor-pointer animate-fade-in"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-church-blue dark:text-church-gold font-bold px-3 py-2 bg-church-gold/10 rounded-full active:scale-95 cursor-pointer"
            aria-label="Toggle Language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase text-[11px]">{lang === 'en' ? 'AM' : 'EN'}</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 text-church-blue dark:text-church-gold hover:bg-church-gold/10 rounded-full transition-all active:scale-95 cursor-pointer border border-church-gold/20"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-church-gold" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop behind navigation menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 top-[73px] bg-slate-900/40 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />
            {/* Top-down Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="md:hidden absolute top-[73px] left-0 w-full bg-church-cream/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-church-gold/20 shadow-2xl z-40 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6 font-sans">
                {/* Ordered Navigation Links */}
                <div className="flex flex-col gap-1">
                  {[
                    { path: '/history', label: t.nav.history },
                    { path: '/gallery', label: t.nav.gallery },
                    { path: '/events', label: t.nav.events },
                    { path: '/location', label: t.nav.location },
                    { path: '/contact', label: t.nav.contact },
                    { path: '/developer', label: t.contact.devProfile },
                  ].map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `
                        w-full px-4 py-3.5 rounded-2xl flex items-center justify-between text-base font-semibold transition-all
                        ${isActive 
                          ? 'bg-church-gold/25 text-church-gold border-l-4 border-church-gold font-bold pl-3 shadow-inner' 
                          : 'text-church-blue/80 dark:text-gray-300 hover:bg-church-gold/10 hover:text-church-gold dark:hover:bg-church-gold/5'
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      <span className="text-church-gold/40 text-xs font-mono font-bold">0{idx + 1}</span>
                    </NavLink>
                  ))}
                </div>

                {/* Mobile Auth Area */}
                <div className="border-t border-church-gold/10 pt-6 px-2 flex flex-col gap-4">
                  {user ? (
                    <div className="flex items-center justify-between p-3.5 bg-church-gold/10 dark:bg-church-gold/5 rounded-2xl border border-church-gold/15">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-church-gold/15 dark:bg-church-gold/25 border border-church-gold/30 flex items-center justify-center text-church-gold font-bold text-sm">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '?')}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-church-blue dark:text-white">
                            {user.displayName || user.email?.split('@')[0]}
                          </span>
                          <span className="text-[10px] text-church-blue/50 dark:text-gray-400 font-mono truncate max-w-[160px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                        className="p-2.5 bg-red-50 dark:bg-red-950/15 text-red-600 dark:text-red-400 hover:text-red-700 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="w-full text-church-blue dark:text-white border border-church-gold/30 font-semibold py-3.5 rounded-2xl text-xs uppercase tracking-wider text-center cursor-pointer"
                      >
                        {authTrans.signIn}
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsAuthOpen(true);
                        }}
                        className="w-full bg-church-gold text-white font-semibold py-3.5 rounded-2xl text-xs uppercase tracking-wider text-center cursor-pointer shadow-md"
                      >
                        {authTrans.signUp}
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Donation Call to action */}
                <div className="border-t border-church-gold/10 pt-6 px-2">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/contact';
                      }
                    }}
                    className="w-full bg-church-gold text-white font-serif py-4 rounded-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-church-gold/20 hover:bg-church-gold/90 transition-all active:scale-95 cursor-pointer"
                  >
                    <Landmark className="w-4 h-4" />
                    <span>{t.nav.donation}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal Trigger popup */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        lang={lang} 
      />

      {/* Feast Info Popup */}
      <AnimatePresence>
        {showFeastPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowFeastPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-church-blue/20 dark:shadow-black/40 border border-church-gold/20 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-church-gold/10 to-church-blue/5 dark:from-church-gold/10 dark:to-church-blue/10 p-6 border-b border-church-gold/10">
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
              </div>
              <div className="p-6 space-y-5">
                <div className="flex gap-4 items-start">
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
                </div>
                <div className="flex gap-4 items-start">
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
                </div>
                <div className="pt-3 border-t border-church-gold/10 flex items-center justify-between">
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
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
