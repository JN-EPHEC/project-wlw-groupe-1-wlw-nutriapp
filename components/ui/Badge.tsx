import { StyleSheet, Text, View } from 'react-native';

import { BorderRadius, Colors, Typography } from '@/constants';

type BadgeVariant = 'health' | 'allergy' | 'info';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: object;
};

const variantStyles: Record<BadgeVariant, { backgroundColor: string; color: string }> = {
  health: {
    backgroundColor: Colors.primary.greenPastel,
    color: Colors.primary.greenDark,
  },
  allergy: {
    backgroundColor: Colors.secondary.orangePastel,
    color: Colors.secondary.orangeText,
  },
  info: {
    backgroundColor: '#EEF2FF',
    color: Colors.secondary.lavender,
  },
};

export function Badge({ label, variant = 'health', style }: BadgeProps) {
  const palette = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: palette.backgroundColor }, style]}>
      <Text style={[styles.text, { color: palette.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    height: 28,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.body2,
    fontWeight: '500',
  },
});
