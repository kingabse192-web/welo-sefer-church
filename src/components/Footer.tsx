import React from 'react';
import { motion } from 'framer-motion';
import { Cross, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language, translations } from '../translations';
import OrnamentDivider from './OrnamentDivider';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="relative bg-church-cream dark:bg-church-night border-t border-church-gold/10 py-16 px-6 transition-colors duration-500">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-church-gold/60 to-transparent" />
      <OrnamentDivider className="mb-16 text-church-gold/80 dark:text-church-gold/90" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto grid md:grid-cols-[1.5fr_1fr_1fr] gap-x-16 gap-y-12 text-church-blue/65 dark:text-gray-400 font-sans text-sm transition-colors"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Cross className="text-church-gold w-6 h-6" />
            <span className="font-serif font-bold text-xl tracking-tight text-church-blue dark:text-church-gold transition-colors">Welo Sefer Church</span>
          </div>
          <p className="leading-relaxed">
            {t.footer.desc}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://www.instagram.com/welosefer_mareyam/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-church-blue/5 dark:bg-white/5 flex items-center justify-center border border-church-gold/20 text-church-blue/75 dark:text-church-gold hover:bg-church-gold hover:text-white dark:hover:text-slate-900 transition-all shadow-md group"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://www.tiktok.com/@beruk_lerics?is_from_webapp=1&sender_device=pc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-church-blue/5 dark:bg-white/5 flex items-center justify-center border border-church-gold/20 text-church-blue/75 dark:text-church-gold hover:bg-church-gold hover:text-white dark:hover:text-slate-900 transition-all shadow-md group"
              aria-label="TikTok"
            >
              <svg className="w-4 h-4 fill-none stroke-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-sans font-bold uppercase text-[11px] tracking-[0.3em] text-gold-deep transition-colors">{t.footer.quickLinks}</h4>
          <ul className="space-y-3">
            {[t.nav.history, t.nav.events, t.nav.location, t.nav.contact].map((label, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={['/history', '/events', '/location', '/contact'][i]}
                  className="inline-block hover:text-church-gold hover:translate-x-1.5 transition-all duration-300"
                >
                  {label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-sans font-bold uppercase text-[11px] tracking-[0.3em] text-gold-deep transition-colors">{t.nav.contact}</h4>
          <p>{t.location.addressValue}</p>
          <p>Email: info@weloseferchurch.org<br />Tel: +251 (11) 612 3456</p>
          <Link to="/developer" className="flex items-center gap-4 pt-4 border-t border-church-gold/10 hover:opacity-80 transition-opacity">
            <img src="developer.jpg" alt="Developer" className="w-10 h-10 rounded-full object-cover border border-church-gold/30" referrerPolicy="no-referrer" />
            <p className="text-[10px] leading-tight dark:text-gray-400 transition-colors uppercase tracking-wider">{t.contact.devRole}<br/><span className="text-church-blue dark:text-church-gold font-bold transition-colors">{t.contact.devTeam}</span></p>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mt-16 pt-8 border-t border-church-gold/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
          <p className="text-xs font-bold text-church-blue dark:text-gold-deep uppercase tracking-wider">
            {t.footer.copyright}
          </p>
          <p className="text-xs font-bold text-church-gold transition-colors">
            {lang === 'am' ? (
              <>እኔ አብሳለው በላይነህ በየ7 ቀኑ ይህንን ድረ-ገጽ አዘምነዋለሁ — ወቅታዊ ይሁኑ!</>
            ) : (
              <>I ABSALEW BELAYNEH, will update this website every 7 days — stay updated.</>
            )}
          </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
