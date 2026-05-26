import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink, Copy, Check } from 'lucide-react';

import { Language, translations } from '../translations';

interface LocationSectionProps {
  lang: Language;
}

const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const t = translations[lang].location;
  const [copied, setCopied] = useState(false);
  const mapLabel = lang === 'am'
    ? 'የወሎ ሰፈር ቅድስት ማርያም እና ቅዱስ ገብርኤል ቤተክርስቲያን'
    : 'Welo Sefer St. Mary & St. Gabriel Church';
  const mapUrl = `https://maps.google.com/maps?q=8.988558,38.773642(${encodeURIComponent(mapLabel)})&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  const googleMapsUrl = `https://maps.google.com/maps?q=8.988558,38.773642`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('8.988558, 38.773642');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = '8.988558, 38.773642';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-amber-600 font-semibold tracking-wider text-sm uppercase">Our Location</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-3 mb-4">
            ወደ እኛ ለመምጣት <br /><span className="text-amber-600">Visit Us</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mb-8">
            Our church community hub is located in the heart of Welo Sefer, Bole sub-city, Addis Ababa. We are easily accessible by public transport and welcome everyone to join our services and community events.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 p-3 rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white text-sm">Address</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.addressValue}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition-colors"
                  >
                    {copied ? (
                      <><Check className="w-3.5 h-3.5" /> Coordinates Copied!</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /> Copy Coordinates</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 p-3 rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white text-sm">Phone</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">+251 (11) 612 3456</p>
              </div>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-xl transition-all active:scale-95"
          >
            Open in Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative"
        >
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={mapLabel}
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
