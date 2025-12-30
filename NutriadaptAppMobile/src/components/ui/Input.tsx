import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme';

type Props = React.ComponentProps<typeof TextInput> & { containerStyle?: ViewStyle; inputStyle?: TextStyle };

export default function Input({ containerStyle, inputStyle, style, ...rest }: Props) {
  return <TextInput placeholderTextColor="#9CA3AF" style={[styles.input, inputStyle, style]} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: colors.text,
  },
});
