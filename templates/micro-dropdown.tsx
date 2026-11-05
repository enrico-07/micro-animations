import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * MicroDropdown enforces:
 * - Rule 2: Duration kept strictly at 150ms-250ms (200ms entrance)
 * - Rule 10: Initial scale begins at 0.95 (never 0)
 * - Rule 11: Transition origin anchored directly to trigger (e.g. top-left)
 * - Rule 12: Exit collapses back toward the trigger origin
 * - Rule 14: Exit is ~20% shorter (160ms ease-in) than entrance (200ms ease-out)
 */
export const MicroDropdown: React.FC<{ items: DropdownItem[]; triggerLabel?: string }> = ({
  items,
  triggerLabel = 'Options'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      // Allow snappy 160ms exit to complete before unmounting (Rule 14)
      const timer = setTimeout(() => setIsRendered(false), 160);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button with Rule 4 press scale */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-neutral-900 text-white rounded-lg active:scale-[0.97] transition-transform duration-100 ease-out"
      >
        {triggerLabel}
      </button>

      {isRendered && (
        <div
          className={`
            absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-neutral-800 shadow-xl border border-neutral-200 dark:border-neutral-700 p-1.5 z-50
            origin-top-left
            ${isOpen 
              ? 'opacity-100 scale-100 duration-200 ease-out' 
              : 'opacity-0 scale-95 duration-160 ease-in'}
            transition-all
          `}
        >
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              // Rule 3: Micro-stagger inside container
              style={{ transitionDelay: `${isOpen ? idx * 20 : 0}ms` }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700/60 active:scale-[0.98] transition-all duration-100 text-neutral-800 dark:text-neutral-200"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
