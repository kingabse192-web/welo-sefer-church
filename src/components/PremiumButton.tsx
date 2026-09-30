import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'light';
type Shape = 'pill' | 'soft';

interface PremiumButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: Variant;
  shape?: Shape;
  className?: string;
  fullWidth?: boolean;
  title?: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  shape = 'pill',
  className = '',
  fullWidth = false,
  title,
}) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden font-bold uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-gold focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none ' +
    (shape === 'pill' ? 'rounded-full ' : 'rounded-2xl ') +
    (fullWidth ? 'w-full ' : '') +
    (variant === 'primary'
      ? 'px-7 py-3.5 text-[11px] text-church-blue bg-church-gold shadow-lg shadow-church-gold/25 hover:shadow-church-gold/40 '
      : variant === 'ghost'
      ? 'px-7 py-3.5 text-[11px] text-church-gold border border-church-gold/50 hover:text-church-blue '
      : 'px-7 py-3.5 text-[11px] text-white border border-white/25 hover:text-church-gold ');

  const motionProps = {
    whileHover: disabled ? undefined : { y: -2 },
    whileTap: disabled ? undefined : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 28 },
  };

  const inner = (
    <>
      {variant !== 'primary' && (
        <span
          className={
            'absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ' +
            (variant === 'ghost' ? 'bg-church-gold' : 'bg-church-gold/25')
          }
          aria-hidden="true"
        />
      )}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (to) {
    return (
      <motion.span {...motionProps} className={fullWidth ? 'block' : 'inline-block'}>
        <Link to={to} title={title} className={base}>
          {inner}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.a {...motionProps} href={href} title={title} className={base}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={base + className}
    >
      {inner}
    </motion.button>
  );
};

export default PremiumButton;
