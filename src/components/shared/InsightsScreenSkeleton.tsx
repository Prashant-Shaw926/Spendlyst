import React from 'react';
import { ScrollView, View } from 'react-native';
import { SkeletonBlock } from './SkeletonBlock';
import { moderateScale } from '../../utils/responsive';

export function InsightsScreenSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: moderateScale(80) }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: moderateScale(36),
          paddingTop: moderateScale(24),
          gap: moderateScale(18),
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SkeletonBlock isDark={isDark} width={40} height={40} radius={20} />
          <SkeletonBlock isDark={isDark} width="28%" height={22} radius={12} />
          <SkeletonBlock isDark={isDark} width={40} height={40} radius={20} />
        </View>

        <View style={{ flexDirection: 'row', gap: moderateScale(16) }}>
          <SkeletonBlock isDark={isDark} width="48%" height={78} radius={22} />
          <SkeletonBlock isDark={isDark} width="48%" height={78} radius={22} />
        </View>

        <SkeletonBlock isDark={isDark} height={32} radius={16} />
      </View>

      <View
        style={{
          marginTop: moderateScale(20),
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          paddingHorizontal: moderateScale(36),
          paddingTop: moderateScale(32),
          gap: moderateScale(22),
        }}
      >
        <View style={{ flexDirection: 'row', gap: moderateScale(10) }}>
          <SkeletonBlock isDark={isDark} width="24%" height={42} radius={21} />
          <SkeletonBlock isDark={isDark} width="24%" height={42} radius={21} />
          <SkeletonBlock isDark={isDark} width="24%" height={42} radius={21} />
          <SkeletonBlock isDark={isDark} width="24%" height={42} radius={21} />
        </View>

        <SkeletonBlock isDark={isDark} height={230} radius={34} />
        <SkeletonBlock isDark={isDark} height={118} radius={28} />

        <View style={{ flexDirection: 'row', gap: moderateScale(14) }}>
          <SkeletonBlock isDark={isDark} width="48%" height={120} radius={24} />
          <SkeletonBlock isDark={isDark} width="48%" height={120} radius={24} />
        </View>
      </View>
    </ScrollView>
  );
}
