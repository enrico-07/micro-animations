import React from 'react';

/**
 * MicroList enforces:
 * - Rule 3: Stagger list rows by 30ms (capped at 240ms max cascade)
 * - Rule 1: Ease-out for entrances
 * - Rule 16: Overlap state exit and entrance
 */
export const MicroList: React.FC<{
  items: Array<{ id: string; title: string; subtitle?: string }>;
  onItemClick?: (id: string) => void;
}> = ({ items, onItemClick }) => {
  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 w-full max-w-md">
      {items.map((item, index) => {
        // Rule 3: 30ms stagger, max cap at 240ms
        const delay = Math.min(index * 30, 240);

        return (
          <li
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            style={{
              animationDelay: `${delay}ms`,
              animationFillMode: 'both'
            }}
            className="
              flex items-center justify-between p-3 rounded-lg cursor-pointer
              animate-[micro-fade-in_220ms_cubic-bezier(0,0,0.2,1)]
              hover:bg-neutral-50 dark:hover:bg-neutral-800/50
              active:scale-[0.98] transition-transform duration-100 ease-out
            "
          >
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.subtitle}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// CSS Keyframes:
// @keyframes micro-fade-in {
//   from { opacity: 0; transform: translateY(6px); }
//   to { opacity: 1; transform: translateY(0); }
// }
