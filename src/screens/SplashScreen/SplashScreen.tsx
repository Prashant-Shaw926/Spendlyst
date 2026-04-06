import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';
import { S } from '../../theme/scale';



export default function SplashScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        <Image 
          source={require('../../assets/images/app_logo.png')} 
          style={{ width: moderateScale(136), height: moderateScale(136) }}
          resizeMode="contain" 
        />
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
    fontSize: moderateScale(34),
    color: colors.white,
  },
});
