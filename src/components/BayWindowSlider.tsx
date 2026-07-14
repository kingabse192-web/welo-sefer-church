import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';

interface Props { lang: Language }

const BayWindowSlider: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].gallery;
  const ringRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  const dragging = useRef(false);

  const images = [
    { url: 'galery.PNG', title: t.items.interior.title },
    { url: '1galery.PNG', title: t.items.icons.title },
    { url: '2galery.PNG', title: t.items.education.title },
    { url: '3galery.PNG', title: t.items.procession.title },
    { url: 'comuniy.jpg', title: t.items.outreach.title },
    { url: '2comuniy.jpg', title: t.items.youth.title },
    { url: '3comuniy.jpg', title: t.items.charity.title },
    { url: '5galery.PNG', title: t.items.blessing.title },
    { url: 'hosaena galery  (1).jpg', title: t.items.hosaenaYouth.title },
    { url: 'hosaena galery  (2).jpg', title: t.items.hosaenaTeachings.title },
  ];

  const count = images.length;
  const angleStep = 360 / count;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const getBgPos = (i: number) => {
      const ry = parseFloat(ring.dataset.ry || '0');
      return `${100 - (((((ry - 180) - i * angleStep) % 360 + 540) % 360) - 180) / 360 * 500}px 0px`;
    };

    const update = (clientX: number) => {
      const diff = Math.round(clientX) - xPos.current;
      const ry = parseFloat(ring.dataset.ry || '0') - diff;
      ring.dataset.ry = String(ry);
      ring.style.transform = `rotateY(${ry}deg)`;
      ring.querySelectorAll<HTMLElement>('.bay-img').forEach((img, i) => {
        img.style.backgroundPosition = getBgPos(i);
      });
      xPos.current = Math.round(clientX);
    };

    const onMove = (e: MouseEvent) => { if (dragging.current) update(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) update(e.touches[0].clientX); };
    const onEnd = () => {
      dragging.current = false;
      ring.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchend', onEnd);
    };

    const onStart = (clientX: number) => {
      dragging.current = true;
      xPos.current = Math.round(clientX);
      ring.style.cursor = 'grabbing';
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchend', onEnd);
    };

    const onMouseDown = (e: MouseEvent) => onStart(e.clientX);
    const onTouchStart = (e: TouchEvent) => onStart(e.touches[0].clientX);

    ring.addEventListener('mousedown', onMouseDown);
    ring.addEventListener('touchstart', onTouchStart);
    return () => {
      ring.removeEventListener('mousedown', onMouseDown);
      ring.removeEventListener('touchstart', onTouchStart);
    };
  }, [angleStep]);

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          {t.tag}
        </span>
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-church-gold mb-6">
          {t.title}
        </h2>
        <div className="w-24 h-1.5 bg-church-gold mx-auto rounded-full mb-4" />
        <p className="text-white/50 text-sm font-sans">{t.clickToView}</p>
      </motion.div>

      <div
        className="mx-auto"
        style={{ perspective: '2000px', width: 340, height: 420 }}
      >
        <div
          ref={ringRef}
          data-ry="0"
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            cursor: 'grab',
            transform: 'rotateY(0deg)',
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="bay-img absolute inset-0 rounded-2xl overflow-hidden border-2 border-church-gold/30 shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${i * angleStep}deg) translateZ(420px)`,
                background: `url(${img.url}) center/cover`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-white font-serif font-bold text-lg">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-church-gold animate-pulse">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-white/50 text-xs font-sans tracking-wider uppercase">Drag to rotate</span>
        </div>
      </div>
    </section>
  );
};

export default BayWindowSlider;
