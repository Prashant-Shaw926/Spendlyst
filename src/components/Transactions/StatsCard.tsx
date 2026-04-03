import React from 'react';
import { Text, View } from 'react-native';
import { CheckSquareIcon } from '../shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type TransactionsStatTileProps = {
  isDark: boolean;
  balanceLabel: string;
  balanceValue: string;
  expenseLabel: string;
  expenseValue: string;
  progressPercent: number;
  progressValue: string;
  note: string;
};

function MetricBlock({
  label,
  value,
  labelColor,
  valueColor,
}: {
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <CheckSquareIcon color={labelColor} size={13} />
        <Text
          style={{
            marginLeft: 6,
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Regular',
            color: labelColor,
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        style={{
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          color: valueColor,
          letterSpacing: -0.4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function StatsCard({
  isDark,
  balanceLabel,
  balanceValue,
  expenseLabel,
  expenseValue,
  progressPercent,
  progressValue,
  note,
}: TransactionsStatTileProps) {
  const labelColor = isDark ? 'rgba(255,255,255,0.8)' : colors.surfaceDark;
  const balanceColor = isDark ? colors.card : colors.card;
  const noteColor = isDark ? colors.card : colors.surfaceDark;

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <MetricBlock
          label={balanceLabel}
          value={balanceValue}
          labelColor={labelColor}
          valueColor={balanceColor}
        />

        <View
          style={{
            width: 1,
            marginHorizontal: moderateScale(18),
            backgroundColor: isDark ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.84)',
          }}
        />

        <MetricBlock
          label={expenseLabel}
          value={expenseValue}
          labelColor={labelColor}
          valueColor={colors.blue700}
        />
      </View>

      <View style={{ marginTop: moderateScale(18) }}>
        <View
          style={{
            height: moderateScale(28),
            borderRadius: moderateScale(16),
            backgroundColor: colors.primary50,
            overflow: 'hidden',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${Math.max(0, Math.min(progressPercent, 100))}%`,
              borderRadius: moderateScale(16),
              backgroundColor: colors.surfaceDark,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(20),
            }}
          >
            <Text
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-Medium',
                color: colors.card,
              }}
            >
              {progressPercent}%
            </Text>
            <Text
              style={{
                fontSize: S.fs.sm,
                fontFamily: 'Poppins-SemiBold',
                color: colors.surfaceDark,
                fontStyle: 'italic',
              }}
            >
              {progressValue}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
          <CheckSquareIcon color={labelColor} size={15} />
          <Text
            style={{
              marginLeft: 9,
              fontSize: S.fs.md,
              fontFamily: 'Poppins-Regular',
              color: noteColor,
            }}
          >
            {note}
          </Text>
        </View>
      </View>
    </View>
  );
}
