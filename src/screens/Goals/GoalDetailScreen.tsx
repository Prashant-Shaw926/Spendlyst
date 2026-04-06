import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalForm } from '../../components/features/Goals/GoalForm';
import { ArrowLeftIcon } from '../../components/shared/Icons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import {
  selectHasHydrated,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import {
  selectAddGoal,
  selectDeleteGoal,
  selectGoalById,
  selectUpdateGoal,
} from '../../store/selectors/goals.selectors';
import { useAppStore } from '../../store/useAppStore';
import { darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { GoalsStackParamList } from '../../types/navigation';
import { moderateScale, rs } from '../../utils/responsive';

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1, gap: S.space.xs }}>
      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        {label}
      </Text>
      <Text
        className="text-text"
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: S.fs.md,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function GoalDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<GoalsStackParamList, 'GoalDetail'>>();
  const isDark = useColorScheme() === 'dark';
  const headerIconColor = isDark ? darkColors.text : lightColors.text;
  const statusBarBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;
  const hasHydrated = useAppStore(selectHasHydrated);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const addGoal = useAppStore(selectAddGoal);
  const updateGoal = useAppStore(selectUpdateGoal);
  const deleteGoal = useAppStore(selectDeleteGoal);
  const goal = useAppStore(selectGoalById(route.params?.goalId));
  const [isEditing, setIsEditing] = useState(
    !route.params?.goalId || Boolean(route.params?.startInEditMode),
  );

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  useEffect(() => {
    if (route.params?.startInEditMode) {
      setIsEditing(true);
    }
  }, [route.params?.startInEditMode]);

  useEffect(() => {
    if (hasHydrated && route.params?.goalId && !goal) {
      navigation.goBack();
    }
  }, [goal, hasHydrated, navigation, route.params?.goalId]);

  const title = useMemo(() => {
    if (!goal) {
      return 'New Goal';
    }

    return isEditing ? 'Edit Goal' : goal.title;
  }, [goal, isEditing]);

  if (!goal && route.params?.goalId && hasHydrated) {
    return null;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      edges={['top']}
      style={{ gap: S.space.lg }}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <Header
        variant="centerTitle"
        title={title}
        titleClassName="text-text"
        contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        leftAction={
          <IconButton
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            size={moderateScale(40)}
          >
            <ArrowLeftIcon color={headerIconColor} size={24} />
          </IconButton>
        }
      />

      <View
        className="flex-1 overflow-hidden bg-secondary-bg"
        style={{
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          paddingVertical: S.space.lg,
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: S.space.paddingHorizontal,
            paddingTop: moderateScale(40),
            paddingBottom: S.space['2xl'],
          }}
          showsVerticalScrollIndicator={false}
        >
          {isEditing ? (
            <GoalForm
              initialGoal={goal}
              submitLabel={goal ? 'Save Goal' : 'Create Goal'}
              onSubmit={payload => {
                if (goal) {
                  updateGoal(goal.id, payload);
                  setIsEditing(false);
                } else {
                  addGoal(payload);
                  navigation.goBack();
                }
              }}
            />
          ) : goal ? (
            <View style={{ gap: S.space.xl }}>
              <View
                className="bg-card border border-black/[0.02] dark:border-white/[0.05]"
                style={{
                  borderRadius: S.radius.xxxl,
                  gap: S.space.xs,
                  paddingHorizontal: S.space.lg,
                  paddingVertical: S.space.xl,
                }}
              >
                <Text
                  className="text-text-muted uppercase tracking-wider"
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: S.fs.tiny,
                  }}
                >
                  {goal.status} goal
                </Text>

                <Text
                  className="text-text"
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: moderateScale(32),
                    marginVertical: S.space.xs,
                  }}
                >
                  {goal.savedAmountLabel}
                </Text>

                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-text-muted"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: S.fs.sm,
                    }}
                  >
                    Target {goal.targetAmountLabel}
                  </Text>

                  <View
                    className="bg-primary-100"
                    style={{
                      borderRadius: moderateScale(12),
                      paddingHorizontal: S.space.sm,
                      paddingVertical: rs(4),
                    }}
                  >
                    <Text
                      className="text-primary-600"
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: S.fs.xs,
                      }}
                    >
                      {goal.progress}%
                    </Text>
                  </View>
                </View>
              </View>

              <View
                className="bg-card border border-black/[0.02] dark:border-white/[0.05]"
                style={{
                  borderRadius: S.radius.xxxl,
                  gap: S.space.lg,
                  paddingHorizontal: S.space.lg,
                  paddingVertical: S.space.xl,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <DetailBlock label="Remaining" value={goal.leftAmountLabel} />
                  <DetailBlock
                    label="Monthly target"
                    value={goal.monthlyTargetLabel}
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <DetailBlock label="Deadline" value={goal.deadlineLabel} />
                  <DetailBlock
                    label="Projection"
                    value={goal.projectedCompletionLabel}
                  />
                </View>

                <DetailBlock label="Summary" value={goal.subtitle} />
              </View>

              <View style={{ gap: S.space.md, marginTop: S.space.md }}>
                <PrimaryButton
                  label="Edit Goal"
                  onPress={() => setIsEditing(true)}
                />
                <PrimaryButton
                  label="Delete Goal"
                  variant="danger"
                  onPress={() => {
                    Alert.alert(
                      'Delete goal',
                      'This goal will be removed from your dashboard and insights.',
                      [
                        { style: 'cancel', text: 'Cancel' },
                        {
                          style: 'destructive',
                          text: 'Delete',
                          onPress: () => {
                            deleteGoal(goal.id);
                            navigation.goBack();
                          },
                        },
                      ],
                    );
                  }}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
