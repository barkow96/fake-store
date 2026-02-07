import { AddToCartButton, BackLink } from "@/components";
import { ORoute } from "@/constants";
import { ProductsInCategory } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";

type Props = { productsInCategory: ProductsInCategory };

export const CategoryView = ({ productsInCategory }: Props) => {
  const { category, products } = productsInCategory;

  return (
    <div className={cn("mx-auto max-w-7xl", "px-spacing-lg py-spacing-2xl")}>
      <div className={cn("mb-spacing-xl")}>
        <BackLink href={ORoute.HOME}>Back to Home Page</BackLink>
      </div>

      <div className={cn("mb-spacing-xl")}>
        <h1 className={cn("text-3xl font-bold capitalize", "text-foreground")}>
          {category}
        </h1>
        <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
          {products.length} products available
        </p>
      </div>

      <div
        className={cn(
          "grid gap-spacing-lg",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              "group",
              "flex flex-col",
              "rounded-radius-lg",
              "bg-card",
              "border border-border",
              "p-spacing-lg",
              "shadow-sm",
              "transition-all hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "aspect-square",
                "overflow-hidden rounded-radius-md",
                "bg-secondary",
              )}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className={cn(
                  "h-full w-full",
                  "object-contain",
                  "p-spacing-md",
                  "transition-transform group-hover:scale-105",
                )}
              />
            </div>

            <div className={cn("mt-spacing-md")}>
              <h3
                className={cn(
                  "line-clamp-2",
                  "text-sm font-semibold",
                  "text-card-foreground",
                )}
              >
                {product.title}
              </h3>
              <p
                className={cn(
                  "mt-spacing-sm",
                  "text-lg font-bold",
                  "text-foreground",
                )}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>

            <AddToCartButton productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
