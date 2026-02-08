import { ViewHeader } from "@/components";
import { cn } from "@/utils";
import { CategoryCard } from "./partials";

type Props = {
  categories: string[];
};

export const HomeView = ({ categories }: Props) => {
  return (
    <div className={cn("mx-auto max-w-7xl", "px-xl py-3xl")}>
      <ViewHeader
        title="Shop by Category"
        description="Browse our curated collection of products"
      />

      <div
        className={cn(
          "grid gap-xl",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {categories.map((category) => (
          <CategoryCard key={`category-${category}`} category={category} />
        ))}
      </div>
    </div>
  );
};
