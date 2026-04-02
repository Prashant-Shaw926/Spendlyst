export const colors = {
  primary: '#6C63FF',
  primaryLight: '#EAE8FF',
  primaryDark: '#4B44CC',

  income: '#22C55E',
  expense: '#EF4444',
  savings: '#F59E0B',

  background: '#F8F7FF',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F0FA',

  textPrimary: '#1A1A2E',
  textSecondary: '#6B6B8A',
  textTertiary: '#A0A0B8',

  border: '#E8E7F5',
  borderLight: '#F2F1FA',

  tabActive: '#6C63FF',
  tabInactive: '#A0A0B8',
  tabBackground: '#FFFFFF',
} as const;

export type Colors = typeof colors;