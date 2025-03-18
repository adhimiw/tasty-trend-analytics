
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-2xl font-bold text-primary transition-all duration-300 hover:opacity-80"
        >
          TastyTrends
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          <Link
            to="/browse"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              location.pathname.includes("/browse") && "text-primary"
            )}
          >
            Browse
          </Link>
          <Link
            to="/trends"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              location.pathname === "/trends" && "text-primary"
            )}
          >
            Trends
          </Link>
          <Link
            to="/submit-recipe"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              location.pathname === "/submit-recipe" && "text-primary"
            )}
          >
            Submit Recipe
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="User menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full cursor-pointer">
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="w-full cursor-pointer">
                  My Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/98 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-6 space-y-8">
          <nav className="flex flex-col space-y-6 text-lg">
            <Link
              to="/"
              className={cn(
                "font-medium transition-colors hover:text-primary",
                location.pathname === "/" && "text-primary"
              )}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={cn(
                "font-medium transition-colors hover:text-primary",
                location.pathname.includes("/browse") && "text-primary"
              )}
            >
              Browse
            </Link>
            <Link
              to="/trends"
              className={cn(
                "font-medium transition-colors hover:text-primary",
                location.pathname === "/trends" && "text-primary"
              )}
            >
              Trends
            </Link>
            <Link
              to="/submit-recipe"
              className={cn(
                "font-medium transition-colors hover:text-primary",
                location.pathname === "/submit-recipe" && "text-primary"
              )}
            >
              Submit Recipe
            </Link>
          </nav>

          <div className="flex flex-col space-y-4 mt-auto">
            <Button variant="default" asChild className="w-full">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/profile">My Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
