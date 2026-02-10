import { Product } from "@/types";
import { cn, formatMoney } from "@/utils";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  return (
    <div
      key={`product-${product.id}`}
      id={`product-${product.id}`}
      className={cn(
        // Layout
        "group flex flex-col h-full",
        // Styling
        "rounded-lg bg-card",
        "border-2 border-border",
        "p-xl",
        // Effects
        "shadow-sm hover:shadow-lg",
        "transition-all duration-base ease-out",
        "hover:border-accent hover:-translate-y-1",
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "relative aspect-square",
          "overflow-hidden rounded-lg",
          "bg-secondary/50",
          "mb-lg",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          className={cn(
            "object-contain",
            "p-lg",
            "transition-transform duration-slow ease-out",
            "group-hover:scale-110",
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          fill
        />
      </div>

      {/* Product Info */}
      <div className={cn("flex-1 flex flex-col", "space-y-md")}>
        <h3
          className={cn(
            "line-clamp-2 min-h-[2.5rem]",
            "text-base font-semibold leading-tight",
            "text-card-foreground",
          )}
        >
          {product.title}
        </h3>

        <p className={cn("text-2xl font-bold", "text-accent")}>
          {formatMoney(product.price)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className={cn("mt-lg")}>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};
