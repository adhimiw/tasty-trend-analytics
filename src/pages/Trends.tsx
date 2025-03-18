
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import TrendingIngredient from "@/components/TrendingIngredient";
import { trendingIngredients } from "@/lib/mockData";
import { getCohereAnalysis, analyzeTrends } from "@/lib/cohereService";
import { toast } from "sonner";

// Mock data for charts
const seasonalTrendsData = [
  { name: "Jan", south_indian: 40, italian: 65, mexican: 48 },
  { name: "Feb", south_indian: 45, italian: 59, mexican: 50 },
  { name: "Mar", south_indian: 55, italian: 56, mexican: 52 },
  { name: "Apr", south_indian: 58, italian: 52, mexican: 54 },
  { name: "May", south_indian: 62, italian: 48, mexican: 55 },
  { name: "Jun", south_indian: 70, italian: 45, mexican: 57 },
  { name: "Jul", south_indian: 78, italian: 42, mexican: 60 },
  { name: "Aug", south_indian: 82, italian: 40, mexican: 62 },
  { name: "Sep", south_indian: 75, italian: 45, mexican: 58 },
  { name: "Oct", south_indian: 68, italian: 52, mexican: 55 },
  { name: "Nov", south_indian: 60, italian: 58, mexican: 50 },
  { name: "Dec", south_indian: 55, italian: 62, mexican: 48 },
];

const dietaryTrendsData = [
  { name: "Vegetarian", value: 35, color: "#4ade80" },
  { name: "Vegan", value: 25, color: "#22c55e" },
  { name: "Gluten-Free", value: 18, color: "#16a34a" },
  { name: "Keto", value: 12, color: "#15803d" },
  { name: "Paleo", value: 10, color: "#166534" },
];

const popularIngredientsData = [
  { name: "Coconut", count: 45, lastMonth: 30 },
  { name: "Rice", count: 42, lastMonth: 38 },
  { name: "Turmeric", count: 38, lastMonth: 25 },
  { name: "Curry Leaves", count: 35, lastMonth: 28 },
  { name: "Lentils", count: 30, lastMonth: 26 },
  { name: "Chilies", count: 28, lastMonth: 22 },
  { name: "Ghee", count: 25, lastMonth: 20 },
  { name: "Cardamom", count: 22, lastMonth: 15 },
];

const Trends = () => {
  const [currentSeason, setCurrentSeason] = useState("summer");
  const [loading, setLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [analysisHistory, setAnalysisHistory] = useState<{query: string, response: string}[]>([]);

  useEffect(() => {
    // Detect current season based on month
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

  const handleAnalysisSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await getCohereAnalysis(aiQuery);
      setAiResponse(response);
      setAnalysisHistory(prev => [...prev, {query: aiQuery, response}]);
      setAiQuery("");
    } catch (error) {
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Ingredient Trends & Analytics
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              Discover what's trending in the culinary world, track seasonal ingredients, 
              and explore data-driven insights about food trends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Seasonal Ingredients */}
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Seasonal Trending Ingredients
                </h2>

                <Tabs defaultValue={currentSeason}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="spring">Spring</TabsTrigger>
                    <TabsTrigger value="summer">Summer</TabsTrigger>
                    <TabsTrigger value="autumn">Autumn</TabsTrigger>
                    <TabsTrigger value="winter">Winter</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(trendingIngredients).map(([season, ingredients]) => (
                    <TabsContent key={season} value={season} className="animate-fade-in">
                      <div className="space-y-4">
                        {ingredients.map((ingredient, index) => (
                          <TrendingIngredient
                            key={index}
                            name={ingredient.name}
                            image={ingredient.image}
                            percentageChange={ingredient.percentageChange}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>

            {/* Cuisine Popularity Chart */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Cuisine Popularity Trends (2023)
                </h2>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={seasonalTrendsData}
                      margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#fff", 
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem" 
                        }} 
                      />
                      <Line
                        type="monotone"
                        dataKey="south_indian"
                        name="South Indian"
                        stroke="#5c8060"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="italian"
                        name="Italian"
                        stroke="#cc6b51"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="mexican"
                        name="Mexican"
                        stroke="#e99e16"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-sage-500 rounded-full mr-2"></div>
                    <span className="text-sm">South Indian</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-terracotta-500 rounded-full mr-2"></div>
                    <span className="text-sm">Italian</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-honey-500 rounded-full mr-2"></div>
                    <span className="text-sm">Mexican</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Dietary Preferences */}
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Dietary Preferences (%)
                </h2>
                
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dietaryTrendsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#94a3b8" 
                        tick={{ fontSize: 12 }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#fff", 
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem" 
                        }} 
                      />
                      <Bar dataKey="value" name="Percentage">
                        {dietaryTrendsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Popular Ingredients */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
                <h2 className="font-serif text-xl font-semibold mb-6">
                  Most Used Ingredients in South Indian Recipes
                </h2>
                
                <div className="overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ingredient</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Usage Count</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {popularIngredientsData.map((item, index) => {
                        const percentChange = ((item.count - item.lastMonth) / item.lastMonth) * 100;
                        const isPositive = percentChange > 0;
                        
                        return (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4 font-medium">{item.name}</td>
                            <td className="py-3 px-4 text-center">{item.count}</td>
                            <td className={`py-3 px-4 text-right font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                              {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="bg-gradient-to-br from-secondary/50 to-background rounded-2xl p-6 md:p-8 mb-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10h-2"></path>
                    <path d="M16 2v10l-4-4"></path>
                    <path d="M16 8h6"></path>
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold">AI Trend Analysis</h2>
              </div>

              <form onSubmit={handleAnalysisSubmit} className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="Ask about ingredient trends, popular recipes, cooking methods..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading || !aiQuery.trim()}>
                    {loading ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
              </form>

              {aiResponse && (
                <div className="bg-card border border-border rounded-xl p-6 mb-6 animate-fade-in">
                  <h3 className="font-medium mb-3">Analysis Result</h3>
                  <p className="text-muted-foreground">{aiResponse}</p>
                </div>
              )}

              {analysisHistory.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Previous Analyses</h3>
                  <div className="space-y-3">
                    {analysisHistory.slice(-3).reverse().map((item, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4">
                        <p className="font-medium text-sm mb-1">{item.query}</p>
                        <p className="text-sm text-muted-foreground">{item.response}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trend-Based Recipe Suggestions */}
          <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <h2 className="font-serif text-2xl font-bold mb-6">
              Try Our Trending South Indian Recipes
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/browse?category=south-indian">Explore South Indian</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/browse?category=vegetarian">Vegetarian Recipes</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/browse?category=breakfast">Breakfast Recipes</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/browse?category=quick-dinners">Quick Dinner Ideas</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Trends;
