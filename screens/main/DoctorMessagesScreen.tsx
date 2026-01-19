import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

type MessageType = 'patient' | 'doctor';

type ChatMessage = {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
};

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'patient',
    text: 'Bonjour docteur, j\'ai une question concernant mon dernier bilan',
    timestamp: new Date(Date.now() - 15 * 60000),
  },
  {
    id: '2',
    type: 'doctor',
    text: 'Bonjour Marie, je vous écoute. Que souhaitez-vous savoir ?',
    timestamp: new Date(Date.now() - 13 * 60000),
  },
  {
    id: '3',
    type: 'patient',
    text: 'Mon HbA1c est un peu élevée, que me conseillez-vous ?',
    timestamp: new Date(Date.now() - 8 * 60000),
  },
  {
    id: '4',
    type: 'doctor',
    text: 'Nous allons ajuster votre plan alimentaire. Je vous recommande de réduire les glucides rapides et d\'augmenter l\'activité physique progressive. Je vais vous envoyer des recettes adaptées.',
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    id: '5',
    type: 'patient',
    text: 'Merci docteur, je vais suivre vos recommandations',
    timestamp: new Date(),
  },
];

export function DoctorMessagesScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }

    const patientMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'patient',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, patientMessage]);
    setInputText('');

    // Simulate doctor response (optional)
    setTimeout(() => {
      const doctorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'doctor',
        text: 'Merci pour votre message. Je vais l\'étudier et vous recontacter rapidement.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorMessage]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.neutral.gray900} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Dr. Martin Dupont</Text>
            <Text style={styles.headerSubtitle}>Endocrinologue</Text>
          </View>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Messages */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => {
            const isPatient = message.type === 'patient';
            const time = message.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <View
                key={message.id}
                style={[styles.messageBubble, isPatient ? styles.patientBubble : styles.doctorBubble]}
              >
                <View
                  style={[
                    styles.messageContent,
                    isPatient ? styles.patientContent : styles.doctorContent,
                  ]}
                >
                  <Text style={[styles.messageText, isPatient ? styles.patientText : styles.doctorText]}>
                    {message.text}
                  </Text>
                  <Text style={[styles.messageTime, isPatient ? styles.patientTime : styles.doctorTime]}>
                    {time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Écrivez votre message..."
              placeholderTextColor={Colors.neutral.gray600}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() ? Colors.neutral.white : Colors.neutral.gray600}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>Les messages sont sécurisés et conformes RGPD</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
    marginBottom: 2,
  },
  headerSubtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  headerPlaceholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  messageBubble: {
    flexDirection: 'row',
  },
  patientBubble: {
    justifyContent: 'flex-end',
  },
  doctorBubble: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  patientContent: {
    backgroundColor: '#5B8DEF',
    borderBottomRightRadius: 4,
  },
  doctorContent: {
    backgroundColor: Colors.neutral.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  messageText: {
    ...Typography.body1,
    marginBottom: Spacing.sm,
  },
  patientText: {
    color: Colors.neutral.white,
  },
  doctorText: {
    color: Colors.neutral.gray900,
  },
  messageTime: {
    ...Typography.body2,
    marginTop: Spacing.xs,
  },
  patientTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  doctorTime: {
    color: Colors.neutral.gray600,
  },
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral.gray300,
  },
  input: {
    flex: 1,
    ...Typography.body1,
    color: Colors.neutral.gray900,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: '#5B8DEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.neutral.gray300,
  },
  disclaimer: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});

export default DoctorMessagesScreen;
