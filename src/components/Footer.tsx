import React from 'react';
import { Cross, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-church-cream dark:bg-slate-900 border-t border-church-gold/10 py-16 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-church-blue/60 dark:text-gray-400 font-sans text-sm transition-colors">
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
          <h4 className="font-serif font-bold text-church-blue dark:text-church-gold text-lg uppercase tracking-widest transition-colors">{t.footer.quickLinks}</h4>
          <ul className="space-y-3">
            <li><Link to="/history" className="hover:text-church-gold transition-colors">{t.nav.history}</Link></li>
            <li><Link to="/events" className="hover:text-church-gold transition-colors">{t.nav.events}</Link></li>
            <li><Link to="/location" className="hover:text-church-gold transition-colors">{t.nav.location}</Link></li>
            <li><Link to="/contact" className="hover:text-church-gold transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif font-bold text-church-blue dark:text-church-gold text-lg uppercase tracking-widest transition-colors">{t.nav.contact}</h4>
          <p>{t.location.addressValue}</p>
          <p>Email: info@weloseferchurch.org<br />Tel: +251 (11) 612 3456</p>
          <Link to="/developer" className="flex items-center gap-4 pt-4 border-t border-church-gold/10 hover:opacity-80 transition-opacity">
            <img src="developer.jpg" alt="Developer" className="w-10 h-10 rounded-full object-cover border border-church-gold/30" referrerPolicy="no-referrer" />
            <p className="text-[10px] leading-tight dark:text-gray-400 transition-colors uppercase tracking-wider">{t.contact.devRole}<br/><span className="text-church-blue dark:text-church-gold font-bold transition-colors">{t.contact.devTeam}</span></p>
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-church-gold/10 text-center space-y-3">
          <p className="text-xs font-bold text-church-blue dark:text-church-gold uppercase tracking-wider">
            {t.footer.copyright}
          </p>
          <p className="text-xs font-bold text-church-gold transition-colors">
            {lang === 'am' ? (
              <>እኔ አብሳለው በላይነህ በየ7 ቀኑ ይህንን ድረ-ገጽ አዘምነዋለሁ — ወቅታዊ ይሁኑ!</>
            ) : (
              <>I ABSALEW BELAYNEH, will update this website every 7 days — stay updated.</>
            )}
          </p>
      </div>
    </footer>
  );
};

export default Footer;
