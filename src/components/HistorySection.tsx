import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, BookOpen, Music, Droplet, Heart, Users } from 'lucide-react';

import { Language, translations } from '../translations';

interface HistorySectionProps {
  lang: Language;
}

const HistorySection: React.FC<HistorySectionProps> = ({ lang }) => {
  const t = translations[lang].history;
  const [activeTab, setActiveTab] = useState<'evolution' | 'miracles' | 'sundaySchool'>('evolution');

  return (
    <section id="history" className="py-24 bg-church-cream dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs mb-4 block underline decoration-church-gold/30 underline-offset-8 transition-colors">
            {t.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-church-blue dark:text-church-gold mb-6 transition-colors">
            {t.title}
          </h2>
          <div className="w-24 h-1.5 bg-church-gold mx-auto rounded-full mb-12"></div>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-3xl mx-auto">
          {[
            { id: 'evolution', label: t.tabEvolution, icon: Compass },
            { id: 'miracles', label: t.tabMiracles, icon: Sparkles },
            { id: 'sundaySchool', label: t.tabSundaySchool, icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'evolution' | 'miracles' | 'sundaySchool')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-serif font-semibold text-sm transition-all duration-300 shadow-md ${
                  isActive 
                    ? 'bg-church-blue text-white dark:bg-church-gold dark:text-slate-950 scale-105'
                    : 'bg-white dark:bg-slate-800 text-church-blue dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-church-gold dark:text-slate-950' : 'text-church-gold'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeTab === 'evolution' && (
              <motion.div
                key="evolution"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4 }}
                className="space-y-24"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <p className="font-serif italic text-lg text-church-blue dark:text-church-gold text-opacity-80 leading-relaxed">
                    {t.evolutionSub}
                  </p>
                </div>

                {/* Timeline - Stage 1 */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1 space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-church-gold/10 rounded-full">
                      <span className="text-church-gold font-bold text-xs tracking-widest uppercase">Stage I</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-church-blue dark:text-gray-200">{t.stage1Title}</h3>
                    <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t.stage1Desc}
                    </p>
                    <div className="p-6 border-l-4 border-church-gold bg-white dark:bg-slate-800 shadow-md rounded-r-2xl italic text-church-blue dark:text-gray-300 font-serif">
                      "{t.stage1Quote}"
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transition-all duration-300 hover:scale-[1.02]">
                    <img src="/old church.jpg" alt="Original Church Design" className="w-full h-[350px] object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                {/* Timeline - Stage 2 */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transition-all duration-300 hover:scale-[1.02]">
                    <img src="/curent church.PNG" alt="Current Church Building" className="w-full h-[350px] object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-church-blue/10 dark:bg-church-gold/10 rounded-full">
                      <span className="text-church-blue dark:text-church-gold font-bold text-xs tracking-widest uppercase">Stage II</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-church-blue dark:text-gray-200">{t.stage2Title}</h3>
                    <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t.stage2Desc}
                    </p>
                    <div className="p-6 border-l-4 border-church-blue dark:border-church-gold bg-white dark:bg-slate-800 shadow-md rounded-r-2xl italic text-church-blue dark:text-gray-300 font-serif">
                      "{t.stage2Quote}"
                    </div>
                  </div>
                </div>

                {/* Timeline - Stage 3 */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1 space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-church-gold/10 rounded-full">
                      <span className="text-church-gold font-bold text-xs tracking-widest uppercase">Stage III</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-church-blue dark:text-gray-200">{t.stage3Title}</h3>
                    <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t.stage3Desc}
                    </p>
                    <div className="p-6 border-l-4 border-church-gold bg-white dark:bg-slate-800 shadow-md rounded-r-2xl italic text-church-blue dark:text-gray-300 font-serif">
                      "{t.stage3Quote}"
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transition-all duration-300 hover:scale-[1.02]">
                    <img src="/new church.jpg" alt="Future Church Design" className="w-full h-[350px] object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'miracles' && (
              <motion.div
                key="miracles"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <p className="font-serif italic text-lg text-church-blue dark:text-church-gold text-opacity-80 leading-relaxed">
                    {t.miraclesSub}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Water Miracle Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-t-4 border-church-gold relative overflow-hidden transition-colors duration-500"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-church-gold/5 rounded-full -mr-10 -mt-10"></div>
                    <div className="w-14 h-14 bg-church-gold/10 rounded-2xl flex items-center justify-center mb-6">
                      <Droplet className="w-7 h-7 text-church-gold" />
                    </div>
                    <h3 className="text-2xl font-serif text-church-blue dark:text-gray-200 font-bold mb-4">
                      {t.healingTitle}
                    </h3>
                    <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {t.healingDesc}
                    </p>
                  </motion.div>

                  {/* Vow Miracle Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-t-4 border-church-blue dark:border-church-gold relative overflow-hidden transition-colors duration-500"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-church-blue/5 dark:bg-church-gold/5 rounded-full -mr-10 -mt-10"></div>
                    <div className="w-14 h-14 bg-church-blue/10 dark:bg-church-gold/10 rounded-2xl flex items-center justify-center mb-6">
                      <Heart className="w-7 h-7 text-church-blue dark:text-church-gold" />
                    </div>
                    <h3 className="text-2xl font-serif text-church-blue dark:text-gray-200 font-bold mb-4">
                      {t.vowsTitle}
                    </h3>
                    <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {t.vowsDesc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sundaySchool' && (
              <motion.div
                key="sundaySchool"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 transition-colors duration-500">
                  <div className="grid md:grid-cols-12">
                    {/* Visual Stats Block */}
                    <div className="md:col-span-4 bg-church-blue dark:bg-slate-900 p-12 text-center flex flex-col justify-center items-center relative overflow-hidden">
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
                      <span className="text-church-gold dark:text-church-gold font-sans font-extrabold text-7xl block mb-2 relative">
                        {t.youthStats}
                      </span>
                      <span className="text-white font-serif font-bold text-lg tracking-widest uppercase opacity-90">
                        {lang === 'am' ? 'ንቁ ተማሪዎች' : 'Active Youth'}
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="md:col-span-8 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                      <h3 className="text-3xl font-serif font-bold text-church-blue dark:text-gray-200">
                        {t.youthTitle}
                      </h3>
                      <p className="font-sans text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t.youthDesc}
                      </p>

                      {/* Detail points */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-church-gold/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-church-gold" />
                          </div>
                          <span className="font-serif text-sm font-semibold text-church-blue dark:text-gray-300">
                            {lang === 'am' ? 'የትምህርት ጊዜ' : 'Bible Study'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-church-gold/10 flex items-center justify-center">
                            <Music className="w-4 h-4 text-church-gold" />
                          </div>
                          <span className="font-serif text-sm font-semibold text-church-blue dark:text-gray-300">
                            {lang === 'am' ? 'የመዝሙር ጊዜ' : 'Hymn Practice'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-church-gold/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-church-gold" />
                          </div>
                          <span className="font-serif text-sm font-semibold text-church-blue dark:text-gray-300">
                            {lang === 'am' ? 'ልዩ ጸሎት' : 'Special Prayers'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;
