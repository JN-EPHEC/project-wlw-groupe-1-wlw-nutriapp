import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SplashProps = NativeStackScreenProps<any>;

export default function SplashScreen({ navigation }: SplashProps) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 800);
    return () => clearTimeout(t);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>NutriAdapt</Text>
        <ActivityIndicator color="#1DBF73" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#1DBF73' },
});
