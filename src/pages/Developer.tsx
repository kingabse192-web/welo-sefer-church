import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Code2, Instagram } from 'lucide-react';
import { Language, translations } from '../translations';

interface DeveloperPageProps {
  lang: Language;
}

const DeveloperPage: React.FC<DeveloperPageProps> = ({ lang }) => {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus(lang === 'am' ? 'በመላክ ላይ...' : 'Sending message...');

    try {
      const response = await fetch("https://formsubmit.co/ajax/absalew1234@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Welo Sefer Church Dev Hub - Message from ${formData.name}`,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus(lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ተልኳል!' : 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error("Response is not OK");
      }
    } catch (error) {
      console.warn("AJAX submission failed on Dev page, engaging native form fallback:", error);
      try {
        const fallbackForm = document.createElement("form");
        fallbackForm.method = "POST";
        fallbackForm.action = "https://formsubmit.co/absalew1234@gmail.com";
        fallbackForm.style.display = "none";

        const fields: Record<string, string> = {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Welo Sefer Church Dev Hub - Message from ${formData.name}`,
          _captcha: "false",
          _template: "table"
        };

        for (const [key, value] of Object.entries(fields)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          fallbackForm.appendChild(input);
        }

        document.body.appendChild(fallbackForm);
        fallbackForm.submit();

        setStatus(lang === 'am' ? 'መልእክትዎ በደህንነት እየተላከ ነው...' : 'Submitting message securely...');
        setFormData({ name: '', email: '', message: '' });
      } catch (fallbackError) {
        console.error("Critical fallback failure on Dev page:", fallbackError);
        setStatus(lang === 'am' ? 'መልዕክት መላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።' : 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-church-cream dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-church-gold/10 px-4 py-1 rounded-full text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs mb-6">
            {t.devHub}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-church-blue dark:text-church-gold mb-4">
            {t.devProfile}
          </h1>
          <p className="text-church-blue/60 dark:text-gray-400 max-w-2xl mx-auto font-sans font-light">
            {t.devQuote}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Profile 1: D/N ABSALEW BELAYNEH */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-church-blue/5 border border-church-gold/10 relative overflow-hidden group hover:shadow-church-gold/10 hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-church-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-church-blue/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            <div className="absolute top-4 left-4 text-church-gold/5 text-6xl font-serif font-black select-none pointer-events-none">{"{"}</div>
            <div className="absolute bottom-4 right-4 text-church-gold/5 text-6xl font-serif font-black select-none pointer-events-none">{"}"}</div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-6">
                <div className="relative shrink-0 mb-4 group">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-church-gold shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <img src="developer.jpg" alt="Developer" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-church-gold to-church-gold p-3 rounded-2xl shadow-lg z-20 group-hover:scale-110 transition-all duration-300">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-church-gold/10 rounded-full blur-sm"></div>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-bold text-church-blue dark:text-white mb-1">{t.devTeam}</h2>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-6 h-px bg-church-gold/40"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-church-gold"></span>
                    <span className="w-6 h-px bg-church-gold/40"></span>
                  </div>
                  <p className="text-church-gold font-bold text-xs uppercase tracking-[0.25em]">{t.devRole}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-church-blue/5 to-church-blue/10 dark:from-white/5 dark:to-white/10 p-4 rounded-2xl border border-church-gold/10 hover:border-church-gold/30 transition-all duration-300">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{t.devAge}</p>
                  <p className="text-xl font-bold text-church-gold flex items-center gap-2">
                    {t.devAgeValue}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-church-blue/5 to-church-blue/10 dark:from-white/5 dark:to-white/10 p-4 rounded-2xl border border-church-gold/10 hover:border-church-gold/30 transition-all duration-300">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{t.devExperience}</p>
                  <p className="text-xl font-bold text-church-gold flex items-center gap-2">
                    {t.devExpValue}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-church-gold/10 via-church-gold/5 to-transparent dark:from-church-gold/10 dark:via-church-gold/5 border border-church-gold/20 hover:border-church-gold/40 transition-all duration-300">
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <span className="w-3 h-3 rounded-full bg-church-gold block shadow-lg shadow-church-gold/30"></span>
                    <span className="absolute inset-0 w-3 h-3 rounded-full bg-church-gold animate-ping opacity-30"></span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-serif font-black text-[11px] text-church-blue dark:text-white uppercase tracking-wider leading-snug">
                      {lang === 'am' ? 'በየ7 ቀኑ ይዘት ይዘምናል' : 'Updates every 7 days'}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-church-gold">
                      {lang === 'am' ? 'ዋስትና ንቁ ነው' : 'Guarantee Status: Active'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest">{t.devToolsTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Lucide', 'D3.js', 'Recharts'].map((tool) => (
                    <span key={tool} className="px-2.5 py-1 bg-church-gold/5 text-[10px] font-bold text-church-gold border border-church-gold/20 rounded-lg hover:bg-church-gold hover:text-white transition-all duration-300 cursor-default">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-church-gold/10 text-xs text-church-blue/70 dark:text-gray-400">
                <a href="mailto:absalew1234@gmail.com" className="flex items-center gap-2 hover:text-church-gold transition-colors group">
                  <Mail className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  absalew1234@gmail.com
                </a>
                <div className="flex items-center gap-2 group">
                  <Phone className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  {t.devPhone}
                </div>
                <a href="https://www.instagram.com/pablo_11_2001/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-church-gold transition-colors group">
                  <Instagram className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Profile 2: SEMERGETA BELAYNEH */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-church-blue/5 border border-church-gold/10 relative overflow-hidden group hover:shadow-church-gold/10 hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-48 h-48 bg-church-gold/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:scale-150 transition-all duration-700"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-church-gold/5 rounded-full translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute top-4 right-4 text-church-gold/5 text-6xl font-serif font-black select-none pointer-events-none">&lt;/&gt;</div>
            <div className="absolute bottom-4 left-4 text-church-gold/5 text-6xl font-serif font-black select-none pointer-events-none">&lt;/&gt;</div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-6">
                <div className="relative shrink-0 mb-4 group">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-church-gold shadow-2xl relative z-10 bg-gradient-to-br from-church-gold/10 to-church-gold/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-5xl font-serif font-bold text-church-gold">S</span>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-church-gold to-church-gold p-3 rounded-2xl shadow-lg z-20 group-hover:scale-110 transition-all duration-300">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-church-gold/10 rounded-full blur-sm"></div>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-bold text-church-blue dark:text-white mb-1">
                    {lang === 'am' ? 'ሰመርጌታ በላይነህ' : 'SEMERGETA BELAYNEH'}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-6 h-px bg-church-gold/40"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-church-gold"></span>
                    <span className="w-6 h-px bg-church-gold/40"></span>
                  </div>
                  <p className="text-church-gold font-bold text-xs uppercase tracking-[0.25em]">
                    {lang === 'am' ? 'የድረ-ገጽ ዲዛይነር' : 'Web UI Designer'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-church-blue/5 to-church-blue/10 dark:from-white/5 dark:to-white/10 p-4 rounded-2xl border border-church-gold/10 hover:border-church-gold/30 transition-all duration-300">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{t.devAge}</p>
                  <p className="text-xl font-bold text-church-gold flex items-center gap-2">
                    19 Years
                  </p>
                </div>
                <div className="bg-gradient-to-br from-church-blue/5 to-church-blue/10 dark:from-white/5 dark:to-white/10 p-4 rounded-2xl border border-church-gold/10 hover:border-church-gold/30 transition-all duration-300">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{t.devExperience}</p>
                  <p className="text-xl font-bold text-church-gold flex items-center gap-2">
                    2+ Years
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-transparent via-church-gold/5 to-church-gold/10 dark:from-transparent dark:via-church-gold/5 border border-church-gold/20 hover:border-church-gold/40 transition-all duration-300">
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <span className="w-3 h-3 rounded-full bg-church-gold block shadow-lg shadow-church-gold/30"></span>
                    <span className="absolute inset-0 w-3 h-3 rounded-full bg-church-gold animate-ping opacity-30"></span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-serif font-black text-[11px] text-church-blue dark:text-white uppercase tracking-wider leading-snug">
                      {lang === 'am' ? 'በየ7 ቀኑ ይዘት ይዘምናል' : 'Updates every 7 days'}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-church-gold">
                      {lang === 'am' ? 'ዋስትና ንቁ ነው' : 'Guarantee Status: Active'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest">{t.devToolsTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {['front end developer', 'webui desiner', 'informationgather'].map((tool) => (
                    <span key={tool} className="px-2.5 py-1 bg-church-gold/5 text-[10px] font-bold text-church-gold border border-church-gold/20 rounded-lg hover:bg-church-gold hover:text-white transition-all duration-300 cursor-default">
                      {tool.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-church-gold/10 text-xs text-church-blue/70 dark:text-gray-400">
                <a href="mailto:absalew1234@gmail.com" className="flex items-center gap-2 hover:text-church-gold transition-colors group">
                  <Mail className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  absalew1234@gmail.com
                </a>
                <div className="flex items-center gap-2 group">
                  <Phone className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  {t.devPhone}
                </div>
                <a href="https://www.instagram.com/pablo_11_2001/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-church-gold transition-colors group">
                  <Instagram className="w-3.5 h-3.5 text-church-gold group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-church-blue dark:bg-black rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-church-gold/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-serif font-bold text-church-gold mb-1">{t.sendMessage}</h3>
                <p className="text-white/60 text-xs font-light">{t.devQuote}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.name}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-church-gold/50 outline-none transition-all font-sans text-sm" 
                    placeholder={t.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.email}</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-church-gold/50 outline-none transition-all font-sans text-sm" 
                    placeholder={t.email}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.message}</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-church-gold/50 outline-none transition-all font-sans resize-none text-sm" 
                    placeholder={t.messagePlaceholder}
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-church-gold text-white font-black py-4 rounded-2xl shadow-xl shadow-church-gold/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
                >
                  <span className="uppercase tracking-[0.2em] text-xs">
                    {isSubmitting ? (lang === 'am' ? 'በመላክ ላይ...' : 'Sending...') : t.sendApplication}
                  </span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-church-gold text-center text-xs font-sans italic pt-2"
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
