import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

import { Language, translations } from '../translations';
import PremiumButton from './PremiumButton';

interface NextFeastSpotlightProps {
  lang: Language;
  category: string;
  date: string;
  title: string;
  description?: string;
  onOpen: () => void;
}

const NextFeastSpotlight: React.FC<NextFeastSpotlightProps> = ({ lang, category, date, title, description, onOpen }) => {
  const t = translations[lang].events;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12 overflow-hidden rounded-2xl border border-church-gold/25 bg-white/[0.04] backdrop-blur-md"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-8 h-64 w-64 rounded-full bg-church-gold/15 blur-[90px]" />
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-church-gold/70" />

      <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-church-gold/15 text-church-gold border border-church-gold/30 shadow-gold-soft">
          <CalendarIcon className="w-6 h-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-church-gold/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.24em] text-church-gold">
              {category}
            </span>
            <span className="font-sans text-xs font-medium text-white/60 tabular-nums">{date}</span>
          </div>
          <h3 className="mt-2 font-serif text-xl md:text-2xl font-bold text-white leading-snug">{title}</h3>
          {description && (
            <p className="mt-2 max-w-2xl font-sans text-sm text-white/60 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <PremiumButton onClick={onOpen} variant="ghost" className="!px-6 !py-2.5 !text-xs">
            {t.details}
            <ArrowRight className="w-4 h-4" />
          </PremiumButton>
        </div>
      </div>
    </motion.aside>
  );
};

export default NextFeastSpotlight;