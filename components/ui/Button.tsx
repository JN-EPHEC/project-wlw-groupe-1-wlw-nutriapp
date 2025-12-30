import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { BorderRadius, Colors, Typography } from '@/constants';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

const getButtonVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return styles.outlineButton;
    case 'ghost':
      return styles.ghostButton;
    case 'primary':
    default:
      return styles.primaryButton;
  }
};

const getTextVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return styles.outlineText;
    case 'ghost':
      return styles.ghostText;
    case 'primary':
    default:
      return styles.primaryText;
  }
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const variantStyle = getButtonVariantStyle(variant);
  const textVariantStyle = getTextVariantStyle(variant);
  const indicatorColor = variant === 'primary' ? Colors.neutral.white : Colors.primary.green;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <>
          {icon}
          <Text style={[textVariantStyle, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary.green,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  primaryText: {
    ...Typography.button,
    color: Colors.neutral.white,
  },
  outlineText: {
    ...Typography.button,
    color: Colors.neutral.gray900,
  },
  ghostText: {
    ...Typography.button,
    color: Colors.primary.green,
  },
  disabled: {
    opacity: 0.5,
  },
});
