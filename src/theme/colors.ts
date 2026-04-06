export const primitives = {
  white: '#FFFFFF',
  black: '#000000',

  primary50: '#F1FFF3',
  primary100: '#DFF7E2',
  primary200: '#AAEFD4',
  primary300: '#6DE6BE',
  primary400: '#1FCEA9',
  primary500: '#00D09E',
  primary600: '#00A87E',
  primary700: '#007F5F',
  primary800: '#005640',
  primary900: '#002E22',

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
  chartRule: 'rgba(50,153,255,0.42)',
  chartAxis: 'rgba(5,34,36,0.75)',

  warning50: '#FEFCE8',
  warning100: '#FEF9C3',
  warning200: '#FEF08A',
  warning300: '#FDE047',
  warning400: '#FACC15',
  warning500: '#EAB308',
  warning600: '#CA8A04',
  warning700: '#A16207',
  warning800: '#854D0E',
  warning900: '#713F12',

  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error300: '#FCA5A5',
  error400: '#F87171',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',
  error800: '#991B1B',
  error900: '#7F1D1D',

  neutral50: '#FAFAFA',
  neutral100: '#F1FFF3',
  neutral200: '#DFF7E2',
  neutral300: '#D4D4D4',
  neutral400: '#A3A3A3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#0E3E3E',
  neutral950: '#031314',

  surfaceLight: '#FFFFFF',
  surfaceDeep: '#031314',
  surfaceDark: '#052224',
  surfaceMedium: '#093030',
  surfaceRaised: '#0E3E3E',
} as const;

export const lightColors = {
  background: '#00D09E',
  secondaryBackground: '#F1FFF3',
  card: '#FFFFFF',
  secondaryCard: '#DFF7E2',
  pill: '#DFF7E2',
  progressBar: '#0E3E3E',

  title: '#052224',
  text: '#000000',
  textMuted: '#737373',
  textTertiary: '#9AA0AD',

  tabActive: '#00D09E',
  tabInactive: '#737373',
  tabBackground: '#DFF7E2',

  income: '#00D09E',
  expense: '#0068FF',
  savings: '#6DB6FE',

  border: '#DFF7E2',
  progress: '#DFF7E2',
} as const;

export const darkColors = {
  background: '#031314',
  secondaryBackground: '#052224',
  card: '#052224',
  secondaryCard: '#093030',
  pill: '#0E3E3E',
  progressBar: '#0E3E3E',

  title: '#FFFFFF',
  text: '#FFFFFF',
  textMuted: '#9AA0AD',
  textTertiary: '#737373',

  tabActive: '#00D09E',
  tabInactive: '#9AA0AD',
  tabBackground: '#093030',

  income: '#00D09E',
  expense: '#4DAAFF',
  savings: '#6DB6FE',

  border: '#0E3E3E',
  progress: '#0E3E3E',
} as const;

export function getSemanticColors(isDark: boolean) {
  return isDark ? darkColors : lightColors;
}

export const colors = {
  ...primitives,
} as const;

export type Colors = typeof colors;
