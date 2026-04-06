import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { CalendarIcon, StackCashIcon } from '../../shared/Icons';
import type { FinanceIconProps } from '../../shared/Icons';
import { colors, darkColors, lightColors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { moderateScale, rs } from '../../../utils/responsive';

export type GoalCardItem = {
  id: string;
  title: string;
  subtitle: string;
  savedAmount: string;
  targetAmount: string;
  leftAmount: string;
  dueLabel: string;
  monthlyPlan: string;
  progress: number;
  tint: string;
  iconBg: string;
  status: string;
  Icon: React.ComponentType<FinanceIconProps>;
};

export type GoalCardProps = {
  item: GoalCardItem;
  onPress?: (item: GoalCardItem) => void;
};

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center" style={{ gap: S.space.xs }}>
      {icon}
      <Text
        className="text-text-muted"
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
        }}
      >
        {label}:{' '}
      </Text>
      <Text
        className="text-title"
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-SemiBold',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function GoalCard({ item, onPress }: GoalCardProps) {
  const isDark = useColorScheme() === 'dark';
  const status = item.status.toLowerCase();
  const isPlanned = status === 'planned';
  const isCompleted = status === 'completed';

  const plannedMutedColor = isDark
    ? darkColors.textMuted
    : lightColors.textMuted;

  // Status-based colors
  const statusColors = {
    // Both active and completed use the primary brand color for uniformity
    primary: isPlanned ? plannedMutedColor : colors.primary500,
    amount: isPlanned
      ? isDark
        ? darkColors.text
        : lightColors.text
      : colors.primary500,
    badge: isPlanned ? colors.primary500 : isCompleted ? colors.primary500 : colors.primary500,
    badgeBg: isPlanned
      ? 'bg-[#00D09E1A] dark:bg-[#00D09E26]'
      : 'bg-primary-50 dark:bg-surface-medium',
  };

  const progressBarColor = statusColors.primary;
  const percentColor = statusColors.primary;

  const progressWidth = `${Math.max(
    0,
    Math.min(100, item.progress),
  )}%` as `${number}%`;

  const content = (
    <View
      className="bg-card"
      style={{
        borderRadius: S.radius.xxxl,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
        gap: S.space.xl,
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        opacity: isPlanned ? 0.8 : 1,
        ...S.shadow.soft,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="items-center justify-center bg-primary-100 dark:bg-surface-medium"
          style={{
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: S.radius.xl,
          }}
        >
          <item.Icon color={statusColors.primary} size={24} />
        </View>

        <View
          className="flex-1"
          style={{ gap: 2, paddingHorizontal: S.space.md }}
        >
          <Text
            className={isPlanned ? 'text-text' : 'text-title'}
            style={{
              fontSize: S.fs.md_h,
              fontFamily: 'Poppins-Bold',
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text
            className="text-text-muted"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}
          >
            {item.subtitle}
          </Text>
        </View>

        <View
          className={`flex-row items-center justify-center ${statusColors.badgeBg}`}
          style={{
            borderRadius: S.radius.lg,
            paddingHorizontal: S.space.sm,
            paddingVertical: rs(4),
            borderWidth: isPlanned ? 1 : 0,
            borderColor: isPlanned ? '#00D09E4D' : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: rs(9),
              fontFamily: 'Poppins-Bold',
              color: statusColors.badge,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={{ gap: S.space.md }}>
        <View className="flex-row items-baseline justify-between">
          <View className="flex-row items-baseline" style={{ gap: S.space.sm }}>
            <Text
              style={{
                fontSize: S.fs.xl,
                fontFamily: 'Poppins-Bold',
                color: statusColors.amount,
              }}
            >
              {item.savedAmount}
            </Text>
            <Text
              className="text-text-muted"
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-Medium',
                marginBottom: rs(2),
              }}
            >
              of {item.targetAmount}
            </Text>
          </View>
          <Text
            style={{
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Bold',
              color: percentColor,
            }}
          >
            {Math.round(item.progress)}%
          </Text>
        </View>

        <View
          className="overflow-hidden rounded-full bg-black/[0.05] dark:bg-white/[0.05]"
          style={{
            height: rs(10),
          }}
        >
          <View
            style={{
              height: '100%',
              width: progressWidth,
              borderRadius: S.radius.full,
              backgroundColor: progressBarColor,
              opacity: isPlanned ? 0.6 : 1,
            }}
          />
        </View>
      </View>

      <View
        className="flex-row items-center justify-between border-t border-neutral-200 dark:border-white/10"
        style={{
          paddingTop: S.space.md,
        }}
      >
        <InfoItem
          label="Left"
          value={item.leftAmount}
          icon={
            <StackCashIcon
              color={isPlanned ? plannedMutedColor : colors.primary500}
              size={14}
            />
          }
        />

        <View
          className="bg-neutral-200 dark:bg-white/10"
          style={{
            width: 1.5,
            height: rs(14),
          }}
        />

        <InfoItem
          label="Plan"
          value={item.monthlyPlan}
          icon={
            <CalendarIcon
              color={isPlanned ? plannedMutedColor : colors.primary500}
              size={14}
            />
          }
        />
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.9}
      onPress={() => onPress(item)}
    >
      {content}
    </TouchableOpacity>
  );
}
