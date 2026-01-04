import React, { useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import ChatScreen, { ChatMessage } from '../../components/chat/ChatScreen';
import type { DoctorStackParamList } from '../../navigation/DoctorStack';

type DoctorChatRoute = RouteProp<DoctorStackParamList, 'DoctorChat'>;

export default function DoctorChatScreen() {
  const route = useRoute<DoctorChatRoute>();

  const initialMessages: ChatMessage[] = useMemo(
    () => [
      {
        id: '1',
        text: `Bonjour ! Je suis le Dr. Martin. Voici l'espace de messagerie pour ${route.params.patientName}. Comment puis-je vous aider aujourd'hui ?`,
        sender: 'doctor',
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
    [route.params.patientName]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      const doctorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message. Je vais examiner vos données de santé et revenir vers vous rapidement.',
        sender: 'doctor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorMsg]);
    }, 1500);
  };

  return (
    <ChatScreen
      title={route.params.patientName}
      subtitle="Messagerie sécurisée avec le Dr. Martin"
      icon="medkit-outline"
      messages={messages}
      onSend={handleSend}
    />
  );
}
