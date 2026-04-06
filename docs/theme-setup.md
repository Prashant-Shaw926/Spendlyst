# Theme Setup

Spendlyst uses a layered styling setup so colors, dark mode behavior, and responsive sizes stay consistent across the app.

## Theme Layers

The styling system is split across a few focused files:

| File | Responsibility |
| --- | --- |
| `global.css` | Source of truth for color tokens and dark mode CSS variables |
| `tailwind.config.js` | Maps CSS variables into NativeWind class names |
| `src/theme/colors.ts` | JavaScript color constants for places where `className` is not enough |
| `src/utils/responsive.ts` | Raw responsive scaling helpers |
| `src/theme/scale.ts` | Semantic spacing, font, radius, icon, and size tokens |

## Color Token Flow

Color tokens start in `global.css`.

That file defines:

- brand colors
- surface colors
- semantic text colors
- finance colors
- border and progress colors
- dark mode overrides through `prefers-color-scheme`

`tailwind.config.js` then maps those CSS variables into NativeWind classes such as:

- `bg-bg`
- `bg-card`
- `text-text`
- `text-text-muted`
- `border-border`
- `bg-primary-500`

This gives the app two benefits:

- semantic UI colors stay consistent
- dark mode switching happens automatically when the underlying variables change

## When To Use `className` vs `colors.ts`

### Prefer NativeWind semantic classes first

Use NativeWind for the majority of screen and component styling:

- `bg-bg`
- `bg-card`
- `text-text`
- `text-text-muted`
- `bg-primary-100`

### Use `src/theme/colors.ts` when a literal color value is required

Common cases:

- SVG icon props
- chart library configuration
- React Native style props where `className` is not practical
- inline styles that require a direct color string

Examples already present in the app include chart coloring and icon color props.

## Responsive Sizing

Spendlyst avoids scattering raw numbers across screens.

### Raw helpers

`src/utils/responsive.ts` provides:

- `wp()` for width percentages
- `hp()` for height percentages
- `rfs()` for responsive font sizes
- `rs()` for responsive spacing
- `moderateScale()` for gentler scaling of controls, icons, and radii

### Semantic scale

`src/theme/scale.ts` wraps those helpers into the app-wide `S` token object.

`S` contains:

- `S.space`
- `S.fs`
- `S.radius`
- `S.icon`
- `S.size`

This is the preferred way to express numeric styling in the app.

Examples:

- `paddingHorizontal: S.space.paddingHorizontal`
- `fontSize: S.fs.md`
- `borderRadius: S.radius.xxxl`
- `height: S.icon.lg`

## Recommended Styling Order

Use this order of preference when adding new UI:

1. Semantic NativeWind classes for colors and basic layout
2. `S` tokens for numeric spacing, typography, radii, and sizing
3. Raw responsive helpers only when no existing `S` token fits
4. Literal hex values only when there is a strong reason

## Dark Mode

Dark mode is handled at the token level rather than per-screen overrides.

### Where it happens

- `global.css` swaps semantic CSS variables for dark mode
- `tailwind.config.js` exposes those variables as utility classes
- `src/theme/colors.ts` also contains `darkColors` and `lightColors` for non-class usage

### Practical result

Most screens can stay simple:

- background classes such as `bg-bg` and `bg-card` adapt automatically
- text classes such as `text-text` and `text-text-muted` adapt automatically
- non-class consumers can choose from `lightColors` and `darkColors`

## File Responsibilities In Practice

### `global.css`

Use this file when:

- adding a new semantic color token
- changing the light or dark palette
- introducing a new app-wide visual meaning such as a new surface or state color

### `tailwind.config.js`

Use this file when:

- exposing a new CSS variable to NativeWind classes
- updating the class-facing theme map

### `src/theme/colors.ts`

Use this file when:

- a library or prop needs a raw color value
- the value cannot be expressed through `className`

### `src/theme/scale.ts`

Use this file when:

- a spacing, font, radius, or component size token is repeated in multiple places

## Styling Conventions Used In Spendlyst

- Prefer semantic colors over raw brand values when the element has a UI meaning.
- Keep brand colors for accents, charts, and actions rather than using them as a blanket surface color everywhere.
- Use feature components to keep repeated visual patterns consistent within one product area.
- Use `moderateScale()` directly only when a new one-off size is needed and no `S` token exists yet.

## Example Pattern

This is the general style pattern used across the app:

```tsx
<SafeAreaView className="flex-1 bg-bg" edges={['top']}>
  <View
    className="bg-card"
    style={{
      paddingHorizontal: S.space.paddingHorizontal,
      paddingVertical: S.space.lg,
      borderRadius: S.radius.xxxl,
    }}
  >
    <Text className="text-text" style={{ fontSize: S.fs.md_h }}>
      Dashboard
    </Text>
    <Text className="text-text-muted" style={{ fontSize: S.fs.sm }}>
      Theme-aware and responsive
    </Text>
  </View>
</SafeAreaView>
```

## Summary

Spendlyst keeps styling predictable by separating:

- color truth
- class exposure
- raw responsive math
- semantic size tokens

That makes the UI easier to maintain, easier to theme, and easier to extend without rewriting every screen.
