import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={{ width: '100%', marginTop: 12 }} />
        <Input placeholder="Mot de passe" secureTextEntry style={{ width: '100%', marginTop: 8 }} />
  <Button title="Se connecter" onPress={() => (navigation as any).navigate('Welcome')} style={{ width: '100%', marginTop: 16 }} />
  <TouchableOpacity onPress={() => (navigation as any).navigate('ForgotPassword')} style={{ marginTop: 12 }}>
          <Text style={styles.link}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>
          <Text style={styles.backLink}>⬅ Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  link: { color: '#1DBF73', fontWeight: '600' },
  backLink: { color: '#6C6C6C' },
});
