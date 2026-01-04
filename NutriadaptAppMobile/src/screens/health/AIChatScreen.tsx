import React, { useState } from 'react';
import ChatScreen, { ChatMessage } from '../../components/chat/ChatScreen';

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Bonjour ! Je suis votre assistant IA NutriAdapt. Je peux vous donner des conseils nutritionnels personnalisés et répondre à vos questions.",
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000),
  },
];

const suggestions = [
  'Comment réduire ma glycémie ?',
  'Idées de petit-déjeuner sain',
  'Quels aliments éviter pour le diabète ?',
  "Conseils pour boire plus d'eau",
  'Comment stabiliser mon poids ?',
  'Que faire si ma tension est élevée ?',
  'Je dors mal en ce moment',
  "Comment reprendre une activité physique ?",
  'Dois-je adapter mes médicaments ?',
];

export default function AIChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    // Glycémie / diabète
    if (lower.includes('glycém') || lower.includes('diabèt') || lower.includes('sucre')) {
      return "Pour stabiliser votre glycémie, privilégiez les aliments à index glycémique bas (légumineuses, céréales complètes, légumes), répartissez vos glucides sur la journée et essayez de marcher 10 à 15 minutes après les repas. Évitez les boissons sucrées et les snacks ultra-transformés.";
    }

    // Poids / perte de poids
    if (lower.includes('poids') || lower.includes('maigr') || lower.includes('grossir')) {
      return "Pour agir sur votre poids, commencez par structurer 3 repas par jour, en remplissant la moitié de l'assiette avec des légumes, un quart avec une source de protéines (poisson, œufs, légumineuses) et un quart avec des féculents complets. Limitez les grignotages et les boissons sucrées.";
    }

    // Tension / hypertension
    if (lower.includes('tension') || lower.includes('hypertension') || lower.includes('pression artérielle')) {
      return "En cas de tension élevée, limitez le sel ajouté (goûtez avant de saler), évitez les plats industriels très salés et privilégiez les aliments riches en potassium comme les légumes, les fruits et les légumineuses. La marche régulière aide aussi à réguler la pression artérielle.";
    }

    // Sommeil
    if (lower.includes('sommeil') || lower.includes('dorm') || lower.includes('insomnie')) {
      return "Pour améliorer votre sommeil, évitez les repas très copieux le soir, limitez la caféine après 16h et essayez de garder des horaires de coucher réguliers. Un dîner léger avec des légumes et une source de protéines peut favoriser un meilleur repos.";
    }

    // Activité physique
    if (lower.includes('sport') || lower.includes('activité') || lower.includes('bouger') || lower.includes('marche')) {
      return "L'objectif réaliste est de viser au moins 150 minutes d'activité modérée par semaine (par exemple 30 minutes de marche rapide 5 jours sur 7). Commencez doucement, 10 minutes par jour, puis augmentez progressivement selon votre forme et l'avis de votre médecin.";
    }

    // Médicaments / traitement (reste très prudent)
    if (lower.includes('médic') || lower.includes('traitement') || lower.includes('insuline')) {
      return "Pour tout ajustement de traitement (médicaments, insuline, etc.), il est indispensable de demander l'avis de votre médecin. Je peux vous aider à mieux comprendre l'impact de l'alimentation et de l'activité sur vos résultats, mais je ne remplace pas un avis médical.";
    }

    // Hydratation
    if (lower.includes('eau') || lower.includes('hydrat')) {
      return "Visez environ 1,5 à 2L d'eau par jour, en répartissant les prises sur la journée : un grand verre au réveil, un à chaque repas et un entre les repas. Les boissons sucrées comptent peu car elles apportent surtout du sucre.";
    }

    // Petit-déjeuner
    if (lower.includes('petit-déjeuner') || lower.includes('matin')) {
      return "Un exemple de petit-déjeuner équilibré : flocons d'avoine avec un yaourt nature, des fruits frais (pomme, poire, fruits rouges) et quelques oléagineux (noix, amandes). Évitez les jus de fruits industriels et les viennoiseries quotidiennes.";
    }

    return "Merci pour votre question. Je peux vous aider sur la glycémie, le poids, la tension, le sommeil, l'activité physique, l'hydratation et l'équilibre de vos repas. Si vos symptômes sont importants ou inhabituels, contactez votre médecin.";
  };

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <ChatScreen
      title="Assistant IA"
      subtitle="Conseils personnalisés"
      icon="sparkles-outline"
      messages={messages}
      onSend={handleSend}
      isTyping={isTyping}
      suggestions={suggestions}
    />
  );
}
