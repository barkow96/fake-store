"use client";
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
        "flex gap-xl items-start",
        // Styling
        "rounded-xl bg-card",
        "border-2 border-border",
        "p-xl",
        // Effects
        "shadow-sm hover:shadow-md",
        "transition-all duration-base ease-out",
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "relative flex-shrink-0",
          "w-28 h-28",
          "rounded-lg bg-secondary/50",
          "overflow-hidden",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={cn("object-contain p-md")}
        />
      </div>

      {/* Product Details */}
      <div className={cn("flex-1 min-w-0 space-y-md")}>
        <div>
          <h3
            className={cn(
              "text-lg font-semibold leading-tight",
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
        <div className={cn("flex items-baseline gap-md flex-wrap")}>
          <span className={cn("text-sm text-muted-foreground")}>
            {formatMoney(product.price)} × {quantity}
          </span>
          <span className={cn("text-2xl font-bold text-accent")}>
            {formatMoney(totalPrice)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div
        className={cn(
          "flex flex-col items-end gap-lg",
          "flex-shrink-0",
        )}
      >
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className={cn(
            "p-sm rounded-md",
            "text-muted-foreground hover:text-error",
            "transition-colors duration-fast ease-out",
          )}
          aria-label="Remove from cart"
        >
          <BiTrash size={20} />
        </button>

        {/* Quantity Controls */}
        <div
          className={cn(
            "flex items-center gap-sm",
            "rounded-lg bg-secondary/30",
            "p-sm",
            "border-2 border-border",
          )}
        >
          <button
            onClick={onDecrease}
            className={cn(
              "flex items-center justify-center",
              "w-10 h-10 rounded-md",
              "bg-card text-foreground",
              "transition-all duration-fast ease-out",
              "hover:bg-accent hover:text-accent-foreground",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            )}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <BiMinus size={18} />
          </button>

          <span
            className={cn(
              "min-w-[2.5rem] text-center",
              "text-sm font-bold tabular-nums",
              "text-foreground",
            )}
          >
            {quantity}
          </span>

          <button
            onClick={onIncrease}
            className={cn(
              "flex items-center justify-center",
              "w-10 h-10 rounded-md",
              "bg-card text-foreground",
              "transition-all duration-fast ease-out",
              "hover:bg-accent hover:text-accent-foreground",
            )}
            aria-label="Increase quantity"
          >
            <BiPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
