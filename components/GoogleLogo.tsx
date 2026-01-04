import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type GoogleLogoProps = {
  size?: number;
};

const GOOGLE_LOGO_URI = 'https://developers.google.com/identity/images/g-logo.png';

export default function GoogleLogo({ size = 20 }: GoogleLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={{ uri: GOOGLE_LOGO_URI }} style={{ width: size, height: size }} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
