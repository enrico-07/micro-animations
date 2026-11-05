import React, { useState } from 'react';

interface MicroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

/**
 * MicroInput enforces:
 * - Rule 21: Horizontal 3-cycle damped error shake on invalid input
 * - Subtle border transitions with cubic-bezier ease-out
 */
export const MicroInput: React.FC<MicroInputProps> = ({
  label,
  errorMessage,
  className = '',
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  // Trigger error shake on invalid state
  const triggerError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 260);
  };

  return (
    <div className="w-full max-w-xs space-y-1">
      {label && (
        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-3 py-2 rounded-lg border text-sm outline-none
          transition-colors duration-150 ease-out
          border-neutral-300 dark:border-neutral-700
          focus:border-blue-500 dark:focus:border-blue-400
          ${isError ? 'animate-[micro-shake_240ms_ease-in-out] border-red-500 dark:border-red-400' : ''}
          ${className}
        `}
      />
      {errorMessage && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
