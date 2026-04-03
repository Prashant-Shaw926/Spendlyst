import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { FinanceIconProps } from '../shared/FinanceIcons';
import { CalendarIcon } from '../shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

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
  isDark: boolean;
  onPress?: (item: GoalCardItem) => void;
};

function InfoColumn({
  label,
  value,
  align = 'left',
  isDark,
}: {
  label: string;
  value: string;
  align?: 'left' | 'center' | 'right';
  isDark: boolean;
}) {
  return (
    <View style={{ flex: 1, alignItems: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end' }}>
      <Text
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
          color: isDark ? 'rgba(255,255,255,0.68)' : colors.textMuted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: S.fs.sm,
          fontFamily: 'Poppins-SemiBold',
          color: isDark ? colors.card : colors.surfaceDark,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function GoalCard({ item, isDark, onPress }: GoalCardProps) {
  const content = (
    <View
      style={{
        borderRadius: moderateScale(28),
        backgroundColor: isDark ? colors.surfaceMedium : colors.card,
        padding: moderateScale(18),
        borderWidth: isDark ? 0 : 1,
        borderColor: 'rgba(5,34,36,0.05)',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(18),
            backgroundColor: item.iconBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <item.Icon color={item.tint} size={28} />
        </View>

        <View style={{ flex: 1, marginLeft: S.space.md }}>
          <Text
            style={{
              fontSize: S.fs.md_h,
              fontFamily: 'Poppins-Bold',
              color: isDark ? colors.card : colors.surfaceDark,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.68)' : colors.textMuted,
            }}
            numberOfLines={1}
          >
            {item.subtitle}
          </Text>
        </View>

        <View
          style={{
            borderRadius: moderateScale(16),
            backgroundColor: item.iconBg,
            paddingVertical: moderateScale(8),
            paddingHorizontal: moderateScale(10),
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

      <View style={{ marginTop: moderateScale(16) }}>
        <View
          style={{
            height: moderateScale(10),
            borderRadius: moderateScale(8),
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : colors.primary100,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${Math.max(0, Math.min(100, item.progress))}%`,
              borderRadius: moderateScale(8),
              backgroundColor: item.tint,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: item.tint,
            }}
          >
            {Math.round(item.progress)}% funded
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CalendarIcon
              color={isDark ? 'rgba(255,255,255,0.68)' : colors.textMuted}
              size={14}
            />
            <Text
              style={{
                marginLeft: 6,
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-Regular',
                color: isDark ? 'rgba(255,255,255,0.68)' : colors.textMuted,
              }}
            >
              {item.dueLabel}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: moderateScale(16),
          borderRadius: moderateScale(20),
          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : colors.primary50,
          paddingVertical: moderateScale(14),
          paddingHorizontal: moderateScale(14),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InfoColumn label="Saved" value={item.savedAmount} isDark={isDark} />

          <View
            style={{
              width: 1,
              height: moderateScale(34),
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(5,34,36,0.1)',
              marginHorizontal: moderateScale(10),
            }}
          />

          <InfoColumn label="Target" value={item.targetAmount} align="center" isDark={isDark} />

          <View
            style={{
              width: 1,
              height: moderateScale(34),
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(5,34,36,0.1)',
              marginHorizontal: moderateScale(10),
            }}
          />

          <InfoColumn label="Left" value={item.leftAmount} align="right" isDark={isDark} />
        </View>

        <View
          style={{
            marginTop: moderateScale(12),
            borderRadius: moderateScale(16),
            backgroundColor: isDark ? colors.surfaceDark : colors.primary100,
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(12),
          }}
        >
          <Text
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: isDark ? colors.card : colors.surfaceDark,
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
