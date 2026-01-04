import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ChatMessageSender = 'user' | 'ai' | 'doctor';

export type ChatMessage = {
  id: string;
  text: string;
  sender: ChatMessageSender;
  timestamp: Date;
};

type ChatScreenProps = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  isTyping?: boolean;
  suggestions?: string[];
};

export default function ChatScreen({
  title,
  subtitle,
  icon = 'chatbubbles-outline',
  messages,
  onSend,
  isTyping,
  suggestions,
}: ChatScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<FlatList<ChatMessage> | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length, isTyping]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    onSend(text);
    setInputValue('');
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';
    const isDoctor = item.sender === 'doctor';
    const isAI = item.sender === 'ai';
    const alignSelf = isUser ? 'flex-end' : 'flex-start';

    const bubbleBg = isUser
      ? '#1DBF73'
      : '#FFFFFF';
    const textColor = isUser ? '#FFFFFF' : '#111827';

    const avatarBg = isDoctor
      ? '#1DBF73'
      : isAI
      ? '#5B8DEF'
      : '#1DBF73';
    const avatarIcon: keyof typeof Ionicons.glyphMap = isDoctor
      ? 'medkit-outline'
      : isAI
      ? 'sparkles-outline'
      : 'person-outline';

    return (
      <View style={[styles.messageRow, isUser ? styles.rowReverse : null]}>
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}> 
          <Ionicons name={avatarIcon} size={18} color="#FFFFFF" />
        </View>
        <View style={[styles.bubbleWrapper, { alignItems: isUser ? 'flex-end' : 'flex-start' }]}> 
          <View
            style={[
              styles.bubble,
              {
                backgroundColor: bubbleBg,
                borderTopRightRadius: isUser ? 4 : 18,
                borderTopLeftRadius: isUser ? 18 : 4,
              },
            ]}
          >
            <Text style={[styles.messageText, { color: textColor }]}>{item.text}</Text>
          </View>
          <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Header */}
        <View style={styles.header}> 
          <View style={styles.headerAvatar}>
            <Ionicons name={icon} size={26} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
        />

        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && messages.length <= 1 && (
          <View style={styles.suggestions}> 
            <Text style={styles.suggestionLabel}>Suggestions :</Text>
            <View style={styles.suggestionChips}>
              {suggestions.map((s) => (
                <TouchableOpacity key={s} style={styles.chip} onPress={() => onSend(s)}>
                  <Text style={styles.chipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <View style={styles.typingRow}> 
            <View style={[styles.avatar, { backgroundColor: '#5B8DEF' }]}> 
              <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={[styles.bubble, { backgroundColor: '#FFFFFF' }]}> 
              <View style={styles.dotsRow}>
                <View style={styles.dot} />
                <View style={[styles.dot, { opacity: 0.6 }]} />
                <View style={[styles.dot, { opacity: 0.3 }]} />
              </View>
            </View>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputBar}> 
          <TextInput
            style={styles.input}
            placeholder="Écrivez votre message..."
            placeholderTextColor="#9CA3AF"
            value={inputValue}
            onChangeText={setInputValue}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!inputValue.trim() || isTyping) && styles.sendBtnDisabled]}
            disabled={!inputValue.trim() || !!isTyping}
            onPress={handleSend}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1DBF73',
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  subtitle: { fontSize: 13, color: '#E5E7EB' },
  listContent: { paddingHorizontal: 12, paddingVertical: 12, gap: 8 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 },
  rowReverse: { flexDirection: 'row-reverse' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  bubbleWrapper: { maxWidth: '75%' },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  messageText: { fontSize: 14, lineHeight: 20 },
  time: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  suggestions: { paddingHorizontal: 16, paddingBottom: 8 },
  suggestionLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  suggestionChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
  },
  chipText: { fontSize: 12, color: '#4F46E5' },
  typingRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, marginBottom: 8 },
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#6B7280' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DBF73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
});
