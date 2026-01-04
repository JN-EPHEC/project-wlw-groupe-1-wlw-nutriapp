import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BorderRadius, Colors, Spacing, Typography } from '@/constants';

type IoniconName = keyof typeof Ionicons.glyphMap;

export type RecipeFilterOption = {
  id: string;
  label: string;
  description?: string;
  icon: IoniconName;
};

type RecipeFiltersProps = {
  filters: RecipeFilterOption[];
  selectedFilters: string[];
  onToggle: (filterId: string) => void;
  onClear?: () => void;
  rightAction?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function RecipeFilters({ filters, selectedFilters, onToggle, onClear, rightAction, style }: RecipeFiltersProps) {
  const hasSelection = selectedFilters.length > 0;

  return (
    <View style={[styles.container, style]}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Filtres intelligents</Text>
          <Text style={styles.subtitle}>
            {hasSelection ? `${selectedFilters.length} filtre${selectedFilters.length > 1 ? 's' : ''} actif${selectedFilters.length > 1 ? 's' : ''}` : 'Affinez selon vos objectifs santé'}
          </Text>
        </View>
        <View style={styles.headerRight}>
          {rightAction}
          {hasSelection && onClear ? (
            <TouchableOpacity style={styles.resetButton} onPress={onClear}>
              <Ionicons name="close-circle" size={18} color={Colors.primary.green} />
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => {
          const selected = selectedFilters.includes(filter.id);
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, selected && styles.filterChipActive]}
              onPress={() => onToggle(filter.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.filterIcon, selected && styles.filterIconActive]}>
                <Ionicons
                  name={filter.icon}
                  size={16}
                  color={selected ? Colors.neutral.white : Colors.primary.green}
                />
              </View>
              <View style={styles.filterTextContainer}>
                <Text style={[styles.filterLabel, selected && styles.filterLabelActive]}>{filter.label}</Text>
                {filter.description ? (
                  <Text style={[styles.filterDescription, selected && styles.filterDescriptionActive]} numberOfLines={1}>
                    {filter.description}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    ...Typography.body1,
    fontWeight: '600',
    color: Colors.neutral.gray900,
  },
  subtitle: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.greenPastel,
  },
  resetButtonText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.primary.green,
  },
  filtersContent: {
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.gray100,
  },
  filterChipActive: {
    backgroundColor: Colors.primary.green,
  },
  filterIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.greenPastel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterTextContainer: {
    maxWidth: 160,
  },
  filterLabel: {
    ...Typography.body2,
    fontWeight: '600',
    color: Colors.primary.green,
  },
  filterLabelActive: {
    color: Colors.neutral.white,
  },
  filterDescription: {
    ...Typography.caption,
    color: Colors.neutral.gray600,
  },
  filterDescriptionActive: {
    color: 'rgba(255,255,255,0.9)',
  },
});

export default RecipeFilters;
