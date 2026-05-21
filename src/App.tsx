import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Language } from './translations';
import { AuthProvider } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const HistoryPage = lazy(() => import('./pages/History'));
const GalleryPage = lazy(() => import('./pages/Gallery'));
const EventsPage = lazy(() => import('./pages/Events'));
const LocationPage = lazy(() => import('./pages/Location'));
const ContactPage = lazy(() => import('./pages/Contact'));
const DeveloperPage = lazy(() => import('./pages/Developer'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen bg-church-cream dark:bg-slate-950 transition-colors duration-500 selection:bg-church-gold selection:text-white overflow-x-hidden flex flex-col ${lang === 'am' ? 'lang-am' : ''}`}>
          <Navbar 
            lang={lang} 
            theme={theme} 
            toggleLang={toggleLang} 
            toggleTheme={toggleTheme} 
          />
          
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-church-gold/30 border-t-church-gold rounded-full animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home lang={lang} />} />
                <Route path="/history" element={<HistoryPage lang={lang} />} />
                <Route path="/gallery" element={<GalleryPage lang={lang} />} />
                <Route path="/events" element={<EventsPage lang={lang} />} />
                <Route path="/location" element={<LocationPage lang={lang} />} />
                <Route path="/contact" element={<ContactPage lang={lang} />} />
                <Route path="/developer" element={<DeveloperPage lang={lang} />} />
              </Routes>
            </Suspense>
          </main>

          <Footer lang={lang} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
