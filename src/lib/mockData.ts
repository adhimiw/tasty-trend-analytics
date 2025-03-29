
// Use placeholder images instead of non-existent local files
// We'll use a consistent placeholder image URL for all recipes and ingredients
const placeholderImage = '/placeholder.svg';

export const featuredRecipes = [
  {
    id: "1",
    title: "Masala Dosa with Coconut Chutney",
    description: "A classic South Indian breakfast dish featuring crispy rice crepes filled with spiced potatoes, served with coconut chutney and sambar.",
    image: placeholderImage,
    rating: 4.8,
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    chef: "Padma Lakshmi",
    cuisine: "South Indian",
    category: "Breakfast",
    ingredients: [
      { name: "Rice", quantity: "2", unit: "cups" },
      { name: "Urad dal", quantity: "1/2", unit: "cup" },
      { name: "Potatoes", quantity: "4", unit: "medium" },
      { name: "Onions", quantity: "2", unit: "medium" },
      { name: "Green chilies", quantity: "4", unit: "" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Curry leaves", quantity: "10", unit: "" },
      { name: "Fresh coconut", quantity: "1/2", unit: "cup" },
      { name: "Coriander leaves", quantity: "2", unit: "tbsp" },
      { name: "Oil", quantity: "", unit: "as needed" },
      { name: "Salt", quantity: "", unit: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Soak rice and urad dal separately for 4-6 hours." },
      { step: 2, text: "Grind them into a smooth batter and ferment overnight." },
      { step: 3, text: "For the potato filling, boil and mash potatoes." },
      { step: 4, text: "Temper mustard seeds, curry leaves, and spices in oil." },
      { step: 5, text: "Add onions, ginger, and green chilies, sauté till golden brown." },
      { step: 6, text: "Mix in mashed potatoes, turmeric, and salt. Cook for 5 minutes." },
      { step: 7, text: "Heat a griddle, pour a ladle of batter, and spread in a circular motion." },
      { step: 8, text: "Drizzle oil around the edges and cook until golden brown." },
      { step: 9, text: "Place potato filling in the center, fold the dosa, and serve hot with coconut chutney and sambar." }
    ],
    tags: ["south indian", "breakfast", "vegetarian", "dosa", "fermented"],
    difficulty: "Medium"
  },
  {
    id: "2",
    title: "Chettinad Chicken Curry",
    description: "A fiery and aromatic chicken curry from the Chettinad region of Tamil Nadu, known for its complex spice blend and rich flavors.",
    image: placeholderImage,
    rating: 4.7,
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    chef: "Vikas Khanna",
    cuisine: "South Indian",
    category: "Main Course",
    ingredients: [
      { name: "Chicken", quantity: "1", unit: "kg" },
      { name: "Onions", quantity: "2", unit: "large" },
      { name: "Tomatoes", quantity: "3", unit: "medium" },
      { name: "Ginger-garlic paste", quantity: "2", unit: "tbsp" },
      { name: "Coriander seeds", quantity: "2", unit: "tbsp" },
      { name: "Cumin seeds", quantity: "1", unit: "tbsp" },
      { name: "Black peppercorns", quantity: "1", unit: "tbsp" },
      { name: "Fennel seeds", quantity: "1", unit: "tsp" },
      { name: "Cinnamon", quantity: "1", unit: "inch" },
      { name: "Cloves", quantity: "4", unit: "" },
      { name: "Cardamom", quantity: "3", unit: "pods" },
      { name: "Dried red chilies", quantity: "5", unit: "" },
      { name: "Curry leaves", quantity: "15", unit: "" },
      { name: "Coconut milk", quantity: "1", unit: "cup" },
      { name: "Oil", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Dry roast coriander seeds, cumin, peppercorns, fennel, cinnamon, cloves, cardamom, and dried red chilies until fragrant." },
      { step: 2, text: "Cool and grind to a fine powder to make the Chettinad masala." },
      { step: 3, text: "Heat oil in a large pot, add curry leaves, and sauté onions until golden brown." },
      { step: 4, text: "Add ginger-garlic paste and cook for 2 minutes." },
      { step: 5, text: "Add tomatoes and cook until soft and oil separates." },
      { step: 6, text: "Add chicken pieces and sauté for 5 minutes." },
      { step: 7, text: "Add the ground Chettinad masala, turmeric, and salt. Mix well." },
      { step: 8, text: "Pour in water, cover, and simmer for 25-30 minutes until chicken is tender." },
      { step: 9, text: "Stir in coconut milk, bring to a gentle simmer, and cook for 5 more minutes." },
      { step: 10, text: "Garnish with fresh coriander leaves and serve hot with rice or parotta." }
    ],
    tags: ["south indian", "chicken", "spicy", "curry", "chettinad"],
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Hyderabadi Vegetable Biryani",
    description: "A fragrant and flavorful layered rice dish with mixed vegetables, saffron, and aromatic spices, inspired by the royal cuisine of Hyderabad.",
    image: placeholderImage,
    rating: 4.6,
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    chef: "Ranveer Brar",
    cuisine: "South Indian",
    category: "Main Course",
    ingredients: [
      { name: "Basmati rice", quantity: "2", unit: "cups" },
      { name: "Mixed vegetables", quantity: "3", unit: "cups" },
      { name: "Onions", quantity: "2", unit: "large" },
      { name: "Tomatoes", quantity: "2", unit: "medium" },
      { name: "Ginger-garlic paste", quantity: "2", unit: "tbsp" },
      { name: "Green chilies", quantity: "4", unit: "" },
      { name: "Yogurt", quantity: "1", unit: "cup" },
      { name: "Saffron", quantity: "1", unit: "pinch" },
      { name: "Milk", quantity: "2", unit: "tbsp" },
      { name: "Mint leaves", quantity: "1/2", unit: "cup" },
      { name: "Coriander leaves", quantity: "1/2", unit: "cup" },
      { name: "Biryani masala", quantity: "2", unit: "tbsp" },
      { name: "Ghee", quantity: "4", unit: "tbsp" },
      { name: "Fried onions", quantity: "1/2", unit: "cup" },
      { name: "Cashews", quantity: "1/4", unit: "cup" },
      { name: "Raisins", quantity: "2", unit: "tbsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Soak saffron in warm milk for 15 minutes." },
      { step: 2, text: "Wash and soak basmati rice for 30 minutes, then drain." },
      { step: 3, text: "In a pot, bring water to a boil with whole spices, salt, and a teaspoon of ghee." },
      { step: 4, text: "Add rice and cook until 70% done. Drain and set aside." },
      { step: 5, text: "In another pot, heat ghee and sauté onions until golden brown." },
      { step: 6, text: "Add ginger-garlic paste, green chilies, and sauté for 2 minutes." },
      { step: 7, text: "Add tomatoes, mixed vegetables, and cook for 5 minutes." },
      { step: 8, text: "Add biryani masala, salt, yogurt, and cook until vegetables are tender." },
      { step: 9, text: "Layer the vegetable mixture with partially cooked rice in a heavy-bottomed pot." },
      { step: 10, text: "Sprinkle mint, coriander, fried onions, cashews, raisins, and saffron milk between layers." },
      { step: 11, text: "Seal the pot with dough or foil and cook on low heat for 20 minutes." },
      { step: 12, text: "Let it rest for 10 minutes before opening." },
      { step: 13, text: "Gently mix the layers and serve hot with raita." }
    ],
    tags: ["south indian", "biryani", "vegetarian", "rice", "hyderabadi"],
    difficulty: "Medium"
  },
  {
    id: "4",
    title: "Kerala Fish Curry (Meen Curry)",
    description: "A tangy and spicy fish curry from Kerala, made with coconut milk, tamarind, and aromatic spices, best served with steamed rice.",
    image: placeholderImage,
    rating: 4.9,
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    chef: "Kunal Kapur",
    cuisine: "South Indian",
    category: "Main Course",
    ingredients: [
      { name: "Fish fillets", quantity: "500", unit: "g" },
      { name: "Coconut milk", quantity: "1", unit: "cup" },
      { name: "Tamarind paste", quantity: "2", unit: "tbsp" },
      { name: "Onions", quantity: "1", unit: "medium" },
      { name: "Tomatoes", quantity: "2", unit: "medium" },
      { name: "Green chilies", quantity: "3", unit: "" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Garlic", quantity: "5", unit: "cloves" },
      { name: "Turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "Red chili powder", quantity: "1", unit: "tsp" },
      { name: "Coriander powder", quantity: "2", unit: "tsp" },
      { name: "Fenugreek seeds", quantity: "1/4", unit: "tsp" },
      { name: "Curry leaves", quantity: "20", unit: "" },
      { name: "Mustard seeds", quantity: "1/2", unit: "tsp" },
      { name: "Coconut oil", quantity: "2", unit: "tbsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Clean and cut fish into medium-sized pieces, marinate with turmeric and salt." },
      { step: 2, text: "Soak tamarind in warm water for 15 minutes, extract the juice." },
      { step: 3, text: "Heat coconut oil in a clay pot, add mustard seeds and let them splutter." },
      { step: 4, text: "Add fenugreek seeds, curry leaves, sliced onions, green chilies, ginger, and garlic." },
      { step: 5, text: "Sauté until onions are translucent." },
      { step: 6, text: "Add chopped tomatoes and cook until soft." },
      { step: 7, text: "Add turmeric, red chili powder, coriander powder, and salt. Mix well." },
      { step: 8, text: "Pour in tamarind extract and bring to a simmer." },
      { step: 9, text: "Add fish pieces carefully and cook for 5 minutes." },
      { step: 10, text: "Pour in coconut milk, reduce heat, and simmer for 5-7 more minutes." },
      { step: 11, text: "Adjust seasoning, garnish with fresh curry leaves, and serve hot with steamed rice." }
    ],
    tags: ["south indian", "fish", "curry", "kerala", "seafood"],
    difficulty: "Easy"
  },
  {
    id: "5",
    title: "Lemon Rice (Chitranna)",
    description: "A tangy and flavorful South Indian rice dish with lemon juice, peanuts, and tempered spices, perfect for lunch boxes or quick meals.",
    image: placeholderImage,
    rating: 4.5,
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    chef: "Sanjeev Kapoor",
    cuisine: "South Indian",
    category: "Main Course",
    ingredients: [
      { name: "Cooked rice", quantity: "3", unit: "cups" },
      { name: "Lemon juice", quantity: "3", unit: "tbsp" },
      { name: "Peanuts", quantity: "1/3", unit: "cup" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Urad dal", quantity: "1", unit: "tsp" },
      { name: "Chana dal", quantity: "1", unit: "tsp" },
      { name: "Green chilies", quantity: "2", unit: "" },
      { name: "Ginger", quantity: "1", unit: "tbsp" },
      { name: "Turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "Asafoetida", quantity: "1/8", unit: "tsp" },
      { name: "Curry leaves", quantity: "15", unit: "" },
      { name: "Cilantro", quantity: "2", unit: "tbsp" },
      { name: "Oil", quantity: "3", unit: "tbsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
    ],
    instructions: [
      { step: 1, text: "Cook rice and let it cool completely." },
      { step: 2, text: "Heat oil in a pan, add mustard seeds and let them splutter." },
      { step: 3, text: "Add urad dal, chana dal, and peanuts. Sauté until golden brown." },
      { step: 4, text: "Add chopped green chilies, ginger, curry leaves, and asafoetida. Sauté for a minute." },
      { step: 5, text: "Add turmeric powder and mix well." },
      { step: 6, text: "Turn off the heat and let the tempering cool slightly." },
      { step: 7, text: "Add the tempering to the cooked rice along with lemon juice and salt." },
      { step: 8, text: "Mix gently until the rice is evenly coated with the tempering and lemon juice." },
      { step: 9, text: "Garnish with chopped cilantro and serve warm or at room temperature." }
    ],
    tags: ["south indian", "rice", "vegetarian", "quick", "lemon"],
    difficulty: "Easy"
  },
  {
    id: "6",
    title: "Mysore Pak",
    description: "A traditional South Indian sweet made with gram flour, ghee, and sugar, originating from Mysore in Karnataka.",
    image: placeholderImage,
    rating: 4.7,
    prepTime: 10,
    cookTime: 20,
    servings: 16,
    chef: "Tarla Dalal",
    cuisine: "South Indian",
    category: "Dessert",
    ingredients: [
      { name: "Gram flour (besan)", quantity: "1", unit: "cup" },
      { name: "Ghee", quantity: "1.5", unit: "cups" },
      { name: "Sugar", quantity: "2", unit: "cups" },
      { name: "Water", quantity: "1", unit: "cup" },
      { name: "Cardamom powder", quantity: "1/4", unit: "tsp" },
    ],
    instructions: [
      { step: 1, text: "Grease a tray or plate with ghee and keep aside." },
      { step: 2, text: "Sift the gram flour to remove any lumps." },
      { step: 3, text: "In a heavy-bottomed pan, make sugar syrup by dissolving sugar in water over medium heat." },
      { step: 4, text: "Bring the syrup to a single thread consistency." },
      { step: 5, text: "Meanwhile, in another pan, heat 1/4 cup of ghee and roast the gram flour on low heat until it gives a nice aroma (about 5 minutes)." },
      { step: 6, text: "Slowly add the sugar syrup to the roasted gram flour, stirring continuously to avoid lumps." },
      { step: 7, text: "Add cardamom powder and mix well." },
      { step: 8, text: "Gradually add the remaining ghee in batches, stirring continuously. The mixture will absorb the ghee initially and then start leaving ghee on the sides." },
      { step: 9, text: "When the mixture starts leaving ghee and looks porous, pour it immediately into the greased tray." },
      { step: 10, text: "Let it set for 5 minutes, then cut into squares while still warm." },
      { step: 11, text: "Allow it to cool completely before removing the pieces." },
      { step: 12, text: "Store in an airtight container." }
    ],
    tags: ["south indian", "dessert", "sweet", "mysore", "Karnataka"],
    difficulty: "Medium"
  },
];

export const southIndianRecipes = [
  ...featuredRecipes,
  {
    id: "7",
    title: "Sambhar",
    description: "A tangy and spicy lentil soup with vegetables, tamarind, and a unique spice blend, essential to South Indian cuisine.",
    image: placeholderImage,
    rating: 4.6,
    prepTime: 20,
    cookTime: 30,
    servings: 6,
    chef: "Venkatesh Bhat",
    cuisine: "South Indian",
    category: "Side Dish",
    difficulty: "Easy",
    tags: ["south indian", "lentil", "soup", "vegetarian", "tamarind"],
    instructions: [
      { step: 1, text: "Wash and pressure cook toor dal with turmeric powder until soft." },
      { step: 2, text: "Soak tamarind in warm water for 15 minutes and extract the juice." },
      { step: 3, text: "In a large pot, add tamarind extract, chopped vegetables, sambar powder, salt, and bring to a boil." },
      { step: 4, text: "Cook until vegetables are tender." },
      { step: 5, text: "Add the cooked dal and mix well. Simmer for 5 minutes." },
      { step: 6, text: "In a small pan, heat oil and add mustard seeds, fenugreek seeds, cumin seeds, curry leaves, dried red chilies, and asafoetida." },
      { step: 7, text: "Once the seeds splutter, pour this tempering over the sambhar." },
      { step: 8, text: "Garnish with fresh coriander and serve hot with rice or idli." }
    ],
    ingredients: [
      { name: "Toor dal", quantity: "1", unit: "cup" },
      { name: "Mixed vegetables", quantity: "2", unit: "cups" },
      { name: "Tamarind", quantity: "1", unit: "small lemon-sized ball" },
      { name: "Sambar powder", quantity: "2", unit: "tbsp" },
      { name: "Turmeric powder", quantity: "1/2", unit: "tsp" },
      { name: "Mustard seeds", quantity: "1", unit: "tsp" },
      { name: "Fenugreek seeds", quantity: "1/4", unit: "tsp" },
      { name: "Cumin seeds", quantity: "1/2", unit: "tsp" },
      { name: "Curry leaves", quantity: "10-12", unit: "" },
      { name: "Dried red chilies", quantity: "2", unit: "" },
      { name: "Asafoetida", quantity: "1/4", unit: "tsp" },
      { name: "Oil", quantity: "1", unit: "tbsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
      { name: "Coriander leaves", quantity: "2", unit: "tbsp" }
    ]
  },
  {
    id: "8",
    title: "Appam with Stew",
    description: "Lacy, fermented rice hoppers served with a fragrant coconut milk vegetable or meat stew, popular in Kerala.",
    image: placeholderImage,
    rating: 4.8,
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    chef: "Sarah Todd",
    cuisine: "South Indian",
    category: "Breakfast",
    difficulty: "Medium",
    tags: ["south indian", "kerala", "breakfast", "coconut", "fermented"],
    instructions: [
      { step: 1, text: "Soak rice for 4-6 hours, then drain." },
      { step: 2, text: "Grind rice with coconut, yeast, and sugar to make a smooth batter." },
      { step: 3, text: "Add salt and let the batter ferment for 8 hours or overnight." },
      { step: 4, text: "For the stew, heat oil and sauté onions, ginger, garlic, and green chilies." },
      { step: 5, text: "Add vegetables or meat and cook until partially done." },
      { step: 6, text: "Add coconut milk, spices, and salt. Simmer until fully cooked." },
      { step: 7, text: "For appams, heat an appam pan, pour a ladle of batter, and swirl to coat." },
      { step: 8, text: "Cover and cook until the edges are crisp and the center is soft." },
      { step: 9, text: "Serve hot appams with the stew." }
    ],
    ingredients: [
      { name: "Rice", quantity: "2", unit: "cups" },
      { name: "Fresh coconut", quantity: "1/2", unit: "cup" },
      { name: "Yeast", quantity: "1/2", unit: "tsp" },
      { name: "Sugar", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "", unit: "to taste" },
      { name: "Mixed vegetables or meat", quantity: "2", unit: "cups" },
      { name: "Onion", quantity: "1", unit: "medium" },
      { name: "Ginger", quantity: "1", unit: "inch" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Green chilies", quantity: "2", unit: "" },
      { name: "Coconut milk", quantity: "2", unit: "cups" },
      { name: "Cloves", quantity: "3", unit: "" },
      { name: "Cinnamon", quantity: "1", unit: "small piece" },
      { name: "Cardamom", quantity: "2", unit: "pods" },
      { name: "Black pepper", quantity: "1/2", unit: "tsp" },
      { name: "Curry leaves", quantity: "10", unit: "" },
      { name: "Oil", quantity: "2", unit: "tbsp" }
    ]
  }
];

// Define the recipe categories
export const categories = [
  { title: "South Indian", slug: "south-indian", icon: "🍛" },
  { title: "Baking", slug: "baking", icon: "🍞" },
  { title: "Quick Dinners", slug: "quick-dinners", icon: "⏱️" },
  { title: "Beverages", slug: "beverages", icon: "🍹" },
  { title: "One-Pot Meals", slug: "one-pot-meals", icon: "🍲" },
  { title: "Soups & Stews", slug: "soups-stews", icon: "🥣" },
  { title: "Vegetarian", slug: "vegetarian", icon: "🥗" },
  { title: "Desserts", slug: "desserts", icon: "🍰" }
];

// Define the trending ingredients by season
export const trendingIngredients = {
  spring: [
    { name: "Spinach", image: placeholderImage, percentageChange: 45 },
    { name: "Fresh Herbs", image: placeholderImage, percentageChange: 38 },
    { name: "Green Peas", image: placeholderImage, percentageChange: 32 },
    { name: "Asparagus", image: placeholderImage, percentageChange: 28 }
  ],
  summer: [
    { name: "Coconut", image: placeholderImage, percentageChange: 52 },
    { name: "Tomatoes", image: placeholderImage, percentageChange: 40 },
    { name: "Bell Peppers", image: placeholderImage, percentageChange: 35 },
    { name: "Avocado", image: placeholderImage, percentageChange: 30 }
  ],
  autumn: [
    { name: "Turmeric", image: placeholderImage, percentageChange: 48 },
    { name: "Lentils", image: placeholderImage, percentageChange: 42 },
    { name: "Mushrooms", image: placeholderImage, percentageChange: 36 },
    { name: "Rice", image: placeholderImage, percentageChange: 25 }
  ],
  winter: [
    { name: "Rice", image: placeholderImage, percentageChange: 38 },
    { name: "Lentils", image: placeholderImage, percentageChange: 35 },
    { name: "Curry Leaves", image: placeholderImage, percentageChange: 30 },
    { name: "Coconut", image: placeholderImage, percentageChange: 22 }
  ]
};

// Currently we just have southIndianRecipes, but we'll be adding more recipe collections
const allRecipes = [...southIndianRecipes];

// Helper function to get all recipes
export const getAllRecipes = () => {
  return allRecipes;
};

// Helper function to get a recipe by its ID
export const getRecipeById = (id: string) => {
  return allRecipes.find(recipe => recipe.id === id);
};

// Helper function to get recipes by category
export const getRecipesByCategory = (category: string) => {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return allRecipes.filter(recipe => {
    // Check in category field
    if (recipe.category && recipe.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategory) {
      return true;
    }
    // Check in tags
    if (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === normalizedCategory)) {
      return true;
    }
    return false;
  });
};

// Helper function to search recipes
export const searchRecipes = (query: string) => {
  const normalizedQuery = query.toLowerCase().trim();
  return allRecipes.filter(recipe => {
    // Search in title
    if (recipe.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    // Search in description
    if (recipe.description && recipe.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    // Search in tags
    if (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    // Search in ingredients
    if (recipe.ingredients && recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(normalizedQuery))) {
      return true;
    }
    return false;
  });
};
