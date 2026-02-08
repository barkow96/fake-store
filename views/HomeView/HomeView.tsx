import { ViewContainer, ViewHeader } from "@/components";
import { cn } from "@/utils";
import { CategoryCard } from "./partials";

type Props = {
  categories: string[];
};

export const HomeView = ({ categories }: Props) => {
  return (
    <ViewContainer>
      <ViewHeader
        title="Your Store For Fake Products"
        description="Browse our curated collection of fake products"
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
    </ViewContainer>
  );
};
