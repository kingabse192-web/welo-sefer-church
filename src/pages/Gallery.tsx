import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Language, translations } from '../translations';
import { getGalleryPhotos } from '../galleryPhotos';
import PhotoLightbox from '../components/PhotoLightbox';

interface GalleryPageProps {
  lang: Language;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ lang }) => {
  const t = translations[lang].gallery;
  const photos = getGalleryPhotos(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-28 pb-24 bg-church-cream dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs">
            {t.tag}
          </span>
          <h1 className="mt-4 font-serif font-bold text-4xl md:text-5xl text-church-blue dark:text-church-gold leading-tight">
            {t.title}
          </h1>
          <div className="mt-5 h-px w-full bg-church-gold/30" />
          <p className="mt-4 text-sm text-church-blue/60 dark:text-gray-400 font-sans">
            {t.clickToView}
          </p>
        </motion.header>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t.clickToView}: ${photo.title}`}
              className="group relative mb-3 md:mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-church-gold/15 bg-white dark:bg-slate-900 text-left shadow-sm transition-shadow hover:shadow-lg hover:shadow-church-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4">
                <span className="block font-serif text-sm md:text-base font-semibold text-white leading-snug drop-shadow">
                  {photo.title}
                </span>
              </span>
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Search className="w-4 h-4" />
              </span>
            </button>
          ))}

          <div className="mb-3 md:mb-4 break-inside-avoid rounded-xl border border-dashed border-church-gold/40 bg-church-gold/5 dark:bg-church-gold/10 p-5 md:p-6">
            <Sparkles className="w-5 h-5 text-church-gold mb-3" />
            <p className="font-serif font-bold text-base text-church-blue dark:text-church-gold leading-snug">
              {t.items.moreComing.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-church-blue/60 dark:text-gray-400">
              {t.items.moreComing.desc}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <PhotoLightbox
            photos={photos}
            index={openIndex}
            lang={lang}
            onClose={() => setOpenIndex(null)}
            onIndexChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
