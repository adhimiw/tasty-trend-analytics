
export interface Profile {
  id: string;
  display_name: string | null;
  username: string | null;
  bio: string | null;
  profile_image: string | null;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  step: number;
  text: string;
  image?: string | null;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  cuisine: string | null;
  category: string | null;
  difficulty: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  tags: string[] | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  image: string | null;
  rating: number | null;
  chef: string | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SavedRecipe {
  id: string;
  user_id: string | null;
  recipe_id: string | null;
  created_at: string | null;
}
