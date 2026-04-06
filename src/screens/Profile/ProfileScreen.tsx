import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  Header,
  IconButton,
  NotificationIcon,
  ScreenState,
  UserIcon,
} from '../../components';
import { colors, darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { ProfileStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';
import { useProfileView } from '../../features/profile/hooks/useProfileView';

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: S.space.xs }}>
      <Text
        className="text-text"
        style={{ fontSize: S.fs.sm }}
      >
        {label}
      </Text>

      <View
        className="bg-pill border border-border"
        style={{
          borderRadius: S.radius.xl,
          paddingHorizontal: S.space.lg,
          paddingVertical: S.space.md,
        }}
      >
        <Text
          className="text-text-muted"
          style={{
            fontSize: S.fs.sm,

            lineHeight: S.fs.sm * 1.45,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function SkeletonBar({ width, height }: { width: number; height: number }) {
  return (
    <View
      className="bg-neutral-200"
      style={{ width, height, borderRadius: S.radius.full }}
    />
  );
}

function SkeletonField() {
  return (
    <View style={{ gap: S.space.xs }}>
      <SkeletonBar width={moderateScale(80)} height={moderateScale(13)} />
      <View
        className="bg-pill border border-border"
        style={{
          borderRadius: S.radius.xl,
          paddingHorizontal: S.space.lg,
          paddingVertical: S.space.md,
          gap: S.space.sm,
        }}
      >
        <SkeletonBar width={moderateScale(164)} height={moderateScale(14)} />
      </View>
    </View>
  );
}

export function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const isDark = useColorScheme() === 'dark';
  const headerIconColor = isDark ? darkColors.text : lightColors.text;
  const headerActionIconColor = isDark ? darkColors.title : lightColors.title;
  const statusBarBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;
  const { accountFields, errorMessage, isLoading, profile, userName } =
    useProfileView();

  const avatarSize = moderateScale(96);
  const avatarInnerSize = avatarSize - moderateScale(6) * 2;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarBackgroundColor}
      />

      <Header
        variant="centerTitle"
        title="My Profile"
        titleClassName="text-text"
        contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        leftAction={
          <IconButton
            accessibilityLabel="Go back"
            disabled={!navigation.canGoBack()}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            size={moderateScale(40)}
          >
            <ArrowLeftIcon color={headerIconColor} size={24} />
          </IconButton>
        }
        rightAction={
          <IconButton
            accessibilityLabel="Open notifications"
            className="items-center justify-center bg-pill"
            borderRadius={moderateScale(20)}
            onPress={() => navigation.navigate('Notification')}
            size={moderateScale(40)}
          >
            <NotificationIcon color={headerActionIconColor} size={moderateScale(18)} />
          </IconButton>
        }
      />

      {!isLoading && errorMessage ? (
        <ScreenState
          mode="error"
          title="Unable to load profile"
          message={errorMessage}
        />
      ) : null}

      {!errorMessage ? (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            className="bg-bg"
            style={{
              alignItems: 'center',
              paddingVertical: S.space.lg,
            }}
          >
            <View
              className="bg-bg"
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
                padding: moderateScale(4),
              }}
            >
              <View
                className="bg-pill items-center justify-center"
                style={{
                  width: avatarInnerSize,
                  height: avatarInnerSize,
                  borderRadius: avatarInnerSize / 2,
                }}
              >
                <UserIcon
                  color={colors.primary500}
                  size={moderateScale(42)}
                  strokeWidth={2}
                />
              </View>
            </View>
          </View>

          <View
            className="bg-card"
            style={{
              flex: 1,
              borderTopLeftRadius: moderateScale(40),
              borderTopRightRadius: moderateScale(40),
              gap: S.space['2xl'],
              paddingHorizontal: S.space.paddingHorizontal,
              paddingVertical: S.space['2xl'],
            }}
          >
            <View style={{ alignItems: 'center', gap: S.space.xs }}>
              {isLoading ? (
                <>
                  <SkeletonBar
                    width={moderateScale(156)}
                    height={moderateScale(22)}
                  />
                  <SkeletonBar
                    width={moderateScale(110)}
                    height={moderateScale(14)}
                  />
                </>
              ) : (
                <>
                  <Text
                    className="text-text text-center"
                    style={{ fontSize: S.fs.xl }}
                  >
                    {userName}  
                  </Text>
                  <Text
                    className="text-text-muted text-center"
                    style={{ fontSize: S.fs.sm }}
                  >
                    ID: {profile?.id}
                  </Text>
                </>
              )}
            </View>

            <View style={{ gap: S.space.lg }}>
              <View style={{ gap: S.space.md }}>
                {isLoading ? (
                  <>
                    <SkeletonField />
                    <SkeletonField />
                    <SkeletonField />
                  </>
                ) : (
                  accountFields.map(item => (
                    <ProfileField
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

export default ProfileScreen;
