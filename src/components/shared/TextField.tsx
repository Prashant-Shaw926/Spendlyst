import React from 'react';
import { Text, TextInput, View, useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../../theme/colors';
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
  const isDark = useColorScheme() === 'dark';
  const placeholderTextColor = isDark
    ? darkColors.textMuted
    : lightColors.textMuted;

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
        className={`border bg-card text-text ${
          errorText ? 'border-error-500' : 'border-border'
        }`}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          minHeight: multiline ? 108 : 56,
          borderRadius: S.radius.xxl,
          borderWidth: 1,
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
          className="text-error-500"
          style={{
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
