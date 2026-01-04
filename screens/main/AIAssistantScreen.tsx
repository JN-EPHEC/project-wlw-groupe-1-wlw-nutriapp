import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

type MessageType = 'assistant' | 'user';

type ChatMessage = {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
};

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    text: "Bonjour ! Je suis votre assistant IA nutritionnel. Comment puis-je vous aider aujourd'hui ?",
    timestamp: new Date(),
  },
];

const quickQuestions = [
  'Recette pour diabétique',
  'Calcul de mes macros',
  'Conseils pour stabiliser ma glycémie',
  'Alternatives sans gluten',
];

export function AIAssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: 'Je comprends votre question. Voici mes recommandations personnalisées basées sur votre profil de santé...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <LinearGradient colors={['#5B8DEF', '#4169E1']} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.aiIcon}>
              <Ionicons name="sparkles" size={24} color={Colors.neutral.white} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Assistant IA</Text>
              <Text style={styles.headerSubtitle}>Conseils nutritionnels personnalisés</Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => {
            const isUser = message.type === 'user';
            return (
              <View
                key={message.id}
                style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}
              >
                {!isUser && (
                  <View style={styles.assistantAvatar}>
                    <Ionicons name="sparkles" size={16} color="#5B8DEF" />
                  </View>
                )}
                <View
                  style={[styles.messageContent, isUser ? styles.userContent : styles.assistantContent]}
                >
                  <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
                    {message.text}
                  </Text>
                </View>
              </View>
            );
          })}

          {messages.length === 1 && (
            <View style={styles.quickQuestionsContainer}>
              <Text style={styles.quickQuestionsTitle}>Questions fréquentes :</Text>
              {quickQuestions.map((question) => (
                <TouchableOpacity
                  key={question}
                  style={styles.quickQuestionChip}
                  onPress={() => handleQuickQuestion(question)}
                >
                  <Text style={styles.quickQuestionText}>{question}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#5B8DEF" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Posez votre question..."
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  aiIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.neutral.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  messageBubble: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  assistantBubble: {
    justifyContent: 'flex-start',
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    maxWidth: '75%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  userContent: {
    backgroundColor: '#5B8DEF',
    borderBottomRightRadius: 4,
  },
  assistantContent: {
    backgroundColor: Colors.neutral.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...Typography.body1,
  },
  userText: {
    color: Colors.neutral.white,
  },
  assistantText: {
    color: Colors.neutral.gray900,
  },
  quickQuestionsContainer: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  quickQuestionsTitle: {
    ...Typography.label,
    color: Colors.neutral.gray600,
  },
  quickQuestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#EEF2FF',
  },
  quickQuestionText: {
    ...Typography.body1,
    color: Colors.neutral.gray900,
    flex: 1,
    marginRight: Spacing.md,
  },
  inputContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray300,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
    padding: Spacing.md,
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
});

export default AIAssistantScreen;
