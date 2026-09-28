import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import WelcomeHero from '../components/WelcomeHero';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];

  const links = [
    { label: t.nav.history, to: '/history' },
    { label: t.nav.gallery, to: '/gallery' },
    { label: t.nav.events, to: '/events' },
    { label: t.nav.location, to: '/location' },
    { label: t.nav.contact, to: '/contact' },
    { label: t.nav.donation, to: '/contact' },
  ];

  const intro = t.footer.desc;
  const [first, ...rest] = intro.split(' ');

  return (
    <div>
      <WelcomeHero lang={lang} />

      {/* Website introduction */}
      <section className="relative py-24 md:py-32 px-6 bg-church-cream dark:bg-slate-950 overflow-hidden transition-colors duration-500">
        {/* Overlapping watermark composition — same language as the hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          {/* Back layer: filled wordmark bleeding off the top-left */}
          <span
            className="absolute left-1/2 top-1/2 font-serif font-black uppercase text-[20vw] leading-none whitespace-nowrap text-[rgba(0,35,102,0.05)] dark:text-[rgba(255,255,255,0.04)]"
            style={{ transform: 'translate(-70%, -78%) rotate(-6deg)' }}
          >
            Welo Sefer
          </span>
          {/* Front layer: gold outline crossing it at the opposite angle */}
          <span
            className="absolute left-1/2 top-1/2 font-serif font-black italic text-[15vw] leading-none whitespace-nowrap"
            style={{
              color: 'rgba(207,181,59,0.04)',
              WebkitTextStroke: '1.5px rgba(207,181,59,0.32)',
              transform: 'translate(-32%, -18%) rotate(6deg)',
            }}
          >
            Welo Sefer
          </span>
          {/* Cross at the crossing point */}
          <svg
            className="absolute left-1/2 top-1/2 w-[28vw] max-w-[280px]"
            viewBox="0 0 300 480"
            style={{ transform: 'translate(-78%, -60%) rotate(-6deg)', opacity: 0.06 }}
          >
            <rect x="125" y="0" width="50" height="480" fill="#CFB53B" />
            <rect x="40" y="130" width="220" height="50" fill="#CFB53B" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-12 items-start"
        >
          <div className="md:col-span-7">
            <span className="block w-10 h-px bg-church-gold mb-8" />
            <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-[1.5] text-church-blue dark:text-gray-200">
              <span className="float-left mr-3 mt-1 font-serif font-black text-5xl md:text-6xl leading-[0.8] text-church-gold">
                {first}
              </span>
              {rest.join(' ')}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <img
                src="logo.png"
                alt="Welo Sefer St. Maryam"
                loading="lazy"
                className="w-11 h-11 object-contain"
              />
              <span className="h-px flex-1 max-w-[120px] bg-church-gold/30" />
            </div>
          </div>

          <nav className="md:col-span-5 md:pl-8 md:border-l md:border-church-gold/20" aria-label="Quick Links">
            <span className="block text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs">
              {t.footer.quickLinks}
            </span>
            <ul className="mt-6 space-y-0">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between py-3.5 border-b border-church-gold/15 text-church-blue dark:text-gray-200 hover:text-church-gold transition-colors focus-visible:outline-none focus-visible:text-church-gold"
                  >
                    <span className="font-serif text-base md:text-lg">{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-church-gold/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-church-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
