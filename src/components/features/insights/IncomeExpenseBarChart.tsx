import React, { useMemo } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { moderateScale } from '../../../utils/responsive';

export type DayIncomeExpense = {
  label: string;
  income: number;
  expense: number;
};

export type IncomeExpenseBarChartProps = {
  width: number;
  height: number;
  data: DayIncomeExpense[];
};

function getNiceStepValue(maxValue: number) {
  if (maxValue <= 0) {
    return 2500;
  }

  const roughStep = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;

  if (normalized <= 1) {
    return magnitude;
  }

  if (normalized <= 2) {
    return 2 * magnitude;
  }

  if (normalized <= 5) {
    return 5 * magnitude;
  }

  return 10 * magnitude;
}

export function IncomeExpenseBarChart({
  width,
  height,
  data,
}: IncomeExpenseBarChartProps) {
  const chartScale = useMemo(() => {
    const maxDataValue = data.reduce((currentMax, item) => {
      return Math.max(currentMax, item.income, item.expense);
    }, 0);
    const stepValue = getNiceStepValue(maxDataValue);
    const compactFormatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    return {
      maxValue: stepValue * 4,
      stepValue,
      labels: Array.from({ length: 4 }, (_, index) =>
        compactFormatter.format(stepValue * (index + 1)).toLowerCase(),
      ),
    };
  }, [data]);

  // ── Dynamic bar sizing ──────────────────────────────────────────────
  // Each group = 2 bars (income + expense) + gap between them + gap after group
  // Total drawable width = parentWidth - yAxisLabelWidth - initialSpacing - endSpacing
  const yAxisLabelWidth = moderateScale(28);
  const initialSpacing = moderateScale(16);
  const endSpacing = moderateScale(8);
  const intraGroupGap = moderateScale(4);   // gap between the 2 bars in one group

  const drawableWidth = width - yAxisLabelWidth - initialSpacing - endSpacing;
  const numGroups = data.length;

  // Each group occupies: 2 * barWidth + intraGroupGap + interGroupSpacing
  // We want: numGroups * (2 * barWidth + intraGroupGap + interGroupSpacing) = drawableWidth
  // Fix ratio: barWidth : interGroupSpacing = 1 : 2  (gives breathing room)
  // So: numGroups * (2 * barWidth + intraGroupGap + 2 * barWidth) = drawableWidth
  //     numGroups * (4 * barWidth + intraGroupGap) = drawableWidth
  //     barWidth = (drawableWidth / numGroups - intraGroupGap) / 4

  const barWidth = Math.max(
    moderateScale(4), // minimum bar width
    Math.floor((drawableWidth / numGroups - intraGroupGap) / 4),
  );
  const interGroupSpacing = Math.max(
    moderateScale(8),
    Math.floor(drawableWidth / numGroups - 2 * barWidth - intraGroupGap),
  );
  // ────────────────────────────────────────────────────────────────────

  // Rebuild bar data with dynamic spacing values
  const dynamicChartData = useMemo(() => {
    return data.flatMap((day, index) => {
      const trailingSpacing =
        index === data.length - 1 ? 0 : interGroupSpacing;
      return [
        {
          value: day.income,
          frontColor: colors.primary500,
          label: day.label,
          spacing: intraGroupGap,
          barBorderTopLeftRadius: moderateScale(8),
          barBorderTopRightRadius: moderateScale(8),
        },
        {
          value: day.expense,
          frontColor: colors.blue700,
          spacing: trailingSpacing,
          barBorderTopLeftRadius: moderateScale(8),
          barBorderTopRightRadius: moderateScale(8),
        },
      ];
    });
  }, [data, intraGroupGap, interGroupSpacing]);

  return (
    <BarChart
      parentWidth={width}
      data={dynamicChartData}
      height={height}
      maxValue={chartScale.maxValue}
      stepValue={chartScale.stepValue}
      noOfSections={4}
      hideOrigin
      barWidth={barWidth}
      initialSpacing={initialSpacing}
      spacing={intraGroupGap}
      endSpacing={endSpacing}
      showFractionalValues={false}
      rulesType="dashed"
      dashWidth={3}
      dashGap={3}
      rulesColor={colors.chartRule}
      xAxisColor={colors.chartAxis}
      xAxisThickness={1}
      yAxisColor="transparent"
      yAxisThickness={0}
      yAxisLabelTexts={chartScale.labels}
      yAxisTextStyle={{
        fontSize: S.fs.xs,
        fontFamily: 'Poppins-Regular',
        color: colors.blue300,
      }}
      xAxisLabelTextStyle={{
        fontSize: S.fs.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.surfaceDark,
      }}
      yAxisLabelWidth={yAxisLabelWidth}
      labelsDistanceFromXaxis={moderateScale(8)}
    />
  );
}
