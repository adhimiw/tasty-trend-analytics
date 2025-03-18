
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import CategoryCard from "@/components/CategoryCard";
import TrendingIngredient from "@/components/TrendingIngredient";
import { 
  featuredRecipes, 
  categories, 
  trendingIngredients 
} from "@/lib/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSeason, setCurrentSeason] = useState("summer");
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Function to handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Detect current season based on month
  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
      setCurrentSeason("spring");
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason("summer");
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason("autumn");
    } else {
      setCurrentSeason("winter");
    }
  }, []);

  // Intersection Observer for animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = [
      heroRef.current,
      featuredRef.current,
      trendingRef.current,
      categoriesRef.current
    ];

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="section-fade-in pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-secondary/50 to-background"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover & Share <span className="text-primary">Delicious Recipes</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore South Indian cuisine with seasonal ingredients and trending recipes from our community.
          </p>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Search for recipes, ingredients, or cuisines..."
                className="rounded-full px-6 py-6 pr-12 shadow-sm bg-card border-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                disabled={!searchQuery.trim()}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/browse">Browse Recipes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/trends">Explore Trends</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section
        ref={featuredRef}
        className="section-fade-in py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Featured Recipes</h2>
              <p className="text-muted-foreground mt-2">Our most popular recipes this week</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/browse" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredRecipes.slice(0, 6).map((recipe) => (
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
                featured={featuredRecipes.indexOf(recipe) < 3}
              />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Button asChild>
              <Link to="/browse">Browse All Recipes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Ingredients Section */}
      <section
        ref={trendingRef}
        className="section-fade-in py-16 bg-gradient-to-b from-background to-secondary/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Seasonal Trending Ingredients</h2>
            <p className="text-muted-foreground mt-2">What's popular in recipes this season</p>
          </div>

          <Tabs defaultValue={currentSeason} className="max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="spring">Spring</TabsTrigger>
              <TabsTrigger value="summer">Summer</TabsTrigger>
              <TabsTrigger value="autumn">Autumn</TabsTrigger>
              <TabsTrigger value="winter">Winter</TabsTrigger>
            </TabsList>
            
            {Object.entries(trendingIngredients).map(([season, ingredients]) => (
              <TabsContent key={season} value={season} className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ingredients.map((ingredient, index) => (
                    <TrendingIngredient
                      key={index}
                      name={ingredient.name}
                      image={ingredient.image}
                      percentageChange={ingredient.percentageChange}
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/trends" className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View All Trends
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Recipe Categories */}
      <section
        ref={categoriesRef}
        className="section-fade-in py-16 bg-secondary/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Recipe Categories</h2>
            <p className="text-muted-foreground mt-2">Browse by popular categories</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                slug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
