import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Train, Bus, Car } from 'lucide-react';

import { Language, translations } from '../translations';

interface LocationSectionProps {
  lang: Language;
}

const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const t = translations[lang].location;
  const [showMapItem, setShowMapItem] = useState(true);
  const mapLabel = lang === 'am'
    ? 'የወሎ ሰፈር ቅድስት ማርያም እና ቅዱስ ገብርኤል ቤተክርስቲያን'
    : 'Welo Sefer St. Mary & St. Gabriel Church';
  const mapUrl = `https://maps.google.com/maps?q=8.988558,38.773642(${encodeURIComponent(mapLabel)})&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-8"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold text-church-blue dark:text-church-gold mb-4 transition-colors">
                {t.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-sans transition-colors">
                {t.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-church-gold/10 p-3 rounded-full">
                  <MapPin className="text-church-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-church-blue dark:text-gray-200 transition-colors">{t.address}</h4>
                  <p className="text-sm font-sans text-gray-600 dark:text-gray-400 transition-colors">{t.addressValue}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif font-bold text-church-blue dark:text-gray-200 transition-colors">{t.transit}</h4>
                
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 transition-colors">
                  <Train className="w-5 h-5 text-church-blue dark:text-church-gold" />
                  <span className="text-sm font-sans">{t.lightRail}</span>
                </div>

                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 transition-colors">
                  <Bus className="w-5 h-5 text-church-blue dark:text-church-gold" />
                  <span className="text-sm font-sans">{t.bus}</span>
                </div>

                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 transition-colors">
                  <Car className="w-5 h-5 text-church-blue dark:text-church-gold" />
                  <span className="text-sm font-sans">{t.car}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-church-gold/20 relative"
          >
            {showMapItem && (
              <div className="absolute top-4 left-4 md:bottom-4 md:top-auto map-item bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl rounded-xl p-3 flex items-center gap-3 border border-church-gold/30 z-10 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="logo.png" 
                  alt="Welo Sefer" 
                  className="w-10 h-10 object-cover rounded-lg border border-church-gold/20 item-thumbnail" 
                  referrerPolicy="no-referrer"
                />
                <span className="font-serif font-bold text-sm text-church-blue dark:text-church-gold max-w-[180px] truncate">
                  Welo Sefer St. Mary & St.
                </span>
                <button 
                  onClick={() => setShowMapItem(false)}
                  className="close-btn text-gray-400 hover:text-church-gold dark:text-gray-400 dark:hover:text-church-gold text-lg font-bold leading-none p-1 transition-colors"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            )}
            <iframe 
              src={mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={mapLabel}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
