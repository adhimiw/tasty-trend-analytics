
export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  email: string | null;
  bio: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Instruction {
  step: number;
  text: string;
  image?: string | null;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image: string | null;
  rating: number;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  chef: string | null;
  cuisine: string | null;
  category: string | null;
  difficulty: string | null;
  ingredients: Ingredient[] | null;
  instructions: Instruction[] | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}
