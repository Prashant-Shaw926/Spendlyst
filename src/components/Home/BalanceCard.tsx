import React from 'react';
import { Text, View } from 'react-native';
import { S } from '../../theme/scale';
import { colors } from '../../theme/colors';

export type BalanceCardProps = {
  balanceLabel: string;
  balanceValue: string;
  expenseLabel: string;
  expenseValue: string;
};

export function BalanceCard({
  balanceLabel,
  balanceValue,
  expenseLabel,
  expenseValue,
}: BalanceCardProps) {
  return (
    <View
      style={{
        paddingHorizontal: S.space.marginScreen,
        marginTop: S.space.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: S.fs.xxs,
              fontFamily: 'Poppins-Regular',
              color: colors.surfaceDark,
              opacity: 0.85,
              marginBottom: 4,
            }}
          >
            {balanceLabel}
          </Text>
          <Text
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
              color: colors.surfaceDark,
            }}
          >
            {balanceValue}
          </Text>
        </View>

        <View
          style={{
            width: 1,
            height: S.space['2xl'],
            backgroundColor: 'rgba(5,34,36,0.25)',
            marginHorizontal: S.space.md,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: S.fs.xxs,
              fontFamily: 'Poppins-Regular',
              color: colors.surfaceDark,
              opacity: 0.85,
              marginBottom: 4,
            }}
          >
            {expenseLabel}
          </Text>
          <Text
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
              color: colors.blue700,
            }}
          >
            {expenseValue}
          </Text>
        </View>
      </View>
    </View>
  );
}

