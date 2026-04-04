import React from 'react';
import { ScrollView, View } from 'react-native';
import { SkeletonBlock } from './SkeletonBlock';
import { moderateScale } from '../../utils/responsive';

export function HomeScreenSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: moderateScale(120) }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: moderateScale(36), gap: moderateScale(18) }}>
        <View style={{ gap: moderateScale(12), paddingTop: moderateScale(12) }}>
          <SkeletonBlock isDark={isDark} width="48%" height={22} radius={12} />
          <SkeletonBlock isDark={isDark} width="32%" height={14} radius={10} />
        </View>

        <SkeletonBlock isDark={isDark} height={186} radius={34} />
      </View>

      <View
        className="bg-card rounded-t-[56px]"
        style={{
          marginTop: moderateScale(26),
          paddingHorizontal: moderateScale(36),
          paddingVertical: moderateScale(36),
          gap: moderateScale(28),
        }}
      >
        <SkeletonBlock isDark={isDark} height={126} radius={28} />

        <View style={{ flexDirection: 'row', gap: moderateScale(10) }}>
          <SkeletonBlock isDark={isDark} width="30%" height={44} radius={22} />
          <SkeletonBlock isDark={isDark} width="30%" height={44} radius={22} />
          <SkeletonBlock isDark={isDark} width="30%" height={44} radius={22} />
        </View>

        <View style={{ gap: moderateScale(20) }}>
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
        </View>
      </View>
    </ScrollView>
  );
}
