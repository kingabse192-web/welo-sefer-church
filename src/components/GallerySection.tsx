import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

import { Language, translations } from '../translations';

interface LazyGalleryImageProps {
  image: { url: string; title: string; description: string };
  lang: Language;
}

const LazyGalleryImage: React.FC<LazyGalleryImageProps> = ({ image, lang }) => {
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const imgUrl = image.url;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '150px 0px', threshold: 0.01 }
    );

    const currentElem = elementRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => observer.disconnect();
  }, [imgUrl]);

  return (
    <div 
      ref={elementRef}
      className="relative w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-900/40 min-h-[220px]"
    >
      {inView ? (
        <img 
          src={image.url} 
          alt={image.title} 
          loading="lazy"
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-[220px] aspect-[4/3]" />
      )}
      {inView && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-black/45 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-church-gold tracking-widest mb-1">
              <ZoomIn className="w-3.5 h-3.5" />
              {lang === 'am' ? 'ዝርዝር ለመመልከት ክሊክ ያድርጉ' : 'Click to View'}
            </span>
            <h4 className="text-white font-serif text-lg font-bold leading-tight mt-0.5">{image.title}</h4>
            <p className="text-white/80 font-sans text-xs mt-1 leading-snug line-clamp-2">{image.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface GallerySectionProps {
  lang: Language;
}

const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = translations[lang].gallery;
  const items = t.items;

  const galleryImages = [
    { url: 'galery.PNG', title: items.interior.title, description: items.interior.desc },
    { url: '1galery.PNG', title: items.icons.title, description: items.icons.desc },
    { url: '2galery.PNG', title: items.education.title, description: items.education.desc },
    { url: '3galery.PNG', title: items.procession.title, description: items.procession.desc },
    { url: 'comuniy.jpg', title: items.outreach.title, description: items.outreach.desc },
    { url: '2comuniy.jpg', title: items.youth.title, description: items.youth.desc },
    { url: '3comuniy.jpg', title: items.charity.title, description: items.charity.desc },
    { url: '5galery.PNG', title: items.blessing.title, description: items.blessing.desc },
    { url: 'hosaena galery  (1).jpg', title: items.hosaenaYouth.title, description: items.hosaenaYouth.desc },
    { url: 'hosaena galery  (2).jpg', title: items.hosaenaTeachings.title, description: items.hosaenaTeachings.desc },
    { url: 'hosaena galery  (3).jpg', title: items.hosaenaIcon.title, description: items.hosaenaIcon.desc },
    { url: 'hosaena galery  (4).jpg', title: items.hosaenaPalm.title, description: items.hosaenaPalm.desc },
    { url: 'hosaena.jpg', title: items.hosaenaCelebration.title, description: items.hosaenaCelebration.desc },
    { url: 'speritual time-1.jpg', title: items.spiritualHymns2.title, description: items.spiritualHymns2.desc },
    { url: 'best church person.jpg', title: items.bestChurchPerson.title, description: items.bestChurchPerson.desc },
    { url: 'power of together.jpg', title: items.powerOfTogether.title, description: items.powerOfTogether.desc },
    { url: 'suterday seremony.jpg', title: items.saturdayCeremony.title, description: items.saturdayCeremony.desc },
    { url: '', title: items.moreComing.title, description: items.moreComing.desc, isComingSoon: true },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (galleryImages.length - 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const handleSelectImage = (image: typeof galleryImages[0] | null) => {
    setSelectedImage(image);
  };

  return (
    <section id="gallery" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs mb-4 block transition-colors">{t.tag}</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-church-blue dark:text-church-gold mb-6 transition-colors">
            {t.title}
          </h2>
          <div className="w-24 h-1.5 bg-church-gold mx-auto rounded-full"></div>
        </motion.div>

        {showLoader ? (
          <div className="flex items-center justify-center py-32 min-h-[400px]">
            <div className="loader" />
          </div>
        ) : (
        <div>
          <div className="relative w-full max-w-5xl mx-auto perspective-[1200px]" style={{ height: 'min(70vh, 520px)' }}>
            <button
              onClick={() => setCurrentIndex(prev => (prev - 1 + galleryImages.length - 1) % (galleryImages.length - 1))}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-church-gold hover:border-church-gold transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {galleryImages.slice(0, 17).map((image, i) => {
                const isActive = i === currentIndex;
                const isPrev = i === (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                const isNext = i === (currentIndex + 1) % galleryImages.length;
                const isFarPrev = i === (currentIndex - 2 + galleryImages.length) % galleryImages.length;
                const isFarNext = i === (currentIndex + 2) % galleryImages.length;

                let transform = '';
                let zIndex = 0;
                let opacity = 0;
                let pointerEvents: 'auto' | 'none' = 'none';

                if (isActive) {
                  transform = 'translateZ(120px) scale(1)';
                  zIndex = 10;
                  opacity = 1;
                  pointerEvents = 'auto';
                } else if (isNext) {
                  transform = 'translateX(280px) translateZ(-40px) rotateY(-20deg) scale(0.8)';
                  zIndex = 5;
                  opacity = 0.7;
                } else if (isPrev) {
                  transform = 'translateX(-280px) translateZ(-40px) rotateY(20deg) scale(0.8)';
                  zIndex = 5;
                  opacity = 0.7;
                } else if (isFarNext) {
                  transform = 'translateX(480px) translateZ(-180px) rotateY(-30deg) scale(0.55)';
                  zIndex = 1;
                  opacity = 0.3;
                } else if (isFarPrev) {
                  transform = 'translateX(-480px) translateZ(-180px) rotateY(30deg) scale(0.55)';
                  zIndex = 1;
                  opacity = 0.3;
                } else {
                  transform = 'translateZ(-300px) scale(0.3)';
                  opacity = 0;
                }

                return (
                  <motion.div
                    key={i}
                    animate={{ transform, opacity, zIndex }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1.2 }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      pointerEvents,
                      position: 'absolute',
                      cursor: pointerEvents === 'auto' ? 'pointer' : 'default',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 select-none"
                    onClick={() => {
                      if (isActive) {
                        handleSelectImage(image);
                      } else {
                        setCurrentIndex(i);
                      }
                    }}
                  >
                    <div className="w-[280px] md:w-[320px] aspect-[4/3] bg-church-blue/10 dark:bg-slate-800">
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-church-gold/40">
                          <ChevronRight className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                        <h4 className="text-white font-serif font-bold text-lg leading-tight">{image.title}</h4>
                        <p className="text-white/70 text-xs mt-1 line-clamp-2">{image.description}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % (galleryImages.length - 1))}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-church-gold hover:border-church-gold transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {galleryImages.slice(0, 17).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-church-gold w-6'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-church-gold/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleSelectImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`${currentIndex}-${galleryImages.indexOf(selectedImage)}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => handleSelectImage(null)}
                className="absolute top-4 right-4 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full bg-black flex items-center justify-center p-4 h-[50vh] min-h-[250px] relative">
                {selectedImage.url ? (
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center text-white/20">
                    <ChevronRight className="w-20 h-20" />
                    <p className="font-serif text-xl">Capturing more moments...</p>
                  </div>
                )}
              </div>

              <div className="w-full p-6 md:p-8 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/10 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-church-gold font-sans font-bold tracking-widest uppercase text-xs mb-2 block">
                    {t.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-church-blue dark:text-church-gold mb-3 leading-tight">
                    {selectedImage.title}
                  </h3>
                  <div className="w-12 h-1 bg-church-gold rounded-full mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-base md:text-lg italic">
                    "{selectedImage.description}"
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end">
                  <button 
                    onClick={() => handleSelectImage(null)}
                    className="px-6 py-2.5 bg-church-blue dark:bg-church-gold text-white dark:text-slate-950 font-serif font-bold rounded-xl transition-all hover:opacity-90 shadow-md"
                  >
                    {lang === 'am' ? 'ዝጋ' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
