import {
  ViewContainerNarrow,
  ViewContainerWide,
  ViewHeader,
} from "@/components";
import { SECTION_HOME_VIEW_CATEGORY_SECTION_ID } from "@/constants";
import { cn } from "@/utils";
import { CategoryCard, Hero } from "./partials";

type Props = {
  categories: string[];
};

export const HomeView = ({ categories }: Props) => {
  return (
    <>
      <ViewContainerWide asSection>
        <Hero />
      </ViewContainerWide>

      <ViewContainerNarrow
        id={SECTION_HOME_VIEW_CATEGORY_SECTION_ID}
        className="scroll-mt-[100px]"
        asSection
      >
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
      </ViewContainerNarrow>
    </>
  );
};
