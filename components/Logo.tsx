import { StyleSheet, Text, View } from 'react-native';

import { Colors, Typography } from '@/constants';

type LogoSize = 'small' | 'medium' | 'large';

type LogoProps = {
  size?: LogoSize;
  showText?: boolean;
};

const sizeMap: Record<LogoSize, { container: number; font: number }> = {
  small: { container: 40, font: 18 },
  medium: { container: 64, font: 24 },
  large: { container: 128, font: 32 },
};

export function Logo({ size = 'medium', showText = false }: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.logo,
          {
            width: dimensions.container,
            height: dimensions.container,
            borderRadius: dimensions.container / 2,
          },
        ]}
      >
        <Text style={[styles.initial, { fontSize: dimensions.font }]}>N</Text>
      </View>
      {showText ? <Text style={styles.text}>NutriAdapt</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  initial: {
    fontWeight: '700',
    color: Colors.primary.green,
  },
  text: {
    ...Typography.h2,
    color: Colors.neutral.white,
  },
});
