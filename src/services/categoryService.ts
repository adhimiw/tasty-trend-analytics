
import southIndianRecipes from '../data/categories/south-indian.json';
import bakingRecipes from '../data/categories/baking.json';
import quickDinnerRecipes from '../data/categories/quick-dinners.json';
import beverageRecipes from '../data/categories/beverages.json';
import onePotRecipes from '../data/categories/one-pot-meals.json';
import soupsStewsRecipes from '../data/categories/soups-stews.json';
import vegetarianRecipes from '../data/categories/vegetarian.json';
import dessertRecipes from '../data/categories/desserts.json';

import { Recipe } from '@/types/database';
import { adaptRecipeToUI, RecipeUI } from './jsonDataService';

export interface CategoryData {
  slug: string;
  title: string;
  icon: string;
  recipes: RecipeUI[];
}

// Define categories with their metadata and recipe data
export const categoryData: CategoryData[] = [
  {
    slug: "south-indian",
    title: "South Indian",
    icon: "🍛",
    recipes: southIndianRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "baking",
    title: "Baking",
    icon: "🍞",
    recipes: bakingRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "quick-dinners",
    title: "Quick Dinners",
    icon: "⏱️",
    recipes: quickDinnerRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "beverages",
    title: "Beverages",
    icon: "🍹",
    recipes: beverageRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "one-pot-meals",
    title: "One-Pot Meals",
    icon: "🍲",
    recipes: onePotRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "soups-stews",
    title: "Soups & Stews",
    icon: "🥣",
    recipes: soupsStewsRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "vegetarian",
    title: "Vegetarian",
    icon: "🥗",
    recipes: vegetarianRecipes.map(adaptRecipeToUI)
  },
  {
    slug: "desserts",
    title: "Desserts",
    icon: "🍰",
    recipes: dessertRecipes.map(adaptRecipeToUI)
  }
];

// Helper function to get all recipes across all categories
export const getAllCategorizedRecipes = (): RecipeUI[] => {
  return categoryData.flatMap(category => category.recipes);
};

// Helper function to get recipes by category slug
export const getRecipesByCategory = (categorySlug: string): RecipeUI[] => {
  const category = categoryData.find(cat => cat.slug === categorySlug);
  return category?.recipes || [];
};

// Helper function to get category metadata
export const getCategoryMetadata = () => {
  return categoryData.map(({ slug, title, icon }) => ({
    slug,
    title,
    icon
  }));
};

// Export just the category definitions for components that only need the metadata
export const categories = getCategoryMetadata();
