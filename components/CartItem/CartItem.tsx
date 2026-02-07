"use client";

import { Product } from "@/types";
import { cn } from "@/utils";
import Image from "next/image";

interface CartItemProps {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
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
        <div className={cn("flex items-center gap-spacing-sm", "mt-spacing-sm")}>
          <span className={cn("text-sm", "text-muted-foreground")}>
            ${product.price.toFixed(2)} each
          </span>
          <span className={cn("text-lg font-bold", "text-foreground")}>
            ${totalPrice.toFixed(2)}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
