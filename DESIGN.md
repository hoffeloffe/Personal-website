# DESIGN.md

This file defines the visual and UX rules for this portfolio codebase and similar React + TypeScript + styled-components projects.

Use it as the source of truth when creating or updating UI.

## 1) Design goals

- Feel modern, clean, and professional.
- Keep strong readability and clear hierarchy.
- Favor subtle depth and motion over flashy effects.
- Keep dark mode parity with light mode.
- Stay consistent through shared tokens and reusable primitives.

## 2) Stack and styling model

- UI framework: React + TypeScript.
- Styling: styled-components first.
- Motion: framer-motion.
- Global styles come from `app/src/style.ts` (preferred) and existing baseline CSS in `app/src/index.css`.
- Theme tokens are defined in `app/src/theme/theme.ts` and exposed via `ThemeProvider`.

## 3) Token system (must use)

Do not introduce new hardcoded colors, spacing, radius, or shadow values unless there is a clear one-off reason.

### Color tokens

- Primary scale: `theme.colors.primary[50..900]`.
- Accent scale: `theme.colors.accent[50..900]`.
- Semantic colors: `success`, `warning`, `error`, `info`.
- Neutral scale: `theme.colors.gray[50..900]`.
- Text roles: `theme.colors.text.primary|secondary|disabled|inverse`.
- Surface roles: `theme.colors.background.default|paper|elevated`.
- Border roles: `theme.colors.border.light|default|dark`.

### Typography tokens

- Font families:
  - Primary: Inter stack (`theme.typography.fontFamily.primary`).
  - Mono: JetBrains Mono stack (`theme.typography.fontFamily.mono`).
- Font sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`.
- Weights: `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`.
- Line heights: `tight`, `normal`, `relaxed`, `loose`.

### Spatial tokens

- Spacing scale: `theme.spacing[0..32]`.
- Radius scale: `theme.borderRadius.none|sm|base|md|lg|xl|2xl|3xl|full`.
- Shadows: `theme.shadows.sm|base|md|lg|xl|2xl` (+ `none`, `inner`).
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Transitions: `theme.transitions.instant|fast|base|slow|slower`.

## 4) Light and dark mode rules

- Always use semantic roles (`text.*`, `background.*`, `border.*`) instead of fixed grayscale values.
- Ensure contrast is acceptable in both themes before shipping.
- If adding new components, verify hover, focus, and disabled states in both modes.
- Do not create dark-mode-only visual behavior that changes layout or usability.

## 5) Layout rules

- Section layout pattern:
  - Desktop horizontal gutter: ~`10%`.
  - Mobile horizontal gutter: ~`5%`.
  - Large vertical rhythm with token spacing (`8+`).
- Prefer grid for two-column hero/content sections and card lists.
- Prefer flex for nav bars, button rows, icon rows, and inline alignment.
- Keep max line lengths readable; avoid very wide text blocks.

## 6) Component conventions

- Build section UIs as self-contained components in `app/src/components/`.
- Reuse shared primitives in `app/src/components/ui/` when possible.
- Buttons:
  - Primary: gradient blue fill, white text.
  - Secondary: neutral surface + border.
  - Tertiary: transparent with primary border/text.
- Cards:
  - Base: rounded corners, subtle border/elevation.
  - Hover: small lift and shadow increase.
- Keep interactive targets comfortably clickable on mobile.

## 7) Motion rules

- Use shared variants from `app/src/utils/animations.ts` first (`fadeIn`, `fadeInUp`, `staggerContainer`, modal variants).
- Motion should support comprehension (entrance, hierarchy, feedback), not decoration.
- Keep motion subtle:
  - Typical hover lift: 1-3px.
  - Typical scale: ~`1.02` max for standard UI.
- Respect reduced-motion preferences for new animations.

## 8) Accessibility baseline

- Keep keyboard-visible focus styles (`:focus-visible`) on all interactive elements.
- Preserve skip link behavior (`.skip-to-content`).
- Use semantic elements (`button`, `nav`, `main`, headings in order).
- Add/maintain meaningful `aria-label` values for icon-only controls.
- Keep form labels connected with `htmlFor` / `id`.
- External links opened in new tab must include `rel="noopener noreferrer"`.

## 9) Content and visual tone

- Voice: confident, clear, and professional.
- Use concise text blocks; avoid long dense paragraphs.
- Favor high-quality imagery with consistent crop ratio and quality.
- Keep icon use purposeful and consistent in size/weight.

## 10) Implementation rules for contributors

When touching UI code:

1. Start from existing tokens and component patterns.
2. Avoid inline styles unless dynamic values are truly one-off.
3. Prefer tokenized styled-components over hardcoded CSS literals.
4. Keep responsive behavior at `md` and `lg` breakpoints at minimum.
5. Verify light mode, dark mode, keyboard navigation, and mobile layout.

## 11) Definition of done (UI changes)

- No obvious visual regressions across major sections.
- New styles rely on theme tokens.
- Hover/focus/active/disabled states are present where relevant.
- Animations remain smooth and non-distracting.
- New UI remains readable and navigable at mobile widths.

---

If this project expands into multiple brands/themes, keep token names stable and swap values per theme instead of changing component-level styling rules.
