# The Complete Micro-Animation Rules (1–27)

This reference details the mechanics, code patterns, and rationales for all 27 Micro-Animation Rules across **Tailwind CSS**, **React / Framer Motion**, **Vanilla CSS**, and the **Web Animations API (WAAPI)**.

---

### Rule 1: Use Ease-Out for Entrances
- **Principle**: Entering elements should arrive with initial kinetic energy and gently decelerate to rest.
- **Physics**: Deceleration curve `cubic-bezier(0, 0, 0.2, 1)`. Avoid linear or `ease-in` for entrances.
- **Tailwind**: `transition-all duration-200 ease-out`
- **Motion**: `transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}`
- **CSS**: `transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1);`

---

### Rule 2: Keep Dropdowns at 150ms to 250ms
- **Principle**: Menus and dropdowns must feel instantaneous without popping abruptly. Anything over 250ms makes the application feel sluggish.
- **Duration**: `180ms – 220ms` is optimal.
- **Tailwind**: `duration-200 ease-out`
- **Motion**: `animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, ease: "easeOut" }}`

---

### Rule 3: Stagger List Rows by 30ms
- **Principle**: Cascade incoming list rows sequentially so the interface feels living and orderly.
- **Timing**: 30ms per index. Cap the total stagger cascade at 240ms so large lists don't keep the user waiting.
- **Tailwind**: `style={{ transitionDelay: `${Math.min(index * 30, 240)}ms` }}`
- **Motion**:
  ```tsx
  const container = {
    show: { transition: { staggerChildren: 0.03 } }
  };
  ```

---

### Rule 4: Scale to 0.97 on Pressing of Buttons
- **Principle**: Authentic physical depression feel on `:active` / tap. `0.95` is too bouncy/cartoonish; `0.99` is imperceptible. `0.97` is the physical gold standard.
- **Tailwind**: `active:scale-[0.97] transition-transform duration-100 ease-out`
- **Motion**: `<motion.button whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }}>`
- **Vanilla CSS**:
  ```css
  .btn:active {
    transform: scale(0.97);
    transition: transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1);
  }
  ```

---

### Rule 5: Stretch Moving Knobs by 12%
- **Principle**: When a toggle knob or slider thumb moves rapidly across an axis, elongate it along the axis of movement by 12% (`scaleX: 1.12`), returning to `1.0` upon docking.
- **Tailwind**: `isMoving ? 'scale-x-[1.12]' : 'scale-100'`
- **Motion**:
  ```tsx
  <motion.div
    animate={{ x: isOn ? 24 : 0, scaleX: isDragging ? 1.12 : 1 }}
    transition={{ type: "spring", stiffness: 450, damping: 35 }}
  />
  ```

---

### Rule 6: Stagger When Details Settle
- **Principle**: When an accordion, sheet, or card expands, animate the outer container bounds first, then let inner details (header, badges, body text) settle with micro-staggers (30ms apart).
- **Anti-Pattern**: Popping all internal items immediately while the container is still expanding.

---

### Rule 7: Use Arcs for Object Movement
- **Principle**: Real physical objects rarely travel in straight diagonal vectors. Movement across both X and Y axes should form a subtle curved arc.
- **CSS**:
  ```css
  .fly-to-cart {
    animation: arcMotion 300ms cubic-bezier(0.25, 1, 0.5, 1);
  }
  ```

---

### Rule 8: Use a Pulse to Confirm Success
- **Principle**: When an action succeeds (copied to clipboard, item saved, toggled on), deliver immediate subtle haptic/visual confirmation via a single gentle 300ms pulse (`scale: [1, 1.04, 1]`).
- **Tailwind**: `animate-[pulse-once_300ms_ease-out]`

---

### Rule 9: Use Ease-In-Out for On-Screen Moves
- **Principle**: When an element already visible on screen translates from position A to position B (e.g. list reorder, active tab pill indicator, sidebar slide), it must accelerate from zero velocity and decelerate smoothly to zero.
- **Cubic Bezier**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Tailwind**: `transition-all duration-300 ease-in-out`

---

### Rule 10: Start Popovers at 0.95 Scale
- **Principle**: Popovers, tooltips, dialogs, and flyouts should never scale from 0 (which looks like a cartoon balloon inflating). Begin at `scale(0.95)` with `opacity: 0`.
- **Tailwind**: `data-[state=open]:scale-100 data-[state=closed]:scale-95 duration-150 ease-out`
- **Motion**: `initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}`

---

### Rule 11: Transition In From the Trigger, Not From the Center
- **Principle**: Anchor `transform-origin` to the trigger element that caused the opening (e.g. `origin-top-left` for a dropdown triggered from top-left).
- **Tailwind**: `origin-top-left` / `origin-bottom-center`
- **CSS**: `transform-origin: var(--trigger-x, 0) var(--trigger-y, 0);`

---

### Rule 12: Transition Out Toward the Trigger
- **Principle**: When closing or dismissing, elements collapse back toward the originating button or vector rather than vanishing into an arbitrary central void.
- **Tailwind**: Match `origin-[side]` on dismiss: `data-[state=closed]:scale-95 origin-top-left`

---

### Rule 13: Don't Use Spring Bounce for Everyday UI Animations
- **Principle**: Excessive spring oscillation causes eye fatigue and makes production software feel like a prototype. Keep damping critically damped ($\zeta \ge 0.95$ / no wobble).
- **Motion Token**: `stiffness: 400, damping: 35, mass: 1` (zero wobble).

---

### Rule 14: Make Exits About 20% Shorter Than Entrances
- **Principle**: Entrances guide human attention (e.g. 200ms). Exits clear the viewport so the user can interact with content; they must be brisk (~20% faster, e.g. 160ms) using accelerating curves (`ease-in`).
- **Timing**:
  - Entrance: `200ms ease-out`
  - Exit: `160ms ease-in`

---

### Rule 15: Don't Tween a Handheld Animation
- **Principle**: Direct gesture manipulation (dragging sheets, carousels, sliders, reordering items) must bind 1:1 with pointer coordinates without artificial delay or easing lag.
- **Physics**: Tween/spring is applied strictly on `pointerup` / release to fling or snap to rest.

---

### Rule 16: Bring the New State In as the Old State Leaves
- **Principle**: When transitioning views or modes, never wait for state A to completely vanish before starting state B. Overlap the exit and entrance by 30–50% so there is zero empty-space flash.

---

### Rule 17: Masks for Reveals and Colors
- **Principle**: Use `clip-path` masks (e.g. `inset(...)` or expanding `circle(...)`) for reveals, theme toggles, and button progress fills. This completely eliminates layout reflow.
- **CSS**: `clip-path: inset(0 0 0 0 round 8px); transition: clip-path 250ms cubic-bezier(0, 0, 0.2, 1);`

---

### Rule 18: Crossfade Icons with Scale and Blur
- **Principle**: Icon swaps (Sun/Moon, Copy/Check, Play/Pause) should simultaneously morph opacity (`1 ↔ 0`), scale (`1 ↔ 0.8`), and subtle blur (`0px ↔ 4px`).
- **Tailwind**: `transition-all duration-200 ${active ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-75 blur-[3px] pointer-events-none'}`

---

### Rule 19: Rubberband Past Drag Boundaries
- **Principle**: When a user drags beyond bounds (carousel edges, sheet tops), apply logarithmic decay resistance ($dx = \text{offset} \times 0.25$). On release, snap back with critical damping.

---

### Rule 20: Reuse the Same Layout ID Across Shared Objects
- **Principle**: Morphing active indicators, floating pills, and card expansions must share a continuous visual identity across states using shared element transitions (`layoutId` or CSS View Transitions).

---

### Rule 21: Input Error Shake
- **Principle**: On form validation error or denied input, trigger a rapid 3-cycle horizontal damped shake over 240ms rather than a jarring alert box.
- **CSS Keyframes**:
  ```css
  @keyframes micro-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-4px); }
    40%, 80% { transform: translateX(4px); }
  }
  ```
- **Tailwind**: `animate-[micro-shake_240ms_ease-in-out]`

---

### Rule 22: Magnetic Cursor Gravity
- **Principle**: When hovering within 12px of a high-value CTA button or icon, slightly translate the element 4–6px toward the cursor position using a tight spring, releasing on mouse-leave.
- **Motion**:
  ```tsx
  const x = useTransform(mouseX, [-50, 50], [-6, 6]);
  const y = useTransform(mouseY, [-50, 50], [-6, 6]);
  ```

---

### Rule 23: Number Ticker / Counter Roll
- **Principle**: Changing numbers or metrics should roll vertically like an odometer with decel curve (`cubic-bezier(0.16, 1, 0.3, 1)`) over 380ms instead of popping abruptly.

---

### Rule 24: Skeleton Shimmer Wave
- **Principle**: Skeleton loading placeholders should sweep a 135-degree diagonal gradient across 1200ms with smooth cubic deceleration, preventing harsh blinking.
- **CSS**:
  ```css
  background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
  background-size: 200% 200%;
  animation: shimmer 1200ms ease-in-out infinite;
  ```

---

### Rule 25: Tooltip Warm-Up & Instant Swap
- **Principle**: First tooltip entry has a 200ms warm-up delay to prevent visual clutter during cursor movement. Once any tooltip is active, sibling tooltips appear with **0ms delay**.

---

### Rule 26: Border Beam / Glow Sweep
- **Principle**: Featured containers or active modals use a subtle 2px beam tracing their perimeter (`offset-path` or rotating conic gradient mask) over 3000ms.

---

### Rule 27: Scroll Micro-Float
- **Principle**: Cards and containers entering the viewport threshold should gently float up by **8px** while fading from `opacity: 0` to `1` over 240ms. Never use extreme 80–100px slides which disrupt reading.
