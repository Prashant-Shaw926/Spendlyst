import React from 'react';
import { Text, TextInput, View, useColorScheme } from 'react-native';
import { colors, getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';

type TextFieldProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  helperText?: string;
  errorText?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline,
  autoCapitalize = 'sentences',
  helperText,
  errorText,
}: TextFieldProps) {
  const semanticColors = getSemanticColors(useColorScheme() === 'dark');

  return (
    <View style={{ gap: S.space.sm }}>
      {label ? (
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.sm,
          }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={semanticColors.textMuted}
        style={{
          minHeight: multiline ? 108 : 56,
          borderRadius: S.radius.xxl,
          borderWidth: 1,
          borderColor: errorText ? colors.error500 : semanticColors.border,
          backgroundColor: semanticColors.card,
          color: semanticColors.text,
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.md,
          paddingHorizontal: S.space.lg,
          paddingVertical: S.space.md,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        value={value}
      />

      {errorText ? (
        <Text
          style={{
            color: colors.error500,
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.xs,
          }}
        >
          {errorText}
        </Text>
      ) : helperText ? (
        <Text
          className="text-text-muted"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.xs,
          }}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
