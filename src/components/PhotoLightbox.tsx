import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { Language, translations } from '../translations';
import { Photo } from '../galleryPhotos';

interface PhotoLightboxProps {
  photos: Photo[];
  index: number;
  lang: Language;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photos, index, lang, onClose, onIndexChange }) => {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const swipeRef = useRef<{ startX: number; startY: number; swiped: boolean; panStart?: { x: number; y: number } } | null>(null);
  const pinchRef = useRef<{ base: number; zoom: number } | null>(null);
  const lastTapRef = useRef(0);

  const applyTransform = () => {
    const img = imgRef.current;
    if (!img) return;
    const { x, y } = panRef.current;
    img.style.transform = zoomRef.current === 1
      ? 'translate(0, 0) scale(1)'
      : `translate(${x}px, ${y}px) scale(${zoomRef.current})`;
  };

  const resetTransform = () => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    applyTransform();
  };

  useEffect(() => {
    resetTransform();
    swipeRef.current = null;
    pinchRef.current = null;
  }, [index]);

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
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFsChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, photos.length, onClose, onIndexChange]);

  if (!photo) return null;

  const t = translations[lang].gallery;

  const toggleFullscreen = () => {
    const el = figureRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => undefined);
    else document.exitFullscreen?.().catch(() => undefined);
  };

  const touchDistance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const img = imgRef.current;
    if (!img) return;
    const now = Date.now();

    if (e.touches.length === 2) {
      pinchRef.current = { base: touchDistance(e.touches), zoom: zoomRef.current };
      swipeRef.current = null;
      return;
    }
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (now - lastTapRef.current < 300 && zoomRef.current !== 1) {
        resetTransform();
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;
      const interacting = zoomRef.current > 1;
      swipeRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        swiped: false,
        panStart: interacting ? { ...panRef.current } : undefined,
      };
      if (interacting) img.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const img = imgRef.current;
    if (!img) return;

    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const next = clamp(pinchRef.current.zoom * (touchDistance(e.touches) / pinchRef.current.base), 1, 3);
      if (next !== 1 && zoomRef.current === 1) panRef.current = { x: 0, y: 0 };
      zoomRef.current = next;
      applyTransform();
      return;
    }

    const gesture = swipeRef.current;
    if (!gesture || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const dx = touch.clientX - gesture.startX;
    const dy = touch.clientY - gesture.startY;

    if (zoomRef.current > 1 && gesture.panStart) {
      e.preventDefault();
      const maxX = (zoomRef.current - 1) * (window.innerWidth / 2);
      const maxY = (zoomRef.current - 1) * ((img.clientHeight || window.innerHeight) / 2);
      panRef.current = {
        x: clamp(gesture.panStart.x + dx, -maxX, maxX),
        y: clamp(gesture.panStart.y + dy, -maxY, maxY),
      };
      applyTransform();
      return;
    }

    if (zoomRef.current === 1 && Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.4 && !gesture.swiped) {
      e.preventDefault();
      gesture.swiped = true;
      if (dx < 0) onIndexChange((index + 1) % photos.length);
      else onIndexChange((index - 1 + photos.length) % photos.length);
    }
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
    swipeRef.current = null;
    const img = imgRef.current;
    if (img) {
      img.style.transition = zoomRef.current > 1 ? '' : 'transform 0.2s ease-out';
      if (zoomRef.current === 1) setTimeout(resetTransform, 30);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
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
        ref={figureRef}
        key={index}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-church-gold/20 bg-white dark:bg-church-nightCard shadow-2xl"
      >
        <div
          className="relative flex touch-pan-y select-none items-center justify-center bg-black/60 p-3 md:p-5"
          style={
            photo.lqip
              ? { backgroundImage: `url(${photo.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            ref={imgRef}
            src={photo.url}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            decoding="async"
            draggable={false}
            className="max-h-[62vh] w-auto max-w-full rounded-lg object-contain will-change-transform"
            style={{ transformOrigin: 'center' }}
            referrerPolicy="no-referrer"
          />

          <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-sans text-[11px] font-medium text-white/85 tabular-nums backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={lang === 'am' ? 'ዝጋ' : 'Close'}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-church-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="absolute right-16 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-church-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold"
          >
            {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
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