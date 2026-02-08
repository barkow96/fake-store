"use client";
import { ButtonAsLink } from "@/components";
import { ORoute } from "@/constants";
import { useCart } from "@/contexts";
import { cn } from "@/utils";
import { BiCart } from "react-icons/bi";

export const CartButton = () => {
  const { cart } = useCart();

  const itemsCount = cart?.products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const hasItems = (itemsCount ?? 0) > 0;

  return (
    <ButtonAsLink
      href={ORoute.Cart}
      variant="primary"
      size="sm"
      aria-label={`Go to shopping cart (${itemsCount ?? 0} items)`}
    >
      <BiCart size={24} className="shrink-0" />
      <span className="hidden sm:block text-lg">Cart</span>
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
    </ButtonAsLink>
  );
};
