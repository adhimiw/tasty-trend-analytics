
import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  chef: string;
  category: string;
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}

const RecipeCard = ({
  id,
  title,
  image,
  rating,
  prepTime,
  cookTime,
  servings,
  chef,
  category,
  className,
  featured = false,
  style,
}: RecipeCardProps) => {
  return (
    <Link
      to={`/recipe/${id}`}
      className={cn(
        "group recipe-card block rounded-2xl overflow-hidden bg-card h-full",
        featured ? "shadow-md" : "border border-border shadow-sm",
        className
      )}
      style={style}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {category && (
          <Badge
            className="absolute top-3 left-3 bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground"
            variant="secondary"
          >
            {category}
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3
          className={cn(
            "font-serif line-clamp-2 group-hover:text-primary transition-colors",
            featured ? "text-lg md:text-xl font-semibold" : "text-base font-medium"
          )}
        >
          {title}
        </h3>
        
        <div className="flex items-center text-amber-500 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating) ? "fill-current" : "fill-none opacity-50"
              )}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{prepTime + cookTime} min</span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{servings} servings</span>
          </div>
        </div>
        
        {featured && (
          <p className="text-sm text-muted-foreground mt-2">
            By <span className="font-medium text-foreground">{chef}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
