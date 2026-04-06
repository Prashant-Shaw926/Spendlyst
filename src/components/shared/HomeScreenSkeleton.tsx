import React from 'react';
import { ScrollView, View } from 'react-native';
import { S } from '../../theme/scale';
import { SkeletonBlock } from './SkeletonBlock';

export function HomeScreenSkeleton() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingVertical: S.space['7xl'] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: S.space.lg }}>
        <View
          style={{
            paddingHorizontal: S.space.paddingHorizontal,
            gap: S.space.lg,
          }}
        >
          <View style={{ gap: S.space.md, paddingVertical: S.space.md }}>
            <SkeletonBlock width="48%" height={22} radius={12} />
            <SkeletonBlock width="32%" height={14} radius={10} />
          </View>

          <SkeletonBlock height={186} radius={34} />
        </View>

        <View
          className="bg-card"
          style={{
            borderTopLeftRadius: S.radius.xxxl + S.space['6xl'],
            borderTopRightRadius: S.radius.xxxl + S.space['6xl'],
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space['5xl'],
            gap: S.space['3xl'],
          }}
        >
          <SkeletonBlock height={126} radius={28} />

          <View className="flex-row" style={{ gap: S.space.sm }}>
            <SkeletonBlock width="30%" height={44} radius={22} />
            <SkeletonBlock width="30%" height={44} radius={22} />
            <SkeletonBlock width="30%" height={44} radius={22} />
          </View>

          <View style={{ gap: S.space.xl }}>
            <SkeletonBlock height={62} radius={18} />
            <SkeletonBlock height={62} radius={18} />
            <SkeletonBlock height={62} radius={18} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
