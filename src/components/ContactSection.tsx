import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Landmark, Copy, Check, AlertTriangle } from 'lucide-react';
import { Language, translations } from '../translations';

interface ContactSectionProps {
  lang: Language;
}

const confirmTranslations = {
  en: {
    confirmTitle: "Confirm Message Submission",
    confirmQuestion: "Are you sure you want to send this message?",
    cancelBtn: "Cancel",
    confirmBtn: "Yes, Send",
    nameLabel: "Name:",
    emailLabel: "Email:",
    messageLabel: "Message:"
  },
  am: {
    confirmTitle: "መልእክት መላክዎን ያረጋግጡ",
    confirmQuestion: "ይህን መልእክት ለመላክ እርግጠኛ ነዎት?",
    cancelBtn: "ተመለስ",
    confirmBtn: "አዎ፣ ላክ",
    nameLabel: "ስም:",
    emailLabel: "ኢሜይል:",
    messageLabel: "መልእክት:"
  }
};

const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang].contact;
  const ct = confirmTranslations[lang];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const copyToClipboard = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const executeSubmit = async () => {
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
          _subject: `Welo Sefer Church Contact - Message from ${formData.name}`,
          _captcha: "false",
          _template: "table"
        })
      });

      if (response.ok) {
        setStatus(lang === 'am' ? 'መልእክትዎ በተሳካ ሁኔታ ተልኳል!' : 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error("Failed to send form via API");
      }
    } catch (error) {
      console.warn("AJAX submission failed, engaging native form fallback:", error);
      
      try {
        // Create an automated form submission fallback to guarantee delivery bypassing CORS/Adblockers
        const fallbackForm = document.createElement("form");
        fallbackForm.method = "POST";
        fallbackForm.action = "https://formsubmit.co/absalew1234@gmail.com";
        fallbackForm.style.display = "none";

        const fields: Record<string, string> = {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Welo Sefer Church Contact - Message from ${formData.name}`,
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
        console.error("Critical fallback failure:", fallbackError);
        setStatus(lang === 'am' ? 'መልዕክት መላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።' : 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };


  return (
    <section id="contact" className="py-24 bg-church-cream dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white dark:bg-white/10 px-4 py-1 rounded-full text-church-gold font-sans font-bold tracking-[0.3em] uppercase text-xs mb-6 transition-colors">{t.tag}</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-church-blue dark:text-church-gold mb-6 transition-colors">
            {t.title}
          </h2>
          <div className="w-24 h-1.5 bg-church-gold mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          {/* Contact Info & Donations */}
          <div className="md:col-span-2 space-y-10 order-2 md:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-church-blue dark:text-church-gold uppercase tracking-widest text-sm border-b border-church-gold/20 pb-2">
                {t.contactInfo}
              </h3>
              <p className="text-church-blue/60 dark:text-gray-400 text-sm leading-relaxed">
                Rooted in truth, living in community. Get to know the people and the history behind our church.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@weloseferchurch.org' },
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+251 (11) 612 3456' },
                { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: translations[lang].location.addressValue }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-church-blue dark:bg-slate-800 rounded-2xl flex items-center justify-center text-church-gold group-hover:bg-church-gold group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{item.label}</p>
                    <p className="text-church-blue dark:text-gray-200 font-medium text-sm break-words">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Donation / Banks Info */}
            <div className="pt-8 border-t border-church-gold/20 space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-church-blue dark:text-church-gold uppercase tracking-wider border-b border-church-gold/20 pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-church-gold" />
                  {(t as Record<string, string>).donationTitle || 'Support Our Church'}
                </h3>
              </div>
              <div className="space-y-5">
                {/* Bank 1 - CBE */}
                <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border-2 border-purple-100 dark:border-purple-900/40 shadow-md flex flex-col justify-between gap-4 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-sm shadow-purple-600/50"></div>
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-widest font-sans">
                        {(t as Record<string, string>).cbeTitle || 'Commercial Bank of Ethiopia'}
                      </span>
                    </div>
                    <span className="text-2xl md:text-3xl font-mono font-bold text-church-blue dark:text-white tracking-wider block selection:bg-church-gold selection:text-white mt-1">
                      1000562244167
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('1000562244167', 'cbe')}
                    className="relative z-10 self-end flex items-center gap-2 px-4 py-2 bg-purple-500/10 dark:bg-purple-500/20 hover:bg-church-gold hover:text-white dark:hover:bg-church-gold text-purple-700 dark:text-purple-300 text-xs font-serif font-bold rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    {copiedBank === 'cbe' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                        <span className="text-emerald-600 dark:text-emerald-400 group-hover:text-white">{lang === 'am' ? 'ተገልብጧል' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'am' ? 'የአካውንት ቁጥር ገልብጥ' : 'Copy Account Number'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bank 2 - Abay */}
                <div className="p-6 bg-white dark:bg-slate-800/80 rounded-2xl border-2 border-amber-100 dark:border-amber-900/40 shadow-md flex flex-col justify-between gap-4 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></div>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest font-sans">
                        {(t as Record<string, string>).abayTitle || 'Abay Bank'}
                      </span>
                    </div>
                    <span className="text-2xl md:text-3xl font-mono font-bold text-church-blue dark:text-white tracking-wider block selection:bg-church-gold selection:text-white mt-1">
                      1722119984318015
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('1722119984318015', 'abay')}
                    className="relative z-10 self-end flex items-center gap-2 px-4 py-2 bg-amber-500/10 dark:bg-amber-500/20 hover:bg-church-gold hover:text-white dark:hover:bg-church-gold text-amber-700 dark:text-amber-300 text-xs font-serif font-bold rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    {copiedBank === 'abay' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                        <span className="text-emerald-600 dark:text-emerald-400 group-hover:text-white">{lang === 'am' ? 'ተገልብጧል' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'am' ? 'የአካውንት ቁጥር ገልብጥ' : 'Copy Account Number'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-3 bg-church-blue dark:bg-black p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden order-1 md:order-2 self-stretch flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-church-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <form onSubmit={handleFormSubmit} className="relative z-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.name}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 outline-none transition-all font-sans" 
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.email}</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 outline-none transition-all font-sans" 
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-church-gold uppercase tracking-[0.2em] ml-1">{t.message}</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-church-gold/50 outline-none transition-all font-sans resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-church-gold text-white font-black py-4 rounded-2xl shadow-xl shadow-black/20 hover:bg-church-gold/90 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-church-gold transition-all flex items-center justify-center gap-3 group"
              >
                <span className="uppercase tracking-widest text-xs">
                  {isSubmitting ? (lang === 'am' ? 'በመላክ ላይ...' : 'Sending...') : t.send}
                </span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {status && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-church-gold text-center text-sm font-sans italic"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setShowConfirmModal(false)}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-slate-900 border border-church-gold/30 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden flex flex-col"
            >
              {/* Gold light burst in the back */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-church-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

              {/* Header Icon */}
              <div className="mx-auto w-14 h-14 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold border border-church-gold/20 mb-6 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7" />
              </div>

              {/* Modal Title */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white text-center mb-2">
                {ct.confirmTitle}
              </h3>
              <p className="text-sm text-gray-300 text-center mb-6">
                {ct.confirmQuestion}
              </p>

              {/* Message Summary Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 text-left max-h-[220px] overflow-y-auto mb-8 font-sans">
                <div className="flex flex-col gap-0.5 border-b border-white/5 pb-2">
                  <span className="text-[10px] uppercase font-bold text-church-gold/70 tracking-wider">
                    {ct.nameLabel}
                  </span>
                  <span className="text-sm text-white font-medium">
                    {formData.name}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 border-b border-white/5 pb-2">
                  <span className="text-[10px] uppercase font-bold text-church-gold/70 tracking-wider">
                    {ct.emailLabel}
                  </span>
                  <span className="text-sm text-white font-medium break-all">
                    {formData.email}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-church-gold/70 tracking-wider">
                    {ct.messageLabel}
                  </span>
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {formData.message}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-serif font-semibold py-3.5 rounded-xl border border-white/10 transition-all text-xs uppercase tracking-widest active:scale-95 cursor-pointer"
                >
                  {ct.cancelBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmModal(false);
                    executeSubmit();
                  }}
                  className="w-full bg-church-gold hover:bg-church-gold/90 text-white font-serif font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-church-gold/20 text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{ct.confirmBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
