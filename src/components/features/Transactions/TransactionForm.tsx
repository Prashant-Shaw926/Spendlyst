import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { transactionCategorySuggestions } from '../../../constants/finance';
import type { TransactionModel } from '../../../types/models';
import { S } from '../../../theme/scale';
import {
  createIsoDateTimeFromInput,
  formatDateInputValue,
} from '../../../api/mappers/finance';
import type { TransactionUpsertPayload } from '../../../store/types';
import { PillChip } from '../../shared/PillChip';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { TextField } from '../../shared/TextField';

type TransactionFormProps = {
  initialTransaction?: TransactionModel | null;
  submitLabel: string;
  onSubmit: (payload: TransactionUpsertPayload) => void;
};

type ValidationErrors = Partial<Record<'title' | 'amount' | 'category' | 'date', string>>;

export function TransactionForm({
  initialTransaction,
  submitLabel,
  onSubmit,
}: TransactionFormProps) {
  const [title, setTitle] = useState(initialTransaction?.title ?? '');
  const [amount, setAmount] = useState(
    initialTransaction ? `${initialTransaction.amount}` : '',
  );
  const [type, setType] = useState<TransactionUpsertPayload['type']>(
    initialTransaction?.type ?? 'expense',
  );
  const [category, setCategory] = useState(initialTransaction?.category ?? '');
  const [date, setDate] = useState(
    initialTransaction
      ? formatDateInputValue(initialTransaction.occurredAt)
      : formatDateInputValue(new Date().toISOString()),
  );
  const [notes, setNotes] = useState(initialTransaction?.notes ?? '');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const amountHelperText = useMemo(() => {
    if (!amount.trim()) {
      return 'Enter a positive amount. The selected type controls the sign.';
    }

    return type === 'expense'
      ? 'This amount will reduce your balance.'
      : 'This amount will increase your balance.';
  }, [amount, type]);

  function handleSubmit() {
    const nextErrors: ValidationErrors = {};
    const numericAmount = Number(amount);
    const occurredAt = createIsoDateTimeFromInput(
      date,
      initialTransaction?.occurredAt,
    );

    if (!title.trim()) {
      nextErrors.title = 'Give this transaction a short title.';
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Enter an amount greater than zero.';
    }

    if (!category.trim()) {
      nextErrors.category = 'Pick or type a category.';
    }

    if (!occurredAt) {
      nextErrors.date = 'Use the YYYY-MM-DD format.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !occurredAt) {
      return;
    }

    onSubmit({
      title,
      notes,
      category,
      amount: numericAmount,
      type,
      occurredAt,
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
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Groceries, Salary, Rent..."
        errorText={errors.title}
      />

      <TextField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
        helperText={amountHelperText}
        errorText={errors.amount}
      />

      <View style={{ gap: S.space.sm }}>
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.sm,
          }}
        >
          Type
        </Text>

        <View style={{ flexDirection: 'row', gap: S.space.sm }}>
          <PillChip
            label="Income"
            active={type === 'income'}
            onPress={() => setType('income')}
          />
          <PillChip
            label="Expense"
            active={type === 'expense'}
            onPress={() => setType('expense')}
          />
        </View>
      </View>

      <TextField
        label="Category"
        value={category}
        onChangeText={setCategory}
        placeholder="Choose or type a category"
        autoCapitalize="words"
        helperText="Use suggestions below or type your own."
        errorText={errors.category}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: S.space.sm }}>
        {transactionCategorySuggestions.map((suggestion) => (
          <PillChip
            key={suggestion}
            label={suggestion}
            active={suggestion.toLowerCase() === category.trim().toLowerCase()}
            onPress={() => setCategory(suggestion)}
          />
        ))}
      </View>

      <TextField
        label="Date"
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        autoCapitalize="none"
        helperText="Example: 2026-04-06"
        errorText={errors.date}
      />

      <TextField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Add context, merchant, or a quick reminder"
        multiline
      />

      <PrimaryButton label={submitLabel} onPress={handleSubmit} />
    </ScrollView>
  );
}
