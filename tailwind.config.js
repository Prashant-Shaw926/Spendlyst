/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      /* Primary — Caribbean Green #00D09E as 500
         Honeydew #F1FFF3 as 50, Light Green #DFF7E2 as 100 */
      primary: {
        50:  'var(--color-primary-50)',
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

      /* Blue — Light Blue #6DB6FE (300), Vivid Blue #3299FF (500), Ocean Blue #0068FF (700) */
      blue: {
        50:  'var(--color-blue-50)',
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

      /* Warning — not in palette, retained from previous design system */
      warning: {
        50:  'var(--color-warning-50)',
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

      /* Error — not in palette, retained from previous design system */
      error: {
        50:  'var(--color-error-50)',
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

      /* Neutral — anchored to palette teal darks at deep end:
         Cyprus #0E3E3E (900), Fence Green #052224 (→ dark surface),
         Void #031314 (950) */
      neutral: {
        50:  'var(--color-neutral-50)',
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

      /* Dark teal surface scale — palette named colors:
         deep   = Void        #031314
         dark   = Fence Green #052224
         medium = (mid-point) #093030
         raised = Cyprus      #0E3E3E */
      surface: {
        light: 'var(--color-surface-light)',
        deep:   'var(--color-surface-deep)',
        dark:   'var(--color-surface-dark)',
        medium: 'var(--color-surface-medium)',
        raised: 'var(--color-surface-raised)',
      },

      /* Tab bar */
      tab: {
        active:     'var(--color-tab-active)',
        inactive:   'var(--color-tab-inactive)',
        background: 'var(--color-tab-background)',
      },

      /* Finance semantic colors */
      finance: {
        income:  'var(--color-income)',
        expense: 'var(--color-expense)',
        savings: 'var(--color-savings)',
      },

      /* Single-value semantic tokens */
      bg:             'var(--color-bg)',
      card:           'var(--color-card)',
      'card-medium':  'var(--color-card-medium)',
      'surface-pill': 'var(--color-surface-pill)',
      text:           'var(--color-text)',
      'text-muted':   'var(--color-text-muted)',
      'text-tertiary':'var(--color-text-tertiary)',
      border:         'var(--color-border)',
      progress:       'var(--color-progress)',
    },
    fontFamily: {
      poppins: ['Poppins'],
      arial:   ['Arial'],
    },
    spacing: {},
  },
  darkMode: 'media',
  plugins: [],
};