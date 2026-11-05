import React, { useState } from 'react';

/**
 * MicroSwitch enforces:
 * - Rule 5: Stretch moving knobs by 12% along the velocity vector during transition
 * - Rule 13: Critically damped physics (clean snap without distracting bounce)
 * - Rule 4: Tactile track feedback
 */
export const MicroSwitch: React.FC<{ checked?: boolean; onChange?: (val: boolean) => void }> = ({
  checked = false,
  onChange
}) => {
  const [isOn, setIsOn] = useState(checked);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggle = () => {
    setIsAnimating(true);
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);

    // Reset knob stretch after transit completes (180ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 180);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5
        transition-colors duration-200 ease-out active:scale-[0.97]
        ${isOn ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md
          transform transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOn ? 'translate-x-5' : 'translate-x-0'}
          ${isAnimating ? 'scale-x-[1.12]' : 'scale-x-100'}
        `}
      />
    </button>
  );
};
