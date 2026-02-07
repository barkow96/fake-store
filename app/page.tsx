import { Header } from "@/components";
import { ORoute } from "@/constants";
import { ProductService } from "@/services";
import { cn } from "@/utils";
import Link from "next/link";

export default async function Home() {
  const categories = await ProductService.getProductCategories();

  return (
    <div className={cn("min-h-screen", "bg-background")}>
      <Header />

      <main className={cn("mx-auto max-w-7xl", "px-spacing-lg py-spacing-2xl")}>
        <div className={cn("mb-spacing-xl")}>
          <h2 className={cn("text-3xl font-bold", "text-foreground")}>
            Shop by Category
          </h2>
          <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
            Browse our curated collection of products
          </p>
        </div>

        <div
          className={cn(
            "grid gap-spacing-lg",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {categories.map((category) => (
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
              <p
                className={cn(
                  "mt-spacing-sm",
                  "text-sm",
                  "text-muted-foreground",
                )}
              >
                Explore products →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
