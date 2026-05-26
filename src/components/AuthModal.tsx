import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldAlert, CheckCircle, Info, Key, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const authTranslations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Full Name',
    noAccount: "Don't have an account? ",
    hasAccount: 'Already have an account? ',
    googleButton: 'Secure Sign in with Google',
    passwordMismatch: 'Passwords do not match',
    errorTitle: 'Authentication Error',
    successTitle: 'Success',
    signInSuccess: 'Logged in successfully!',
    signUpSuccess: 'Account created successfully!',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    namePlaceholder: 'Enter your full name',
    confirmPasswordPlaceholder: 'Re-type your password',
    secureNotice: 'All data is fully encrypted and stored securely using Firebase Authentication services.',
    validationError: 'Please fill in all requested fields correctly.'
  },
  am: {
    signIn: 'መለያ ግባ',
    signUp: 'አዲስ መለያ ፍጠር',
    email: 'የኢሜል አድራሻ',
    password: 'የይለፍ ቃል',
    confirmPassword: 'የይለፍ ቃል አረጋግጥ',
    name: 'ሙሉ ስም',
    noAccount: 'መለያ የለዎትም? ',
    hasAccount: 'ከዚህ በፊት መለያ መግቢያ አሎት? ',
    googleButton: 'በጉግል መለያዎ ደህንነቱ በተጠበቀ ሁኔታ ይግቡ',
    passwordMismatch: 'የይለፍ ቃሎች አይዛመዱም',
    errorTitle: 'የማረጋገጫ ስህተት',
    successTitle: 'ስኬታማ',
    signInSuccess: 'መለያዎ በስኬት ተከፍቷል!',
    signUpSuccess: 'አዲስ መለያ በስኬት ተፈጥሯል!',
    emailPlaceholder: 'ኢሜልዎን ያስገቡ',
    passwordPlaceholder: 'የይለፍ ቃልዎን ያስገቡ',
    namePlaceholder: 'ሙሉ ስምዎን ያስገቡ',
    confirmPasswordPlaceholder: 'የይለፍ ቃልዎን እንደገና ያስገቡ',
    secureNotice: 'ሁሉም መረጃዎች በፋየርቤዝ (Firebase) የደህንነት ስርዓት ሙሉ በሙሉ የተመሰጠሩ እና የተጠበቁ ናቸው።',
    validationError: 'እባክዎ ሁሉንም መስኮች በትክክል ይሙሉ::'
  }
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const t = authTranslations[lang];

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate inputs
    if (!email || !password || (isSignUp && (!name || !confirmPassword))) {
      setError(t.validationError);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    try {
      if (isSignUp) {
        await signupWithEmail(email, password, name);
        setSuccess(t.signUpSuccess);
      } else {
        await loginWithEmail(email, password);
        setSuccess(t.signInSuccess);
      }
      
      setTimeout(() => {
        onClose();
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setSuccess(null);
      }, 1500);

    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { code?: string; message: string };
      let errMsg = errorObj.message;
      if (errorObj.code === 'auth/wrong-password' || errorObj.code === 'auth/email-already-in-use') {
        errMsg = lang === 'am' ? 'ይህ ኢሜል ቀደም ሲል ተመዝግቧል ወይም የተሳሳተ የይለፍ ቃል ተጠቅመዋል።' : 'Email is already in use or configuration password is wrong.';
      } else if (errorObj.code === 'auth/invalid-credential') {
        errMsg = lang === 'am' ? 'የተሳሳተ የኢሜይል ወይም የይለፍ ቃል ያስገቡት። እንደገና ይሞክሩ።' : 'Invalid email or password credentials. Please double check.';
      } else if (errorObj.code === 'auth/weak-password') {
        errMsg = lang === 'am' ? 'ደካማ የይለፍ ቃል። ቢያንስ 6 ቁምፊዎች/ፊደላት ይጠቀሙ።' : 'Weak password. Use at least 6 characters.';
      } else if (errorObj.code === 'auth/invalid-email') {
        errMsg = lang === 'am' ? 'ልክ ያልሆነ የኢሜል አድራሻ ያስገቡት::' : 'Incorrect or invalid email address.';
      } else if (errorObj.code === 'auth/configuration-not-found') {
        errMsg = lang === 'am' ? 'የኢሜል መለያ አገልግሎት አልነቃም:: እባክዎ በጉግል (Google) ይግቡ::' : 'Email provider is not enabled. Please sign in with Google directly.';
      }
      setError(errMsg);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    try {
      await loginWithGoogle();
      setSuccess(t.signInSuccess);
      
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { message: string };
      setError(errorObj.message || 'Google sign-in was interrupted. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal body */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg bg-church-cream dark:bg-slate-950 border border-church-gold/35 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col p-6 md:p-8"
        >
          {/* Top close button */}
          <button
            onClick={onClose}
            
            className="absolute top-4 right-4 p-2 text-church-blue/50 dark:text-gray-400/50 hover:text-church-gold hover:bg-church-gold/10 rounded-full transition-all cursor-pointer disabled:opacity-50"
            aria-label="Close auth modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6 mt-2">
            <div className="mx-auto w-12 h-12 bg-church-gold/10 rounded-full flex items-center justify-center text-church-gold border border-church-gold/20 mb-3">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-church-blue dark:text-church-gold tracking-tight">
              {isSignUp ? t.signUp : t.signIn}
            </h3>
            <p className="text-xs text-church-blue/60 dark:text-gray-400 mt-1 uppercase tracking-wider font-semibold">
              Welo Sefer St. Mary & St. Gabriel
            </p>
          </div>

          {/* Status alerts */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-2xl border border-red-500/25 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs flex gap-3 items-start"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <strong className="font-bold">{t.errorTitle}: </strong>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-2xl border border-emerald-500/25 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs flex gap-3 items-start"
            >
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500 animate-ping" />
              <div>
                <strong className="font-bold">{t.successTitle}: </strong>
                <span>{success}</span>
              </div>
            </motion.div>
          )}

          {/* Core Auth Forms */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="block text-xs font-bold text-church-blue/70 dark:text-gray-300 uppercase tracking-widest pl-1">
                  {t.name}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-church-blue/40 dark:text-gray-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-white dark:bg-slate-900 border border-church-gold/20 dark:border-church-gold/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-church-blue dark:text-white outline-none focus:border-church-gold/70 focus:ring-1 focus:ring-church-gold/35 dark:focus:ring-church-gold/20 transition-all font-sans"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-church-blue/70 dark:text-gray-300 uppercase tracking-widest pl-1">
                {t.email}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-church-blue/40 dark:text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-white dark:bg-slate-900 border border-church-gold/20 dark:border-church-gold/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-church-blue dark:text-white outline-none focus:border-church-gold/70 focus:ring-1 focus:ring-church-gold/35 dark:focus:ring-church-gold/20 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-church-blue/70 dark:text-gray-300 uppercase tracking-widest pl-1">
                {t.password}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-church-blue/40 dark:text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-white dark:bg-slate-900 border border-church-gold/20 dark:border-church-gold/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-church-blue dark:text-white outline-none focus:border-church-gold/70 focus:ring-1 focus:ring-church-gold/35 dark:focus:ring-church-gold/20 transition-all font-sans"
                />
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="block text-xs font-bold text-church-blue/70 dark:text-gray-300 uppercase tracking-widest pl-1">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-church-blue/40 dark:text-gray-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full bg-white dark:bg-slate-900 border border-church-gold/20 dark:border-church-gold/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-church-blue dark:text-white outline-none focus:border-church-gold/70 focus:ring-1 focus:ring-church-gold/35 dark:focus:ring-church-gold/20 transition-all font-sans"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-church-gold text-white font-serif py-3.5 rounded-2xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-church-gold/20 hover:bg-church-gold/90 transition-all active:scale-95 cursor-pointer text-center mt-6"
            >
              {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>{isSignUp ? t.signUp : t.signIn}</span>
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="relative my-6 flex items-center justify-center balance">
            <div className="absolute inset-0 w-full border-t border-church-gold/20 dark:border-church-gold/10"></div>
            <span className="relative bg-church-cream dark:bg-slate-950 px-4 text-[10px] uppercase font-bold tracking-widest text-church-blue/50 dark:text-gray-500">
              {lang === 'am' ? 'ወይም' : 'Or secure connection'}
            </span>
          </div>

          {/* Google SSO Login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white dark:bg-slate-900 border border-church-gold/30 hover:bg-church-gold/5 dark:hover:bg-church-gold/5 dark:border-church-gold/15 text-church-blue dark:text-white font-sans py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.77-.07-1.54-.2-2.27H12v4.51h6.6c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.68-5.17 3.68-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-5.01H1.32v3.1A11.996 11.996 0 0012 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.24 14.24a7.16 7.16 0 010-4.48v-3.1H1.32a11.996 11.996 0 000 10.68l3.92-3.1z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.34 0 3.32 2.67 1.32 6.56l3.92 3.1c.95-2.88 3.61-5.01 6.76-5.01z"
              />
            </svg>
            <span>{t.googleButton}</span>
          </button>

          {/* Toggle form link */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccess(null);
              }}
              
              className="text-xs text-church-blue/60 dark:text-gray-400 hover:text-church-gold dark:hover:text-church-gold transition-colors font-medium decoration-dotted decoration-church-gold underline underline-offset-4 cursor-pointer"
            >
              <span>{isSignUp ? t.hasAccount : t.noAccount}</span>
              <strong className="text-church-gold select-none font-bold">
                {isSignUp ? t.signIn : t.signUp}
              </strong>
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 border-t border-church-gold/10 pt-4 flex gap-2.5 items-start text-[10px] text-church-blue/45 dark:text-gray-500 leading-normal font-sans">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-church-gold/60" />
            <p className="balance">{t.secureNotice}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
