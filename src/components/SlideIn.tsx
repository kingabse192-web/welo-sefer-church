import React from 'react';
import { motion } from 'framer-motion';

export type SlideDirection = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: React.ReactNode;
  direction?: SlideDirection;
  delay?: number;
  distance?: number;
  className?: string;
}

const OFFSETS: Record<SlideDirection, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, 1],
  down: [0, -1],
};

const SlideIn: React.FC<SlideInProps> = ({ children, direction = 'up', delay = 0, distance = 1, className = '' }) => {
  const [dx, dy] = OFFSETS[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dx * 56 * distance, y: dy * 48 * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
