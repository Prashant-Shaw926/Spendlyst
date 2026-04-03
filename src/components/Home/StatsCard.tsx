import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { S } from '../../theme/scale';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';

export type HomeStatRow = {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
};

export type StatsCardProps = {
  title: string;
  donutIcon: string;
  donutProgressPercent: number; // 0..100
  rows: [HomeStatRow, HomeStatRow];
};

export function StatsCard({
  title,
  donutIcon,
  donutProgressPercent,
  rows,
}: StatsCardProps) {
  const donutData: pieDataItem[] = useMemo(() => {
    const progress = Math.max(0, Math.min(100, donutProgressPercent));
    return [
      { value: progress, color: colors.blue500 },
      { value: 100 - progress, color: 'rgba(255,255,255,0.25)' },
    ];
  }, [donutProgressPercent]);

  const radius = moderateScale(34);
  const innerRadius = moderateScale(27);

  return (
    <View style={{ paddingHorizontal: S.space.marginScreen, marginTop: S.space.xl }}>
      <View
        className="bg-primary-500"
        style={{
          borderRadius: moderateScale(24),
          padding: S.space.lg,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ width: moderateScale(96), alignItems: 'center' }}>
          <PieChart
            donut
            data={donutData}
            radius={radius}
            innerRadius={innerRadius}
            innerCircleColor="transparent"
            strokeWidth={0}
            centerLabelComponent={() => (
              <Text style={{ fontSize: S.fs.sm, color: colors.card }}>{donutIcon}</Text>
            )}
          />
          <Text
            style={{
              marginTop: S.space.xs,
              fontSize: S.fs.xxs,
              fontFamily: 'Poppins-Medium',
              color: colors.card,
              textAlign: 'center',
              lineHeight: S.fs.xxs * 1.4,
            }}
          >
            {title}
          </Text>
        </View>

        <View
          style={{
            width: 1,
            alignSelf: 'stretch',
            backgroundColor: 'rgba(255,255,255,0.35)',
            marginHorizontal: S.space.md,
          }}
        />

        <View style={{ flex: 1, gap: S.space.sm, justifyContent: 'center' }}>
          {rows.map((row, idx) => (
            <View key={row.label}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: S.fs.md, marginRight: S.space.sm }}>
                  {row.icon}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: S.fs.xxs,
                      fontFamily: 'Poppins-Regular',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    {row.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-SemiBold',
                      color: row.valueColor ?? colors.card,
                      marginTop: 1,
                    }}
                  >
                    {row.value}
                  </Text>
                </View>
              </View>
              {idx === 0 ? (
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.28)',
                    marginTop: S.space.sm,
                  }}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

