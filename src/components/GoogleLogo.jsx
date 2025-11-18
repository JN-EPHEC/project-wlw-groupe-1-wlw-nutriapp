import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function GoogleLogo({ size = 20 }) {
  // Logo Google officiel depuis Google CDN
  const googleLogoUrl = 'https://www.google.com/favicon.ico';
  
  // Alternative: utiliser le logo Google depuis un CDN fiable
  // Format PNG du logo Google (G multicolore)
  const googleLogoPNG = 'https://developers.google.com/identity/images/g-logo.png';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: googleLogoPNG }}
        style={[styles.logo, { width: size, height: size }]}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
});

