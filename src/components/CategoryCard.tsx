
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: string;
  title: string;
  slug: string;
  className?: string;
}

const CategoryCard = ({ icon, title, slug, className }: CategoryCardProps) => {
  return (
    <Link
      to={`/browse?category=${slug}`}
      className={cn(
        "group block transition-all duration-300 hover-scale",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-secondary/50 rounded-xl hover:bg-secondary border border-border hover:border-primary/20 transition-all duration-300">
        <span className="text-3xl" aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-sm font-medium text-center">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
