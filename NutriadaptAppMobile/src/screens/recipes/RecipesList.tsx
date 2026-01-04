import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RecipesStackParamList } from '../../navigation/types';
import { recipes as DATA, type Recipe } from '../../data/recipes';
import { Ionicons } from '@expo/vector-icons';

export default function RecipesList() {
  const navigation = useNavigation<NativeStackNavigationProp<RecipesStackParamList>>();
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<'all' | Recipe['category']>('all');
  const [recipes, setRecipes] = React.useState<Recipe[]>(DATA);
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);

  const filtered = recipes.filter((r) => {
    const matchCategory = category === 'all' || r.category === category;
    const matchQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchFavorite = !showOnlyFavorites || r.favorite;
    return matchCategory && matchQuery && matchFavorite;
  });

  const toggleFavorite = (id: string) => {
    setRecipes((current) =>
      current.map((r) =>
        r.id === id
          ? {
              ...r,
              favorite: !r.favorite,
            }
          : r
      )
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Recettes</Text>
            <Text style={styles.subtitle}>Adaptées à votre profil</Text>
          </View>
          <TouchableOpacity
            style={[styles.favButton, showOnlyFavorites && styles.favButtonActive]}
            onPress={() => setShowOnlyFavorites((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showOnlyFavorites ? 'heart' : 'heart-outline'}
              size={16}
              color={showOnlyFavorites ? '#FFFFFF' : '#EF4444'}
            />
            <Text style={[styles.favButtonText, showOnlyFavorites && styles.favButtonTextActive]}>Favoris</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Rechercher une recette"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View style={styles.categories}>
          {(['all','breakfast','lunch','dinner','snack'] as const).map((c) => (
            <TouchableOpacity key={c} style={[styles.catChip, category===c && styles.catChipActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.catText, category===c && styles.catTextActive]}>
                {c==='all' ? 'Tout' : c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} activeOpacity={0.8}>
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item.id)}
                    activeOpacity={0.8}
                    style={styles.heartButton}
                  >
                    <Ionicons
                      name={item.favorite ? 'heart' : 'heart-outline'}
                      size={18}
                      color={item.favorite ? '#EF4444' : '#6C6C6C'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 12 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <View style={styles.chip}><Ionicons name="time-outline" size={14} color="#6C6C6C" /><Text style={styles.chipText}>{item.time} min</Text></View>
                    <View style={styles.chip}><Ionicons name="flame-outline" size={14} color="#6C6C6C" /><Text style={styles.chipText}>{item.calories} kcal</Text></View>
                  </View>
                  <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={14} color="#FACC15" />
                    ))}
                    <Text style={styles.ratingCount}>(120)</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  subtitle: { fontSize: 13, color: '#6B7280' },
  favButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 36, borderRadius: 999, backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' },
  favButtonActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  favButtonText: { fontSize: 13, fontWeight: '600', color: '#B91C1C' },
  favButtonTextActive: { color: '#FFFFFF' },
  body: { fontSize: 16, color: '#6C6C6C' },
  searchBox: { marginTop: 8, height: 44, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  searchInput: { flex: 1, color: '#1A1A1A' },
  categories: { flexDirection: 'row', gap: 8, marginTop: 12 },
  catChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#F3F4F6' },
  catChipActive: { backgroundColor: '#DCF9EA' },
  catText: { color: '#6C6C6C', fontWeight: '600' },
  catTextActive: { color: '#0F8F55' },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  imageWrapper: { height: 160, backgroundColor: '#EEE', borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  heartButton: { position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFFE6', alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8F8F8', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipText: { fontSize: 12, color: '#6C6C6C' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 2 },
  ratingCount: { fontSize: 12, color: '#808080', marginLeft: 4 },
});
