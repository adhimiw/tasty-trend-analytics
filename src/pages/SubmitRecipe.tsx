import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Users, 
  Plus, 
  Trash2, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Save,
  CheckCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
}

interface Instruction {
  id: number;
  text: string;
  image?: string;
}

const SubmitRecipe = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(4);
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(30);
  const [difficulty, setDifficulty] = useState("Medium");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: "", quantity: "", unit: "" },
    { id: 2, name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState<Instruction[]>([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    const newId = ingredients.length > 0 
      ? Math.max(...ingredients.map(i => i.id)) + 1 
      : 1;
    setIngredients([...ingredients, { id: newId, name: "", quantity: "", unit: "" }]);
  };

  const removeIngredient = (id: number) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  const updateIngredient = (id: number, field: keyof Ingredient, value: string) => {
    setIngredients(
      ingredients.map(ingredient => 
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const addInstruction = () => {
    const newId = instructions.length > 0 
      ? Math.max(...instructions.map(i => i.id)) + 1 
      : 1;
    setInstructions([...instructions, { id: newId, text: "" }]);
  };

  const removeInstruction = (id: number) => {
    if (instructions.length <= 1) return;
    setInstructions(instructions.filter(instruction => instruction.id !== id));
  };

  const updateInstruction = (id: number, text: string) => {
    setInstructions(
      instructions.map(instruction => 
        instruction.id === id ? { ...instruction, text } : instruction
      )
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!title.trim() || !description.trim() || !cuisine || !category) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (currentStep === 2) {
      const isValid = ingredients.every(ing => ing.name.trim() && ing.quantity.trim());
      if (!isValid) {
        toast.error("Please fill in all ingredient details");
        return;
      }
    } else if (currentStep === 3) {
      const isValid = instructions.every(inst => inst.text.trim());
      if (!isValid) {
        toast.error("Please fill in all instruction steps");
        return;
      }
    } else if (currentStep === 4 && !imagePreview) {
      toast.error("Please upload a recipe image");
      return;
    }
    
    setCurrentStep(current => Math.min(current + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(current => Math.max(current - 1, 1));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit a recipe");
      navigate("/login");
      return;
    }
    
    setLoading(true);
    
    try {
      const formattedIngredients = ingredients
        .filter(ing => ing.name.trim() && ing.quantity.trim())
        .map(ing => ({
          name: ing.name.trim(),
          quantity: ing.quantity.trim(),
          unit: ing.unit.trim()
        }));
      
      const formattedInstructions = instructions
        .filter(inst => inst.text.trim())
        .map((inst, index) => ({
          step: index + 1,
          text: inst.text.trim(),
          image: inst.image
        }));
      
      const tags = [
        category.replace('_', ' '),
        cuisine.replace('_', ' '),
        isVegetarian ? 'vegetarian' : 'non-vegetarian',
        difficulty.toLowerCase()
      ].filter(Boolean);
      
      const { data, error } = await supabase
        .from('recipes')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          image: imagePreview,
          prep_time: prepTime,
          cook_time: cookTime,
          servings: servings,
          chef: profile?.display_name || profile?.username,
          cuisine: cuisine,
          category: category,
          difficulty: difficulty,
          ingredients: formattedIngredients,
          instructions: formattedInstructions,
          tags: tags,
          rating: 0 // Default rating for new recipes
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Recipe submitted successfully!");
      navigate(`/recipe/${data.id}`);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("Failed to submit recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold">Recipe Details</h2>
            <p className="text-muted-foreground">
              Enter the basic information about your recipe
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title*</Label>
                <Input
                  id="title"
                  placeholder="E.g., Homemade Masala Dosa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your recipe..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine*</Label>
                  <Select required value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger id="cuisine">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="south_indian">South Indian</SelectItem>
                      <SelectItem value="north_indian">North Indian</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="main_course">Main Course</SelectItem>
                      <SelectItem value="side_dish">Side Dish</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="soup">Soup</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (mins)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    min={0}
                    value={prepTime}
                    onChange={(e) => setPrepTime(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (mins)</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    min={0}
                    value={cookTime}
                    onChange={(e) => setCookTime(parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vegetarian" className="block mb-2">Dietary</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vegetarian"
                      checked={isVegetarian}
                      onCheckedChange={setIsVegetarian}
                    />
                    <Label htmlFor="vegetarian">Vegetarian</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold">Ingredients</h2>
            <p className="text-muted-foreground">
              List all ingredients needed for your recipe
            </p>
            
            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-end space-x-2">
                  <div className="w-1/4">
                    <Label htmlFor={`quantity-${ingredient.id}`} className="text-xs">
                      Quantity*
                    </Label>
                    <Input
                      id={`quantity-${ingredient.id}`}
                      value={ingredient.quantity}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "quantity", e.target.value)
                      }
                      placeholder="2"
                    />
                  </div>
                  
                  <div className="w-1/4">
                    <Label htmlFor={`unit-${ingredient.id}`} className="text-xs">
                      Unit
                    </Label>
                    <Input
                      id={`unit-${ingredient.id}`}
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "unit", e.target.value)
                      }
                      placeholder="cups"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor={`name-${ingredient.id}`} className="text-xs">
                      Ingredient*
                    </Label>
                    <Input
                      id={`name-${ingredient.id}`}
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, "name", e.target.value)
                      }
                      placeholder="Rice flour"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length <= 1}
                    aria-label="Remove ingredient"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold">Instructions</h2>
            <p className="text-muted-foreground">
              Provide step-by-step instructions for your recipe
            </p>
            
            <div className="space-y-6">
              {instructions.map((instruction, index) => (
                <div key={instruction.id} className="space-y-2">
                  <Label htmlFor={`instruction-${instruction.id}`}>
                    Step {index + 1}*
                  </Label>
                  <div className="flex space-x-2">
                    <Textarea
                      id={`instruction-${instruction.id}`}
                      value={instruction.text}
                      onChange={(e) =>
                        updateInstruction(instruction.id, e.target.value)
                      }
                      placeholder={`Describe step ${index + 1}...`}
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(instruction.id)}
                      disabled={instructions.length <= 1}
                      aria-label="Remove instruction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addInstruction}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold">Recipe Image</h2>
            <p className="text-muted-foreground">
              Upload a high-quality image of your finished dish
            </p>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Recipe preview"
                      className="mx-auto max-h-64 rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setImagePreview(null)}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (max. 5MB)
                      </p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold">Preview & Submit</h2>
            <p className="text-muted-foreground">
              Review your recipe before submitting
            </p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {prepTime + cookTime} min
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{servings} servings</span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium mb-2">Ingredients</h3>
                      <ul className="text-sm space-y-1 mb-4">
                        {ingredients.map(
                          (ing) =>
                            ing.name && (
                              <li key={ing.id}>
                                {ing.quantity} {ing.unit} {ing.name}
                              </li>
                            )
                        )}
                      </ul>
                      
                      <h3 className="font-medium mb-2">Instructions</h3>
                      <ol className="text-sm space-y-2">
                        {instructions.map(
                          (inst) =>
                            inst.text && (
                              <li key={inst.id} className="pl-5 relative">
                                <span className="absolute left-0 top-0 font-medium">
                                  {inst.id}.
                                </span>
                                {inst.text}
                              </li>
                            )
                        )}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  {imagePreview && (
                    <div className="rounded-lg overflow-hidden h-64 bg-secondary">
                      <img
                        src={imagePreview}
                        alt="Recipe preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Cuisine</h4>
                      <p className="text-sm text-muted-foreground">
                        {cuisine.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Category</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Difficulty</h4>
                      <p className="text-sm text-muted-foreground">{difficulty}</p>
                    </div>
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Dietary</h4>
                      <p className="text-sm text-muted-foreground">
                        {isVegetarian ? "Vegetarian" : "Non-vegetarian"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Ready to Submit?</h3>
                  <p className="text-sm text-muted-foreground">
                    Your recipe will be reviewed by our team before being published.
                    You'll receive a notification once it's approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
              Submit Your Recipe
            </h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              Share your culinary creations with our community
            </p>
          </div>

          <div className="overflow-hidden mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between relative pb-6">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col items-center w-1/5 relative z-10 ${
                    step < currentStep ? "text-primary" : 
                    step === currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold mb-2 ${
                      step < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step === currentStep
                        ? "bg-secondary border-2 border-primary"
                        : "bg-secondary border border-border"
                    } transition-colors`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                  <div className="text-xs font-medium text-center">
                    {step === 1 && "Details"}
                    {step === 2 && "Ingredients"}
                    {step === 3 && "Instructions"}
                    {step === 4 && "Image"}
                    {step === 5 && "Preview"}
                  </div>
                </div>
              ))}
              
              <div
                className="absolute top-4 left-0 right-0 h-0.5 bg-border"
                style={{ width: "80%", margin: "0 10%" }}
              ></div>
              
              <div
                className="absolute top-4 left-0 h-0.5 bg-primary transition-all"
                style={{
                  width: `${((currentStep - 1) / 4) * 80}%`,
                  margin: "0 10%",
                }}
              ></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 mb-6">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button type="button" onClick={nextStep} className="flex items-center">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleSubmit} 
                disabled={loading}
                className="flex items-center"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Submit Recipe
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitRecipe;
