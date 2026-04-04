import React from 'react';
import { ScrollView, View } from 'react-native';
import { SkeletonBlock } from './SkeletonBlock';
import { moderateScale } from '../../utils/responsive';

export function TransactionsScreenSkeleton({ isDark }: { isDark: boolean }) {
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
          <SkeletonBlock isDark={isDark} width="34%" height={22} radius={12} />
          <SkeletonBlock isDark={isDark} width={40} height={40} radius={20} />
        </View>

        <SkeletonBlock isDark={isDark} height={120} radius={30} />
        <SkeletonBlock isDark={isDark} height={170} radius={30} />
      </View>

      <View
        style={{
          marginTop: moderateScale(20),
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          paddingHorizontal: moderateScale(36),
          paddingTop: moderateScale(30),
          gap: moderateScale(24),
        }}
      >
        <View style={{ gap: moderateScale(16) }}>
          <SkeletonBlock isDark={isDark} width="28%" height={20} radius={10} />
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
        </View>

        <View style={{ gap: moderateScale(16) }}>
          <SkeletonBlock isDark={isDark} width="26%" height={20} radius={10} />
          <SkeletonBlock isDark={isDark} height={62} radius={18} />
        </View>
      </View>
    </ScrollView>
  );
}
