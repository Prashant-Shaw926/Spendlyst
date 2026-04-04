import React, { useMemo } from 'react';
import { BarChart, type barDataItem } from 'react-native-gifted-charts';
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

function buildGroupedBarData(days: DayIncomeExpense[]): barDataItem[] {
  return days.flatMap((day, index) => {
    const trailingSpacing = index === days.length - 1 ? 0 : moderateScale(18);

    return [
      {
        value: day.income,
        frontColor: colors.primary500,
        label: day.label,
        spacing: moderateScale(4),
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
}

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
  const chartData = useMemo(() => buildGroupedBarData(data), [data]);
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
      labels: Array.from({ length: 4 }, (_, index) => {
        return compactFormatter
          .format(stepValue * (index + 1))
          .toLowerCase();
      }),
    };
  }, [data]);

  return (
    <BarChart
      parentWidth={width}
      data={chartData}
      height={height}
      maxValue={chartScale.maxValue}
      stepValue={chartScale.stepValue}
      noOfSections={4}
      hideOrigin
      barWidth={moderateScale(6)}
      initialSpacing={moderateScale(26)}
      spacing={moderateScale(4)}
      endSpacing={0}
      showFractionalValues={false}
      rulesType="dashed"
      dashWidth={3}
      dashGap={3}
      rulesColor="rgba(50,153,255,0.42)"
      xAxisColor="rgba(5,34,36,0.75)"
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
      yAxisLabelWidth={moderateScale(28)}
      labelsDistanceFromXaxis={moderateScale(8)}
    />
  );
}
