import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import type { HomeModel } from '../../../types/models';
import {
  CarIcon,
  ForkKnifeIcon,
  StackCashIcon,
} from '../../shared/FinanceIcons';

type FinanceIconComponent = React.ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type HomeSavingsCardProps = {
  weekly: HomeModel['weekly'];
};

function SavingsStat({
  Icon,
  label,
  value,
  valueClassName,
}: {
  Icon: FinanceIconComponent;
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <View className="flex-row items-center" style={{ gap: S.space.md }}>
      <Icon color={colors.surfaceDark} size={S.icon.xl} />

      <View style={{ gap: S.space.xs }}>
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
          }}
        >
          {label}
        </Text>

        <Text
          className={valueClassName}
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: S.fs.md,
            lineHeight: S.fs.md * 1.35,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export function HomeSavingsCard({ weekly }: HomeSavingsCardProps) {
  return (
    <View
      className="flex-row items-center bg-primary-500"
      style={{
        borderRadius: S.radius.xxxl,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
        gap: S.space.lg,
      }}
    >
      <View className="items-center justify-center" style={{ gap: S.space.md }}>
        <View
          className="items-center justify-center rounded-full border-2 border-blue-700"
          style={{
            width: S.size.avatarLg + S.space.sm,
            height: S.size.avatarLg + S.space.sm,
          }}
        >
          <CarIcon color={colors.surfaceDark} size={S.icon.xl} />
        </View>

        <Text
          className="text-center text-surface-dark"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.md,
            lineHeight: S.fs.md * 1.25,
          }}
        >
          {'Savings\nOn Goals'}
        </Text>
      </View>

      <View
        className="self-stretch bg-white"
        style={{
          width: 1,
          opacity: 0.5,
        }}
      />

      <View className="flex-1" style={{ gap: S.space.md }}>
        <SavingsStat
          Icon={StackCashIcon}
          label="Revenue Last Week"
          value={weekly.revenueLabel}
          valueClassName="text-surface-dark"
        />

        <View
          className="bg-white"
          style={{
            height: 1,
            opacity: 0.5,
          }}
        />

        <SavingsStat
          Icon={ForkKnifeIcon}
          label="Food Last Week"
          value={weekly.foodLabel}
          valueClassName="text-finance-expense"
        />
      </View>
    </View>
  );
}
