
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, BookOpen, TrendingUp, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out: " + (error.message || "Unknown error"));
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navClass = scrolled
    ? "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-sm border-b"
    : "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm";

  return (
    <nav className={navClass}>
      <div className="container flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Coffee className="h-6 w-6 text-primary mr-2" />
          <span className="font-serif text-xl font-bold">Tasty Trends</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/browse"
            className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Browse Recipes
          </Link>
          <Link
            to="/trends"
            className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            <span className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trends
            </span>
          </Link>
          <Link
            to="/submit-recipe"
            className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Submit Recipe
          </Link>
        </div>

        {/* Desktop User Menu or Login Button */}
        <div className="hidden md:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-0 h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.profile_image || ""} alt={profile?.display_name || "User"} />
                    <AvatarFallback>{profile?.display_name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {profile?.display_name && (
                      <p className="font-medium">{profile.display_name}</p>
                    )}
                    <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/browse" className="cursor-pointer w-full flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Recipes</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pt-0 pb-6 bg-background border-b">
          <div className="flex flex-col space-y-3">
            <Link
              to="/browse"
              className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              Browse Recipes
            </Link>
            <Link
              to="/trends"
              className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Trends
              </span>
            </Link>
            <Link
              to="/submit-recipe"
              className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              Submit Recipe
            </Link>
            {user ? (
              <>
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.profile_image || ""} alt={profile?.display_name || "User"} />
                      <AvatarFallback>{profile?.display_name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{profile?.display_name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md hover:bg-destructive/10 transition-colors text-destructive text-left"
                >
                  <span className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </span>
                </button>
              </>
            ) : (
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
