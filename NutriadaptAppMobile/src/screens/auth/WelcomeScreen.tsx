import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const { signIn } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}> 
        <Ionicons name="checkmark-circle" size={64} color="#10B981" />
        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={styles.body}>Votre profil est prêt. Commencez à explorer vos données santé et recettes.</Text>
        <TouchableOpacity style={styles.cta} onPress={signIn}>
          <Text style={styles.ctaText}>Accéder à l'application</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', marginTop: 16 },
  body: { fontSize: 14, color: '#6B7280', marginTop: 8, textAlign: 'center', maxWidth: 320 },
  cta: { marginTop: 24, backgroundColor: '#10B981', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  ctaText: { color: '#fff', fontWeight: '600' },
});
