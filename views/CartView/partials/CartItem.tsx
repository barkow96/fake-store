"use client";
import { Button } from "@/components";
import { Product } from "@/types";
import { cn, formatMoney } from "@/utils";
import Image from "next/image";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

type Props = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartItem = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  const totalPrice = product.price * quantity;

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col gap-md sm:gap-lg lg:gap-xl lg:flex-row lg:items-start",
        // Styling
        "rounded-xl bg-card",
        "border-2 border-border",
        "p-md",
        // Effects
        "shadow-sm hover:shadow-md",
        "transition-all duration-base ease-out",
      )}
    >
      {/* Product Image and Details*/}
      <div
        className={cn(
          "flex flex-col gap-md min-w-0 min-[400px]:flex-row",
          "lg:contents",
        )}
      >
        {/* Product Image */}
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

        {/* Product Details */}
        <div className={cn("flex-1 min-w-0 space-y-sm sm:space-y-md")}>
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
              className={cn(
                "mt-sm text-sm capitalize",
                "text-muted-foreground",
              )}
            >
              {product.category}
            </p>
          </div>

          {/* Price Info */}
          <div className={cn("flex items-baseline gap-sm sm:gap-md flex-wrap")}>
            <span className={cn("text-xs sm:text-sm text-muted-foreground")}>
              {formatMoney(product.price)} × {quantity}
            </span>
            <span className={cn("text-xl sm:text-2xl font-bold text-accent")}>
              {formatMoney(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Controls - stacked on tiny, row on sm+, column on desktop */}
      <div
        className={cn(
          "flex flex-col items-center gap-sm min-[400px]:flex-row min-[400px]:justify-between",
          "lg:flex-col lg:justify-start lg:items-end",
          "flex-shrink-0",
        )}
      >
        {/* Quantity Controls */}
        <div
          className={cn(
            "flex items-center gap-xs sm:gap-sm",
            "rounded-md sm:rounded-lg bg-secondary/30",
            "p-xs sm:p-sm",
            "border-2 border-border",
          )}
        >
          <Button
            variant="icon"
            size="sm"
            onClick={onDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <BiMinus size={18} />
          </Button>

          <span
            className={cn(
              "min-w-[2.5rem] text-center",
              "text-sm font-bold tabular-nums",
              "text-foreground",
            )}
          >
            {quantity}
          </span>

          <Button
            variant="icon"
            size="sm"
            onClick={onIncrease}
            aria-label="Increase quantity"
          >
            <BiPlus size={18} />
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          aria-label="Remove from cart"
        >
          <BiTrash size={18} className="shrink-0" />
        </Button>
      </div>
    </div>
  );
};
