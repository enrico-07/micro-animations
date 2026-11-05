import React, { useState } from 'react';

interface MicroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  onSuccess?: () => void;
  children: React.ReactNode;
}

/**
 * MicroButton enforces:
 * - Rule 4: Scale to 0.97 on press (active:scale-[0.97])
 * - Rule 8: Subtle pulse confirmation on success action
 * - High-speed tactile transition (100ms) with zero sluggishness
 */
export const MicroButton: React.FC<MicroButtonProps> = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  const [pulsing, setPulsing] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger subtle success pulse
    setPulsing(true);
    setTimeout(() => setPulsing(false), 300);
    onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center font-medium
        px-4 py-2 rounded-lg transition-transform duration-100 ease-out select-none
        active:scale-[0.97]
        ${pulsing ? 'animate-[micro-pulse_300ms_ease-out]' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// Vanilla CSS / Tailwind keyframes definition:
// @keyframes micro-pulse {
//   0% { transform: scale(0.97); }
//   50% { transform: scale(1.04); }
//   100% { transform: scale(1); }
// }
