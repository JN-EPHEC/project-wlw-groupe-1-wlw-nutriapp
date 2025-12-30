import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Logo } from '@/components/Logo';
import { Colors } from '@/constants';

type SplashScreenProps = {
  onFinish: () => void;
  duration?: number;
};

export function SplashScreen({ onFinish, duration = 2500 }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const bounceSequence = Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -8,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    const bounceLoop = Animated.loop(bounceSequence);
    bounceLoop.start();

    const timer = setTimeout(() => {
      bounceLoop.stop();
      onFinish();
    }, duration);

    return () => {
      clearTimeout(timer);
      bounceLoop.stop();
    };
  }, [bounceAnim, fadeAnim, scaleAnim, duration, onFinish]);

  return (
    <LinearGradient
      colors={[Colors.primary.green, Colors.primary.greenDark]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: bounceAnim }],
          },
        ]}
      >
        <Logo size="large" showText />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
});

export default SplashScreen;
