import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { S } from '../../theme/scale'
import { NotificationIcon } from '../../assets/icons'
import { moderateScale } from '../../utils/responsive'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TabHeaderProps {
  /** Primary title text */
  title: string

  /**
   * Controls title text alignment.
   * @default 'left'
   */
  titleAlign?: 'left' | 'center'

  /**
   * Subtitle rendered below the title (e.g. "Good Morning").
   * Only rendered when titleAlign is 'left'.
   */
  subtitle?: string

  /**
   * When provided, renders a back arrow on the left.
   * Omit entirely to hide the back button.
   */
  onBackPress?: () => void

  /**
   * When provided, renders a bell icon button on the right.
   * Omit entirely to hide the notification button.
   */
  onNotificationPress?: () => void

  /** Badge count shown on the bell. Hidden when 0 or undefined. */
  notificationCount?: number

  /**
   * Raw hex color for icon tint — Ionicons cannot consume CSS vars.
   * Defaults to '#FFFFFF'.
   * Pass `useColorScheme() === 'dark' ? '#FFFFFF' : '#000000'` at the
   * call-site for accurate light/dark tinting.
   */
  iconColor?: string
}

// ─── Bell button ─────────────────────────────────────────────────────────────

interface BellButtonProps {
  onPress: () => void
  count?: number
  iconColor: string
}

const BellButton: React.FC<BellButtonProps> = ({ onPress, count, iconColor }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="items-center justify-center rounded-full bg-card border-border"
    style={{
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      // borderWidth: 1,
    }}
  >
    {/* <Ionicons name="notifications-outline" size={S.icon.md} color={iconColor} /> */}
    <NotificationIcon width={24} height={24} color={iconColor} />

    {!!count && count > 0 && (
      <View
        className="absolute bg-error-500 items-center justify-center rounded-full"
        style={{
          top: S.space.xs / 2,
          right: S.space.xs / 2,
          width: S.icon.xs + 4,
          height: S.icon.xs + 4,
        }}
      >
        <Text
          className="text-white font-poppins"
          style={{ fontSize: S.fs.tiny }}
        >
          {count > 9 ? '9+' : count}
        </Text>
      </View>
    )}
  </TouchableOpacity>
)

// ─── Phantom spacer — mirrors a slot's width to keep centred titles balanced ──

const SlotSpacer: React.FC = () => (
  <View style={{ width: S.size.avatarSm }} />
)

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * TabHeader — unified header for all Spendlyst screens.
 *
 * Back button and bell button are both optional — provide their `onPress`
 * handler to render them; omit to hide. `titleAlign` controls whether the
 * title sits left-aligned (with optional subtitle) or perfectly centred.
 *
 * When `titleAlign="center"`, a phantom spacer is injected on whichever side
 * is empty so the title stays optically centred regardless of which slots
 * are occupied.
 *
 * Theme rules:
 *   • Colors via `className` only (NativeWind CSS vars — no `dark:` prefix).
 *   • Sizing & spacing via `S.*` tokens in `style` only.
 *   • `iconColor` is the sole raw hex value (icon libs can't consume CSS vars).
 */
const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  titleAlign = 'left',
  subtitle,
  onBackPress,
  onNotificationPress,
  notificationCount,
  iconColor = '#FFFFFF',
}) => {
  const hasBack = !!onBackPress
  const hasBell = !!onNotificationPress
  const isCentered = titleAlign === 'center'

  return (
    <View
      className="flex-row items-center"
      style={{
        paddingHorizontal: S.space.paddingHorizontal,
        paddingVertical: S.space.paddingVertical,
        gap: S.space.sm,
      }}
    >
      {/* ── Left slot: back button OR phantom spacer ── */}
      {hasBack ? (
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.7}
          className="items-center justify-center"
          style={{ width: S.size.avatarSm, height: S.size.avatarSm }}
        >
          {/* <Ionicons name="arrow-back" size={S.icon.lg} color={iconColor} /> */}
          <Text>Back</Text>
        </TouchableOpacity>
      ) : (
        isCentered && hasBell && <SlotSpacer />
      )}

      {/* ── Title ── */}
      {isCentered ? (
        <Text
          className="text-text font-poppins text-center"
          style={{ flex: 1, fontSize: S.fs.md_h, fontWeight: '600' }}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            className="text-text font-poppins"
            style={{ fontSize: S.fs.lg, fontWeight: '700' }}
            numberOfLines={1}
          >
            {title}
          </Text>

          {!!subtitle && (
            <Text
              className="text-text-muted font-poppins"
              style={{ fontSize: S.fs.xs }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}

      {/* ── Right slot: bell button OR phantom spacer ── */}
      {hasBell ? (
        <BellButton
          onPress={onNotificationPress}
          count={notificationCount}
          iconColor={iconColor}
        />
      ) : (
        isCentered && hasBack && <SlotSpacer />
      )}
    </View>
  )
}

export default TabHeader