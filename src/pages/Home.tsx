import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Users, BookOpen, Clock, MapPin } from 'lucide-react';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';

interface HomeProps {
  lang: Language;
}

const programTabs = [
  { id: 'sunday', icon: Calendar, label: { en: 'Sunday Service', am: 'የእሁድ አገልግሎት' } },
  { id: 'youth', icon: Users, label: { en: 'Youth Ministry', am: 'የወጣቶች አገልግሎት' } },
  { id: 'midweek', icon: BookOpen, label: { en: 'Midweek Prayer', am: 'የሳምንቱ አጋማሽ ጸሎት' } },
];

const programData: Record<string, { time: string; activity: { en: string; am: string } }[]> = {
  sunday: [
    { time: '6:00 AM - 9:00 AM', activity: { en: 'Holy Liturgy (Kidase)', am: 'ቅዳሴ' } },
    { time: '9:30 AM - 10:30 AM', activity: { en: 'Sunday School', am: 'የሰንበት ትምህርት ቤት' } },
    { time: '10:30 AM - 12:30 PM', activity: { en: 'Fellowship & Coffee', am: 'ኅብረት እና ቡና' } },
  ],
  youth: [
    { time: '4:00 PM - 5:00 PM', activity: { en: 'Bible Study', am: 'የመጽሐፍ ቅዱስ ጥናት' } },
    { time: '5:00 PM - 6:00 PM', activity: { en: 'Music & Choir Practice', am: 'የሙዚቃ እና የመዘምራን ልምምድ' } },
    { time: '6:00 PM - 7:00 PM', activity: { en: 'Community Service', am: 'የማህበረሰብ አገልግሎት' } },
  ],
  midweek: [
    { time: '5:30 PM - 6:30 PM', activity: { en: 'Evening Prayer (Yeserke Tselot)', am: 'የሰርክ ጸሎት' } },
    { time: '6:30 PM - 7:30 PM', activity: { en: 'Scripture Reading', am: 'የመጽሐፍ ቅዱስ ንባብ' } },
    { time: '7:30 PM - 8:00 PM', activity: { en: 'Intercessory Prayer', am: 'የምልጃ ጸሎት' } },
  ],
};

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('sunday');

  return (
    <div className="pt-20">
      <section className="relative h-[85vh] flex items-center justify-center bg-church-blue dark:bg-black overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img src="new church.jpg" alt="Church Foreground" className="w-full h-full object-cover opacity-40 mix-blend-overlay" referrerPolicy="no-referrer" loading="lazy" />
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

      {/* Dynamic Program Guide */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <span className="text-amber-600 font-semibold tracking-wider text-sm uppercase">Weekly Schedule</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3">
              {lang === 'am' ? 'የአገልግሎት መርሃ ግብር' : 'Service Schedule'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="flex border-b border-slate-200 dark:border-slate-700">
              {programTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-b-2 border-amber-600'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label[lang]}</span>
                  <span className="sm:hidden">{tab.label[lang].split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {programData[activeTab].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 p-2.5 rounded-lg shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {item.activity[lang]}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
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
