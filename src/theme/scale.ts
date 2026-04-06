
// src/theme/scale.ts
import { rs, rfs, moderateScale } from "../utils/responsive";

export const S = {
  // ─── Spacing ──────────────────────────────────────────────
  space: {
    xs:           rs(4),
    sm:           rs(8),
    md:           rs(12),
    lg:           rs(16),
    xl:           rs(20),
    "2xl":        rs(24),
    "3xl":        rs(28),
    "4xl":        rs(32),
    "5xl":        rs(36),
    "6xl":        rs(40),
    "7xl":        rs(48),
    "8xl":        rs(64),
    "9xl":        rs(80),
    paddingHorizontal: rs(36),
    paddingVertical:   rs(32),
  },

  // ─── Font sizes ───────────────────────────────────────────
  fs: {
    // heading scale
    xxl:       rfs(32),   // heading-xl
    xl:        rfs(24),   // heading-l
    lg:        rfs(20),   // heading-m
    md_h:      rfs(18),   // heading-s

    // body scale
    md:        rfs(16),   // body-lg
    sm:        rfs(14),   // body-md  ← most body text
    xs:        rfs(12),   // body-sm
    xxs:       rfs(11),   // label-sm / small captions
    tiny:      rfs(10),   // status badges etc.

    // label / tab aliases (point to same values)
    labelLg:   rfs(14),
    labelMd:   rfs(13),
    labelSm:   rfs(11),
    tab:       rfs(13),
  },

  // ─── Border radii (mirrors tailwind borderRadius tokens) ──
  radius: {
    DEFAULT: moderateScale(5),
    sm:      moderateScale(8),
    md:      moderateScale(10),
    lg:      moderateScale(12),
    xl:      moderateScale(16),
    xxl:     moderateScale(20),
    xxxl:    moderateScale(24),
    full:    9999,
  },

  // ─── Icon / touch target sizes ────────────────────────────
  icon: {
    xs:  moderateScale(10),   // dot indicators
    sm:  moderateScale(16),
    md:  moderateScale(20),
    lg:  moderateScale(24),
    xl:  moderateScale(32),
  },

  // ─── Fixed component sizes ────────────────────────────────
  size: {
    docPreview:    moderateScale(200),  // document image preview height
    avatarSm:      moderateScale(32),
    avatarMd:      moderateScale(48),
    avatarLg:      moderateScale(64),
  },

  // ─── Shadows ──────────────────────────────────────────────
  shadow: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
    },
  },
} as const;