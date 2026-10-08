import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  tag?: string;
  title: React.ReactNode;
  lead?: string;
  level?: 'h1' | 'h2';
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  lead,
  level = 'h2',
  align = 'left',
  tone = 'dark',
  className = '',
}) => {
  const centered = align === 'center';
  const Heading: React.ElementType = level;

  return (
    <motion.header
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className}`}
    >
      {tag && (
        <span className={`inline-flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-7 bg-church-gold/70" />
          <span className="font-sans font-bold uppercase text-[11px] tracking-[0.32em] text-church-gold">
            {tag}
          </span>
        </span>
      )}

      <Heading
        className={
          'mt-4 font-serif font-bold text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.1] tracking-tight ' +
          (tone === 'dark' ? 'text-church-blue dark:text-church-gold' : 'text-white')
        }
      >
        {title}
      </Heading>

      {lead && (
        <p
          className={
            'mt-4 text-[15px] leading-relaxed ' +
            (centered ? 'mx-auto max-w-[58ch]' : 'max-w-[58ch]') +
            (tone === 'dark' ? ' text-church-blue/65 dark:text-gray-400' : ' text-white/70')
          }
        >
          {lead}
        </p>
      )}
    </motion.header>
  );
};

export default SectionHeader;
