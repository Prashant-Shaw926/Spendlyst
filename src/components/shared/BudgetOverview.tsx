import React from 'react';
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { CheckSquareIcon } from './Icons';
import { ProgressBar } from './ProgressBar';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type OverviewMetricConfig = {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
  labelColor?: string;
  valueColor?: string;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

type BudgetOverviewProps = {
  leftMetric: OverviewMetricConfig;
  rightMetric: OverviewMetricConfig;
  progressPercent: number;
  note: string;
  noteClassName?: string;
  dividerClassName?: string;
  noteColor?: string;
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
  labelClassName,
  valueClassName,
  labelColor,
  valueColor,
  icon,
  containerStyle,
  labelStyle,
  valueStyle,
}: OverviewMetricConfig) {
  return (
    <View className="flex-1" style={[{ gap: S.space.xs }, containerStyle]}>
      <View className="flex-row items-center" style={{ gap: S.space.xs }}>
        {icon}
        <Text
          className={labelClassName ?? 'text-text'}
          style={[
            {
              fontSize: S.fs.sm,
            },
            labelColor ? { color: labelColor } : null,
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      <Text
        className={valueClassName ?? 'text-text'}
        style={[
          {
            fontSize: moderateScale(22),
            lineHeight: moderateScale(26),
          },
          valueColor ? { color: valueColor } : null,
          valueStyle,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
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
  note,
  noteClassName,
  dividerClassName,
  noteColor,
  noteIconColor,
  style,
  metricsContainerStyle,
  dividerStyle,
  noteContainerStyle,
  noteTextStyle,
}: BudgetOverviewProps) {
  return (
    <View style={[{ gap: S.space.lg }, style]}>
      <View
        className="flex-row items-center"
        style={[
          {
            gap: S.space.lg,
          },
          metricsContainerStyle,
        ]}
      >
        <OverviewMetric {...leftMetric} />

        <View
          className={dividerClassName}
          style={[
            {
              width: 1,
              height: moderateScale(52),
              alignSelf: 'center',
            },
            dividerStyle,
          ]}
        />

        <OverviewMetric
          containerStyle={{ alignItems: 'flex-end' }}
          {...rightMetric}
        />
      </View>

      <ProgressBar progressPercent={progressPercent} />

      <View
        className="flex-row items-center"
        style={[
          {
            gap: S.space.sm,
          },
          noteContainerStyle,
        ]}
      >
        <CheckSquareIcon color={noteIconColor} size={moderateScale(20)} />
        <Text
          className={noteClassName}
          style={[
            {
              fontSize: S.fs.md,
            },
            noteColor ? { color: noteColor } : null,
            noteTextStyle,
          ]}
        >
          {note}
        </Text>
      </View>
    </View>
  );
}
