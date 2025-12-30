import { ReactNode, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

export type InputProps = {
  label?: string;
  icon?: ReactNode;
  error?: string;
  containerStyle?: object;
} & TextInputProps;

export function Input({
  label,
  icon,
  error,
  style,
  secureTextEntry,
  containerStyle,
  ...rest
}: InputProps) {
  const [isSecure, setIsSecure] = useState(Boolean(secureTextEntry));
  const [isFocused, setIsFocused] = useState(false);

  const secureToggleNeeded = useMemo(() => secureTextEntry, [secureTextEntry]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focused,
          error && styles.error,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.neutral.gray600}
          secureTextEntry={secureToggleNeeded ? isSecure : false}
          {...rest}
          onFocus={(event) => {
            setIsFocused(true);
            rest.onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            rest.onBlur?.(event);
          }}
        />
        {secureToggleNeeded ? (
          <TouchableOpacity onPress={() => setIsSecure((prev) => !prev)} style={styles.eyeButton}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.neutral.gray600}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.label,
    color: Colors.neutral.gray900,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.md,
  },
  focused: {
    borderColor: Colors.primary.green,
  },
  error: {
    borderColor: Colors.status.error,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body1,
    color: Colors.neutral.gray900,
  },
  eyeButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  errorText: {
    ...Typography.body2,
    color: Colors.status.error,
    marginTop: Spacing.xs,
  },
});
