import React from 'react';
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { CheckSquareIcon } from './FinanceIcons';
import { ProgressBar } from './ProgressBar';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type OverviewMetricConfig = {
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

type BudgetOverviewProps = {
  leftMetric: OverviewMetricConfig;
  rightMetric: OverviewMetricConfig;
  progressPercent: number;
  progressValue: string;
  note: string;
  noteColor: string;
  noteIconColor: string;
  style?: StyleProp<ViewStyle>;
  metricsContainerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  noteContainerStyle?: StyleProp<ViewStyle>;
  noteTextStyle?: StyleProp<TextStyle>;
};

function OverviewMetric({
  label,
  value,
  labelColor,
  valueColor,
  icon,
  containerStyle,
  labelStyle,
  valueStyle,
}: OverviewMetricConfig) {
  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateScale(6),
          marginBottom: moderateScale(8),
        }}
      >
        {icon}
        <Text
          style={[
            {
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
              color: labelColor,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      </View>

      <Text
        style={[
          {
            fontSize: moderateScale(22),
            fontFamily: 'Poppins-Bold',
            color: valueColor,
            letterSpacing: -0.4,
          },
          valueStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export function BudgetOverview({
  leftMetric,
  rightMetric,
  progressPercent,
  progressValue,
  note,
  noteColor,
  noteIconColor,
  style,
  metricsContainerStyle,
  dividerStyle,
  noteContainerStyle,
  noteTextStyle,
}: BudgetOverviewProps) {
  return (
    <View style={[{ gap: moderateScale(18) }, style]}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          metricsContainerStyle,
        ]}
      >
        <OverviewMetric {...leftMetric} />

        <View
          style={[
            {
              width: 1,
              alignSelf: 'stretch',
            },
            dividerStyle,
          ]}
        />

        <OverviewMetric {...rightMetric} />
      </View>

      <View>
        <ProgressBar
          progressPercent={progressPercent}
          progressValue={progressValue}
        />

        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(14),
              gap: moderateScale(9),
            },
            noteContainerStyle,
          ]}
        >
          <CheckSquareIcon color={noteIconColor} size={15} />
          <Text
            style={[
              {
                fontSize: S.fs.md,
                fontFamily: 'Poppins-Regular',
                color: noteColor,
              },
              noteTextStyle,
            ]}
          >
            {note}
          </Text>
        </View>
      </View>
    </View>
  );
}
