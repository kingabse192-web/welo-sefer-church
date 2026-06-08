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

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

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
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initial: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      delay: Math.random() * 5,
    }));
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y - p.speed * 0.3,
          x: p.x + Math.sin(Date.now() / 3000 + p.id) * 0.05,
          ...(p.y < -5 ? { y: 105, x: Math.random() * 100 } : {}),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex(prev => (prev + 1) % (galleryImages.length - 1));
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length, isHovering]);

  const handleSelectImage = (image: typeof galleryImages[0] | null) => {
    setSelectedImage(image);
  };

  const images = galleryImages.slice(0, 17);

  const next = () => setCurrentIndex(prev => (prev + 1) % images.length);
  const prev = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

  const getIndex = (offset: number) => (currentIndex + offset + images.length) % images.length;

  return (
    <section id="gallery" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
        <div
          className="relative w-full max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 'min(65vh, 500px)' }}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.92, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -15 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1 }}
                className="absolute inset-0 cursor-pointer"
                style={{ perspective: '1200px' }}
                onClick={() => handleSelectImage(images[currentIndex])}
              >
                <div className="w-full h-full bg-church-blue/10 dark:bg-slate-800 rounded-3xl overflow-hidden">
                  {images[currentIndex].url ? (
                    <img
                      src={images[currentIndex].url}
                      alt={images[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-church-gold/40">
                      <ChevronRight className="w-20 h-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <h4 className="text-white font-serif font-bold text-2xl leading-tight">{images[currentIndex].title}</h4>
                    <p className="text-white/70 text-sm mt-1 max-w-lg">{images[currentIndex].description}</p>
                  </div>
                  <div
                    className="absolute -inset-[2px] rounded-3xl pointer-events-none"
                    style={{
                      border: '1.5px solid rgba(207,181,59,0.3)',
                      boxShadow: '0 0 40px rgba(207,181,59,0.1), inset 0 0 40px rgba(207,181,59,0.03)',
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-church-gold hover:border-church-gold transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-church-gold hover:border-church-gold transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex ? 'bg-church-gold w-7 h-2 shadow-lg shadow-church-gold/30' : 'bg-white/40 hover:bg-white/70 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[getIndex(-2), getIndex(-1), getIndex(0), getIndex(1), getIndex(2)].map((imgIdx) => (
              <button
                key={imgIdx}
                onClick={() => setCurrentIndex(imgIdx)}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  imgIdx === currentIndex
                    ? 'border-church-gold scale-105 shadow-lg shadow-church-gold/20'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
                style={{ width: imgIdx === currentIndex ? '80px' : '60px', height: '50px' }}
              >
                {images[imgIdx]?.url && (
                  <img src={images[imgIdx].url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              background: p.id % 3 === 0
                ? 'rgba(207,181,59,0.6)'
                : p.id % 3 === 1
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(207,181,59,0.2)',
              boxShadow: p.id % 3 === 0
                ? '0 0 6px rgba(207,181,59,0.4)'
                : 'none',
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            }}
            transition={{
              duration: 3 + p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(207,181,59,0.03) 0%, transparent 60%)',
        }}
      />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ perspective: '1200px' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleSelectImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`${currentIndex}-${galleryImages.indexOf(selectedImage)}`}
              initial={{ opacity: 0, scale: 0.85, rotateY: 15, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateY: -15, y: 30 }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
