import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, ShieldCheck, Filter, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

import { Language, translations } from '../translations';

interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  type: string;
  image: string;
  displayType: string;
  displayCategory: string;
  description?: string;
}

interface EventCalendarProps {
  lang: Language;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ lang }) => {
  const t = translations[lang].events;
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateSearch, setDateSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const eventsPerPage = 8;

  // Metadata mapping for the simplified translated list
  const eventMetadata = [
    { type: "Spiritual", image: "curent church.PNG" },
    { type: "Spiritual", image: "new church.jpg" },
    { type: "Spiritual", image: "1galery.PNG" },
    { type: "Spiritual", image: "old church.jpg" },
    { type: "Community", image: "2comuniy.jpg" },
    { type: "Spiritual", image: "2galery.PNG" },
  ];

  const translatedEvents = (t.list || []).map((e, index) => {
    const meta = eventMetadata[index % eventMetadata.length];
    return {
      ...e,
      ...meta,
      displayType: meta.type === 'Spiritual' ? t.spiritual : t.community,
      displayCategory: e.category === 'Regular' ? t.regular : e.category === 'Major Feast' ? t.majorFeast : t.social
    };
  });

  const filteredEvents = translatedEvents.filter(event => {
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
    const matchesDate = !dateSearch || event.date.toLowerCase().includes(dateSearch.toLowerCase());
    return matchesType && matchesCategory && matchesDate;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const types = ['All', 'Spiritual', 'Community'];
  const categories = ['All', 'Regular', 'Major Feast', 'Social'];

  const handleFilterChange = (filterType: 'type' | 'category', value: string) => {
    if (filterType === 'type') setTypeFilter(value);
    else setCategoryFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <section id="events" className="py-24 bg-church-blue dark:bg-black text-white overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-church-gold/5 dark:bg-church-gold/10 rounded-full blur-3xl transition-colors"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-church-gold mb-6 transition-colors">
              {t.title}
            </h2>
            <p className="max-w-xl text-lg text-church-cream/70 dark:text-gray-400 font-sans transition-colors">
              {t.subtitle}
            </p>
            <button
              onClick={() => {
                const lines = [
                  'BEGIN:VCALENDAR',
                  'VERSION:2.0',
                  'PRODID:-//Welo Sefer Church//Events//EN',
                  'CALSCALE:GREGORIAN',
                  'METHOD:PUBLISH',
                ];
                const feastEvents = t.list.filter(e => e.category === 'Major Feast');
                feastEvents.forEach((event, i) => {
                  const now = new Date();
                  const start = new Date(now.getFullYear(), 0, 1);
                  let dtstart = '';
                  const dateLower = event.date.toLowerCase();
                  if (dateLower.includes('ginbot 21')) {
                    dtstart = `${now.getFullYear()}0530`;
                  } else if (dateLower.includes('meskerem 17')) {
                    dtstart = `${now.getFullYear()}0927`;
                  } else if (dateLower.includes('hidar 21')) {
                    dtstart = `${now.getFullYear()}1130`;
                  } else if (dateLower.includes('tahsas')) {
                    dtstart = `${now.getFullYear() + (dateLower.includes('19') ? '' : '')}`;
                    if (dateLower.includes('19')) dtstart = `${now.getFullYear()}1228`;
                    if (dateLower.includes('29')) dtstart = `${now.getFullYear() + 1}0107`;
                  } else if (dateLower.includes('ter 11')) {
                    dtstart = `${now.getFullYear() + 1}0119`;
                  } else if (dateLower.includes('megabit 27')) {
                    dtstart = `${now.getFullYear() + 1}0412`;
                  } else if (dateLower.includes('21st') || dateLower.includes('21 (')) {
                    const m = now.getMonth() + 1;
                    const d = now.getDate() > 21 ? 21 : 21;
                    const mon = now.getDate() > 21 ? (m + 1 > 12 ? 1 : m + 1) : m;
                    const yr = mon === 1 && now.getMonth() + 1 === 12 ? now.getFullYear() + 1 : now.getFullYear();
                    dtstart = `${yr}${String(mon).padStart(2,'0')}21`;
                  }
                  if (!dtstart) return;
                  const dtend = dtstart;
                  const uid = `event-${i}-${dtstart}@weloseferchurch`;
                  const title = event.title.replace(/[,;\\]/g, '\\$&');
                  const desc = (event.description || '').replace(/[,;\\]/g, '\\$&');
                  const loc = event.location.replace(/[,;\\]/g, '\\$&');
                  lines.push('BEGIN:VEVENT');
                  lines.push(`UID:${uid}`);
                  lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
                  lines.push(`DTEND;VALUE=DATE:${dtend}`);
                  lines.push(`SUMMARY:${title}`);
                  lines.push(`DESCRIPTION:${desc}`);
                  lines.push(`LOCATION:${loc}`);
                  lines.push('END:VEVENT');
                });
                lines.push('END:VCALENDAR');
                const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `welo-sefer-feasts.ics`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-church-gold hover:text-white border border-church-gold/30 hover:bg-church-gold px-4 py-2 rounded-full transition-all w-fit"
            >
              <CalendarIcon className="w-4 h-4" />
              {lang === 'am' ? 'በዓላትን አውርድ' : 'Download Calendar'}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 z-10"
          >
            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 flex items-center gap-1">
                <Filter className="w-3 h-3" /> {t.filterType}
              </label>
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange('type', type)}
                    className={`px-4 py-1.5 rounded-md text-xs font-sans transition-all ${
                      typeFilter === type 
                        ? 'bg-church-gold text-white shadow-lg' 
                        : 'hover:bg-white/5 text-white/60'
                    }`}
                  >
                    {type === 'All' ? t.all : type === 'Spiritual' ? t.spiritual : t.community}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Search */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 flex items-center gap-1">
                <Search className="w-3 h-3" /> {t.dateSearch}
              </label>
              <input
                type="text"
                value={dateSearch}
                onChange={(e) => { setDateSearch(e.target.value); setCurrentPage(1); }}
                placeholder={lang === 'am' ? 'ቀን ፈልግ...' : 'Search month...'}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-sans outline-none focus:border-church-gold/50 transition-colors w-28"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 flex items-center gap-1">
                <Filter className="w-3 h-3" /> {t.category}
              </label>
              <select 
                value={categoryFilter}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-xs font-sans outline-none focus:border-church-gold/50 transition-colors appearance-none pr-8 cursor-pointer relative"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23CFB53B\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-church-blue text-white">
                    {cat === 'All' ? t.all : cat === 'Regular' ? t.regular : cat === 'Major Feast' ? t.majorFeast : t.social}
                  </option>
                ))}
              </select>
            </div>

            {(typeFilter !== 'All' || categoryFilter !== 'All') && (
              <button 
                onClick={() => { handleFilterChange('type', 'All'); handleFilterChange('category', 'All'); }}
                className="flex items-center gap-2 text-xs text-church-gold hover:text-white transition-colors mt-auto mb-2"
              >
                <X className="w-3 h-3" /> {t.clearFilters}
              </button>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {currentEvents.map((event) => (
              <motion.div 
                layout
                key={event.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group flex flex-col cursor-pointer hover:border-church-gold/30"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548625361-9a74f402492f?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`p-2 rounded-lg backdrop-blur-md ${event.type === 'Spiritual' ? 'bg-church-gold/20 text-church-gold' : 'bg-blue-400/20 text-blue-400'}`}>
                      {event.type === 'Spiritual' ? <ShieldCheck className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">{event.displayCategory}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-church-gold transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-3 font-sans text-sm text-white/70 flex-1">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-4 h-4 text-church-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-church-gold" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-sans italic opacity-60">{event.location}</span>
                    <button className="text-xs uppercase tracking-wider font-bold text-church-gold hover:underline">
                      {t.details}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-white/40"
            >
              <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-sans italic">{t.noEvents}</p>
            </motion.div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border border-white/10 transition-all ${
                currentPage === 1 
                  ? 'opacity-20 cursor-not-allowed' 
                  : 'hover:bg-church-gold hover:border-church-gold'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                    currentPage === i + 1
                      ? 'bg-church-gold text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border border-white/10 transition-all ${
                currentPage === totalPages 
                  ? 'opacity-20 cursor-not-allowed' 
                  : 'hover:bg-church-gold hover:border-church-gold'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={selectedEvent.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-church-blue dark:bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[95vh]"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-48 md:h-64 overflow-hidden relative shrink-0">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-church-blue via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
                  <span className="inline-block px-3 py-1 bg-church-gold/20 text-church-gold rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 md:mb-4 backdrop-blur-md border border-church-gold/30">
                    {selectedEvent.displayCategory}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-church-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">{t.dateLabel}</p>
                      <p className="font-sans text-sm">{selectedEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Clock className="w-5 h-5 text-church-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">{t.timeLabel}</p>
                      <p className="font-sans text-sm">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Filter className="w-5 h-5 text-church-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">{t.typeLabel}</p>
                      <p className="font-sans text-sm">{selectedEvent.displayType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-church-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">{t.locationLabel}</p>
                      <p className="font-sans text-sm">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-church-gold font-serif text-xs font-bold tracking-wider uppercase mb-3 flex items-center gap-1.5 opacity-90">
                    <span>☦</span> {lang === 'am' ? 'ሙሉ ማብራሪያ' : 'Full Description'}
                  </h4>
                  <div className="max-h-40 md:max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-church-gold/30 hover:scrollbar-thumb-church-gold/50 scrollbar-track-transparent">
                    <p className="text-church-cream/80 leading-relaxed font-sans whitespace-pre-line text-sm md:text-base">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="px-8 py-2.5 bg-church-gold text-white font-bold rounded-xl hover:bg-church-gold/90 transition-all shadow-lg shadow-church-gold/20"
                  >
                    {t.close}
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

export default EventCalendar;

