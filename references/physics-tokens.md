# Micro-Animations Physics & Motion Tokens

Standardized mathematical values, cubic-bezier curves, timing metrics, and physical constants for production micro-animations.

---

## 1. Timing Curves & Easing Values

| Name | CSS Bezier Value | Intended Usage | Physics Rationale |
| :--- | :--- | :--- | :--- |
| **Entrance Decel** | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Entrances, dialogs, popovers, reveals (Rule 1) | Starts with immediate velocity, gently brakes to rest. Prevents sluggish starts. |
| **Exit Accel** | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Exits, dismissals, closing drawers (Rule 14) | Accelerates out of sight quickly without hanging. |
| **On-Screen Smooth** | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Moving visible items, tab sliders, list reorder (Rule 9) | Symmetric ease-in-out: starts from rest, moves, comes gently to rest. |
| **Snap / Crisp Press** | `cubic-bezier(0.25, 1.0, 0.5, 1.0)` | Button active press & release (Rule 4) | High initial resistance, instant snapback. |
| **Arc Decel (Y-axis)** | `cubic-bezier(0.0, 0.0, 0.1, 1.0)` | Curved trajectory motion (Rule 7) | Decoupled Y-axis decel creates parabolic arc. |
| **Arc Drive (X-axis)** | `cubic-bezier(0.3, 0.0, 0.4, 1.0)` | Curved trajectory motion (Rule 7) | Smooth lateral translation paired with Y decel. |
| **Shake Oscillation** | `steps(1)` or custom 4-keyframe | Input validation failure (Rule 21) | 3-cycle damped decay (4px → -4px → 2px → 0). |
| **Ticker Roll Decel** | `cubic-bezier(0.16, 1.0, 0.3, 1.0)`| Number counter transitions (Rule 23) | Ultra-smooth odometer settling curve. |

---

## 2. Standard Duration Tokens

| Token | Milliseconds | Use Case | Rule Reference |
| :--- | :--- | :--- | :--- |
| **Instant Feedback** | `80ms – 120ms` | Hover color shifts, outline focus rings | Foundation |
| **Tactile Press** | `100ms – 150ms` | Button active scale (`0.97`), knob depress | Rule 4 |
| **Dropdown / Menu** | `150ms – 220ms` | Flyouts, select menus, context menus (Max 250ms) | Rule 2 |
| **Standard Entrance** | `180ms – 240ms` | Popovers, tooltips, dialogs, sidebars | Rule 1, 10 |
| **Snappy Exit** | `140ms – 190ms` | Exits (~20% faster than entrance) | Rule 14 |
| **Success Pulse** | `260ms – 320ms` | Checkmark ping, save confirmation, copy toast | Rule 8 |
| **Error Shake** | `220ms – 260ms` | Form validation failure, incorrect pin | Rule 21 |
| **Number Ticker** | `350ms – 450ms` | Metric roll, price switch, counter | Rule 23 |
| **Shimmer Sweep** | `1200ms – 1500ms`| Skeleton loader gradient sweep | Rule 24 |
| **Stagger Offset** | `30ms per item` | List cascades, grid feeds (Cap max total: 240ms) | Rule 3 |
| **Accordion / Container**| `200ms – 300ms`| Expanding cards, accordion content | Rule 6 |
| **Scroll Float** | `200ms – 260ms` | 8px viewport entry lift | Rule 27 |

---

## 3. Scale, Velocity & Deformation Tokens

| Token | Value | Target Component | Rule Reference |
| :--- | :--- | :--- | :--- |
| **Button Press Scale** | `0.97` | Buttons, clickable cards, icon toggles | Rule 4 |
| **Popover Initial Scale** | `0.95` | Tooltips, dropdowns, popovers, modals | Rule 10 |
| **Icon Swap Scale** | `0.80` | Sun/moon, hamburger/X, check/copy | Rule 18 |
| **Knob Velocity Stretch** | `1.12` (+12%) | Switch toggle knob, slider thumb, segmented pill | Rule 5 |
| **Success Pulse Scale** | `1.04 – 1.05` | Save button, copy badge, complete chip | Rule 8 |
| **Rubberband Resistance**| `offset * 0.25` | Drag limits, carousel edge, drawer boundaries | Rule 19 |
| **Magnetic Cursor Pull** | `4px – 6px max`| High-priority CTA buttons, action icons | Rule 22 |
| **Scroll Micro-Lift** | `8px (translateY)`| Viewport card / section reveal | Rule 27 |

---

## 4. Spring Damping Standards (Critically Damped)

Everyday UI interactions must **never** oscillate like a bobbing toy (Rule 13). Use critically damped springs:

$$\zeta = \frac{c}{2\sqrt{mk}} \approx 0.95 \text{ to } 1.0$$

- **Stiffness ($k$)**: `300 – 450` (responsive, zero lag)
- **Damping ($c$)**: `30 – 40` (settles immediately with $\le 1$ sub-pixel micro-overshoot)
- **Mass ($m$)**: `1.0`
- **Bounce**: `0` or `0.05` max (never bouncy for core UI)

---

## 5. Reduced Motion Tokens (`prefers-reduced-motion`)

When `@media (prefers-reduced-motion: reduce)` is active:
- Transform translations, arcs, and rubberband scale effects collapse to `0px` / `scale(1)`.
- Opacity fades remain enabled with shortened durations (`100ms`).
- Layout shifts and icon blur filters are removed entirely.
