
import React from "react";
import { ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingIngredientProps {
  name: string;
  image: string;
  percentageChange: number;
  className?: string;
}

const TrendingIngredient = ({
  name,
  image,
  percentageChange,
  className,
}: TrendingIngredientProps) => {
  return (
    <div
      className={cn(
        "group flex items-center space-x-3 p-3 rounded-lg bg-background border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300",
        className
      )}
    >
      <div className="relative w-16 h-16 overflow-hidden rounded-lg shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center text-xs text-emerald-600 font-medium">
          <ArrowUpIcon className="h-3 w-3 mr-1" />
          <span>{percentageChange}% this season</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingIngredient;
