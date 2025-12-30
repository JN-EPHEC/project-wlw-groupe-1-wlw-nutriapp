import { useRouter } from 'expo-router';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type BackButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    try {
      router.back();
    } catch {
      // noop when router is unavailable
    }
  };

  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: 'rgba(26, 26, 26, 0.7)',
    fontWeight: '600',
  },
});
