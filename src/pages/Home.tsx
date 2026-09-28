import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';
import { ScrollText, CalendarDays, Images, ArrowRight } from 'lucide-react';
import ParallaxHero from '../components/ParallaxHero';
import GallerySection from '../components/GallerySection';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];

  const secondary = [
    {
      n: '02',
      title: t.nav.events,
      link: '/events',
      icon: CalendarDays,
      desc: t.hero.subtitle.substring(0, 80) + '...',
    },
    {
      n: '03',
      title: t.nav.gallery,
      link: '/gallery',
      icon: Images,
      desc: t.gallery.tag,
    },
  ];

  return (
    <div>
      <ParallaxHero lang={lang} />

      <section className="py-24 md:py-28 px-6 bg-church-cream dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7"
          >
            <Link
              to="/history"
              className="group block h-full overflow-hidden rounded-2xl border border-church-gold/15 bg-white dark:bg-slate-900 transition-all hover:border-church-gold/40 hover:shadow-xl hover:shadow-church-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src="curent church.PNG"
                  alt={t.nav.history}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 font-serif text-sm font-bold tracking-[0.2em] text-church-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                  01
                </span>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ScrollText className="w-5 h-5 text-church-gold shrink-0" />
                    <h3 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide text-church-blue dark:text-church-gold">
                      {t.nav.history}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-church-gold transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
                <div className="mt-3 h-px w-16 bg-church-gold" />
                <p className="mt-4 text-sm leading-relaxed text-church-blue/60 dark:text-gray-400 line-clamp-3">
                  {t.footer.desc.substring(0, 80) + '...'}
                </p>
              </div>
            </Link>
          </motion.div>

          <div className="md:col-span-5 flex flex-col">
            {secondary.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={i === 0 ? 'flex-1' : 'flex-1 mt-5 md:mt-6'}
              >
                <Link
                  to={item.link}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-church-gold/15 bg-white dark:bg-slate-900 p-6 md:p-7 transition-all hover:border-church-gold/40 hover:bg-church-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-sm font-bold tracking-[0.2em] text-church-gold">
                          {item.n}
                        </span>
                        <item.icon className="w-5 h-5 text-church-gold" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-church-gold transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl md:text-2xl font-bold uppercase tracking-wide text-church-blue dark:text-church-gold">
                      {item.title}
                    </h3>
                    <div className="mt-3 h-px w-12 bg-church-gold" />
                    <p className="mt-4 text-sm leading-relaxed text-church-blue/60 dark:text-gray-400 line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection lang={lang} />
    </div>
  );
};

export default Home;
