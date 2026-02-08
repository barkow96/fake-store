"use client";
import { useCart } from "@/contexts";
import { CartProductId } from "@/types";
import { cn } from "@/utils";
import { BiCartAdd } from "react-icons/bi";

type Props = {
  productId: CartProductId;
  quantity?: number;
};

export const AddToCartButton = ({ productId, quantity = 1 }: Props) => {
  const { updateCart } = useCart();

  return (
    <button
      className={cn(
        "w-full",
        "flex items-center justify-center gap-sm",
        "rounded-xl",
        "bg-accent text-accent-foreground",
        "px-xl py-lg",
        "text-base font-bold",
        "shadow-sm hover:shadow-md",
        "transition-all duration-base ease-out",
        "hover:opacity-90 hover:-translate-y-0.5",
      )}
      onClick={() => updateCart([{ productId, quantity }])}
    >
      <BiCartAdd size={20} />
      <span>Add to Cart</span>
    </button>
  );
};
