import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';
import { Photo } from '../galleryPhotos';

interface PhotoLightboxProps {
  photos: Photo[];
  index: number;
  lang: Language;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photos, index, lang, onClose, onIndexChange }) => {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, photos.length, onClose, onIndexChange]);

  if (!photo) return null;

  const t = translations[lang].gallery;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        className="absolute inset-0 bg-black/92 backdrop-blur-sm cursor-zoom-out"
        onClick={onClose}
        aria-label="Close"
        tabIndex={-1}
      />

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-church-gold/20 bg-white dark:bg-slate-900 shadow-2xl"
      >
        <div className="relative flex items-center justify-center bg-black/60 p-3 md:p-5">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[62vh] w-auto max-w-full rounded-lg object-contain"
            referrerPolicy="no-referrer"
          />

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={lang === 'am' ? 'ዝጋ' : 'Close'}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-church-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold"
          >
            <X className="w-5 h-5" />
          </button>

          {index > 0 && (
            <button
              onClick={() => onIndexChange((index - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-church-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {index < photos.length - 1 && (
            <button
              onClick={() => onIndexChange((index + 1) % photos.length)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-church-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <figcaption className="p-5 md:p-7 overflow-y-auto">
          <div className="flex items-center justify-between gap-4">
            <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
              {t.tag}
            </span>
            <span className="text-church-blue/40 dark:text-gray-500 font-sans text-xs tabular-nums">
              {index + 1} / {photos.length}
            </span>
          </div>
          <h3 className="mt-3 font-serif font-bold text-xl md:text-2xl text-church-blue dark:text-church-gold leading-snug">
            {photo.title}
          </h3>
          <div className="mt-3 mb-4 h-px w-12 bg-church-gold" />
          <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-sm md:text-base">
            {photo.description}
          </p>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

export default PhotoLightbox;
