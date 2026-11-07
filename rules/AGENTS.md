# AGENTS.md - Universal AI Coding Agent Guidelines for Micro-Animations

This guideline applies to any AI coding assistant (Antigravity, Codex, Cursor, Claude Code, Aider, Devin).

## Core Directives
1. **Never inject layout shifts (CLS)**: Always use `transform: translate3d(), scale()`, `opacity`, and `clip-path`.
2. **Follow the 27 Rules**:
   - Rule 1: Ease-out for entrances (`cubic-bezier(0, 0, 0.2, 1)`).
   - Rule 2: Keep dropdowns at 150ms–250ms.
   - Rule 3: Stagger list rows by 30ms.
   - Rule 4: Scale to 0.97 on button press.
   - Rule 5: Stretch moving knobs by 12%.
   - Rule 8: Pulse to confirm success (scale 1.04 over 300ms).
   - Rule 10: Start popovers at 0.95 scale.
   - Rule 11 & 12: Transition in and out relative to the trigger.
   - Rule 13: Zero spring wobble for standard UI.
   - Rule 14: Exits 20% faster than entrances with ease-in.
   - Rule 18: Crossfade icons with scale and blur.
   - Rule 21: Form input 3-cycle error shake.
   - Rule 23: Number ticker roll with odometer ease.
   - Rule 27: Scroll micro-float (8px lift).
3. **DRY Architecture**: Enhance the base component primitive (e.g. `Button.tsx`, `Dropdown.tsx`) or use the utility plugin (`templates/tailwind.plugin.js`) instead of writing raw inline styles across every element.
