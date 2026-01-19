import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { subscribeDailyEntries, toDayKey } from '@/services/firestore';

type MessageType = 'assistant' | 'user';

type ChatMessage = {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  recipeRecommendation?: {
    recipeId: string;
    recipeName: string;
  };
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

const aiResponses: {[key: string]: {response: string; recipeId: string; recipeName: string}} = {
  'Recette pour diabétique': {
    response: "Excellente question ! Pour les personnes diabétiques, je recommande des recettes riches en protéines et pauvres en sucres rapides. Notre Salade Keto Complète est parfaite : elle équilibre les glucides avec des graisses saines et des protéines, tout en étant délicieuse et facile à préparer. Cette salade aide à maintenir un équilibre glycémique stable tout au long de la journée.",
    recipeId: '1',
    recipeName: 'Salade Keto complète'
  },
  'Calcul de mes macros': {
    response: "Pour calculer vos macros optimaux, je vous recommande une approche équilibrée : 40% glucides, 30% protéines, 30% lipides (adaptable selon vos objectifs). Notre Buddha Bowl est un excellent exemple d'équilibre macronutritionnel : il combine quinoa riche en protéines, pois chiches pour les fibres, avocat pour les bonnes graisses, et légumes variés. C'est une recette très équilibrée pour atteindre vos objectifs macro !",
    recipeId: '8',
    recipeName: 'Buddha bowl légumineuses & quinoa'
  },
  'Conseils pour stabiliser ma glycémie': {
    response: "Pour stabiliser votre glycémie naturellement, privilégiez les aliments à indice glycémique bas et les repas équilibrés. Notre Saumon & Légumes Vapeur est idéal : les oméga-3 du saumon et les fibres des légumes ralentissent l'absorption des sucres. Consommez-le régulièrement avec des portions adaptées, et attendez-vous à une meilleure stabilité glycémique sur la durée.",
    recipeId: '4',
    recipeName: 'Saumon & Légumes vapeur'
  },
  'Alternatives sans gluten': {
    response: "Le régime sans gluten peut être savoureux et nutritif ! Notre Curry de Lentilles Corail est naturellement sans gluten et riche en protéines végétales. Les lentilles sont une excellente source de fer et de fibres. Je recommande également notre Porridge aux Baies avec des flocons sans gluten - parfait pour un petit-déjeuner énergétique et sans compromis sur le goût !",
    recipeId: '6',
    recipeName: 'Curry de lentilles corail'
  }
};

type DailyMetrics = {
  glucose?: number;
  weight?: number;
  activity?: number;
  water?: number;
  calories?: number;
};

type HealthAdviceResult = {
  response: string;
  recipeId: string;
  recipeName: string;
};

export function AIAssistantScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [todayMetrics, setTodayMetrics] = useState<DailyMetrics>({});

  // Load today's health metrics
  useEffect(() => {
    if (!user?.uid) return;

    const todayKey = toDayKey(new Date());
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date();
    to.setHours(23, 59, 59, 999);

    const unsubscribe = subscribeDailyEntries(
      user.uid,
      {
        from: Timestamp.fromDate(from),
        to: Timestamp.fromDate(to),
      },
      (items) => {
        const todayEntry = items.find((item) => item.data?.date === todayKey);
        if (todayEntry?.data?.values) {
          setTodayMetrics(todayEntry.data.values);
        }
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const generateHealthAdvice = (metrics: DailyMetrics): HealthAdviceResult => {
    const glucose = metrics.glucose_mgdl;
    const weight = metrics.weight_kg;
    const calories = metrics.calories_kcal;
    const activity = metrics.activity_min;

    // If glucose is high (>130 mg/dL)
    if (glucose && glucose > 130) {
      return {
        response: `Basé sur votre glycémie d'aujourd'hui (${glucose} mg/dL) qui est un peu élevée, je vous recommande de privilégier des aliments à faible indice glycémique. Notre Saumon & Légumes Vapeur est parfait pour vous aider à réguler votre glycémie naturellement grâce aux oméga-3 et aux fibres. Essayez aussi d'augmenter votre activité physique !`,
        recipeId: '4',
        recipeName: 'Saumon & Légumes vapeur'
      };
    }

    // If calorie intake is low (<1500)
    if (calories && calories < 1500) {
      return {
        response: `Vous n'avez consommé que ${calories} calories aujourd'hui, ce qui est un peu faible. Je vous recommande le Buddha Bowl, une recette très équilibrée et nutritive qui vous apportera les calories et nutriments nécessaires pour maintenir votre énergie tout au long de la journée.`,
        recipeId: '8',
        recipeName: 'Buddha bowl légumineuses & quinoa'
      };
    }

    // If calorie intake is high (>2500)
    if (calories && calories > 2500) {
      return {
        response: `Vous avez dépassé 2500 calories aujourd'hui (${calories} kcal). Demain, je vous recommande de privilégier des repas plus légers et équilibrés. Notre Salade Keto Complète est riche en nutriments mais faible en calories, idéale pour vous aider à équilibrer votre consommation calorique.`,
        recipeId: '1',
        recipeName: 'Salade Keto complète'
      };
    }

    // If activity is low (<20 minutes)
    if (activity && activity < 20) {
      return {
        response: `Vous n'avez enregistré que ${activity} minutes d'activité aujourd'hui. L'activité physique est cruciale pour la santé ! Je vous recommande une recette nutritive comme notre Saumon & Légumes Vapeur pour vous préparer à une prochaine séance d'exercice bien énergisant.`,
        recipeId: '4',
        recipeName: 'Saumon & Légumes vapeur'
      };
    }

    // Default: balanced metrics
    return {
      response: "Excellent ! Vos mesures d'aujourd'hui semblent bien équilibrées. Pour continuer dans cette dynamique positive, je vous recommande notre Buddha Bowl, une recette équilibrée qui vous permettra de maintenir votre santé et votre bien-être.",
      recipeId: '8',
      recipeName: 'Buddha bowl légumineuses & quinoa'
    };
  };

  const isRecommendationQuestion = (text: string): boolean => {
    const keywords = ['recommande', 'conseil', 'manger', 'quoi', 'que me', 'quoi manger', 'que me recommandes-tu'];
    return keywords.some(keyword => text.toLowerCase().includes(keyword));
  };

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
      // Check if user's message matches a quick question
      const matchedQuestion = quickQuestions.find(q => 
        trimmed.toLowerCase().includes(q.toLowerCase()) || 
        q.toLowerCase().includes(trimmed.toLowerCase())
      );

      let aiResponse = '';
      let recipeRecommendation = undefined;

      if (matchedQuestion && aiResponses[matchedQuestion]) {
        const response = aiResponses[matchedQuestion];
        aiResponse = response.response;
        recipeRecommendation = {
          recipeId: response.recipeId,
          recipeName: response.recipeName
        };
      } else if (isRecommendationQuestion(trimmed)) {
        // Generate advice based on today's metrics
        const advice = generateHealthAdvice(todayMetrics);
        aiResponse = advice.response;
        recipeRecommendation = {
          recipeId: advice.recipeId,
          recipeName: advice.recipeName
        };
      } else {
        // Default response for custom questions
        aiResponse = "Merci pour votre question ! Je comprends vos préoccupations nutritionnelles. Pour des conseils plus personnalisés, je vous recommande de consulter l'une de nos recettes équilibrées qui correspond à vos besoins spécifiques. N'hésitez pas à me poser d'autres questions !";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: aiResponse,
        timestamp: new Date(),
        recipeRecommendation,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = aiResponses[question];
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: response.response,
        timestamp: new Date(),
        recipeRecommendation: {
          recipeId: response.recipeId,
          recipeName: response.recipeName
        },
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
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
              <View key={message.id}>
                <View
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
                
                {message.recipeRecommendation && (
                  <View style={styles.recipeRecommendationContainer}>
                    <View style={styles.recipeRecommendationBox}>
                      <View style={styles.recipeRecommendationHeader}>
                        <Ionicons name="restaurant" size={18} color="#5B8DEF" />
                        <Text style={styles.recipeRecommendationTitle}>Recette recommandée</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.recipeButton}
                        onPress={() => {
                          router.push({
                            pathname: '/(tabs)/recipes/[id]',
                            params: { id: message.recipeRecommendation!.recipeId }
                          })
                        }}
                      >
                        <Text style={styles.recipeButtonText}>{message.recipeRecommendation.recipeName}</Text>
                        <Ionicons name="arrow-forward" size={16} color={Colors.neutral.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
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
  recipeRecommendationContainer: {
    marginLeft: Spacing.lg,
    marginTop: Spacing.sm,
  },
  recipeRecommendationBox: {
    backgroundColor: '#F0F4FF',
    borderLeftWidth: 4,
    borderLeftColor: '#5B8DEF',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    maxWidth: '85%',
  },
  recipeRecommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  recipeRecommendationTitle: {
    ...Typography.label,
    color: '#5B8DEF',
    fontWeight: '600',
  },
  recipeButton: {
    backgroundColor: '#5B8DEF',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  recipeButtonText: {
    ...Typography.body2,
    color: Colors.neutral.white,
    fontWeight: '600',
    flex: 1,
  },
});

export default AIAssistantScreen;
