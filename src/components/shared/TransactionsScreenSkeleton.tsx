import React from 'react';
import { ScrollView, View } from 'react-native';
import { S } from '../../theme/scale';
import { SkeletonBlock } from './SkeletonBlock';

export function TransactionsScreenSkeleton() {
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
            <SkeletonBlock width="34%" height={22} radius={12} />
            <SkeletonBlock width={40} height={40} radius={20} />
          </View>

          <SkeletonBlock height={120} radius={30} />
          <SkeletonBlock height={170} radius={30} />
        </View>

        <View
          className="bg-secondary-bg"
          style={{
            borderTopLeftRadius: S.radius.xxxl + S.space['8xl'],
            borderTopRightRadius: S.radius.xxxl + S.space['8xl'],
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space['2xl'],
            gap: S.space['2xl'],
          }}
        >
          <View style={{ gap: S.space.lg }}>
            <SkeletonBlock width="28%" height={20} radius={10} />
            <SkeletonBlock height={62} radius={18} />
            <SkeletonBlock height={62} radius={18} />
          </View>

          <View style={{ gap: S.space.lg }}>
            <SkeletonBlock width="26%" height={20} radius={10} />
            <SkeletonBlock height={62} radius={18} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
