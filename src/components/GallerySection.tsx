import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language, translations } from '../translations';
import { getGalleryPhotos } from '../galleryPhotos';
import PhotoLightbox from './PhotoLightbox';

interface GallerySectionProps {
  lang: Language;
}

const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = translations[lang].gallery;
  const navLabel = translations[lang].nav.gallery;
  const photos = getGalleryPhotos(lang).slice(0, 9);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-28 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs block">
              {t.tag}
            </span>
            <h2 className="mt-3 font-serif font-bold text-3xl md:text-5xl text-church-blue dark:text-church-gold leading-tight">
              {t.title}
            </h2>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 border-b border-church-gold/40 pb-1 text-church-gold text-xs font-bold uppercase tracking-[0.2em] hover:border-church-gold transition-colors"
          >
            {navLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t.clickToView}: ${photo.title}`}
              className={`group relative overflow-hidden rounded-xl border border-church-gold/15 bg-church-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                i === 0
                  ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-square'
                  : 'aspect-square'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4">
                <span className="block font-serif font-semibold text-white leading-snug text-xs md:text-sm drop-shadow">
                  {photo.title}
                </span>
              </span>
            </button>
          ))}
        </motion.div>
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
    </section>
  );
};

export default GallerySection;
