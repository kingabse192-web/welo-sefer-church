import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../translations';

interface Props { lang: Language }

const ParallaxHero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].hero;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollY(progress);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const skyOffset = scrollY * -200;
  const cloud1Offset = scrollY * -600;
  const cloud2Offset = scrollY * -300;
  const cloud3Offset = scrollY * -450;
  const mtBgOffset = scrollY * -80;
  const mtMgOffset = scrollY * -180;
  const mtFgOffset = scrollY * -400;
  const textOffset = scrollY * -120;
  const textOpacity = Math.max(0, 1 - scrollY * 3);
  const furtherOpacity = Math.min(1, Math.max(0, (scrollY - 0.3) * 3));

  return (
    <div ref={containerRef} style={{ height: '250vh', position: 'relative' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#111b29]">
        <div className="relative w-full max-w-[1200px] h-full mx-auto">
          {/* Sky */}
          <div
            className="absolute w-full"
            style={{
              top: skyOffset,
              height: '120%',
              background: 'linear-gradient(180deg, #0a1628 0%, #1a3a5c 30%, #2d5a7b 50%, #e8a87c 75%, #f4c89a 100%)',
            }}
          />

          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateY(${skyOffset * 0.3}px)` }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${(i * 37 + 13) % 100}%`,
                  top: `${(i * 23 + 7) % 60}%`,
                  opacity: 0.3 + Math.random() * 0.5,
                }}
              />
            ))}
          </div>

          {/* Cloud 3 (far back) */}
          <div
            className="absolute w-full opacity-30"
            style={{
              top: 200 + cloud3Offset,
              height: 200,
              background: 'radial-gradient(ellipse 300px 80px at 70% 50%, rgba(200,200,220,0.4), transparent)',
            }}
          />

          {/* Cloud 2 */}
          <div
            className="absolute w-full opacity-40"
            style={{
              top: 150 + cloud2Offset,
              height: 200,
              background: 'radial-gradient(ellipse 400px 100px at 30% 50%, rgba(180,190,210,0.5), transparent)',
            }}
          />

          {/* Mountain Background */}
          <div
            className="absolute w-full"
            style={{ bottom: mtBgOffset - 50, height: 500 }}
          >
            <svg viewBox="0 0 1200 500" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0 500 L0 350 Q150 180 300 280 Q450 150 600 250 Q750 100 900 220 Q1050 160 1200 300 L1200 500 Z"
                fill="#1a2a4a"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Mountain Mid */}
          <div
            className="absolute w-full"
            style={{ bottom: mtMgOffset - 30, height: 450 }}
          >
            <svg viewBox="0 0 1200 450" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0 450 L0 320 Q100 200 250 280 Q400 120 550 240 Q700 80 850 200 Q1000 140 1100 230 L1200 260 L1200 450 Z"
                fill="#0f1f3a"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* Cloud 1 */}
          <div
            className="absolute w-full opacity-50"
            style={{
              top: 350 + cloud1Offset,
              height: 200,
              background: 'radial-gradient(ellipse 500px 120px at 50% 50%, rgba(160,170,200,0.6), transparent)',
            }}
          />

          {/* Mountain Foreground */}
          <div
            className="absolute w-full"
            style={{ bottom: mtFgOffset - 10, height: 400 }}
          >
            <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0 400 L0 300 Q120 180 280 260 Q440 100 600 220 Q760 60 920 180 Q1080 120 1200 240 L1200 400 Z"
                fill="#0a1428"
              />
            </svg>
          </div>

          {/* Cross silhouette on foreground mountain */}
          <div
            className="absolute"
            style={{ bottom: mtFgOffset + 60, left: '50%', transform: 'translateX(-50%)' }}
          >
            <svg width="40" height="80" viewBox="0 0 40 80" className="opacity-60">
              <rect x="17" y="0" width="6" height="80" fill="#CFB53B" />
              <rect x="5" y="18" width="30" height="6" fill="#CFB53B" />
            </svg>
          </div>

          {/* Text Overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ opacity: textOpacity, transform: `translateY(${textOffset}px)` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-tight text-center hero-title">
                <span className="text-church-gold italic block md:inline">{t.strength}</span> {t.inFaith}
                <br />
                <span className="block md:inline">{t.peace} {t.inPrayer}</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-sans font-light leading-relaxed mt-8 text-center">
                {t.subtitle}
              </p>
            </motion.div>
          </div>

          {/* "EXPLORE" text that fades in */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ opacity: furtherOpacity }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-black text-church-gold/90 text-center tracking-wider">
              EXPLORE
            </h2>
            <div className="mt-4 animate-bounce">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-church-gold">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
