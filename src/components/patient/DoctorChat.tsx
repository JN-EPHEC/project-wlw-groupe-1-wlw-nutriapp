import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
}

interface DoctorChatProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Bonjour ! Je suis le Dr. Martin. Comment puis-je vous aider aujourd\'hui ?',
    sender: 'doctor',
    timestamp: new Date(Date.now() - 3600000),
  },
];

export default function DoctorChat({ onClose }: DoctorChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'patient',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message. Je vais examiner vos données de santé et vous répondre dans les plus brefs délais.',
        sender: 'doctor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white border-0 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-h2 text-white mb-1">Dr. Martin</h3>
                <p className="text-body-2 text-white/90">Votre médecin traitant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8F8F8]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'patient' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'doctor'
                    ? 'bg-[#1DBF73]'
                    : 'bg-[#5B8DEF]'
                }`}
              >
                {message.sender === 'doctor' ? (
                  <Stethoscope className="w-5 h-5 text-white" strokeWidth={2} />
                ) : (
                  <User className="w-5 h-5 text-white" strokeWidth={2} />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`flex flex-col max-w-[70%] ${
                  message.sender === 'patient' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-4 rounded-2xl shadow-unified ${
                    message.sender === 'doctor'
                      ? 'bg-white rounded-tl-none'
                      : 'bg-[#1DBF73] text-white rounded-tr-none'
                  }`}
                >
                  <p
                    className={`text-body-1 leading-relaxed ${
                      message.sender === 'doctor' ? 'text-[#1A1A1A]' : 'text-white'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
                <span className="text-body-2 text-[#6C6C6C] mt-1 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#E5E5E5] flex-shrink-0">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 h-12 rounded-xl border-[#E5E5E5] bg-[#F8F8F8]"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-12 px-6 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" strokeWidth={2} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
