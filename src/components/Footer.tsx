
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/40 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">TastyTrends</h3>
            <p className="text-muted-foreground">
              Discover recipes with seasonal ingredients and stay up to date with food trends
              through our analytics and community.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/trends"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Ingredient Trends
                </Link>
              </li>
              <li>
                <Link
                  to="/submit-recipe"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Submit Recipe
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Seasonal Ingredients
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse?category=vegetarian"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Vegetarian
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?category=south-indian"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  South Indian
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?category=quick-dinners"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Quick Dinners
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?category=baking"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Baking
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/saved-recipes"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Saved Recipes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TastyTrends. Made with{" "}
            <Heart className="inline-block h-3 w-3 text-accent" /> by food lovers.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
