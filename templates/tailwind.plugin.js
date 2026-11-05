/**
 * Tailwind CSS Plugin for Micro-Animations
 * 
 * Provides production-ready utilities and keyframes for the 27 Micro-Animation Rules.
 * 
 * Install in tailwind.config.js:
 *   plugins: [require('./templates/tailwind.plugin.js')]
 */

const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, addComponents, matchUtilities, theme }) {
  // Utility Classes
  addUtilities({
    // Rule 4: Button Press (Scale 0.97)
    '.micro-press': {
      'transition-property': 'transform',
      'transition-duration': '100ms',
      'transition-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
      '&:active': {
        'transform': 'scale(0.97)'
      }
    },

    // Rule 1 & 10: Popover / Dropdown Entrance
    '.micro-popover-enter': {
      'opacity': '1',
      'transform': 'scale(1)',
      'transition-property': 'opacity, transform',
      'transition-duration': '200ms',
      'transition-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
    },

    // Rule 14 & 12: Popover / Dropdown Exit (20% shorter)
    '.micro-popover-exit': {
      'opacity': '0',
      'transform': 'scale(0.95)',
      'transition-property': 'opacity, transform',
      'transition-duration': '160ms',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 1, 1)'
    },

    // Rule 8: Success Pulse
    '.micro-pulse': {
      'animation': 'micro-pulse-kf 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    },

    // Rule 21: Input Error Shake
    '.micro-shake': {
      'animation': 'micro-shake-kf 240ms ease-in-out'
    },

    // Rule 27: Scroll Micro-Float
    '.micro-float-in': {
      'animation': 'micro-float-kf 240ms cubic-bezier(0, 0, 0.2, 1) forwards'
    },

    // Rule 24: Shimmer Sweep
    '.micro-shimmer': {
      'background': 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)',
      'background-size': '200% 200%',
      'animation': 'micro-shimmer-kf 1200ms ease-in-out infinite'
    }
  });
}, {
  theme: {
    extend: {
      keyframes: {
        'micro-pulse-kf': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' }
        },
        'micro-shake-kf': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' }
        },
        'micro-float-kf': {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        'micro-shimmer-kf': {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' }
        }
      }
    }
  }
});
