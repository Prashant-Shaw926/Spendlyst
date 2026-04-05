# Theme Setup Documentation

Spendlyst uses a layered theme system. Colors are defined once in CSS variables, NativeWind maps those variables into utility classes, and numeric spacing/type/radius values come from a small responsive scale layer.

The flow is:

1. `global.css` defines theme tokens as CSS variables.
2. `tailwind.config.js` maps those variables into NativeWind color names.
3. `src/utils/responsive.ts` provides raw responsive helpers.
4. `src/theme/scale.ts` builds semantic numeric tokens on top of the responsive helpers.
5. Components and screens consume both layers together.

## 1) `global.css`

This is the source of truth for theme colors. It defines base tokens under `:root`, then overrides semantic tokens for dark mode with `@media (prefers-color-scheme: dark)`.

### File code

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-white: #ffffff;
  --color-black: #000000;

  --color-primary-50: #f1fff3;
  --color-primary-100: #dff7e2;
  --color-primary-200: #aaefd4;
  --color-primary-300: #6de6be;
  --color-primary-400: #1fcea9;
  --color-primary-500: #00d09e;
  --color-primary-600: #00a87e;
  --color-primary-700: #007f5f;
  --color-primary-800: #005640;
  --color-primary-900: #002e22;

  --color-blue-50: #ebf5ff;
  --color-blue-100: #cce5ff;
  --color-blue-200: #99ccff;
  --color-blue-300: #6db6fe;
  --color-blue-400: #4daaff;
  --color-blue-500: #3299ff;
  --color-blue-600: #1a88ee;
  --color-blue-700: #0068ff;
  --color-blue-800: #0050cc;
  --color-blue-900: #003899;

  --color-surface-light: #ffffff;
  --color-surface-deep: #031314;
  --color-surface-dark: #052224;
  --color-surface-medium: #093030;
  --color-surface-raised: #0e3e3e;

  --color-warning-50: #fefce8;
  --color-warning-100: #fef9c3;
  --color-warning-200: #fef08a;
  --color-warning-300: #fde047;
  --color-warning-400: #facc15;
  --color-warning-500: #eab308;
  --color-warning-600: #ca8a04;
  --color-warning-700: #a16207;
  --color-warning-800: #854d0e;
  --color-warning-900: #713f12;

  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-300: #fca5a5;
  --color-error-400: #f87171;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-error-800: #991b1b;
  --color-error-900: #7f1d1d;

  --color-neutral-50: #fafafa;
  --color-neutral-100: #f1fff3;
  --color-neutral-200: #dff7e2;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #0e3e3e;
  --color-neutral-950: #031314;

  --color-bg: #00d09e;
  --color-card: #ffffff;
  --color-card-medium: #ffffff;
  --color-surface-pill: #dff7e2;
  --color-progress-bar: #0e3e3e;

  --color-text: #000000;
  --color-text-muted: #737373;
  --color-text-tertiary: #9aa0ad;

  --color-tab-active: #00d09e;
  --color-tab-inactive: #737373;
  --color-tab-background: #dff7e2;

  --color-income: #00d09e;
  --color-expense: #0068ff;
  --color-savings: #6db6fe;

  --color-border: #dff7e2;
  --color-progress: #dff7e2;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-neutral-50: #031314;
    --color-neutral-100: #052224;
    --color-neutral-200: #093030;
    --color-neutral-300: #0e3e3e;
    --color-neutral-400: #525252;
    --color-neutral-500: #737373;
    --color-neutral-600: #a3a3a3;
    --color-neutral-700: #d4d4d4;
    --color-neutral-800: #dff7e2;
    --color-neutral-900: #f1fff3;
    --color-neutral-950: #fafafa;

    --color-bg: #031314;
    --color-card: #052224;
    --color-card-medium: #093030;
    --color-surface-pill: #0e3e3e;
    --color-progress-bar: #0e3e3e;

    --color-text: #ffffff;
    --color-text-muted: #9aa0ad;
    --color-text-tertiary: #737373;

    --color-tab-active: #00d09e;
    --color-tab-inactive: #9aa0ad;
    --color-tab-background: #093030;

    --color-income: #00d09e;
    --color-expense: #4daaff;
    --color-savings: #6db6fe;

    --color-border: #0e3e3e;
    --color-progress: #0e3e3e;
  }
}
```

### Setup and usage

Use semantic tokens in components instead of hardcoding hex values. For example, `bg-bg`, `text-text`, `text-text-muted`, and `border-border` automatically adapt to dark mode because the underlying CSS variables change.

Use primitive tokens like `bg-primary-500` when you need a specific brand value, and semantic tokens like `bg-card` or `bg-surface-pill` when the element has a meaning in the UI.

## 2) `tailwind.config.js`

This file bridges CSS variables into NativeWind utility names. It also tells Tailwind where to scan for classes.

### File code

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      primary: {
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },

      blue: {
        50: 'var(--color-blue-50)',
        100: 'var(--color-blue-100)',
        200: 'var(--color-blue-200)',
        300: 'var(--color-blue-300)',
        400: 'var(--color-blue-400)',
        500: 'var(--color-blue-500)',
        600: 'var(--color-blue-600)',
        700: 'var(--color-blue-700)',
        800: 'var(--color-blue-800)',
        900: 'var(--color-blue-900)',
      },

      warning: {
        50: 'var(--color-warning-50)',
        100: 'var(--color-warning-100)',
        200: 'var(--color-warning-200)',
        300: 'var(--color-warning-300)',
        400: 'var(--color-warning-400)',
        500: 'var(--color-warning-500)',
        600: 'var(--color-warning-600)',
        700: 'var(--color-warning-700)',
        800: 'var(--color-warning-800)',
        900: 'var(--color-warning-900)',
      },

      error: {
        50: 'var(--color-error-50)',
        100: 'var(--color-error-100)',
        200: 'var(--color-error-200)',
        300: 'var(--color-error-300)',
        400: 'var(--color-error-400)',
        500: 'var(--color-error-500)',
        600: 'var(--color-error-600)',
        700: 'var(--color-error-700)',
        800: 'var(--color-error-800)',
        900: 'var(--color-error-900)',
      },

      neutral: {
        50: 'var(--color-neutral-50)',
        100: 'var(--color-neutral-100)',
        200: 'var(--color-neutral-200)',
        300: 'var(--color-neutral-300)',
        400: 'var(--color-neutral-400)',
        500: 'var(--color-neutral-500)',
        600: 'var(--color-neutral-600)',
        700: 'var(--color-neutral-700)',
        800: 'var(--color-neutral-800)',
        900: 'var(--color-neutral-900)',
        950: 'var(--color-neutral-950)',
      },

      surface: {
        light: 'var(--color-surface-light)',
        deep: 'var(--color-surface-deep)',
        dark: 'var(--color-surface-dark)',
        medium: 'var(--color-surface-medium)',
        raised: 'var(--color-surface-raised)',
      },

      tab: {
        active: 'var(--color-tab-active)',
        inactive: 'var(--color-tab-inactive)',
        background: 'var(--color-tab-background)',
      },

      finance: {
        income: 'var(--color-income)',
        expense: 'var(--color-expense)',
        savings: 'var(--color-savings)',
      },

      bg: 'var(--color-bg)',
      card: 'var(--color-card)',
      'card-medium': 'var(--color-card-medium)',
      'surface-pill': 'var(--color-surface-pill)',
      text: 'var(--color-text)',
      'text-muted': 'var(--color-text-muted)',
      'text-tertiary': 'var(--color-text-tertiary)',
      border: 'var(--color-border)',
      progress: 'var(--color-progress)',
      'progress-bar': 'var(--color-progress-bar)',
    },
    fontFamily: {
      poppins: ['Poppins'],
      arial: ['Arial'],
    },
    spacing: {},
  },
  darkMode: 'media',
  plugins: [],
};
```

### Setup and usage

Tailwind classes should reference semantic names from this file. Examples:

- `bg-bg` for the app background
- `bg-card` for card surfaces
- `text-text` for primary text
- `text-text-muted` for secondary text
- `border-border` for dividers and outlines
- `bg-primary-500` for the brand accent
- `bg-surface-pill` for rounded containers and chips

Because these classes point to CSS variables, updating `global.css` changes the app everywhere those classes are used.

## 3) `src/utils/responsive.ts`

This file contains the low-level responsive helpers. It converts screen size into actual pixel values.

### File code

```ts
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 375;

export const wp = (widthPercent: number): number => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const hp = (heightPercent: number): number => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

export const rfs = (fontSize: number): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const rs = (size: number): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  return Math.round(size + (scale - 1) * size * factor);
};

export const breakpoints = {
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414,
  isTablet: SCREEN_WIDTH >= 768,
};

export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};
```

### Setup and usage

Use these helpers when you need direct numeric values in React Native styles.

- `wp` and `hp` are useful for layout dimensions tied to screen percentage.
- `rfs` is for responsive font sizes.
- `rs` is for spacing that should scale with the device width.
- `moderateScale` is the default choice for controls, radii, and icons because it scales more gently.

## 4) `src/theme/scale.ts`

This file wraps the responsive helpers into a semantic scale object named `S`. It is the preferred way to use spacing, font sizes, radii, icons, and common component sizes.

### File code

```ts
import { rs, rfs, moderateScale } from '../utils/responsive';

export const S = {
  space: {
    xs: rs(4),
    sm: rs(8),
    md: rs(12),
    lg: rs(16),
    xl: rs(20),
    '2xl': rs(24),
    '3xl': rs(28),
    '4xl': rs(32),
    '5xl': rs(36),
    '6xl': rs(40),
    '7xl': rs(48),
    '8xl': rs(64),
    '9xl': rs(80),
    paddingHorizontal: rs(36),
    paddingVertical: rs(32),
  },

  fs: {
    xxl: rfs(32),
    xl: rfs(24),
    lg: rfs(20),
    md_h: rfs(18),
    md: rfs(16),
    sm: rfs(14),
    xs: rfs(12),
    xxs: rfs(11),
    tiny: rfs(10),
    labelLg: rfs(14),
    labelMd: rfs(13),
    labelSm: rfs(11),
    tab: rfs(13),
  },

  radius: {
    DEFAULT: moderateScale(5),
    sm: moderateScale(8),
    md: moderateScale(10),
    lg: moderateScale(12),
    xl: moderateScale(16),
    xxl: moderateScale(20),
    xxxl: moderateScale(24),
    full: 9999,
  },

  icon: {
    xs: moderateScale(10),
    sm: moderateScale(16),
    md: moderateScale(20),
    lg: moderateScale(24),
    xl: moderateScale(32),
  },

  size: {
    docPreview: moderateScale(200),
    avatarSm: moderateScale(32),
    avatarMd: moderateScale(48),
    avatarLg: moderateScale(64),
  },
} as const;
```

### Setup and usage

Use `S` whenever you need a numeric value in style props.

Examples:

- `paddingHorizontal: S.space.paddingHorizontal`
- `marginTop: S.space.xl`
- `fontSize: S.fs.sm`
- `lineHeight: S.fs.sm * 1.45`
- `borderRadius: S.radius.lg`
- `width: S.size.avatarMd`
- `height: S.icon.lg`

This keeps sizing consistent across the app and avoids hardcoded numbers scattered through screens.

## 5) How the pieces work together

Use this order of preference:

1. Semantic NativeWind classes for color and layout, such as `bg-bg`, `text-text`, `border-border`.
2. `S` tokens for numeric style values.
3. `moderateScale`, `rs`, `rfs`, `wp`, and `hp` only when a value is not covered by `S`.
4. Raw hex values only for exceptional cases, such as third-party libraries that cannot consume CSS variables.

### Example usage pattern

```tsx
<SafeAreaView className="flex-1 bg-bg" edges={['top']}>
  <View
    style={{
      paddingHorizontal: S.space.paddingHorizontal,
      paddingTop: S.space.md,
      borderRadius: S.radius.xl,
    }}
  >
    <Text className="text-text" style={{ fontSize: S.fs.lg }}>
      Dashboard
    </Text>
    <Text className="text-text-muted" style={{ fontSize: S.fs.sm }}>
      Responsive and theme-aware
    </Text>
  </View>
</SafeAreaView>
```

## 6) Practical setup checklist

When adding a new theme token or responsive size:

1. Add or update the CSS variable in `global.css`.
2. Map the variable in `tailwind.config.js` if it should be used as a NativeWind class.
3. Keep `src/theme/colors.ts` in sync for non-`className` use cases.
4. Add a semantic token in `src/theme/scale.ts` if it is a numeric size used across screens.
5. Use the token in the component instead of hardcoding a value.

## 7) `src/theme/colors.ts` for non-`className` usage

Use `src/theme/colors.ts` when `className` is not available or not supported. Common cases:

- third-party chart libraries (`react-native-gifted-charts`, etc.)
- SVG/icon props (`color`, `fill`, `stroke`)
- inline style objects where semantic classes are not practical
- API contracts that expect literal hex strings

### File code

```ts
export const colors = {
  /**
   * Keep this file in sync with `global.css` CSS variables.
   * These hex values are used in places where CSS vars can't be consumed
   * (e.g. some chart libs, non-NativeWind style props).
   */

  // Brand (Figma)
  primary50: '#F1FFF3',
  primary100: '#DFF7E2',
  primary200: '#AEEFD4',
  primary300: '#6DE6BE',
  primary400: '#1FCEA9',
  primary500: '#00D09E',

  // Blue (Figma)
  blue300: '#6DB6FE',
  blue400: '#4DAAFF',
  blue500: '#3299FF',
  blue700: '#0068FF',

  // Surface (Figma / dark mode)
  surfaceDeep: '#031314',
  surfaceDark: '#052224',
  surfaceMedium: '#093030',
  surfaceRaised: '#0E3E3E',

  // Semantic aliases
  text: '#000000',
  textMuted: '#737373',
  border: '#E5E5E5',
  income: '#00D09E',
  expense: '#0068FF',
  savings: '#6DB6FE',
} as const;
```

### Usage examples (where `className` is unavailable)

```tsx
import { Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { colors } from '../theme/colors';

<BarChart
  data={data}
  frontColor={colors.primary500}
  yAxisTextStyle={{ color: colors.surfaceDark }}
/>

<Text style={{ color: colors.textMuted }}>Last updated today</Text>
```

```tsx
import { BellIcon } from '../assets/icons';
import { colors } from '../theme/colors';

<BellIcon color={colors.surfaceDark} size={20} />;
```

Rule of thumb:

- Prefer NativeWind semantic classes first (`text-text`, `bg-card`, etc.).
- Use `colors.ts` when a component only accepts direct color values instead of `className`.

## 8) Summary

The setup is intentionally split:

- `global.css` owns color truth and dark mode switching.
- `tailwind.config.js` exposes those colors to NativeWind.
- `responsive.ts` provides raw scaling math.
- `scale.ts` turns the math into stable app-wide tokens.

That structure keeps styling consistent, responsive, and easy to evolve without touching every screen.
