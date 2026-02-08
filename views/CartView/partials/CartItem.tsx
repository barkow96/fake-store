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
        "flex gap-spacing-lg",
        "rounded-radius-lg",
        "bg-card",
        "border border-border",
        "p-spacing-lg",
        "shadow-sm",
        "transition-all hover:shadow-md",
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "flex-shrink-0",
          "w-24 h-24",
          "rounded-radius-md",
          "bg-secondary",
          "overflow-hidden",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={96}
          height={96}
          className={cn("w-full h-full", "object-contain", "p-spacing-sm")}
        />
      </div>

      {/* Product Details */}
      <div className={cn("flex-1", "flex flex-col justify-between", "min-w-0")}>
        <div>
          <h3
            className={cn(
              "text-base font-semibold",
              "text-card-foreground",
              "line-clamp-2",
            )}
          >
            {product.title}
          </h3>
          <p
            className={cn(
              "mt-spacing-xs",
              "text-sm",
              "text-muted-foreground",
              "capitalize",
            )}
          >
            {product.category}
          </p>
        </div>

        {/* Price */}
        <div
          className={cn("flex items-center gap-spacing-sm", "mt-spacing-sm")}
        >
          <span className={cn("text-sm", "text-muted-foreground")}>
            {formatMoney(product.price)} each
          </span>
          <span className={cn("text-lg font-bold", "text-foreground")}>
            {formatMoney(totalPrice)}
          </span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div
        className={cn(
          "flex flex-col items-end justify-between",
          "flex-shrink-0",
        )}
      >
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className={cn(
            "rounded-radius-sm",
            "p-spacing-xs",
            "text-muted-foreground hover:text-foreground",
            "transition-colors",
          )}
          aria-label="Remove from cart"
        >
          <BiTrash size={20} />
        </button>

        {/* Quantity Controls */}
        <div
          className={cn(
            "flex items-center gap-spacing-sm",
            "rounded-radius-md",
            "bg-secondary",
            "p-spacing-xs",
          )}
        >
          <button
            onClick={onDecrease}
            className={cn(
              "flex items-center justify-center",
              "w-8 h-8",
              "rounded-radius-sm",
              "bg-card",
              "text-foreground",
              "transition-all hover:bg-primary hover:text-primary-foreground",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <BiMinus size={20} />
          </button>

          <span
            className={cn(
              "min-w-[2rem]",
              "text-center",
              "text-sm font-semibold",
              "text-foreground",
            )}
          >
            {quantity}
          </span>

          <button
            onClick={onIncrease}
            className={cn(
              "flex items-center justify-center",
              "w-8 h-8",
              "rounded-radius-sm",
              "bg-card",
              "text-foreground",
              "transition-all hover:bg-primary hover:text-primary-foreground",
            )}
            aria-label="Increase quantity"
          >
            <BiPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
