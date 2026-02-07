import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";

type Props = { category: string };

export const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      key={category}
      href={`${ORoute.CATEGORY}/${encodeURIComponent(category)}`}
      className={cn(
        "group",
        "flex h-full flex-col",
        "rounded-radius-lg",
        "bg-card",
        "border border-border",
        "p-spacing-xl",
        "shadow-sm",
        "transition-all hover:border-primary hover:shadow-md",
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold capitalize",
          "text-card-foreground",
          "group-hover:text-primary",
        )}
      >
        {category}
      </h3>
      <p className={cn("mt-spacing-sm", "text-sm", "text-muted-foreground")}>
        Explore products →
      </p>
    </Link>
  );
};
