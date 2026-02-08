import { ViewHeader } from "@/components";
import { ProductsInCategory } from "@/types";
import { cn } from "@/utils";
import { ProductCard } from "./partials";

type Props = { productsInCategory: ProductsInCategory };

export const CategoryView = ({ productsInCategory }: Props) => {
  const { category, products } = productsInCategory;

  return (
    <div className={cn("mx-auto max-w-7xl", "px-xl py-3xl")}>
      <ViewHeader
        title={category}
        description={`${products.length} products available`}
        withHomeLink
      />

      <div
        className={cn(
          "grid gap-xl",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {products.map((product) => (
          <ProductCard key={`product-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
};
