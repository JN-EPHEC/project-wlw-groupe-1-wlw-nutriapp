import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { recipes } from '../../data/recipes';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen() {
  const favorites = recipes.filter(r => r.favorite);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.empty}> 
          <Ionicons name="heart-outline" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>Ajoutez des recettes à vos favoris pour les retrouver rapidement.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 12, gap: 12 }}
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => (navigation as any).navigate('Recipes', { screen: 'RecipeDetail', params: { id: item.id } })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaChip}>
                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{item.time} min</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Ionicons name="flame-outline" size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{item.calories} kcal</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emptyTitle: { marginTop: 8, fontSize: 18, fontWeight: '700', color: '#111827' },
  emptyText: { marginTop: 4, fontSize: 14, color: '#6B7280', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  image: { width: '100%', height: 140 },
  cardBody: { padding: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  metaChip: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
  metaText: { fontSize: 12, color: '#6B7280' },
});
