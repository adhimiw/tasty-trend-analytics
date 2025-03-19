
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

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
              {user && profile ? (
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.profile_image || undefined} alt={profile.username} />
                    <AvatarFallback>{profile.username?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-5 w-5" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user && profile ? (
                <>
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile.profile_image || undefined} alt={profile.username} />
                      <AvatarFallback>{profile.username?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{profile.display_name || profile.username}</span>
                      <span className="text-xs text-muted-foreground">@{profile.username}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
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
                </>
              )}
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
            {user && profile ? (
              <>
                <div className="flex items-center gap-3 p-2 border border-border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.profile_image || undefined} alt={profile.username} />
                    <AvatarFallback>{profile.username?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{profile.display_name || profile.username}</span>
                    <span className="text-sm text-muted-foreground">@{profile.username}</span>
                  </div>
                </div>
                <Button variant="default" asChild className="w-full">
                  <Link to="/profile">My Profile</Link>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="default" asChild className="w-full">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/profile">My Profile</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
