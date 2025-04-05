
import { adaptRecipeToUI, getRecipes, getRecipeById as getRecipeByIdService, getRecipesByUserId } from "@/services/jsonDataService";
import type { RecipeUI } from "@/services/jsonDataService";

// Re-export the recipe categories
export const categories = [
  {
    title: "South Indian",
    slug: "south-indian",
    icon: "🍛"
  },
  {
    title: "Baking",
    slug: "baking",
    icon: "🍞"
  },
  {
    title: "Quick Dinners",
    slug: "quick-dinners",
    icon: "⏱️"
  },
  {
    title: "Beverages",
    slug: "beverages",
    icon: "🍹"
  },
  {
    title: "One-Pot Meals",
    slug: "one-pot-meals",
    icon: "🍲"
  },
  {
    title: "Soups & Stews",
    slug: "soups-stews",
    icon: "🥣"
  },
  {
    title: "Vegetarian",
    slug: "vegetarian",
    icon: "🥗"
  },
  {
    title: "Desserts",
    slug: "desserts",
    icon: "🍰"
  }
];

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
export const featuredRecipes: RecipeUI[] = getRecipes().slice(0, 6);
export const southIndianRecipes: RecipeUI[] = getRecipes().filter(recipe => 
  recipe.cuisine === "South Indian" || 
  (recipe.tags && recipe.tags.includes("south indian"))
);

// Helper function to get all recipes
export const getAllRecipes = (): RecipeUI[] => {
  return getRecipes();
};

// Helper function to get a recipe by its ID
export const getRecipeById = (id: string): RecipeUI | null => {
  return getRecipeByIdService(id);
};

// Helper function to get recipes by category
export const getRecipesByCategory = (category: string): RecipeUI[] => {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return getRecipes().filter((recipe) => {
    // Check in category field
    if (recipe.category && recipe.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategory) {
      return true;
    }
    // Check in tags
    if (recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, '-') === normalizedCategory)) {
      return true;
    }
    return false;
  });
};

// Helper function to search recipes
export const searchRecipes = (query: string): RecipeUI[] => {
  const normalizedQuery = query.toLowerCase().trim();
  return getRecipes().filter((recipe) => {
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
