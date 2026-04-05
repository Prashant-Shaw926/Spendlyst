import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { CalendarIcon } from '../shared/FinanceIcons';
import type { FinanceIconProps } from '../shared/FinanceIcons';
import { getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';

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

function InfoColumn({
  label,
  value,
  align = 'left',
}: {
  label: string;
  value: string;
  align?: 'left' | 'center' | 'right';
}) {
  const alignmentClassName =
    align === 'center'
      ? 'items-center'
      : align === 'right'
        ? 'items-end'
        : 'items-start';

  return (
    <View className={`flex-1 ${alignmentClassName}`} style={{ gap: S.space.xs }}>
      <Text
        className="text-text-muted"
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
        }}
      >
        {label}
      </Text>

      <Text
        className="text-text"
        style={{
          fontSize: S.fs.sm,
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
  const progressWidth = `${Math.max(0, Math.min(100, item.progress))}%` as `${number}%`;

  const content = (
    <View
      className="bg-card border border-border dark:border-transparent dark:bg-secondary-card"
      style={{
        borderRadius: S.radius.xxxl,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
        gap: S.space.lg,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="items-center justify-center"
          style={{
            width: S.size.avatarLg - S.space.xs,
            height: S.size.avatarLg - S.space.xs,
            borderRadius: S.radius.xxl,
            backgroundColor: item.iconBg,
          }}
        >
          <item.Icon color={item.tint} size={28} />
        </View>

        <View className="flex-1" style={{ gap: S.space.xs, paddingHorizontal: S.space.md }}>
          <Text
            className="text-text"
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
          style={{
            borderRadius: S.radius.xl,
            backgroundColor: item.iconBg,
            paddingHorizontal: S.space.sm,
            paddingVertical: S.space.sm,
          }}
        >
          <Text
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: item.tint,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={{ gap: S.space.sm }}>
        <View
          className="overflow-hidden rounded-full bg-progress"
          style={{
            height: S.space.sm + S.space.xs,
          }}
        >
          <View
            style={{
              height: '100%',
              width: progressWidth,
              borderRadius: S.radius.sm,
              backgroundColor: item.tint,
            }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <Text
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: item.tint,
            }}
          >
            {Math.round(item.progress)}% funded
          </Text>

          <View className="flex-row items-center" style={{ gap: S.space.xs }}>
            <CalendarIcon color={semanticColors.textMuted} size={14} />
            <Text
              className="text-text-muted"
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-Regular',
              }}
            >
              {item.dueLabel}
            </Text>
          </View>
        </View>
      </View>

      <View
        className="bg-secondary-bg dark:bg-secondary-card"
        style={{
          borderRadius: S.radius.xxl,
          paddingHorizontal: S.space.md,
          paddingVertical: S.space.md,
          gap: S.space.md,
        }}
      >
        <View className="flex-row items-center" style={{ gap: S.space.md }}>
          <InfoColumn label="Saved" value={item.savedAmount} />

          <View
            className="bg-border"
            style={{
              width: 1,
              height: S.size.avatarSm + S.space.xs,
            }}
          />

          <InfoColumn label="Target" value={item.targetAmount} align="center" />

          <View
            className="bg-border"
            style={{
              width: 1,
              height: S.size.avatarSm + S.space.xs,
            }}
          />

          <InfoColumn label="Left" value={item.leftAmount} align="right" />
        </View>

        <View
          className="bg-pill dark:bg-secondary-bg"
          style={{
            borderRadius: S.radius.xl,
            paddingHorizontal: S.space.md,
            paddingVertical: S.space.sm,
          }}
        >
          <Text
            className="text-title"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
            }}
          >
            Saving plan: {item.monthlyPlan}
          </Text>
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => onPress(item)}>
      {content}
    </TouchableOpacity>
  );
}
