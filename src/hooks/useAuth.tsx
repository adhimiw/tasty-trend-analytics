
import { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "@/types/database";
import { toast } from "sonner";
import {
  authenticateUser,
  getAuthUser,
  signOut as logoutUser,
  getProfileById,
  createUser,
  updateProfile
} from "@/services/jsonDataService";

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any | null>;
  signUp: (email: string, password: string, name: string) => Promise<any | null>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = async () => {
      setLoading(true);
      try {
        const currentUser = getAuthUser();
        console.log("Initial auth check:", currentUser?.id || "No user");
        
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const userProfile = getProfileById(userId);
      
      console.log("Profile data:", userProfile);
      setProfile(userProfile);
      return userProfile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Signing in with:", email);
      const authUser = authenticateUser(email, password);
      
      if (!authUser) {
        console.error("Auth error: Invalid email or password");
        toast.error("Invalid email or password");
        throw new Error("Invalid email or password");
      }
      
      console.log("Sign in successful:", authUser.id);
      setUser(authUser);
      
      // Fetch profile data right after successful sign in
      if (authUser) {
        await fetchProfile(authUser.id);
        toast.success("Signed in successfully!");
      }
      
      return authUser;
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      console.log("Signing up with:", email, name);
      
      // Check if user already exists
      const existingUser = getAuthUser();
      if (existingUser) {
        throw new Error("User already exists");
      }
      
      const newUser = createUser(email, password, name);
      
      console.log("Sign up successful:", newUser);
      
      if (newUser) {
        toast.success("Account created successfully!");
      }
      
      return newUser;
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Attempting to sign out...");
      
      logoutUser();
      
      console.log("Sign out successful");
      // Clear local state
      setUser(null);
      setProfile(null);
      
      toast.success("Signed out successfully");
      return;
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
