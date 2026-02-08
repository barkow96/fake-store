"use client";
import { ORoute } from "@/constants";
import { useCart } from "@/contexts";
import { cn } from "@/utils";
import Link from "next/link";
import { BiCart } from "react-icons/bi";

export const CartButton = () => {
  const { cart } = useCart();

  const itemsCount = cart?.products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const hasItems = (itemsCount ?? 0) > 0;

  return (
    <Link
      href={ORoute.CART}
      className={cn(
        // Layout
        "relative flex items-center gap-md",
        // Styling
        "rounded-xl",
        "bg-accent text-accent-foreground",
        "px-xl py-md",
        "text-base font-bold",
        // Effects
        "shadow-sm hover:shadow-md",
        "transition-all duration-base ease-out",
        "hover:opacity-90 hover:-translate-y-0.5",
      )}
      aria-label={`Go to shopping cart (${itemsCount ?? 0} items)`}
    >
      <BiCart size={24} />
      <span>Cart</span>
      
      {hasItems && (
        <span
          className={cn(
            "absolute -top-2 -right-2",
            "flex items-center justify-center",
            "min-w-[1.75rem] h-7",
            "px-sm",
            "rounded-full",
            "bg-error text-white",
            "text-sm font-bold",
            "shadow-md",
            "animate-in fade-in zoom-in",
          )}
        >
          {itemsCount}
        </span>
      )}
    </Link>
  );
};
