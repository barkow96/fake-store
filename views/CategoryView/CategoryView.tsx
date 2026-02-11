"use client";
import { SearchInput, ViewContainerNarrow, ViewHeader } from "@/components";
import { Product, ProductsInCategory } from "@/types";
import { cn } from "@/utils";
import { useState } from "react";
import { ProductCard } from "./partials";

type Props = { productsInCategory: ProductsInCategory };

export const CategoryView = ({ productsInCategory }: Props) => {
  const { category, products } = productsInCategory;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = filterProductsByTitle(products, searchTerm);

  const description =
    searchTerm.trim() === ""
      ? `${products.length} products available`
      : `${filteredProducts.length} of ${products.length} products`;

  return (
    <ViewContainerNarrow>
      <ViewHeader title={category} description={description} withHomeLink />

      <SearchInput
        label="Search products in this category"
        placeholder="Search products in this category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ariaDescribedBy="products-search-hint"
        wrapperClassName="mb-xl"
      />

      {filteredProducts.length === 0 ? (
        <p className={cn("text-center text-muted-foreground", "py-2xl")}>
          {searchTerm.trim() === ""
            ? "No products in this category."
            : "No products match your search. Try a different search term."}
        </p>
      ) : (
        <div
          className={cn(
            "grid gap-xl",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={`product-${product.id}`} product={product} />
          ))}
        </div>
      )}
    </ViewContainerNarrow>
  );
};

function filterProductsByTitle(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.title.toLowerCase().includes(q));
}
