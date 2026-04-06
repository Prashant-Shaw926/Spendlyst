import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { goalIconOptions, goalStatusOptions } from '../../../constants/finance';
import type { GoalModel } from '../../../types/models';
import { S } from '../../../theme/scale';
import {
  createIsoDateTimeFromInput,
  formatDateInputValue,
} from '../../../utils/finance';
import type { GoalUpsertPayload } from '../../../store/types';
import { PillChip } from '../../shared/PillChip';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { TextField } from '../../shared/TextField';

type GoalFormProps = {
  initialGoal?: GoalModel | null;
  submitLabel: string;
  onSubmit: (payload: GoalUpsertPayload) => void;
};

type ValidationErrors = Partial<
  Record<
    'title' | 'targetAmount' | 'savedAmount' | 'monthlyTarget' | 'deadline',
    string
  >
>;

export function GoalForm({
  initialGoal,
  submitLabel,
  onSubmit,
}: GoalFormProps) {
  const [title, setTitle] = useState(initialGoal?.title ?? '');
  const [subtitle, setSubtitle] = useState(initialGoal?.subtitle ?? '');
  const [targetAmount, setTargetAmount] = useState(
    initialGoal ? `${initialGoal.targetAmount}` : '',
  );
  const [savedAmount, setSavedAmount] = useState(
    initialGoal ? `${initialGoal.savedAmount}` : '',
  );
  const [monthlyTarget, setMonthlyTarget] = useState(
    initialGoal ? `${initialGoal.monthlyTarget}` : '',
  );
  const [deadline, setDeadline] = useState(
    initialGoal
      ? formatDateInputValue(initialGoal.deadline)
      : formatDateInputValue(new Date().toISOString()),
  );
  const [status, setStatus] = useState(initialGoal?.status ?? 'Active');
  const [icon, setIcon] = useState(initialGoal?.icon ?? 'savings');
  const [errors, setErrors] = useState<ValidationErrors>({});

  function handleSubmit() {
    const nextErrors: ValidationErrors = {};
    const parsedTargetAmount = Number(targetAmount);
    const parsedSavedAmount = Number(savedAmount);
    const parsedMonthlyTarget = Number(monthlyTarget);
    const parsedDeadline = createIsoDateTimeFromInput(
      deadline,
      initialGoal?.deadline,
    );

    if (!title.trim()) {
      nextErrors.title = 'Name the goal so it is easy to spot later.';
    }

    if (!Number.isFinite(parsedTargetAmount) || parsedTargetAmount <= 0) {
      nextErrors.targetAmount = 'Target amount must be greater than zero.';
    }

    if (!Number.isFinite(parsedSavedAmount) || parsedSavedAmount < 0) {
      nextErrors.savedAmount = 'Saved amount cannot be negative.';
    }

    if (!Number.isFinite(parsedMonthlyTarget) || parsedMonthlyTarget < 0) {
      nextErrors.monthlyTarget = 'Monthly target cannot be negative.';
    }

    if (!parsedDeadline) {
      nextErrors.deadline = 'Use the YYYY-MM-DD format.';
    }

    if (
      Number.isFinite(parsedTargetAmount) &&
      Number.isFinite(parsedSavedAmount) &&
      parsedSavedAmount > parsedTargetAmount
    ) {
      nextErrors.savedAmount = 'Saved amount should not exceed the target.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !parsedDeadline) {
      return;
    }

    onSubmit({
      title,
      subtitle,
      targetAmount: parsedTargetAmount,
      savedAmount: parsedSavedAmount,
      monthlyTarget: parsedMonthlyTarget,
      deadline: parsedDeadline,
      status,
      icon,
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: S.space.xl,
        paddingBottom: S.space['4xl'],
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TextField
        label="Goal title"
        value={title}
        onChangeText={setTitle}
        placeholder="Emergency Fund"
        errorText={errors.title}
      />

      <TextField
        label="Subtitle"
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Why this goal matters"
      />

      <TextField
        label="Target amount"
        value={targetAmount}
        onChangeText={setTargetAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
        errorText={errors.targetAmount}
      />

      <TextField
        label="Saved amount"
        value={savedAmount}
        onChangeText={setSavedAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
        errorText={errors.savedAmount}
      />

      <TextField
        label="Monthly target"
        value={monthlyTarget}
        onChangeText={setMonthlyTarget}
        placeholder="0.00"
        keyboardType="decimal-pad"
        errorText={errors.monthlyTarget}
      />

      <TextField
        label="Deadline"
        value={deadline}
        onChangeText={setDeadline}
        placeholder="YYYY-MM-DD"
        autoCapitalize="none"
        helperText="Example: 2026-11-30"
        errorText={errors.deadline}
      />

      <View style={{ gap: S.space.sm }}>
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.sm,
          }}
        >
          Goal status
        </Text>

        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.space.sm }}
        >
          {goalStatusOptions.map(option => (
            <PillChip
              key={option}
              label={option}
              active={option === status}
              onPress={() => setStatus(option)}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: S.space.sm }}>
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.sm,
          }}
        >
          Goal icon
        </Text>

        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.space.sm }}
        >
          {goalIconOptions.map(option => (
            <PillChip
              key={option.key}
              label={option.label}
              active={option.key === icon}
              onPress={() => setIcon(option.key)}
            />
          ))}
        </View>
      </View>

      <PrimaryButton label={submitLabel} onPress={handleSubmit} />
    </ScrollView>
  );
}
