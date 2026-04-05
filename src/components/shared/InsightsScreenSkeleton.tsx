import React from 'react';
import { ScrollView, View } from 'react-native';
import { S } from '../../theme/scale';
import { SkeletonBlock } from './SkeletonBlock';

export function InsightsScreenSkeleton() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingVertical: S.space['6xl'] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: S.space.lg }}>
        <View
          style={{
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space.lg,
            gap: S.space.lg,
          }}
        >
          <View className="flex-row justify-between">
            <SkeletonBlock width={40} height={40} radius={20} />
            <SkeletonBlock width="28%" height={22} radius={12} />
            <SkeletonBlock width={40} height={40} radius={20} />
          </View>

          <View className="flex-row" style={{ gap: S.space.lg }}>
            <SkeletonBlock width="48%" height={78} radius={22} />
            <SkeletonBlock width="48%" height={78} radius={22} />
          </View>

          <SkeletonBlock height={32} radius={16} />
        </View>

        <View
          className="bg-card"
          style={{
            borderTopLeftRadius: S.radius.xxxl + S.space['8xl'],
            borderTopRightRadius: S.radius.xxxl + S.space['8xl'],
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space['2xl'],
            gap: S.space.xl,
          }}
        >
          <View className="flex-row" style={{ gap: S.space.sm }}>
            <SkeletonBlock width="24%" height={42} radius={21} />
            <SkeletonBlock width="24%" height={42} radius={21} />
            <SkeletonBlock width="24%" height={42} radius={21} />
            <SkeletonBlock width="24%" height={42} radius={21} />
          </View>

          <SkeletonBlock height={230} radius={34} />
          <SkeletonBlock height={118} radius={28} />

          <View className="flex-row" style={{ gap: S.space.md }}>
            <SkeletonBlock width="48%" height={120} radius={24} />
            <SkeletonBlock width="48%" height={120} radius={24} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
