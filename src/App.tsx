import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AnnouncementBanner from './components/AnnouncementBanner';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import HistoryPage from './pages/History';
import GalleryPage from './pages/Gallery';
import EventsPage from './pages/Events';
import LocationPage from './pages/Location';
import ContactPage from './pages/Contact';
import DeveloperPage from './pages/Developer';
import NotFoundPage from './pages/NotFound';
import { Language } from './translations';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ lang }: { lang: Language }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/history" element={<HistoryPage lang={lang} />} />
          <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          <Route path="/events" element={<EventsPage lang={lang} />} />
          <Route path="/location" element={<LocationPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/developer" element={<DeveloperPage lang={lang} />} />
          <Route path="*" element={<NotFoundPage lang={lang} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Language) || 'en';
    }
    return 'en';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'am' : 'en');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen bg-church-cream dark:bg-slate-950 transition-colors duration-500 selection:bg-church-gold selection:text-white overflow-x-hidden flex flex-col ${lang === 'am' ? 'lang-am' : ''}`}>
          <Navbar 
            lang={lang} 
            theme={theme} 
            toggleLang={toggleLang} 
            toggleTheme={toggleTheme} 
          />
          <AnnouncementBanner lang={lang} />
          
          <main className="flex-grow">
            <AnimatedRoutes lang={lang} />
          </main>

          <ScrollToTopButton />
          <Footer lang={lang} />
        </div>
      </Router>
  );
}

export default App;
