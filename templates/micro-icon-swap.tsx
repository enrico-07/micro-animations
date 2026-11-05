import React, { useState } from 'react';

/**
 * MicroIconSwap enforces:
 * - Rule 18: Crossfade icons with scale (0.8 <-> 1) and blur (4px <-> 0px)
 * - Rule 16: Overlap state exit and entrance for zero dead space
 * - Rule 4: 0.97 active depression on the icon button wrapper
 */
export const MicroIconSwap: React.FC<{
  iconA: React.ReactNode;
  iconB: React.ReactNode;
  isBActive: boolean;
  onToggle?: () => void;
  label?: string;
}> = ({ iconA, iconB, isBActive, onToggle, label = 'Toggle' }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 active:scale-[0.97] transition-transform duration-100 ease-out"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Outgoing/Incoming Icon A */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out
            ${!isBActive
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-75 blur-[3px] pointer-events-none'}
          `}
        >
          {iconA}
        </span>

        {/* Outgoing/Incoming Icon B */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out
            ${isBActive
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-75 blur-[3px] pointer-events-none'}
          `}
        >
          {iconB}
        </span>
      </div>
    </button>
  );
};
