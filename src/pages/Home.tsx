import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="pt-20">
      <section className="relative h-[85vh] flex items-center justify-center bg-church-blue dark:bg-black overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img src="new church.jpg" alt="Church Foreground" className="w-full h-full object-cover opacity-40 mix-blend-overlay" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-church-blue/80 via-church-blue/50 to-church-blue dark:from-black/90 dark:via-black/70 dark:to-black transition-colors"></div>
        </div>
        
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cross-stripes.png')] pointer-events-none"></div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-tight mb-6 hero-title">
               <span className="text-church-gold italic block md:inline tracking-tight">{t.hero.strength}</span> {t.hero.inFaith} 
               <br />
               <span className="block md:inline tracking-tight">{t.hero.peace} {t.hero.inPrayer}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-church-cream/80 dark:text-gray-400 font-sans font-light leading-relaxed mb-10 transition-colors">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="bg-church-gold text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-xl shadow-church-gold/30">
                {t.hero.ctaServices}
              </Link>
              <Link to="/history" className="border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                {t.hero.ctaHistory}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Featured Sections Quick Access */}
      <section className="py-24 px-6 bg-church-cream dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: t.nav.history, link: '/history', icon: '📜', desc: t.footer.desc.substring(0, 80) + '...' },
            { title: t.nav.events, link: '/events', icon: '📅', desc: t.hero.subtitle.substring(0, 80) + '...' },
            { title: t.nav.gallery, link: '/gallery', icon: '🖼️', desc: t.gallery.tag }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-church-gold/10 shadow-xl shadow-church-blue/5 hover:border-church-gold/30 transition-all group"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-serif font-bold text-church-blue dark:text-church-gold mb-4 uppercase tracking-wider">{item.title}</h3>
              <p className="text-sm text-church-blue/60 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">{item.desc}</p>
              <Link to={item.link} className="text-church-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <span className="text-lg">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
