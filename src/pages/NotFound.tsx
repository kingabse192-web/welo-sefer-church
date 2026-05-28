import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Language } from '../translations';

interface NotFoundProps {
  lang: Language;
}

const NotFound: React.FC<NotFoundProps> = ({ lang }) => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-church-cream dark:bg-slate-950 transition-colors duration-500 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        <div className="w-24 h-24 rounded-full bg-church-gold/10 flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl font-serif font-bold text-church-gold">404</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-church-blue dark:text-church-gold mb-4">
          {lang === 'am' ? 'ገፁ አልተገኘም' : 'Page Not Found'}
        </h1>
        <p className="text-church-blue/60 dark:text-gray-400 text-lg mb-10 font-sans leading-relaxed">
          {lang === 'am'
            ? 'የሚፈልጉት ገፅ የለም ወይም ተወግዷል። ወደ መነሻ ገፅ ይመለሱ።'
            : 'The page you\'re looking for doesn\'t exist or has been moved. Return home and explore from there.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-church-gold text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-church-gold/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
        >
          <Home className="w-5 h-5" />
          {lang === 'am' ? 'ወደ መነሻ ገፅ' : 'Back to Home'}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
