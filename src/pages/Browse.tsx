
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import CategoryCard from "@/components/CategoryCard";
import { 
  getAllRecipes, 
  getRecipesByCategory, 
  categories, 
  searchRecipes 
} from "@/lib/mockData";

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Extract category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const query = params.get("q");
    
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else if (category) {
      setActiveCategory(category);
      const filteredRecipes = getRecipesByCategory(category);
      setRecipes(filteredRecipes);
    } else {
      setRecipes(getAllRecipes());
    }
    
    setLoading(false);
  }, [location.search]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchRecipes(query);
      setRecipes(results);
      setActiveCategory(null);
    } else {
      setRecipes(getAllRecipes());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
    navigate(`/browse${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    navigate(`/browse?category=${category}`);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    if (activeCategory) {
      const filteredRecipes = getRecipesByCategory(activeCategory);
      setRecipes(filteredRecipes);
    } else {
      setRecipes(getAllRecipes());
    }
  };

  // Apply filters
  useEffect(() => {
    if (activeFilters.length === 0) return;
    
    let filteredRecipes = activeCategory 
      ? getRecipesByCategory(activeCategory) 
      : getAllRecipes();
    
    if (activeFilters.includes("vegetarian")) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.tags?.includes("vegetarian")
      );
    }
    
    if (activeFilters.includes("quick")) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        (recipe.prepTime + recipe.cookTime) <= 30
      );
    }
    
    if (activeFilters.includes("easy")) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.difficulty === "Easy"
      );
    }
    
    setRecipes(filteredRecipes);
  }, [activeFilters]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : activeCategory 
                ? `${activeCategory.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())} Recipes` 
                : "Browse All Recipes"}
          </h1>

          {/* Search and Filters Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 h-auto"
                >
                  Search
                </Button>
              </div>
            </form>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex justify-between items-center">
                    <span>Filters</span>
                    {activeFilters.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-auto py-1">
                        Clear All
                      </Button>
                    )}
                  </SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Diet Restrictions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegetarian" checked={activeFilters.includes("vegetarian")} onCheckedChange={() => handleFilterChange("vegetarian")} />
                        <label htmlFor="vegetarian" className="text-sm">Vegetarian</label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Cooking Time</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="quick" checked={activeFilters.includes("quick")} onCheckedChange={() => handleFilterChange("quick")} />
                        <label htmlFor="quick" className="text-sm">Quick (under 30 min)</label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Difficulty</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="easy" checked={activeFilters.includes("easy")} onCheckedChange={() => handleFilterChange("easy")} />
                        <label htmlFor="easy" className="text-sm">Easy</label>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              {activeFilters.map(filter => (
                <Badge 
                  key={filter} 
                  variant="secondary"
                  className="flex items-center gap-1 py-1.5"
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <button 
                    onClick={() => handleFilterChange(filter)}
                    className="ml-1 rounded-full hover:bg-secondary-foreground/10 p-0.5"
                    aria-label={`Remove ${filter} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs h-auto py-1.5"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto pb-2 animate-fade-in">
            <div className="flex space-x-2">
              <Button
                variant={!activeCategory ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveCategory(null);
                  setRecipes(getAllRecipes());
                  navigate("/browse");
                }}
                className="whitespace-nowrap"
              >
                All Recipes
              </Button>
              
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category.slug)}
                  className="whitespace-nowrap"
                >
                  {category.icon} {category.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] w-full loading-shimmer"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 w-3/4 loading-shimmer rounded"></div>
                    <div className="h-4 w-1/2 loading-shimmer rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  rating={recipe.rating}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  servings={recipe.servings}
                  chef={recipe.chef}
                  category={recipe.category}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index % 6 * 100}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No recipes found</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any recipes matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={() => {
                setActiveCategory(null);
                setActiveFilters([]);
                setSearchQuery("");
                setRecipes(getAllRecipes());
                navigate("/browse");
              }}>
                View All Recipes
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
