
import { Database } from "@/integrations/supabase/types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type RecipeDB = Database["public"]["Tables"]["recipes"]["Row"];
export type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];

export type SavedRecipeDB = Database["public"]["Tables"]["saved_recipes"]["Row"];
export type SavedRecipeInsert = Database["public"]["Tables"]["saved_recipes"]["Insert"];
export type SavedRecipeUpdate = Database["public"]["Tables"]["saved_recipes"]["Update"];

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  step: number;
  text: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  cuisine: string | null;
  category: string | null;
  difficulty: string | null;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  tags: string[] | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  image: string | null;
  rating: number | null;
  chef: string | null;
  userId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export function convertDBToRecipe(recipeDB: RecipeDB): Recipe {
  // Convert ingredients from Json to Ingredient[]
  let ingredients: Ingredient[] = [];
  if (recipeDB.ingredients) {
    if (Array.isArray(recipeDB.ingredients)) {
      ingredients = recipeDB.ingredients.map((ing: any) => ({
        name: ing.name || '',
        quantity: ing.quantity || '',
        unit: ing.unit || ''
      }));
    }
  }

  // Convert instructions from Json to Instruction[]
  let instructions: Instruction[] = [];
  if (recipeDB.instructions) {
    if (Array.isArray(recipeDB.instructions)) {
      instructions = recipeDB.instructions.map((inst: any) => ({
        step: inst.step || 0,
        text: inst.text || ''
      }));
    }
  }

  // Return the converted Recipe
  return {
    id: recipeDB.id,
    title: recipeDB.title,
    description: recipeDB.description,
    cuisine: recipeDB.cuisine,
    category: recipeDB.category,
    difficulty: recipeDB.difficulty,
    prepTime: recipeDB.prep_time,
    cookTime: recipeDB.cook_time,
    servings: recipeDB.servings,
    tags: recipeDB.tags,
    ingredients: ingredients,
    instructions: instructions,
    image: recipeDB.image,
    rating: recipeDB.rating,
    chef: recipeDB.chef,
    userId: recipeDB.user_id,
    createdAt: recipeDB.created_at,
    updatedAt: recipeDB.updated_at
  };
}

export function convertRecipeArray(recipes: RecipeDB[]): Recipe[] {
  return recipes.map(recipe => convertDBToRecipe(recipe));
}
