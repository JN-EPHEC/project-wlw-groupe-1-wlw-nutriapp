import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RecipesStackParamList } from '../../navigation/types';
import { recipes } from '../../data/recipes';
import { Ionicons } from '@expo/vector-icons';

export type RecipeDetailProps = NativeStackScreenProps<RecipesStackParamList, 'RecipeDetail'>;

export default function RecipeDetail({ route }: RecipeDetailProps) {
  const { id } = route.params;
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}><View style={styles.content}><Text>Recette introuvable.</Text></View></SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ height: 260, backgroundColor: '#EEE' }}>
          <Image source={{ uri: recipe.image }} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <View style={styles.chip}><Ionicons name="time-outline" size={14} color="#6C6C6C" /><Text style={styles.chipText}>{recipe.time} min</Text></View>
            <View style={styles.chip}><Ionicons name="flame-outline" size={14} color="#6C6C6C" /><Text style={styles.chipText}>{recipe.calories} kcal</Text></View>
          </View>

          {/* Tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {recipe.tags.map((tag) => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          {/* Nutrition */}
          <View style={[styles.card, { marginTop: 16 }]}>
            <Text style={styles.sectionTitle}>Informations nutritionnelles</Text>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Glucides</Text><Text style={styles.infoValue}>{recipe.carbs}g</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Protéines</Text><Text style={styles.infoValue}>{recipe.protein}g</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Lipides</Text><Text style={styles.infoValue}>{recipe.fat}g</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Sodium</Text><Text style={styles.infoValue}>{recipe.sodium}mg</Text></View>
          </View>

          {/* Ingrédients */}
          <View style={[styles.card, { marginTop: 16 }]}> 
            <Text style={styles.sectionTitle}>Ingrédients</Text>
            {recipe.ingredients.map((ing, idx) => (
              <View key={idx} style={styles.bulletRow}><View style={styles.bulletDot} /><Text style={styles.body}>{ing}</Text></View>
            ))}
          </View>

          {/* Étapes */}
          <View style={[styles.card, { marginTop: 16 }]}> 
            <Text style={styles.sectionTitle}>Préparation</Text>
            {recipe.steps.map((stp, idx) => (
              <View key={idx} style={styles.stepRow}><View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{idx+1}</Text></View><Text style={styles.body}>{stp}</Text></View>
            ))}
          </View>

          <TouchableOpacity style={[styles.cta, { marginTop: 16 }]}> 
            <Ionicons name="play" size={16} color="#fff" />
            <Text style={styles.ctaText}>Commencer la recette</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  body: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8F8F8', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipText: { fontSize: 12, color: '#6C6C6C' },
  tag: { backgroundColor: '#DCF9EA', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: '#0F8F55', fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  infoLabel: { color: '#6C6C6C' },
  infoValue: { color: '#1A1A1A', fontWeight: '700' },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', paddingVertical: 6 },
  bulletDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: '#1DBF73', marginTop: 6 },
  stepRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', paddingVertical: 8 },
  stepBadge: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#1DBF73', alignItems: 'center', justifyContent: 'center' },
  stepBadgeText: { color: '#fff', fontWeight: '700' },
  cta: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1DBF73', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, alignSelf: 'stretch', justifyContent: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
});
