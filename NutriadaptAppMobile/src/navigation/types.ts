export type RootTabParamList = {
  Home: undefined;
  Recipes: undefined;
  Health: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  DoctorStack: undefined;
  // Example detail routes that could be pushed modally if needed later
  // RecipeDetail: { id: string };
  // RecipeTimer: { id: string };
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  Notifications: undefined;
};

export type RecipesStackParamList = {
  RecipesList: undefined;
  RecipeDetail: { id: string };
};
