import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';
import { CalendarDays, Images, MapPin, Mail, ArrowRight, ScrollText } from 'lucide-react';
import ParallaxHero from '../components/ParallaxHero';
import GallerySection from '../components/GallerySection';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];

  const sections = [
    { n: '01', title: t.nav.events, link: '/events', icon: CalendarDays },
    { n: '02', title: t.nav.gallery, link: '/gallery', icon: Images },
    { n: '03', title: t.nav.location, link: '/location', icon: MapPin },
    { n: '04', title: t.nav.contact, link: '/contact', icon: Mail },
  ];

  return (
    <div>
      <ParallaxHero lang={lang} />

      <section className="py-24 md:py-28 px-6 bg-church-cream dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {sections.map((item, i) => (
              <Link
                key={item.n}
                to={item.link}
                className="group relative flex min-h-[150px] flex-col justify-between rounded-2xl border border-church-gold/15 bg-white dark:bg-slate-900 p-5 md:p-6 transition-all hover:border-church-gold/40 hover:bg-church-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-xs font-bold tracking-[0.2em] text-church-gold">{item.n}</span>
                  <ArrowRight className="w-4 h-4 text-church-gold/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-church-gold" />
                </div>
                <div>
                  <item.icon className="w-5 h-5 text-church-gold mb-3" />
                  <h3 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wide text-church-blue dark:text-church-gold leading-snug">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Small foundation note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-church-gold/20 pt-6"
          >
            <div className="flex items-start gap-3 max-w-2xl">
              <ScrollText className="w-4 h-4 text-church-gold mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-sm font-bold uppercase tracking-[0.15em] text-church-blue dark:text-church-gold">
                  {t.nav.history}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-church-blue/60 dark:text-gray-400">
                  {t.footer.desc}
                </p>
              </div>
            </div>
            <Link
              to="/history"
              className="group inline-flex items-center gap-2 text-church-gold text-xs font-bold uppercase tracking-[0.2em] border-b border-church-gold/40 pb-1 hover:border-church-gold transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <GallerySection lang={lang} />
    </div>
  );
};

export default Home;
