# Tech Stack Implementation Matrix

This guide provides drop-in implementations for the 20 Micro-Animation Rules across all major web stacks: **Tailwind CSS**, **React / Framer Motion**, **Vanilla CSS**, and **Web Animations API (WAAPI)**.

---

## 1. Quick Cross-Reference Matrix

| Rule | Tailwind CSS Utility | React Motion (Framer) | Vanilla CSS / CSS Modules | Web Animations API (WAAPI) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Ease-Out Entrance** | `duration-200 ease-out` | `ease: [0, 0, 0.2, 1]` | `cubic-bezier(0, 0, 0.2, 1)` | `easing: 'cubic-bezier(0, 0, 0.2, 1)'` |
| **2. Dropdown (150-250ms)** | `duration-200 origin-top` | `transition={{ duration: 0.2 }}` | `transition: all 200ms ease-out;` | `duration: 200` |
| **3. Stagger (30ms)** | `delay-[calc(var(--i)*30ms)]` | `staggerChildren: 0.03` | `animation-delay: calc(var(--i) * 30ms)`| loop with `delay: i * 30` |
| **4. Button Press (0.97)** | `active:scale-[0.97]` | `whileTap={{ scale: 0.97 }}` | `:active { transform: scale(0.97); }` | `element.animate([{ transform: 'scale(0.97)' }], ...)` |
| **5. Knob Stretch (12%)** | `scale-x-[1.12]` | `animate={{ scaleX: 1.12 }}` | `transform: scaleX(1.12);` | `keyframes: [{ transform: 'scaleX(1.12)' }]` |
| **6. Detail Stagger** | `delay-75` on child content | `staggerChildren: 0.04` | child transition delays | nested element WAAPI player |
| **7. Arcs in Motion** | combined XY translate classes | decoupled `x` and `y` transitions | dual-container or offset-path | separate `translateX` and `translateY` animations |
| **8. Pulse Confirm** | `animate-pulse-subtle` | `animate={{ scale: [1, 1.04, 1] }}` | `@keyframes pulse { 50% { scale: 1.04; } }` | `[{ scale: 1 }, { scale: 1.04 }, { scale: 1 }]` |
| **9. Ease-In-Out Move** | `duration-300 ease-in-out` | `ease: [0.4, 0, 0.2, 1]` | `cubic-bezier(0.4, 0, 0.2, 1)` | `easing: 'cubic-bezier(0.4, 0, 0.2, 1)'` |
| **10. Popover 0.95 Scale** | `scale-95 to scale-100` | `initial={{ scale: 0.95 }}` | `transform: scale(0.95);` | `keyframes: [{ transform: 'scale(0.95)' }]` |
| **11. Origin In Trigger** | `origin-top-left` / dynamic | dynamic `transformOrigin` | `transform-origin: var(--x) var(--y);` | `element.style.transformOrigin = ...` |
| **12. Origin Out Trigger** | `origin-top-left` on exit | exit matching origin | same transform-origin on exit | match transform origin on exit animation |
| **13. Damped Springs** | `ease-out` (no overshoot) | `damping: 35, stiffness: 400` | bezier approximations | damping calculation in step |
| **14. 20% Shorter Exits** | `duration-150 ease-in` | `exit={{ transition: { duration: 0.16 } }}` | `transition-duration: 160ms;` | `duration: 160` |
| **15. No Tween Handheld** | 1:1 touch coordinates | `drag` without tween delay | direct `pointermove` translate | direct transform update via requestAnimationFrame |
| **16. Overlap States** | relative absolute overlays | `<AnimatePresence mode="popLayout">` | concurrent opacity animations | parallel WAAPI animations |
| **17. Mask Reveal** | `[clip-path:inset(0)]` | `animate={{ clipPath: "..." }}` | `clip-path: inset(...)` | `keyframes: [{ clipPath: '...' }]` |
| **18. Icon Scale+Blur** | `opacity-0 scale-75 blur-xs` | `exit={{ scale: 0.8, filter: "blur(4px)" }}`| `transform: scale(0.8); filter: blur(4px);` | `[{ opacity: 0, filter: 'blur(4px)', transform: 'scale(0.8)' }]` |
| **19. Rubberband** | CSS touch-action + resistance | `dragConstraints={{ left: 0 }}` | pointer delta with `Math.sqrt` drag decay | dynamic physics clamp loop |
| **20. Shared layoutId** | CSS View Transitions API | `<motion.div layoutId="id" />` | `view-transition-name: tab-pill;` | `document.startViewTransition(...)` |

---

## 2. Web Animations API (WAAPI) Helper Utilities

For vanilla JavaScript or lightweight frameworks (Svelte, Solid, Vue without heavy motion libs), use this drop-in helper:

```ts
export const microAnimate = {
  // Rule 4: Button Press
  press: (el: HTMLElement) => {
    return el.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.97)' }
      ],
      { duration: 100, easing: 'cubic-bezier(0, 0, 0.2, 1)', fill: 'forwards' }
    );
  },
  
  // Rule 8: Success Pulse
  pulse: (el: HTMLElement) => {
    return el.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.04)' },
        { transform: 'scale(1)' }
      ],
      { duration: 280, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    );
  },

  // Rule 10 & Rule 1: Popover Entrance
  popoverEnter: (el: HTMLElement, origin: string = 'top left') => {
    el.style.transformOrigin = origin;
    return el.animate(
      [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration: 200, easing: 'cubic-bezier(0, 0, 0.2, 1)', fill: 'forwards' }
    );
  },

  // Rule 14 & Rule 12: Popover Exit (20% shorter)
  popoverExit: (el: HTMLElement, origin: string = 'top left') => {
    el.style.transformOrigin = origin;
    return el.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.95)' }
      ],
      { duration: 160, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
    );
  }
};
```
