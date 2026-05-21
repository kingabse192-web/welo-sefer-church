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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-church-blue/5 border border-church-gold/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-church-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-church-gold shadow-2xl relative z-10">
                    <img src="/developer.jpg" alt="Developer" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-church-blue dark:bg-church-gold p-4 rounded-2xl shadow-lg z-20">
                    <Code2 className="w-6 h-6 text-church-gold dark:text-church-blue" />
                  </div>
                </div>
                
                <div className="text-center md:text-left pt-4">
                  <h2 className="text-3xl font-serif font-bold text-church-blue dark:text-white mb-2">{t.devTeam}</h2>
                  <p className="text-church-gold font-bold text-sm underline decoration-church-gold/30 underline-offset-8 uppercase tracking-widest">{t.devRole}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-church-blue/5 dark:bg-white/5 p-6 rounded-3xl border border-church-gold/10">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.devAge}</p>
                  <p className="text-2xl font-bold text-church-blue dark:text-gray-100">{t.devAgeValue}</p>
                </div>
                <div className="bg-church-blue/5 dark:bg-white/5 p-6 rounded-3xl border border-church-gold/10">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">{t.devExperience}</p>
                  <p className="text-2xl font-bold text-church-blue dark:text-gray-100">{t.devExpValue}</p>
                </div>
              </div>

              {/* Robust Highlight 7-Day Update Guarantee Alert */}
              <div className="mb-10 p-6 rounded-3xl border-2 border-dashed border-church-gold bg-church-gold/10 dark:bg-church-gold/5 shadow-[0_4px_24px_rgba(212,175,55,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-church-gold/15 rounded-full blur-xl group-hover:scale-125 transition-all"></div>
                <div className="relative z-10 flex gap-4 items-center">
                  <span className="w-3 h-3 rounded-full bg-church-gold animate-ping shrink-0" />
                  <div className="space-y-1">
                    <p className="font-serif font-black text-xs md:text-sm text-church-blue dark:text-white uppercase tracking-wider leading-snug">
                      {lang === 'am' ? (
                        <>እኔ አብሳለው በላይነህ በየ7 ቀኑ ይህንን ድረ-ገጽ አዘምነዋለሁ — ወቅታዊ ይሁኑ!</>
                      ) : (
                        <>I ABSALEW BELAYNEH, will update this website every 7 days — stay updated.</>
                      )}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-church-gold/80">
                      {lang === 'am' ? 'ባለቤት እና አልሚ ዋስትና' : 'Developer Guarantee Status: Active'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-4 tracking-widest">{t.devToolsTitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Lucide', 'D3.js', 'Recharts'].map((tool) => (
                      <span key={tool} className="px-3 py-1.5 bg-church-gold/5 text-[11px] font-bold text-church-gold border border-church-gold/20 rounded-lg hover:bg-church-gold/20 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pt-6 border-t border-church-gold/10">
                  <a href="mailto:absalew1234@gmail.com" className="flex items-center gap-3 text-sm text-church-blue/70 dark:text-gray-400 hover:text-church-gold transition-colors">
                    <Mail className="w-4 h-4 text-church-gold" />
                    absalew1234@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-sm text-church-blue/70 dark:text-gray-400">
                    <Phone className="w-4 h-4 text-church-gold" />
                    {t.devPhone}
                  </div>
                  <a href="https://www.instagram.com/pablo_11_2001/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-church-blue/70 dark:text-gray-400 hover:text-church-gold transition-colors">
                    <Instagram className="w-4 h-4 text-church-gold" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Message Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-church-blue dark:bg-black rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-church-gold/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold text-church-gold mb-2">{t.sendMessage}</h3>
                <p className="text-white/60 text-sm font-light">{t.devQuote}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.name}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all font-sans" 
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all font-sans" 
                      placeholder={t.email}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.message}</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 focus:ring-1 focus:ring-church-gold/50 outline-none transition-all font-sans resize-none" 
                    placeholder={t.messagePlaceholder}
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-church-gold text-white font-black py-5 rounded-2xl shadow-xl shadow-church-gold/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:hover:scale-100 transition-all flex items-center justify-center gap-3 group"
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
                    className="text-church-gold text-center text-sm font-sans italic pt-4"
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
