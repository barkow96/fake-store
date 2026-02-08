import { Product } from "@/types";
import { cn, formatMoney } from "@/utils";
import Image from "next/image";

type Props = {
  product: Product;
  quantity: number;
  totalPrice: number;
};

export const ProductDetails = ({ product, quantity, totalPrice }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-md min-w-0 min-[400px]:flex-row",
        "lg:contents",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative flex-shrink-0 self-center min-[400px]:self-start",
          "w-14 h-14 min-[360px]:w-16 min-[360px]:h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28",
          "rounded-lg bg-secondary/50",
          "overflow-hidden",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={cn("object-contain p-sm sm:p-md")}
        />
      </div>

      <div className={cn("flex-1 min-w-0 space-y-sm sm:space-y-md")}>
        {/* Title and Category */}
        <div>
          <h3
            className={cn(
              "text-base sm:text-lg font-semibold leading-tight",
              "text-card-foreground",
              "line-clamp-2",
            )}
          >
            {product.title}
          </h3>
          <p
            className={cn("mt-sm text-sm capitalize", "text-muted-foreground")}
          >
            {product.category}
          </p>
        </div>

        {/* Price and Quantity */}
        <div
          className={cn(
            "flex items-baseline flex-wrap gap-x-sm gap-y-xs",
            "text-sm sm:text-base",
          )}
        >
          <span className={cn("tabular-nums text-muted-foreground")}>
            {formatMoney(product.price)} × {quantity}
          </span>
          <span className={cn("text-muted-foreground/50")} aria-hidden>
            =
          </span>
          <span
            className={cn(
              "tabular-nums text-lg font-semibold text-accent sm:text-xl",
            )}
          >
            {formatMoney(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
