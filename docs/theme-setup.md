# Theme Setup Documentation

This project uses a layered theme system:

1. `global.css` defines design tokens as CSS variables.
2. `tailwind.config.js` maps those variables into NativeWind color names.
3. `src/utils/responsive.ts` provides responsive sizing helpers.
4. `src/theme/scale.ts` builds semantic spacing/font/radius/size tokens from responsive helpers.
5. Screens (for example Home) consume both:
   - NativeWind classes for color and layout
   - `S` scale tokens and responsive functions for numeric styles

## 1) global.css (source of truth for colors)

`global.css` provides all color tokens using CSS variables under `:root`, then swaps semantic tokens in dark mode using `@media (prefers-color-scheme: dark)`.

### What is defined

- Primitive tokens:
  - `--color-primary-50 ... --color-primary-900`
  - `--color-blue-50 ... --color-blue-900`
  - `--color-warning-*`, `--color-error-*`, `--color-neutral-*`
  - `--color-white`, `--color-black`
- Surface tokens:
  - `--color-surface-deep`, `--color-surface-dark`, `--color-surface-medium`, `--color-surface-raised`
- Semantic app tokens:
  - Background and containers: `--color-bg`, `--color-card`, `--color-card-medium`, `--color-surface-pill`
  - Text: `--color-text`, `--color-text-muted`
  - UI lines: `--color-border`, `--color-progress`

### Dark mode behavior

Dark mode does not require component changes if components consume semantic tokens (for example `text-text`, `bg-bg`, `border-border`).

When system theme is dark:

- semantic background/container/text/border variables are overridden
- neutral scale is flipped for readability

## 2) tailwind.config.js (bridge to NativeWind)

`tailwind.config.js` maps CSS variables to Tailwind color names.

Examples:

- `bg-bg` -> `var(--color-bg)`
- `text-text` -> `var(--color-text)`
- `text-text-muted` -> `var(--color-text-muted)`
- `border-border` -> `var(--color-border)`
- `bg-primary-500` -> `var(--color-primary-500)`

Configuration highlights:

- `presets: [require('nativewind/preset')]`
- `darkMode: 'media'` (follows OS theme)
- content scan includes `App` and all files under `src`

Because color values are variable-based, changing token values in `global.css` updates all classes that reference those colors.

## 3) src/utils/responsive.ts (raw responsive helpers)

This file contains low-level helper functions based on screen dimensions:

- `wp(percent)` -> width percentage in pixels
- `hp(percent)` -> height percentage in pixels
- `rfs(fontSize)` -> responsive font size
- `rs(size)` -> responsive spacing
- `moderateScale(size, factor = 0.5)` -> less aggressive scaling for controls/icons

Also exports:

- `breakpoints` (small/medium/large/tablet flags)
- `screenDimensions` (current width/height)

Use this file when you need one-off responsive calculations.

## 4) src/theme/scale.ts (semantic sizing tokens)

This file builds a design-scale object `S` using responsive helpers. It should be your default for spacing/typography/sizes.

`S` groups:

- `S.space`: spacing tokens (`xs` to `8xl`, `marginScreen`, `gutter`)
- `S.fs`: font-size scale (`xxl`, `xl`, `lg`, `sm`, `xs`, etc.)
- `S.radius`: radius tokens (`sm`, `md`, `lg`, `xl`, `full`)
- `S.icon`: icon size scale
- `S.size`: fixed component sizes (`avatarMd`, `docPreview`, etc.)

Why this helps:

- keeps spacing/font usage consistent across screens
- keeps device scaling behavior uniform
- avoids hardcoded numbers scattered in component styles

## 5) HomeScreen theme usage walkthrough

`src/screens/Home/HomeScreen.tsx` demonstrates the intended mixed approach:

### A) Semantic colors through className (preferred)

Home screen uses NativeWind classes that map to semantic tokens:

- `bg-bg` on root container
- `text-text` for primary text
- `text-text-muted` for secondary text
- `border-border` and `bg-border` for dividers/borders
- `bg-progress` for progress track
- `bg-surface-pill` for segmented container
- `bg-primary-500` for accent card/active tab

This allows automatic dark mode adaptation without changing screen code.

### B) Responsive numeric style tokens via `S`

Home screen relies heavily on `S`:

- spacing: `paddingHorizontal: S.space.marginScreen`, `marginTop: S.space.xl`
- typography size: `fontSize: S.fs.sm`, `S.fs.xxs`, etc.
- component size: `width: S.size.avatarMd`, `height: S.size.avatarMd`

This keeps visual rhythm and scale consistent across devices.

### C) Direct responsive utility for specific controls

Home screen uses `moderateScale(...)` for values that need manual control, for example:

- ring size in donut UI
- bell button dimensions
- card radius/height pieces

### D) Explicit raw hex exceptions

Home screen defines constants like:

- `ICON_COLOR_PRIMARY = '#00D09E'`
- `ICON_COLOR_BLUE_500 = '#3299FF'`
- `ICON_COLOR_WHITE = '#FFFFFF'`

These are used where style props or icon color behavior are intentionally fixed and not token-driven. Keep these exceptions limited.

## Recommended usage rules

1. Use semantic classes (`bg-bg`, `text-text`, `border-border`) first for colors.
2. Use `S.space`, `S.fs`, `S.radius`, `S.size`, `S.icon` for numeric styles.
3. Use `moderateScale`/`rs`/`rfs` directly only for one-off cases not covered by `S`.
4. Add new color tokens in `global.css` and map them in `tailwind.config.js` before using new utility names.
5. Prefer semantic token names for UI surfaces/text so dark mode works automatically.

## End-to-end token flow

1. Define or update CSS variable in `global.css`
2. Map variable in `tailwind.config.js`
3. Consume via NativeWind class in screen
4. For dimensions and type, consume `S` (and responsive helpers when needed)

That flow gives consistent, scalable theming and responsive UI behavior across the app.
