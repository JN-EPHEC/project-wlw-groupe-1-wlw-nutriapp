import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Types conservés
interface NotificationItem {
  id: string;
  type: 'health' | 'nutrition' | 'alert' | 'tip';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: { pack: 'ion' | 'feather' | 'mci'; name: string };
  color: string;
  bgColor: string;
}

type IconSpec = { pack: 'ion' | 'feather' | 'mci'; name: string };
type Tip = { id: string; icon: IconSpec; title: string; message: string; color: string; bgColor: string };

const renderIcon = (
  icon: NotificationItem['icon'],
  size: number,
  color?: string
) => {
  if (icon.pack === 'ion') return <Ionicons name={icon.name as any} size={size} color={color} />;
  if (icon.pack === 'feather') return <Feather name={icon.name as any} size={size} color={color} />;
  return <MaterialCommunityIcons name={icon.name as any} size={size} color={color} />;
};

const TODAYS_TIPS: Tip[] = [
  {
    id: 'tip1',
    icon: { pack: 'ion', name: 'logo-apple' },
    title: 'Conseil du jour',
    message: 'Privilégiez les fruits frais au petit-déjeuner pour un apport en vitamines et fibres.',
    color: '#1DBF73',
    bgColor: '#DCF9EA',
  },
  {
    id: 'tip2',
    icon: { pack: 'ion', name: 'water-outline' },
    title: 'Hydratation',
    message: "Pensez à boire au moins 1.5L d'eau aujourd'hui pour maintenir une bonne hydratation.",
    color: '#60A5FA',
    bgColor: '#DBEAFE',
  },
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Rappel glycémie',
    message: "N'oubliez pas de contrôler votre glycémie ce matin avant le petit-déjeuner.",
    time: 'Il y a 10 min',
    read: false,
    priority: 'high',
    icon: { pack: 'ion', name: 'water-outline' },
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    id: '2',
    type: 'health',
    title: 'Tension artérielle',
    message: "Votre tension est dans la norme aujourd'hui. Continuez vos bonnes habitudes !",
    time: 'Il y a 1h',
    read: false,
    priority: 'medium',
    icon: { pack: 'ion', name: 'heart-outline' },
    color: '#1DBF73',
    bgColor: '#DCF9EA',
  },
  {
    id: '3',
    type: 'nutrition',
    title: 'Objectif protéines',
    message: "Vous avez atteint 85% de votre objectif protéines quotidien. Excellent !",
    time: 'Il y a 2h',
    read: false,
    priority: 'low',
    icon: { pack: 'feather', name: 'trending-up' },
    color: '#1DBF73',
    bgColor: '#DCF9EA',
  },
  {
    id: '4',
    type: 'tip',
    title: 'Conseil nutrition',
    message:
      'Les légumes verts à feuilles sont riches en fer. Pensez aux épinards et au chou kale.',
    time: 'Il y a 3h',
    read: true,
    priority: 'low',
    icon: { pack: 'mci', name: 'sparkles' },
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: '5',
    type: 'alert',
    title: 'Activité physique',
    message:
      "Vous n'avez pas enregistré d'activité cette semaine. 30 min de marche suffisent !",
    time: 'Hier',
    read: true,
    priority: 'medium',
    icon: { pack: 'feather', name: 'activity' },
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  },
  {
    id: '6',
    type: 'health',
    title: 'Poids stable',
    message: 'Votre poids reste stable depuis 2 semaines. Vous êtes sur la bonne voie !',
    time: 'Hier',
    read: true,
    priority: 'low',
    icon: { pack: 'feather', name: 'trending-up' },
    color: '#1DBF73',
    bgColor: '#DCF9EA',
  },
  {
    id: '7',
    type: 'nutrition',
    title: 'Nouvelle recette',
    message: 'Une nouvelle recette adaptée à votre profil diabétique a été ajoutée.',
    time: 'Il y a 2 jours',
    read: true,
    priority: 'low',
    icon: { pack: 'ion', name: 'logo-apple' },
    color: '#1DBF73',
    bgColor: '#DCF9EA',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeNotifications = notifications.filter((n) => !n.read);
  const historyNotifications = notifications.filter((n) => n.read);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleNotifications = () => setNotificationsEnabled((v) => !v);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.h1}>Conseils & Notifications</Text>
              <Text style={styles.subtitle}>Restez informé de votre santé</Text>
            </View>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Toggle card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowGap}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: notificationsEnabled ? '#DCF9EA' : '#F3F4F6' },
                ]}
              >
                {notificationsEnabled
                  ? renderIcon({ pack: 'ion', name: 'notifications-outline' }, 24, '#1DBF73')
                  : renderIcon({ pack: 'ion', name: 'notifications-off-outline' }, 24, '#9CA3AF')}
              </View>
              <View>
                <Text style={styles.title}>Notifications push</Text>
                <Text style={styles.muted}>
                  {notificationsEnabled ? 'Activées' : 'Désactivées'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleNotifications}
              style={[styles.button, notificationsEnabled ? styles.btnGray : styles.btnPrimary]}
            >
              <Text style={[styles.buttonText, notificationsEnabled ? styles.btnGrayText : styles.btnPrimaryText]}>
                {notificationsEnabled ? 'Désactiver' : 'Activer'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips */}
        <View style={{ marginBottom: 16 }}>
          <View style={styles.rowGap}>
            {renderIcon({ pack: 'mci', name: 'sparkles' }, 18, '#F59E0B')}
            <Text style={styles.h2}>Conseils du jour</Text>
          </View>
          <View style={{ gap: 12, marginTop: 12 }}>
            {TODAYS_TIPS.map((tip) => (
              <View key={tip.id} style={styles.card}>
                <View style={styles.rowGap}>
                  <View style={[styles.iconCircle, { backgroundColor: tip.bgColor, width: 48, height: 48 }]}>
                    {renderIcon(tip.icon, 22, tip.color)}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{tip.title}</Text>
                    <Text style={styles.body}>{tip.message}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active notifications */}
        {activeNotifications.length > 0 ? (
          <View style={{ marginBottom: 16 }}>
            <View style={styles.rowBetween}> 
              <View style={styles.rowGap}>
                {renderIcon({ pack: 'ion', name: 'notifications-outline' }, 18, '#1DBF73')}
                <Text style={styles.h2}>Notifications récentes</Text>
              </View>
              {unreadCount > 0 && (
                <TouchableOpacity onPress={markAllAsRead}>
                  <Text style={styles.link}>Tout marquer comme lu</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ gap: 12, marginTop: 12 }}>
              {activeNotifications.map((n) => (
                <TouchableOpacity key={n.id} onPress={() => markAsRead(n.id)} activeOpacity={0.8}>
                  <View style={[styles.card, { padding: 0 }]}> 
                    <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
                      <View style={[styles.iconCircle, { backgroundColor: n.bgColor }]}>
                        {renderIcon(n.icon, 22, n.color)}
                      </View>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <View style={styles.rowBetween}> 
                          <Text style={styles.title}>{n.title}</Text>
                          {n.priority === 'high' && renderIcon({ pack: 'ion', name: 'alert-circle-outline' }, 18, '#EF4444')}
                        </View>
                        <Text style={[styles.body, { marginBottom: 8 }]}>{n.message}</Text>
                        <View style={styles.rowBetween}>
                          <Text style={styles.muted}>{n.time}</Text>
                          {renderIcon({ pack: 'ion', name: 'chevron-forward' }, 16, '#9CA3AF')}
                        </View>
                      </View>
                    </View>
                    {n.priority === 'high' && <View style={styles.priorityBar} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={[styles.card, { alignItems: 'center' }]}> 
            <View style={[styles.iconCircle, { backgroundColor: '#DCF9EA', width: 64, height: 64 }]}> 
              {renderIcon({ pack: 'ion', name: 'checkmark' }, 32, '#1DBF73')}
            </View>
            <Text style={[styles.title, { marginTop: 12 }]}>Tout est à jour !</Text>
            <Text style={styles.muted}>Vous n'avez aucune nouvelle notification</Text>
          </View>
        )}

        {/* History */}
        <TouchableOpacity onPress={() => setShowHistory((v) => !v)} style={styles.rowBetween}>
          <View style={styles.rowGap}>
            {renderIcon({ pack: 'ion', name: 'time-outline' }, 18, '#9CA3AF')}
            <Text style={styles.h2}>Historique</Text>
          </View>
          <View style={{ transform: [{ rotate: showHistory ? '90deg' : '0deg' }] }}>
            {renderIcon({ pack: 'ion', name: 'chevron-forward' }, 18, '#9CA3AF')}
          </View>
        </TouchableOpacity>

        {showHistory && (
          <View style={{ gap: 12, marginTop: 12 }}>
            {historyNotifications.length > 0 ? (
              historyNotifications.map((n) => (
                <View key={n.id} style={[styles.card, { opacity: 0.75 }]}> 
                  <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
                    <View style={[styles.iconCircle, { backgroundColor: n.bgColor, width: 40, height: 40 }]}> 
                      {renderIcon(n.icon, 18, n.color)}
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={[styles.bodyBold, { marginBottom: 4 }]} numberOfLines={1}>
                        {n.title}
                      </Text>
                      <Text style={styles.body} numberOfLines={2}>
                        {n.message}
                      </Text>
                      <Text style={[styles.muted, { marginTop: 4 }]}>{n.time}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.card, { alignItems: 'center' }]}> 
                {renderIcon({ pack: 'ion', name: 'information-circle-outline' }, 48, '#D1D5DB')}
                <Text style={[styles.muted, { marginTop: 8 }]}>Aucun historique disponible</Text>
              </View>
            )}
          </View>
        )}

        {/* Health alerts info (approximation sans gradient) */}
        <View style={[styles.card, { backgroundColor: '#EEFDF5' }]}> 
          <View style={styles.rowGap}>
            <View style={[styles.iconCircle, { backgroundColor: '#fff', width: 40, height: 40 }]}> 
              {renderIcon({ pack: 'ion', name: 'information-circle-outline' }, 18, '#1DBF73')}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Alertes personnalisées</Text>
              <Text style={styles.body}>
                Les notifications sont adaptées à votre profil de santé (diabète, hypertension) pour un suivi optimal.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F4F6' },
  scroll: { flex: 1 },
  container: { padding: 16 },

  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  h1: { fontSize: 22, fontWeight: '700', color: '#1A1A1A' },
  h2: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  title: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  body: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  bodyBold: { fontSize: 14, color: '#1A1A1A', fontWeight: '600' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  muted: { fontSize: 12, color: '#9CA3AF' },

  badge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#fff', fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginBottom: 12,
  },

  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowGap: { flexDirection: 'row', alignItems: 'center', gap: 12 },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 14, fontWeight: '600' },
  btnPrimary: { backgroundColor: '#1DBF73' },
  btnPrimaryText: { color: '#fff' },
  btnGray: { backgroundColor: '#E5E7EB' },
  btnGrayText: { color: '#374151' },
  link: { fontSize: 13, color: '#1DBF73', fontWeight: '600' },

  priorityBar: {
    height: 4,
    backgroundColor: '#F59E0B',
    width: '100%',
  },
});
