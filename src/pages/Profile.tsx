
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Settings, 
  BookOpen, 
  Clock, 
  Star, 
  Heart, 
  ChevronRight,
  BarChart,
  Edit3
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { southIndianRecipes } from "@/lib/mockData";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-recipes");
  
  // Mock user data
  const user = {
    name: "Jamie Oliver",
    username: "jamie.oliver",
    email: "jamie@example.com",
    profileImage: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=2787&auto=format&fit=crop",
    memberSince: "January 2023",
    bio: "Home cook and food enthusiast. I love experimenting with South Indian cuisine and sharing my creations!"
  };
  
  // Mock user stats
  const stats = [
    { label: "Recipes", value: 12, icon: BookOpen },
    { label: "Favorites", value: 24, icon: Heart },
    { label: "Following", value: 36, icon: User },
  ];
  
  // Mock user's recipes
  const userRecipes = southIndianRecipes.slice(0, 6);
  
  // Mock saved recipes
  const savedRecipes = southIndianRecipes.slice(6);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="font-serif text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground mb-3">@{user.username}</p>
                <p className="mb-4 max-w-xl">{user.bio}</p>
                
                <div className="flex flex-wrap gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="block font-semibold leading-tight">
                          {stat.value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button className="flex items-center">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <TabsList className="grid grid-cols-3 md:w-[400px] mb-8">
              <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-recipes" className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-semibold">My Recipes</h2>
                <Button asChild variant="outline">
                  <Link to="/submit-recipe" className="flex items-center">
                    Add New Recipe
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {userRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userRecipes.map((recipe, index) => (
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
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No recipes yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven't created any recipes yet. Start sharing your culinary creations with our community!
                  </p>
                  <Button asChild>
                    <Link to="/submit-recipe">Create Recipe</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-semibold">Saved Recipes</h2>
                <Button asChild variant="outline">
                  <Link to="/browse" className="flex items-center">
                    Browse More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedRecipes.map((recipe, index) => (
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
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No saved recipes</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven't saved any recipes yet. Browse our collection and save your favorites!
                  </p>
                  <Button asChild>
                    <Link to="/browse">Browse Recipes</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="animate-fade-in">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-semibold mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="p-4 flex flex-row items-center space-y-0">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="font-medium">You rated a recipe</span>
                      <span className="text-muted-foreground text-sm ml-auto">2 days ago</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p>You gave <Link to="/recipe/1" className="font-medium hover:text-primary transition-colors">Masala Dosa with Coconut Chutney</Link> a 5-star rating.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4 flex flex-row items-center space-y-0">
                      <BookOpen className="h-4 w-4 text-primary mr-2" />
                      <span className="font-medium">You submitted a recipe</span>
                      <span className="text-muted-foreground text-sm ml-auto">5 days ago</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p>Your recipe <Link to="/recipe/5" className="font-medium hover:text-primary transition-colors">Lemon Rice (Chitranna)</Link> was approved and published.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4 flex flex-row items-center space-y-0">
                      <Heart className="h-4 w-4 text-accent mr-2" />
                      <span className="font-medium">You saved a recipe</span>
                      <span className="text-muted-foreground text-sm ml-auto">1 week ago</span>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p>You saved <Link to="/recipe/2" className="font-medium hover:text-primary transition-colors">Chettinad Chicken Curry</Link> to your favorites.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Your Cooking Stats</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <BarChart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Most Cooked Cuisine
                          </div>
                          <div className="text-xl font-semibold">South Indian</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Star className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Average Recipe Rating
                          </div>
                          <div className="text-xl font-semibold">4.6 / 5</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Total Cooking Time
                          </div>
                          <div className="text-xl font-semibold">32 hours</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
