import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { CalendarIcon, StackCashIcon } from '../../shared/FinanceIcons';
import type { FinanceIconProps } from '../../shared/FinanceIcons';
import { colors, getSemanticColors } from '../../../theme/colors';
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
  const semanticColors = getSemanticColors(isDark);
  const isPlanned = item.status.toLowerCase() === 'planned';
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
        opacity: isPlanned ? 0.9 : 1,
        ...S.shadow.soft,
      }}
    >
      {/* Header Section */}
      <View className="flex-row items-center">
        <View
          className="items-center justify-center"
          style={{
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: S.radius.xl,
            backgroundColor: isPlanned ? (isDark ? colors.surfaceMedium : colors.primary50) : item.iconBg,
          }}
        >
          <item.Icon color={isPlanned ? semanticColors.textMuted : item.tint} size={24} />
        </View>

        <View
          className="flex-1"
          style={{ gap: 2, paddingHorizontal: S.space.md }}
        >
          <Text
            className="text-title"
            style={{
              fontSize: S.fs.md_h,
              fontFamily: 'Poppins-Bold',
              color: isPlanned ? semanticColors.text : semanticColors.title,
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
          style={{
            borderRadius: S.radius.lg,
            backgroundColor: isPlanned 
              ? (isDark ? 'rgba(0,208,158,0.15)' : 'rgba(0,208,158,0.1)') 
              : (isDark ? colors.surfaceMedium : colors.primary50),
            paddingHorizontal: S.space.sm,
            paddingVertical: rs(4),
            borderWidth: isPlanned ? 1 : 0,
            borderColor: isPlanned ? 'rgba(0,208,158,0.3)' : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: rs(10),
              fontFamily: 'Poppins-Bold',
              color: isPlanned ? colors.primary500 : item.tint,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Progress & Amounts Section */}
      <View style={{ gap: S.space.md }}>
        <View className="flex-row items-baseline justify-between">
          <View className="flex-row items-baseline" style={{ gap: S.space.sm }}>
            <Text
              className="text-title"
              style={{
                fontSize: S.fs.xl,
                fontFamily: 'Poppins-Bold',
                color: isPlanned ? semanticColors.text : semanticColors.title,
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
              color: isPlanned ? semanticColors.textMuted : item.tint,
            }}
          >
            {Math.round(item.progress)}%
          </Text>
        </View>

        <View
          className="overflow-hidden rounded-full bg-progress"
          style={{
            height: rs(10),
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          }}
        >
          <View
            style={{
              height: '100%',
              width: progressWidth,
              borderRadius: S.radius.full,
              backgroundColor: isPlanned ? semanticColors.textMuted : item.tint,
              opacity: isPlanned ? 0.5 : 1,
            }}
          />
        </View>
      </View>

      {/* Footer Details Section */}
      <View
        className="flex-row items-center justify-between border-t border-border"
        style={{
          paddingTop: S.space.md,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <InfoItem
          label="Left"
          value={item.leftAmount}
          icon={<StackCashIcon color={isPlanned ? semanticColors.textMuted : item.tint} size={14} />}
        />

        <View
          className="bg-border"
          style={{ 
            width: 1, 
            height: rs(14),
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }}
        />

        <InfoItem
          label="Plan"
          value={item.monthlyPlan}
          icon={<CalendarIcon color={semanticColors.textMuted} size={14} />}
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
      activeOpacity={1}
      onPress={() => onPress(item)}
    >
      {content}
    </TouchableOpacity>
  );
}
