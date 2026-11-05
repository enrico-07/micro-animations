import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * MicroNumberTicker enforces:
 * - Rule 23: Odometer roll for changing values
 * - Ultra-smooth deceleration curve (cubic-bezier(0.16, 1, 0.3, 1))
 */
export const MicroNumberTicker: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value,
  prefix = '',
  suffix = ''
}) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <span className="inline-flex items-center font-mono font-semibold text-lg tracking-tight">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};
