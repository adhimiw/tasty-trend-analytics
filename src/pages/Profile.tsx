
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  BookOpen, 
  Clock, 
  Star, 
  Heart, 
  ChevronRight,
  BarChart,
  Edit3,
  LogOut
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import EditProfileDialog from "@/components/EditProfileDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Recipe } from "@/types/database";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-recipes");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    fetchUserRecipes();
    fetchSavedRecipes();
  }, [user]);
  
  const fetchUserRecipes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Convert the data to match Recipe type
      const typedData = data?.map(recipe => ({
        ...recipe,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        tags: recipe.tags || []
      })) as Recipe[];
      
      setUserRecipes(typedData || []);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      toast.error("Failed to load your recipes");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSavedRecipes = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Get saved recipe IDs
      const { data: savedData, error: savedError } = await supabase
        .from('saved_recipes')
        .select('recipe_id')
        .eq('user_id', user.id);
      
      if (savedError) throw savedError;
      
      if (savedData && savedData.length > 0) {
        // Get recipe details for saved recipes
        const recipeIds = savedData.map(item => item.recipe_id);
        
        const { data: recipesData, error: recipesError } = await supabase
          .from('recipes')
          .select('*')
          .in('id', recipeIds);
        
        if (recipesError) throw recipesError;
        
        // Convert the data to match Recipe type
        const typedData = recipesData?.map(recipe => ({
          ...recipe,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          tags: recipe.tags || []
        })) as Recipe[];
        
        setSavedRecipes(typedData || []);
      } else {
        setSavedRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      toast.error("Failed to load your saved recipes");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };
  
  const handleProfileUpdated = () => {
    refreshProfile();
    toast.success("Profile updated successfully!");
  };
  
  // Mock stats for now - could be calculated from real data later
  const stats = [
    { label: "Recipes", value: userRecipes.length, icon: BookOpen },
    { label: "Favorites", value: savedRecipes.length, icon: Heart },
    { label: "Following", value: 0, icon: User },
  ];
  
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationBar />
        <div className="flex-1 pt-20 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-6">You need to be signed in to view your profile.</p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                <AvatarImage src={profile.profile_image || undefined} alt={profile.display_name || profile.username} />
                <AvatarFallback>{profile.display_name?.[0] || profile.username?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="font-serif text-3xl font-bold mb-1">{profile.display_name || profile.username}</h1>
                <p className="text-muted-foreground mb-3">@{profile.username}</p>
                <p className="mb-4 max-w-xl">{profile.bio || "No bio yet"}</p>
                
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
                <Button variant="outline" className="flex items-center" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
                <Button className="flex items-center" onClick={() => setIsEditProfileOpen(true)}>
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
              
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading your recipes...</p>
                </div>
              ) : userRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userRecipes.map((recipe, index) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop"}
                      rating={recipe.rating || 0}
                      prepTime={recipe.prep_time || 0}
                      cookTime={recipe.cook_time || 0}
                      servings={recipe.servings || 0}
                      chef={recipe.chef || profile.display_name || profile.username}
                      category={recipe.category || ""}
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
              
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading your saved recipes...</p>
                </div>
              ) : savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedRecipes.map((recipe, index) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop"}
                      rating={recipe.rating || 0}
                      prepTime={recipe.prep_time || 0}
                      cookTime={recipe.cook_time || 0}
                      servings={recipe.servings || 0}
                      chef={recipe.chef || ""}
                      category={recipe.category || ""}
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
                
                <Alert className="mb-6">
                  <AlertDescription>
                    We're tracking your activity to provide you with a personalized experience.
                    Soon you'll see your recent interactions with recipes here.
                  </AlertDescription>
                </Alert>
                
                {/* Placeholder activity items */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="p-4 flex flex-row items-center space-y-0">
                      <User className="h-4 w-4 text-primary mr-2" />
                      <span className="font-medium">You created your account</span>
                      <span className="text-muted-foreground text-sm ml-auto">recently</span>
                    </CardHeader>
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
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Total Recipes
                          </div>
                          <div className="text-xl font-semibold">{userRecipes.length}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Heart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Saved Recipes
                          </div>
                          <div className="text-xl font-semibold">{savedRecipes.length}</div>
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
                            Average Rating
                          </div>
                          <div className="text-xl font-semibold">
                            {userRecipes.length > 0 
                              ? (userRecipes.reduce((sum, recipe) => sum + (recipe.rating || 0), 0) / userRecipes.length).toFixed(1) 
                              : "N/A"}
                          </div>
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

      <EditProfileDialog 
        open={isEditProfileOpen} 
        onOpenChange={setIsEditProfileOpen}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
      />

      <Footer />
    </div>
  );
};

export default Profile;
