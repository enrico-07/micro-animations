import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
}

/**
 * MicroTabs enforces:
 * - Rule 20: Reuse layoutId ("active-pill") across shared active tab indicators
 * - Rule 9: Ease-in-out for on-screen continuous gliding movement
 * - Rule 4: Scale 0.97 tactile compression during click
 * - Rule 13: Critically damped spring (no excessive wobble)
 */
export const MicroTabs: React.FC<{
  tabs: TabItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}> = ({ tabs, activeId: controlledId, onSelect }) => {
  const [selected, setSelected] = useState(controlledId || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
      {tabs.map((tab) => {
        const isActive = (controlledId || selected) === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className="relative px-3.5 py-1.5 text-sm font-medium rounded-lg text-neutral-600 dark:text-neutral-300 transition-colors duration-150 active:scale-[0.97]"
          >
            {isActive && (
              <motion.div
                layoutId="micro-tab-active-pill"
                className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-lg shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 34,
                  mass: 1
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
