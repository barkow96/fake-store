import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";
import { BiArrowToRight } from "react-icons/bi";

type Props = { category: string };

export const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      key={category}
      href={`${ORoute.CATEGORY}/${encodeURIComponent(category)}`}
      className={cn(
        // Layout
        "group flex h-full flex-col justify-between",
        "min-h-[160px]",
        // Styling
        "rounded-xl bg-card",
        "border-2 border-border",
        "p-2xl",
        // Effects
        "shadow-sm hover:shadow-lg",
        "transition-all duration-base ease-out",
        "hover:border-accent hover:-translate-y-1",
      )}
    >
      <div>
        <h3
          className={cn(
            "text-xl font-bold capitalize",
            "text-card-foreground",
            "group-hover:text-accent",
            "transition-colors duration-base ease-out",
          )}
        >
          {category}
        </h3>
        <p className={cn("mt-sm", "text-sm text-muted-foreground")}>
          Browse collection
        </p>
      </div>

      <div
        className={cn(
          "mt-lg",
          "flex items-center gap-sm",
          "text-sm font-medium text-accent",
          "group-hover:gap-md",
          "transition-all duration-base ease-out",
        )}
      >
        <span>Explore</span>
        <BiArrowToRight size={16} />
      </div>
    </Link>
  );
};
