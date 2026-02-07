"use client";
import { useCart } from "@/contexts";
import { EntryId } from "@/types";
import { cn } from "@/utils";

type Props = {
  productId: EntryId;
  quantity?: number;
};

export const AddToCartButton = ({ productId, quantity = 1 }: Props) => {
  const { updateCart } = useCart();

  return (
    <button
      className={cn(
        "mt-spacing-md w-full",
        "rounded-radius-md",
        "bg-primary text-primary-foreground",
        "px-spacing-md py-spacing-sm",
        "text-sm font-medium",
        "transition-all hover:opacity-90",
      )}
      onClick={() => updateCart([{ productId, quantity }])}
    >
      Add to Cart
    </button>
  );
};
