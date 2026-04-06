import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path, Rect } from 'react-native-svg';
import type { RootStackParamList } from '../../types/navigation';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';

function BrandMark({ size = 120 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Rect
        x="28"
        y="66"
        width="12"
        height="26"
        rx="2"
        fill={colors.surfaceDark}
      />
      <Rect
        x="50"
        y="53"
        width="12"
        height="39"
        rx="2"
        fill={colors.surfaceDark}
      />
      <Rect
        x="72"
        y="39"
        width="12"
        height="53"
        rx="2"
        fill={colors.surfaceDark}
      />
      <Path
        d="M20 57L46 31L60 45L89 16"
        stroke={colors.surfaceDark}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
      <Path
        d="M77 16H89V28"
        stroke={colors.surfaceDark}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
    </Svg>
  );
}

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(moderateScale(18))).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Main', {
        screen: 'HomeTab',
        params: { screen: 'Home' },
      });
    }, 1900);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale, translateY]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary500} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <BrandMark size={moderateScale(136)} />
        <Text style={styles.wordmark}>Spendlyst</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  wordmark: {
    marginTop: moderateScale(18),
    fontSize: moderateScale(34),
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    letterSpacing: -0.6,
  },
});
