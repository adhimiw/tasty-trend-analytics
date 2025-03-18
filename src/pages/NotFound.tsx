
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />

      <div className="flex-1 flex items-center justify-center pt-20 pb-16">
        <div className="max-w-md text-center px-4 animate-fade-in">
          <AlertCircle className="h-16 w-16 text-primary/80 mx-auto mb-6" />
          <h1 className="font-serif text-4xl font-bold mb-4">Oops! Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. It might have been removed, 
            renamed, or is temporarily unavailable.
          </p>
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/browse">Browse Recipes</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
