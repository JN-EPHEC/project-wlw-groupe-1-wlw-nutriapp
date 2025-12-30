import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
});

type FormValues = { email: string };

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema), defaultValues: { email: '' } });
  const [sent, setSent] = useState(false);

  const onSubmit = (data: FormValues) => {
    // Simulation envoi
    setSent(true);
    setTimeout(() => (navigation as any).goBack(), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Réinitialisation</Text>
        <Text style={styles.body}>Entrez votre e-mail pour recevoir un lien.</Text>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ width: '100%', marginTop: 16 }}
          // @ts-ignore simplification: Input ne supporte pas directement RHF ici
          onChangeText={(text: string) => control._defaultValues.email = text}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        <Button title={sent ? 'Envoyé ✅' : 'Envoyer'} onPress={handleSubmit(onSubmit)} disabled={sent} style={{ width: '100%', marginTop: 12 }} />
        <TouchableOpacity onPress={() => (navigation as any).goBack()} style={{ marginTop: 16 }}>
          <Text style={styles.link}>Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  body: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  link: { color: '#1DBF73', fontWeight: '600' },
  error: { marginTop: 4, color: '#DC2626' },
});
