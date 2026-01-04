import { useState } from 'react';
import { Bell, BellOff, Heart, Droplet, Activity, Apple, TrendingUp, Clock, Check, ChevronRight, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface Notification {
  id: string;
  type: 'health' | 'nutrition' | 'alert' | 'tip';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: any;
  color: string;
  bgColor: string;
}

const TODAYS_TIPS = [
  {
    id: 'tip1',
    icon: Apple,
    title: 'Conseil du jour',
    message: 'Privilégiez les fruits frais au petit-déjeuner pour un apport en vitamines et fibres.',
    color: '#1DBF73',
    bgColor: '#DCF9EA'
  },
  {
    id: 'tip2',
    icon: Droplet,
    title: 'Hydratation',
    message: 'Pensez à boire au moins 1.5L d\'eau aujourd\'hui pour maintenir une bonne hydratation.',
    color: '#60A5FA',
    bgColor: '#DBEAFE'
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Rappel glycémie',
    message: 'N\'oubliez pas de contrôler votre glycémie ce matin avant le petit-déjeuner.',
    time: 'Il y a 10 min',
    read: false,
    priority: 'high',
    icon: Droplet,
    color: '#EF4444',
    bgColor: '#FEE2E2'
  },
  {
    id: '2',
    type: 'health',
    title: 'Tension artérielle',
    message: 'Votre tension est dans la norme aujourd\'hui. Continuez vos bonnes habitudes !',
    time: 'Il y a 1h',
    read: false,
    priority: 'medium',
    icon: Heart,
    color: '#1DBF73',
    bgColor: '#DCF9EA'
  },
  {
    id: '3',
    type: 'nutrition',
    title: 'Objectif protéines',
    message: 'Vous avez atteint 85% de votre objectif protéines quotidien. Excellent !',
    time: 'Il y a 2h',
    read: false,
    priority: 'low',
    icon: TrendingUp,
    color: '#1DBF73',
    bgColor: '#DCF9EA'
  },
  {
    id: '4',
    type: 'tip',
    title: 'Conseil nutrition',
    message: 'Les légumes verts à feuilles sont riches en fer. Pensez aux épinards et au chou kale.',
    time: 'Il y a 3h',
    read: true,
    priority: 'low',
    icon: Sparkles,
    color: '#F59E0B',
    bgColor: '#FEF3C7'
  },
  {
    id: '5',
    type: 'alert',
    title: 'Activité physique',
    message: 'Vous n\'avez pas enregistré d\'activité cette semaine. 30 min de marche suffisent !',
    time: 'Hier',
    read: true,
    priority: 'medium',
    icon: Activity,
    color: '#F59E0B',
    bgColor: '#FEF3C7'
  },
  {
    id: '6',
    type: 'health',
    title: 'Poids stable',
    message: 'Votre poids reste stable depuis 2 semaines. Vous êtes sur la bonne voie !',
    time: 'Hier',
    read: true,
    priority: 'low',
    icon: TrendingUp,
    color: '#1DBF73',
    bgColor: '#DCF9EA'
  },
  {
    id: '7',
    type: 'nutrition',
    title: 'Nouvelle recette',
    message: 'Une nouvelle recette adaptée à votre profil diabétique a été ajoutée.',
    time: 'Il y a 2 jours',
    read: true,
    priority: 'low',
    icon: Apple,
    color: '#1DBF73',
    bgColor: '#DCF9EA'
  }
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeNotifications = notifications.filter(n => !n.read);
  const historyNotifications = notifications.filter(n => n.read);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6 shadow-unified">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-h2 text-[#1A1A1A]">Conseils & Notifications</h1>
            <p className="text-body-2 text-gray-500 mt-1">
              Restez informé de votre santé
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-[#EF4444] text-white px-3 py-1 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Notification Toggle */}
        <Card className="bg-white rounded-xl shadow-unified p-4 border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {notificationsEnabled ? (
                <div className="w-12 h-12 rounded-full bg-[#DCF9EA] flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#1DBF73]" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <BellOff className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-body-1 font-semibold text-[#1A1A1A]">
                  Notifications push
                </p>
                <p className="text-body-2 text-gray-500">
                  {notificationsEnabled ? 'Activées' : 'Désactivées'}
                </p>
              </div>
            </div>
            <Button
              onClick={toggleNotifications}
              className={`h-10 rounded-xl ${
                notificationsEnabled
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-[#1DBF73] text-white hover:bg-[#0F8F55]'
              }`}
            >
              {notificationsEnabled ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
        </Card>

        {/* Today's Tips */}
        <div>
          <h2 className="text-h3 text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            Conseils du jour
          </h2>
          <div className="space-y-3">
            {TODAYS_TIPS.map((tip) => {
              const Icon = tip.icon;
              return (
                <Card key={tip.id} className="bg-white rounded-xl shadow-unified p-4 border-0">
                  <div className="flex gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: tip.bgColor }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tip.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-body-1 font-semibold text-[#1A1A1A] mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-body-2 text-gray-600 leading-relaxed">
                        {tip.message}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Active Notifications */}
        {activeNotifications.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 text-[#1A1A1A] flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#1DBF73]" />
                Notifications récentes
              </h2>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-body-2 text-[#1DBF73] font-medium hover:text-[#0F8F55] transition-colors"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
            <div className="space-y-3">
              {activeNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card
                    key={notification.id}
                    className="bg-white rounded-xl shadow-unified border-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3 p-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: notification.bgColor }}
                      >
                        <Icon className="w-6 h-6" style={{ color: notification.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-body-1 font-semibold text-[#1A1A1A]">
                            {notification.title}
                          </h3>
                          {notification.priority === 'high' && (
                            <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-body-2 text-gray-600 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-body-2 text-gray-400">
                            {notification.time}
                          </p>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    {notification.priority === 'high' && (
                      <div className="h-1 bg-gradient-to-r from-[#EF4444] to-[#F59E0B]" />
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State for Active Notifications */}
        {activeNotifications.length === 0 && (
          <Card className="bg-white rounded-xl shadow-unified p-8 border-0 text-center">
            <div className="w-16 h-16 rounded-full bg-[#DCF9EA] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#1DBF73]" />
            </div>
            <h3 className="text-body-1 font-semibold text-[#1A1A1A] mb-2">
              Tout est à jour !
            </h3>
            <p className="text-body-2 text-gray-500">
              Vous n'avez aucune nouvelle notification
            </p>
          </Card>
        )}

        {/* History Section */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full mb-4"
          >
            <h2 className="text-h3 text-[#1A1A1A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Historique
            </h2>
            <ChevronRight 
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showHistory ? 'rotate-90' : ''
              }`}
            />
          </button>

          {showHistory && (
            <div className="space-y-3">
              {historyNotifications.length > 0 ? (
                historyNotifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Card
                      key={notification.id}
                      className="bg-white rounded-xl shadow-unified border-0 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex gap-3 p-4">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: notification.bgColor }}
                        >
                          <Icon className="w-5 h-5" style={{ color: notification.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-body-2 font-semibold text-[#1A1A1A] mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-body-2 text-gray-500 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-body-2 text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="bg-white rounded-xl shadow-unified p-6 border-0 text-center">
                  <Info className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-body-2 text-gray-400">
                    Aucun historique disponible
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Health Alerts Info */}
        <Card className="bg-gradient-to-br from-[#DCF9EA] to-white rounded-xl shadow-unified p-4 border-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-[#1DBF73]" />
            </div>
            <div>
              <h3 className="text-body-1 font-semibold text-[#1A1A1A] mb-1">
                Alertes personnalisées
              </h3>
              <p className="text-body-2 text-gray-600 leading-relaxed">
                Les notifications sont adaptées à votre profil de santé (diabète, hypertension) pour un suivi optimal.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
