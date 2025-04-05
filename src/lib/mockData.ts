
import { adaptRecipeToUI, getRecipes, getRecipeById as getRecipeByIdService, getRecipesByUserId } from "@/services/jsonDataService";
import { getAllCategorizedRecipes, getRecipesByCategory as getCategoryRecipes, categories } from "@/services/categoryService";
import type { RecipeUI } from "@/services/jsonDataService";

// Re-export the recipe categories
export { categories };

// Placeholder image URLs (since we don't have actual image files)
const placeholderImage = "https://placehold.co/600x400?text=Recipe+Image";

// Define the trending ingredients by season with placeholder images
export const trendingIngredients = {
  spring: [
    {
      name: "Spinach",
      image: placeholderImage,
      percentageChange: 45
    },
    {
      name: "Fresh Herbs",
      image: placeholderImage,
      percentageChange: 38
    },
    {
      name: "Green Peas",
      image: placeholderImage,
      percentageChange: 32
    },
    {
      name: "Asparagus",
      image: placeholderImage,
      percentageChange: 28
    }
  ],
  summer: [
    {
      name: "Coconut",
      image: placeholderImage,
      percentageChange: 52
    },
    {
      name: "Tomatoes",
      image: placeholderImage,
      percentageChange: 40
    },
    {
      name: "Bell Peppers",
      image: placeholderImage,
      percentageChange: 35
    },
    {
      name: "Avocado",
      image: placeholderImage,
      percentageChange: 30
    }
  ],
  autumn: [
    {
      name: "Turmeric",
      image: placeholderImage,
      percentageChange: 48
    },
    {
      name: "Lentils",
      image: placeholderImage,
      percentageChange: 42
    },
    {
      name: "Mushrooms",
      image: placeholderImage,
      percentageChange: 36
    },
    {
      name: "Rice",
      image: placeholderImage,
      percentageChange: 25
    }
  ],
  winter: [
    {
      name: "Rice",
      image: placeholderImage,
      percentageChange: 38
    },
    {
      name: "Lentils",
      image: placeholderImage,
      percentageChange: 35
    },
    {
      name: "Curry Leaves",
      image: placeholderImage,
      percentageChange: 30
    },
    {
      name: "Coconut",
      image: placeholderImage,
      percentageChange: 22
    }
  ]
};

// Use our adapter functions to get recipes
export const featuredRecipes: RecipeUI[] = getAllCategorizedRecipes().slice(0, 6);
export const southIndianRecipes: RecipeUI[] = getCategoryRecipes('south-indian');

// Helper function to get all recipes
export const getAllRecipes = (): RecipeUI[] => {
  return getAllCategorizedRecipes();
};

// Helper function to get a recipe by its ID
export const getRecipeById = (id: string): RecipeUI | null => {
  const recipe = getRecipeByIdService(id);
  console.log("Recipe fetched:", id, recipe);
  return recipe;
};

// Helper function to get recipes by category
export const getRecipesByCategory = (category: string): RecipeUI[] => {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return getCategoryRecipes(normalizedCategory);
};

// Helper function to search recipes
export const searchRecipes = (query: string): RecipeUI[] => {
  const normalizedQuery = query.toLowerCase().trim();
  return getAllCategorizedRecipes().filter((recipe) => {
    // Search in title
    if (recipe.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    // Search in description
    if (recipe.description && recipe.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    // Search in tags
    if (recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    // Search in ingredients
    if (recipe.ingredients && recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    return false;
  });
};
