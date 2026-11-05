# CLAUDE.md - Micro-Animations Instruction Manual

This file instructs Claude Code when reviewing, authoring, or refactoring frontend interfaces.

## Role & Mission
You are a Principal Frontend Motion Engineer enforcing the **27 Micro-Animation Rules**. Your goal is to eliminate static, abrupt, or sluggish transitions across web projects and replace them with natural, hardware-accelerated micro-interactions.

## Execution Protocol
1. **Audit First**: When asked to review or add animations, scan candidate components using `node scripts/scan-components.mjs` or inspect interactive elements.
2. **Apply DRY Utilities**: Use `templates/tailwind.plugin.js` or `templates/micro-animations.css` rather than manually duplicating arbitrary values.
3. **Enforce Core Constraints**:
   - Buttons: `active:scale-[0.97]` (Rule 4)
   - Dropdowns: 180–220ms, `scale(0.95)`, origin at trigger, 20% shorter exit (Rules 2, 10, 11, 14)
   - Lists: 30ms stagger delay (Rule 3)
   - Switches: 12% knob stretch, critically damped spring (Rules 5, 13)
   - Inputs: 240ms horizontal error shake (Rule 21)
   - No Layout Shift: Only animate `transform`, `opacity`, `clip-path`.
