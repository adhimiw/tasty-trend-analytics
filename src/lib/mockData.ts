
// South Indian recipe images - replace with your own images in production
const southIndianImages = [
  "https://images.unsplash.com/photo-1589778655375-3e622a9fc8c8?q=80&w=2787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1630383249896-388b1f95ffde?q=80&w=2787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596797038530-2c107aa4606c?q=80&w=2835&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593761287596-5dc9c8b1d89a?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2371&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631292784641-440255e0a21c?q=80&w=2480&auto=format&fit=crop"
];

// Ingredient images
const ingredientImages = [
  "https://images.unsplash.com/photo-1550431221-6f3f7366a1b1?q=80&w=2787&auto=format&fit=crop", // Coconut
  "https://images.unsplash.com/photo-1620574387735-3624d80181a7?q=80&w=2787&auto=format&fit=crop", // Curry leaves
  "https://images.unsplash.com/photo-1606918566956-d9bb43e9fa4f?q=80&w=2787&auto=format&fit=crop", // Turmeric
  "https://images.unsplash.com/photo-1590166774851-bc49b23a18fe?q=80&w=2789&auto=format&fit=crop", // Lentils
  "https://images.unsplash.com/photo-1613743990305-736d763f3d70?q=80&w=2788&auto=format&fit=crop", // Rice
  "https://images.unsplash.com/photo-1576044665177-44381586c678?q=80&w=2940&auto=format&fit=crop", // Tomatoes
  "https://images.unsplash.com/photo-1614021073222-118d4cdc9c8a?q=80&w=2787&auto=format&fit=crop", // Bell peppers
  "https://images.unsplash.com/photo-1615486826635-851566f902a0?q=80&w=2787&auto=format&fit=crop", // Mushrooms
  "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2940&auto=format&fit=crop", // Avocado
  "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=2940&auto=format&fit=crop", // Spinach
];

export const featuredRecipes = [
  {
    id: "1",
    title: "Masala Dosa with Coconut Chutney",
    description: "A classic South Indian breakfast dish featuring crispy rice crepes filled with spiced potatoes, served with coconut chutney and sambar.",
    image: southIndianImages[0],
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
      "Soak rice and urad dal separately for 4-6 hours.",
      "Grind them into a smooth batter and ferment overnight.",
      "For the potato filling, boil and mash potatoes.",
      "Temper mustard seeds, curry leaves, and spices in oil.",
      "Add onions, ginger, and green chilies, sauté till golden.",
      "Mix in mashed potatoes, turmeric, and salt. Cook for 5 minutes.",
      "Heat a griddle, pour a ladle of batter, and spread in a circular motion.",
      "Drizzle oil around the edges and cook until golden brown.",
      "Place potato filling in the center, fold the dosa, and serve hot with coconut chutney and sambar."
    ],
    tags: ["south indian", "breakfast", "vegetarian", "dosa", "fermented"],
    difficulty: "Medium"
  },
  {
    id: "2",
    title: "Chettinad Chicken Curry",
    description: "A fiery and aromatic chicken curry from the Chettinad region of Tamil Nadu, known for its complex spice blend and rich flavors.",
    image: southIndianImages[1],
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
      "Dry roast coriander seeds, cumin, peppercorns, fennel, cinnamon, cloves, cardamom, and dried red chilies until fragrant.",
      "Cool and grind to a fine powder to make the Chettinad masala.",
      "Heat oil in a large pot, add curry leaves, and sauté onions until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomatoes and cook until soft and oil separates.",
      "Add chicken pieces and sauté for 5 minutes.",
      "Add the ground Chettinad masala, turmeric, and salt. Mix well.",
      "Pour in water, cover, and simmer for 25-30 minutes until chicken is tender.",
      "Stir in coconut milk, bring to a gentle simmer, and cook for 5 more minutes.",
      "Garnish with fresh coriander leaves and serve hot with rice or parotta."
    ],
    tags: ["south indian", "chicken", "spicy", "curry", "chettinad"],
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Hyderabadi Vegetable Biryani",
    description: "A fragrant and flavorful layered rice dish with mixed vegetables, saffron, and aromatic spices, inspired by the royal cuisine of Hyderabad.",
    image: southIndianImages[2],
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
      "Soak saffron in warm milk for 15 minutes.",
      "Wash and soak basmati rice for 30 minutes, then drain.",
      "In a pot, bring water to a boil with whole spices, salt, and a teaspoon of ghee.",
      "Add rice and cook until 70% done. Drain and set aside.",
      "In another pot, heat ghee and sauté onions until golden brown.",
      "Add ginger-garlic paste, green chilies, and sauté for 2 minutes.",
      "Add tomatoes, mixed vegetables, and cook for 5 minutes.",
      "Add biryani masala, salt, yogurt, and cook until vegetables are tender.",
      "Layer the vegetable mixture with partially cooked rice in a heavy-bottomed pot.",
      "Sprinkle mint, coriander, fried onions, cashews, raisins, and saffron milk between layers.",
      "Seal the pot with dough or foil and cook on low heat for 20 minutes.",
      "Let it rest for 10 minutes before opening.",
      "Gently mix the layers and serve hot with raita."
    ],
    tags: ["south indian", "biryani", "vegetarian", "rice", "hyderabadi"],
    difficulty: "Medium"
  },
  {
    id: "4",
    title: "Kerala Fish Curry (Meen Curry)",
    description: "A tangy and spicy fish curry from Kerala, made with coconut milk, tamarind, and aromatic spices, best served with steamed rice.",
    image: southIndianImages[3],
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
      "Clean and cut fish into medium-sized pieces, marinate with turmeric and salt.",
      "Soak tamarind in warm water for 15 minutes, extract the juice.",
      "Heat coconut oil in a clay pot, add mustard seeds and let them splutter.",
      "Add fenugreek seeds, curry leaves, sliced onions, green chilies, ginger, and garlic.",
      "Sauté until onions are translucent.",
      "Add chopped tomatoes and cook until soft.",
      "Add turmeric, red chili powder, coriander powder, and salt. Mix well.",
      "Pour in tamarind extract and bring to a simmer.",
      "Add fish pieces carefully and cook for 5 minutes.",
      "Pour in coconut milk, reduce heat, and simmer for 5-7 more minutes.",
      "Adjust seasoning, garnish with fresh curry leaves, and serve hot with steamed rice."
    ],
    tags: ["south indian", "fish", "curry", "kerala", "seafood"],
    difficulty: "Easy"
  },
  {
    id: "5",
    title: "Lemon Rice (Chitranna)",
    description: "A tangy and flavorful South Indian rice dish with lemon juice, peanuts, and tempered spices, perfect for lunch boxes or quick meals.",
    image: southIndianImages[4],
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
      "Cook rice and let it cool completely.",
      "Heat oil in a pan, add mustard seeds and let them splutter.",
      "Add urad dal, chana dal, and peanuts. Sauté until golden brown.",
      "Add chopped green chilies, ginger, curry leaves, and asafoetida. Sauté for a minute.",
      "Add turmeric powder and mix well.",
      "Turn off the heat and let the tempering cool slightly.",
      "Add the tempering to the cooked rice along with lemon juice and salt.",
      "Mix gently until the rice is evenly coated with the tempering and lemon juice.",
      "Garnish with chopped cilantro and serve warm or at room temperature."
    ],
    tags: ["south indian", "rice", "vegetarian", "quick", "lemon"],
    difficulty: "Easy"
  },
  {
    id: "6",
    title: "Mysore Pak",
    description: "A traditional South Indian sweet made with gram flour, ghee, and sugar, originating from Mysore in Karnataka.",
    image: southIndianImages[5],
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
      "Grease a tray or plate with ghee and keep aside.",
      "Sift the gram flour to remove any lumps.",
      "In a heavy-bottomed pan, make sugar syrup by dissolving sugar in water over medium heat.",
      "Bring the syrup to a single thread consistency.",
      "Meanwhile, in another pan, heat 1/4 cup of ghee and roast the gram flour on low heat until it gives a nice aroma (about 5 minutes).",
      "Slowly add the sugar syrup to the roasted gram flour, stirring continuously to avoid lumps.",
      "Add cardamom powder and mix well.",
      "Gradually add the remaining ghee in batches, stirring continuously. The mixture will absorb the ghee initially and then start leaving ghee on the sides.",
      "When the mixture starts leaving ghee and looks porous, pour it immediately into the greased tray.",
      "Let it set for 5 minutes, then cut into squares while still warm.",
      "Allow it to cool completely before removing the pieces.",
      "Store in an airtight container."
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
    image: southIndianImages[6],
    rating: 4.6,
    prepTime: 20,
    cookTime: 30,
    servings: 6,
    chef: "Venkatesh Bhat",
    cuisine: "South Indian",
    category: "Side Dish",
    difficulty: "Easy"
  },
  {
    id: "8",
    title: "Appam with Stew",
    description: "Lacy, fermented rice hoppers served with a fragrant coconut milk vegetable or meat stew, popular in Kerala.",
    image: southIndianImages[7],
    rating: 4.8,
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    chef: "Sarah Todd",
    cuisine: "South Indian",
    category: "Breakfast",
    difficulty: "Medium"
  },
  {
    id: "9",
    title: "Rava Idli",
    description: "A quick alternative to traditional idlis, made with semolina, yogurt, and tempered spices.",
    image: southIndianImages[0],
    rating: 4.5,
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    chef: "Nisha Madhulika",
    cuisine: "South Indian",
    category: "Breakfast",
    difficulty: "Easy"
  },
  {
    id: "10",
    title: "Rasam",
    description: "A tangy, spicy, and aromatic South Indian soup made with tamarind, tomatoes, and a special rasam powder.",
    image: southIndianImages[1],
    rating: 4.7,
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    chef: "K.T. Achaya",
    cuisine: "South Indian",
    category: "Soup",
    difficulty: "Easy"
  },
  {
    id: "11",
    title: "Pongal",
    description: "A comforting rice and lentil dish tempered with cumin, pepper, and curry leaves, often served during the Pongal festival.",
    image: southIndianImages[4],
    rating: 4.4,
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    chef: "Revathi Shanmugam",
    cuisine: "South Indian",
    category: "Breakfast",
    difficulty: "Easy"
  },
  {
    id: "12",
    title: "Avial",
    description: "A medley of vegetables in a coconut and yogurt sauce, seasoned with curry leaves and coconut oil, a Kerala specialty.",
    image: southIndianImages[5],
    rating: 4.6,
    prepTime: 20,
    cookTime: 25,
    servings: 6,
    chef: "Thomas Zacharias",
    cuisine: "South Indian",
    category: "Side Dish",
    difficulty: "Medium"
  },
];

export const categories = [
  { icon: "🥗", title: "Vegetarian", slug: "vegetarian" },
  { icon: "🍲", title: "Soups & Stews", slug: "soups-stews" },
  { icon: "🍰", title: "Baking", slug: "baking" },
  { icon: "🌮", title: "Quick Dinners", slug: "quick-dinners" },
  { icon: "🥘", title: "One Pot Meals", slug: "one-pot-meals" },
  { icon: "🍹", title: "Beverages", slug: "beverages" },
  { icon: "🍚", title: "South Indian", slug: "south-indian" },
  { icon: "🍞", title: "Breakfast", slug: "breakfast" },
];

export const trendingIngredients = {
  spring: [
    { name: "Asparagus", image: ingredientImages[5], percentageChange: 45 },
    { name: "Strawberries", image: ingredientImages[6], percentageChange: 38 },
    { name: "Peas", image: ingredientImages[7], percentageChange: 32 },
    { name: "Spinach", image: ingredientImages[9], percentageChange: 28 },
  ],
  summer: [
    { name: "Tomatoes", image: ingredientImages[5], percentageChange: 52 },
    { name: "Bell Peppers", image: ingredientImages[6], percentageChange: 47 },
    { name: "Avocado", image: ingredientImages[8], percentageChange: 39 },
    { name: "Coconut", image: ingredientImages[0], percentageChange: 35 },
  ],
  autumn: [
    { name: "Mushrooms", image: ingredientImages[7], percentageChange: 43 },
    { name: "Turmeric", image: ingredientImages[2], percentageChange: 38 },
    { name: "Curry Leaves", image: ingredientImages[1], percentageChange: 31 },
    { name: "Lentils", image: ingredientImages[3], percentageChange: 29 },
  ],
  winter: [
    { name: "Rice", image: ingredientImages[4], percentageChange: 37 },
    { name: "Turmeric", image: ingredientImages[2], percentageChange: 32 },
    { name: "Coconut", image: ingredientImages[0], percentageChange: 28 },
    { name: "Lentils", image: ingredientImages[3], percentageChange: 25 },
  ],
};

export const getAllRecipes = () => {
  return [...southIndianRecipes];
};

export const getRecipeById = (id: string) => {
  return southIndianRecipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (category: string) => {
  const categoryMap: Record<string, string> = {
    "vegetarian": "Vegetarian",
    "south-indian": "South Indian",
    "soups-stews": "Soups & Stews",
    "baking": "Baking",
    "quick-dinners": "Quick Dinners",
    "one-pot-meals": "One Pot Meals",
    "beverages": "Beverages",
    "breakfast": "Breakfast",
  };
  
  const mappedCategory = categoryMap[category] || category;
  
  return southIndianRecipes.filter(recipe => 
    recipe.category === mappedCategory || recipe.cuisine === mappedCategory || 
    recipe.tags?.includes(category.toLowerCase().replace('-', ' '))
  );
};

export const searchRecipes = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return southIndianRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowerCaseQuery) || 
    recipe.description?.toLowerCase().includes(lowerCaseQuery) ||
    recipe.cuisine?.toLowerCase().includes(lowerCaseQuery) ||
    recipe.category?.toLowerCase().includes(lowerCaseQuery) ||
    recipe.tags?.some(tag => tag.includes(lowerCaseQuery))
  );
};
