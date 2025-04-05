
import usersData from '../data/users.json';
import profilesData from '../data/profiles.json';
import recipesData from '../data/recipes.json';
import savedRecipesData from '../data/saved_recipes.json';
import { Profile, Recipe } from '@/types/database';

// Local storage keys
const USERS_KEY = 'tasty_trends_users';
const PROFILES_KEY = 'tasty_trends_profiles';
const RECIPES_KEY = 'tasty_trends_recipes';
const SAVED_RECIPES_KEY = 'tasty_trends_saved_recipes';
const AUTH_USER_KEY = 'tasty_trends_auth_user';

// Initialize localStorage with JSON data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersData));
  }
  if (!localStorage.getItem(PROFILES_KEY)) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profilesData));
  }
  if (!localStorage.getItem(RECIPES_KEY)) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipesData));
  }
  if (!localStorage.getItem(SAVED_RECIPES_KEY)) {
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipesData));
  }
};

// Initialize storage on import
initializeStorage();

// Helper functions to get and set data
const getData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Recipe adapter to convert between snake_case API and camelCase UI
export interface RecipeUI extends Omit<Recipe, 'prep_time' | 'cook_time'> {
  prepTime: number;
  cookTime: number;
}

export const adaptRecipeToUI = (recipe: Recipe): RecipeUI => {
  const { prep_time, cook_time, ...rest } = recipe;
  return {
    ...rest,
    prepTime: prep_time || 0,
    cookTime: cook_time || 0
  };
};

export const adaptRecipeFromUI = (recipeUI: RecipeUI): Recipe => {
  const { prepTime, cookTime, ...rest } = recipeUI;
  return {
    ...rest,
    prep_time: prepTime,
    cook_time: cookTime
  };
};

// Users
export const getUsers = () => getData(USERS_KEY);
export const getUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((user: any) => user.email === email) || null;
};

// Authentication
export const authenticateUser = (email: string, password: string) => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  return null;
};

export const getAuthUser = () => {
  const user = localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const signOut = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

export const createUser = (email: string, password: string, displayName: string) => {
  const users = getUsers();
  const userId = Date.now().toString();
  
  // Create user
  const newUser = {
    id: userId,
    email,
    password,
    created_at: new Date().toISOString()
  };
  
  // Create profile
  const newProfile = {
    id: userId,
    display_name: displayName,
    username: email.split('@')[0],
    bio: null,
    profile_image: null,
    email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Save new user and profile
  saveData(USERS_KEY, [...users, newUser]);
  const profiles = getData(PROFILES_KEY);
  saveData(PROFILES_KEY, [...profiles, newProfile]);
  
  // Return user object (without password)
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Profiles
export const getProfiles = () => getData(PROFILES_KEY);

export const getProfileById = (id: string): Profile | null => {
  const profiles = getProfiles();
  return profiles.find((profile: Profile) => profile.id === id) || null;
};

export const updateProfile = (id: string, updates: Partial<Profile>) => {
  const profiles = getProfiles();
  const updatedProfiles = profiles.map((profile: Profile) => {
    if (profile.id === id) {
      return { 
        ...profile, 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
    }
    return profile;
  });
  
  saveData(PROFILES_KEY, updatedProfiles);
  return getProfileById(id);
};

// Recipes
export const getRecipes = () => {
  const rawRecipes = getData(RECIPES_KEY);
  return rawRecipes.map(adaptRecipeToUI);
};

export const getRecipeById = (id: string) => {
  const recipes = getData(RECIPES_KEY);
  const recipe = recipes.find((recipe: any) => recipe.id === id);
  return recipe ? adaptRecipeToUI(recipe) : null;
};

export const getRecipesByUserId = (userId: string) => {
  const recipes = getData(RECIPES_KEY);
  return recipes
    .filter((recipe: any) => recipe.user_id === userId)
    .map(adaptRecipeToUI);
};

export const createRecipe = (recipe: Partial<RecipeUI>) => {
  const recipes = getData(RECIPES_KEY);
  const recipeToSave = adaptRecipeFromUI({
    ...recipe,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as RecipeUI);
  
  saveData(RECIPES_KEY, [...recipes, recipeToSave]);
  return adaptRecipeToUI(recipeToSave);
};

export const updateRecipe = (id: string, updates: Partial<RecipeUI>) => {
  const recipes = getData(RECIPES_KEY);
  const updatedRecipes = recipes.map((recipe: Recipe) => {
    if (recipe.id === id) {
      const updatedRecipe = {
        ...recipe,
        ...adaptRecipeFromUI(updates as RecipeUI),
        updated_at: new Date().toISOString()
      };
      return updatedRecipe;
    }
    return recipe;
  });
  
  saveData(RECIPES_KEY, updatedRecipes);
  return getRecipeById(id);
};

export const deleteRecipe = (id: string) => {
  const recipes = getData(RECIPES_KEY);
  const updatedRecipes = recipes.filter((recipe: any) => recipe.id !== id);
  saveData(RECIPES_KEY, updatedRecipes);
};

// Saved Recipes
export const getSavedRecipes = () => getData(SAVED_RECIPES_KEY);

export const getSavedRecipesByUserId = (userId: string) => {
  const savedRecipes = getSavedRecipes();
  return savedRecipes.filter((item: any) => item.user_id === userId);
};

export const getSavedRecipeDetails = (userId: string) => {
  const savedRecipes = getSavedRecipesByUserId(userId);
  const recipes = getData(RECIPES_KEY);
  
  // Get full recipe details for each saved recipe
  return savedRecipes
    .map((savedRecipe: any) => {
      const recipe = recipes.find((r: any) => r.id === savedRecipe.recipe_id);
      return recipe ? adaptRecipeToUI(recipe) : null;
    })
    .filter(Boolean); // Remove any null values
};

export const saveRecipe = (userId: string, recipeId: string) => {
  const savedRecipes = getSavedRecipes();
  
  // Check if already saved
  const alreadySaved = savedRecipes.some(
    (item: any) => item.user_id === userId && item.recipe_id === recipeId
  );
  
  if (!alreadySaved) {
    const newSavedRecipe = {
      id: Date.now().toString(),
      user_id: userId,
      recipe_id: recipeId,
      created_at: new Date().toISOString()
    };
    
    saveData(SAVED_RECIPES_KEY, [...savedRecipes, newSavedRecipe]);
    return true;
  }
  
  return false;
};

export const unsaveRecipe = (userId: string, recipeId: string) => {
  const savedRecipes = getSavedRecipes();
  const updatedSavedRecipes = savedRecipes.filter(
    (item: any) => !(item.user_id === userId && item.recipe_id === recipeId)
  );
  
  saveData(SAVED_RECIPES_KEY, updatedSavedRecipes);
};
