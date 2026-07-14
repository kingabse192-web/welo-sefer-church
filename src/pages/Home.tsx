import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';
import ParallaxHero from '../components/ParallaxHero';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div>
      <ParallaxHero lang={lang} />

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
