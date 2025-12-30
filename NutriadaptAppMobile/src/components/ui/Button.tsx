import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography } from '../../theme';

type Variant = 'primary' | 'secondary' | 'outline';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({ title, onPress, disabled, variant = 'primary', style, textStyle }: Props) {
  const styles = getStyles(variant);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && { opacity: 0.5 }, style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (variant: Variant) =>
  StyleSheet.create({
    button: {
      height: 44,
      borderRadius: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        variant === 'primary' ? colors.primary : variant === 'secondary' ? '#E5E7EB' : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? colors.border : 'transparent',
    },
    text: {
      ...typography.title,
      color: variant === 'secondary' || variant === 'outline' ? colors.text : '#fff',
    },
  });
