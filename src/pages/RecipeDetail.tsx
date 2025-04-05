
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Clock, 
  Users, 
  ChefHat, 
  AlertCircle, 
  Plus, 
  Minus, 
  Star, 
  Share2, 
  ArrowLeft, 
  Bookmark 
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { getRecipeById, southIndianRecipes } from "@/lib/mockData";
import { toast } from "sonner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [servings, setServings] = useState(4);
  const [relatedRecipes, setRelatedRecipes] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    try {
      if (id) {
        // Simulate loading delay
        setTimeout(() => {
          const foundRecipe = getRecipeById(id);
          if (foundRecipe) {
            setRecipe(foundRecipe);
            setServings(foundRecipe.servings || 4);
            // Get 3 related recipes (excluding current recipe)
            const related = southIndianRecipes
              .filter(r => r.id !== id)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3);
            setRelatedRecipes(related);
          } else {
            setError(true);
          }
          setLoading(false);
        }, 800);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [id]);

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Recipe removed from saved items" : "Recipe saved to your collection");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Recipe link copied to clipboard");
  };

  // Prevent decreasing servings below 1
  const decreaseServings = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="w-full max-w-4xl px-4 space-y-6">
            <div className="w-full h-[400px] rounded-2xl loading-shimmer"></div>
            <div className="h-12 w-3/4 loading-shimmer rounded-lg"></div>
            <div className="h-6 w-1/2 loading-shimmer rounded-lg"></div>
            <div className="flex gap-4">
              <div className="h-10 w-24 loading-shimmer rounded-lg"></div>
              <div className="h-10 w-24 loading-shimmer rounded-lg"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-lg px-4">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/browse">Browse Recipes</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Access prepTime and cookTime correctly based on the recipe structure
  const prepTime = recipe.prepTime || recipe.prep_time || 0;
  const cookTime = recipe.cookTime || recipe.cook_time || 0;
  const recipeServings = recipe.servings || 4;

  // Make sure instructions is always an array
  const instructions = recipe.instructions || [];
  const isStepObjectArray = instructions.length > 0 && typeof instructions[0] === 'object';

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="group p-0 h-auto">
              <Link to="/browse" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Recipes
              </Link>
            </Button>
          </div>

          {/* Recipe Hero */}
          <div className="mb-10">
            <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full object-cover h-[300px] md:h-[500px] animate-fade-in"
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 animate-fade-up">
                  {recipe.title}
                </h1>
                <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
                  {recipe.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {recipe.tags?.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="capitalize animate-fade-in" style={{ animationDelay: `${100 + index * 50}ms` }}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0 shrink-0">
                <Button size="icon" variant="outline" onClick={handleSave} aria-label={saved ? "Unsave recipe" : "Save recipe"}>
                  <Bookmark className={saved ? "fill-primary h-5 w-5" : "h-5 w-5"} />
                </Button>
                <Button size="icon" variant="outline" onClick={handleShare} aria-label="Share recipe">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Recipe Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Prep Time</span>
              </div>
              <p className="font-medium">{prepTime} minutes</p>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Cook Time</span>
              </div>
              <p className="font-medium">{cookTime} minutes</p>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Servings</span>
              </div>
              <p className="font-medium">{recipeServings}</p>
            </div>
            
            <div className="p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                <ChefHat className="h-4 w-4" />
                <span className="text-sm font-medium">Difficulty</span>
              </div>
              <p className="font-medium">{recipe.difficulty || "Medium"}</p>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Ingredients */}
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-semibold">Ingredients</h2>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={decreaseServings}
                        disabled={servings <= 1}
                        className="h-8 w-8"
                        aria-label="Decrease servings"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{servings}</span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => setServings(servings + 1)}
                        className="h-8 w-8"
                        aria-label="Increase servings"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {recipe.ingredients ? (
                      recipe.ingredients.map((ingredient: any, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 mr-3">
                            <span className="text-xs">{index + 1}</span>
                          </div>
                          <span>
                            {ingredient.quantity && (
                              <span className="font-medium">
                                {ingredient.quantity && servings !== recipeServings
                                  ? ((parseFloat(ingredient.quantity) || 0) * servings / recipeServings).toFixed(
                                      ingredient.quantity.includes("/") || !parseFloat(ingredient.quantity) ? 0 : 1
                                    )
                                  : ingredient.quantity}{" "}
                                {ingredient.unit}{" "}
                              </span>
                            )}
                            {ingredient.name}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">Ingredients not available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Tabs defaultValue="instructions">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="notes">Notes & Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="animate-fade-in">
                  <h2 className="font-serif text-xl font-semibold mb-6">Step By Step Instructions</h2>
                  
                  {instructions.length > 0 ? (
                    <ol className="space-y-6">
                      {instructions.map((step: any, index: number) => (
                        <li key={index} className="flex">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium shrink-0 mt-0.5 mr-4">
                            {isStepObjectArray ? step.step : index + 1}
                          </div>
                          <div className="pt-1">
                            <p>{isStepObjectArray ? step.text : step}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-muted-foreground">Instructions not available</p>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="animate-fade-in">
                  <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                    <h3 className="font-serif text-lg font-medium mb-3">Chef's Notes</h3>
                    <p className="text-muted-foreground">
                      This {recipe.title} recipe is authentic to {recipe.cuisine || 'global'} cuisine. 
                      {recipe.cuisine === 'South Indian' && ' For best results, prepare ingredients ahead of time and follow the cooking process carefully.'}
                      {recipe.category === 'Baking' && ' Make sure to preheat your oven properly and measure ingredients precisely for best results.'}
                      {recipe.category === 'Soups & Stews' && ' For the best flavor development, let the soup simmer gently for the full cooking time.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-medium">Tips for Success</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Use fresh ingredients for the best flavor.
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Adjust spice levels according to your preference.
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {recipe.category === 'Baking' ? 'For consistent results, use a kitchen scale to weigh ingredients.' : 
                         recipe.category === 'Soups & Stews' ? 'Use homemade broth for extra flavor whenever possible.' :
                         'For an authentic taste, use traditional cooking methods if available.'}
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Garnish with fresh herbs just before serving for extra flavor and presentation.
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Recipes */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold">You Might Also Like</h2>
              <Button variant="ghost" asChild className="hidden md:flex">
                <Link to="/browse">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRecipes.map((related, index) => {
                // Make sure we handle both camelCase and snake_case properties
                const relatedPrepTime = related.prepTime || related.prep_time || 0;
                const relatedCookTime = related.cookTime || related.cook_time || 0;
                
                return (
                  <RecipeCard
                    key={related.id}
                    id={related.id}
                    title={related.title}
                    image={related.image}
                    rating={related.rating}
                    prepTime={relatedPrepTime}
                    cookTime={relatedCookTime}
                    servings={related.servings}
                    chef={related.chef}
                    category={related.category}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecipeDetail;
