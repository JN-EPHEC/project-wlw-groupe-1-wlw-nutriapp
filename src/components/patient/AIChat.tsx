import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Bonjour ! Je suis votre assistant IA NutriAdapt. Je peux vous donner des conseils nutritionnels personnalisés, répondre à vos questions sur vos recettes, et vous aider à atteindre vos objectifs santé. Comment puis-je vous aider aujourd\'hui ?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000),
  },
];

const aiSuggestions = [
  'Comment réduire ma glycémie naturellement ?',
  'Quels aliments éviter pour le diabète ?',
  'Idées de petit-déjeuner sain',
  'Conseils pour boire plus d\'eau',
];

export default function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('glycémie') || lowerMessage.includes('diabète') || lowerMessage.includes('sucre')) {
      return 'Pour stabiliser votre glycémie, je vous recommande : \n\n• Privilégiez les aliments à index glycémique bas (légumes verts, légumineuses, céréales complètes)\n• Évitez les sucres rapides et les boissons sucrées\n• Mangez des fibres à chaque repas\n• Pratiquez une activité physique régulière après les repas\n• Respectez des horaires de repas réguliers\n\nVoulez-vous des suggestions de recettes adaptées ?';
    }
    
    if (lowerMessage.includes('petit-déjeuner') || lowerMessage.includes('matin')) {
      return 'Voici des idées de petit-déjeuner sain pour diabétiques :\n\n• Flocons d\'avoine avec fruits rouges et noix\n• Œufs brouillés avec avocat et pain complet\n• Yaourt grec nature avec graines de chia\n• Tartine de pain complet avec beurre d\'amande\n\nToutes ces options ont un index glycémique bas et vous apportent de l\'énergie durable !';
    }
    
    if (lowerMessage.includes('eau') || lowerMessage.includes('hydrat')) {
      return 'Excellente question ! Pour améliorer votre hydratation :\n\n• Fixez-vous un objectif de 2L par jour\n• Utilisez notre module d\'hydratation sur l\'accueil\n• Buvez un grand verre au réveil\n• Gardez une bouteille à portée de main\n• Ajoutez du citron ou menthe pour varier\n• Programmez des rappels sur votre téléphone\n\nL\'hydratation est essentielle pour réguler la glycémie !';
    }
    
    if (lowerMessage.includes('recette') || lowerMessage.includes('repas')) {
      return 'Je peux vous suggérer des recettes adaptées à votre profil ! Consultez la section "Mes recettes" où vous trouverez :\n\n• Plus de 12 recettes compatibles diabète\n• Filtres par allergies et intolérances\n• Informations nutritionnelles détaillées\n• Temps de préparation et calories\n\nToutes nos recettes sont validées par des nutritionnistes !';
    }
    
    // Réponse par défaut
    return 'Merci pour votre question ! Je suis là pour vous accompagner dans votre parcours santé. N\'hésitez pas à me poser des questions sur :\n\n• La nutrition et l\'alimentation\n• La gestion de la glycémie\n• Les recettes adaptées\n• L\'hydratation et l\'activité physique\n• Vos objectifs santé\n\nComment puis-je vous aider ?';
  };

  const handleSend = (message?: string) => {
    const textToSend = message || inputValue;
    
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(textToSend),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-2xl bg-white border-0 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[90vh] max-h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#5B8DEF] to-[#4A7FDB] p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-h3 sm:text-h2 text-white mb-0.5 sm:mb-1">Assistant IA</h3>
                <p className="text-body-2 text-white/90">Conseils personnalisés</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8F8F8]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-br from-[#5B8DEF] to-[#4A7FDB]'
                    : 'bg-[#1DBF73]'
                }`}
              >
                {message.sender === 'ai' ? (
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`flex flex-col max-w-[75%] sm:max-w-[70%] ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 sm:p-4 rounded-2xl shadow-unified ${
                    message.sender === 'ai'
                      ? 'bg-white rounded-tl-none'
                      : 'bg-[#1DBF73] text-white rounded-tr-none'
                  }`}
                >
                  <p
                    className={`text-body-2 sm:text-body-1 leading-relaxed whitespace-pre-line ${
                      message.sender === 'ai' ? 'text-[#1A1A1A]' : 'text-white'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
                <span className="text-xs sm:text-body-2 text-[#6C6C6C] mt-1 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B8DEF] to-[#4A7FDB] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-unified">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#6C6C6C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#6C6C6C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#6C6C6C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions - only show if there are just initial messages */}
        {messages.length <= 1 && (
          <div className="px-4 sm:px-6 py-3 bg-white border-t border-[#E5E5E5]">
            <p className="text-xs sm:text-body-2 text-[#6C6C6C] mb-2">Suggestions :</p>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="px-3 py-1.5 bg-[#F8F8F8] hover:bg-[#EEF2FF] text-[#5B8DEF] rounded-full text-xs sm:text-body-2 border border-[#E5E5E5] hover:border-[#5B8DEF] transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t border-[#E5E5E5] flex-shrink-0">
          <div className="flex gap-2 sm:gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 h-10 sm:h-12 rounded-xl border-[#E5E5E5] bg-[#F8F8F8] text-sm sm:text-base"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-[#5B8DEF] hover:bg-[#4A7FDB] shadow-unified disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
