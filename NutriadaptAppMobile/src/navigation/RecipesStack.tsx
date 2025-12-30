import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RecipesStackParamList } from './types';
import RecipesList from '../screens/recipes/RecipesList';
import RecipeDetail from '../screens/recipes/RecipeDetail';

const Stack = createNativeStackNavigator<RecipesStackParamList>();

export default function RecipesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecipesList" component={RecipesList} options={{ title: 'Recettes' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ title: 'Recette' }} />
    </Stack.Navigator>
  );
}
