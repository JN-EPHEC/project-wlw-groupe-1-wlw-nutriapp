import React, { PropsWithChildren } from 'react';
import { Text, TextStyle } from 'react-native';
import { typography, colors } from '../../theme';

type Variant = 'h1' | 'h2' | 'title' | 'body' | 'caption';

type Props = PropsWithChildren<{ variant?: Variant; style?: TextStyle; color?: string }>;

export default function AppText({ variant = 'body', style, color = colors.text, children }: Props) {
  const base = typography[variant];
  return <Text style={[base, { color }, style]}>{children}</Text>;
}
