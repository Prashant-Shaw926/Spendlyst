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
  primary600: '#00A87E',
  primary700: '#007F5F',
  primary800: '#005640',
  primary900: '#002E22',

  // Blue (Figma)
  blue50: '#EBF5FF',
  blue100: '#CCE5FF',
  blue200: '#99CCFF',
  blue300: '#6DB6FE',
  blue400: '#4DAAFF',
  blue500: '#3299FF',
  blue600: '#1A88EE',
  blue700: '#0068FF',
  blue800: '#0050CC',
  blue900: '#003899',

  // Surface (Figma / dark mode)
  surfaceDeep: '#031314',
  surfaceDark: '#052224',
  surfaceMedium: '#093030',
  surfaceRaised: '#0E3E3E',

  // Semantic (light)
  bg: '#F1FFF3',
  card: '#FFFFFF',
  cardMedium: '#FFFFFF',
  surfacePill: '#F5F5F5',

  // Text (light)
  text: '#000000',
  textMuted: '#737373',

  // UI
  border: '#E5E5E5',
  progress: '#E5E5E5',

  // Compatibility aliases (older names used across the app)
  primary: '#00D09E',
  primaryLight: '#DFF7E2',
  primaryDark: '#052224',
  background: '#F1FFF3',
  surface: '#FFFFFF',
  surfaceSecondary: '#F5F5F5',
  textPrimary: '#000000',
  textSecondary: '#737373',
  textTertiary: '#9AA0AD',
  borderLight: '#E5E5E5',
  tabActive: '#00D09E',
  tabInactive: '#737373',
  tabBackground: '#DFF7E2',

  // Finance semantics
  income: '#00D09E',
  expense: '#0068FF',
  savings: '#6DB6FE',
} as const;

export type Colors = typeof colors;