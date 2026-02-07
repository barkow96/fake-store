"use client";
import { ORoute } from "@/constants";
import { useCart } from "@/contexts";
import { cn, logInfo } from "@/utils";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";

export const CartButton = () => {
  const { cart } = useCart();

  const itemsCount = cart?.products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  logInfo("CartButton", { cart, itemsCount });

  return (
    <Link
      href={ORoute.CART}
      className={cn(
        "flex items-center gap-spacing-sm p-4",
        "rounded-lg",
        "bg-primary text-primary-foreground",
        "px-spacing-lg py-spacing-sm",
        "text-lg font-medium",
        "shadow-sm",
        "transition-all hover:opacity-90 hover:shadow-md",
      )}
      aria-label="Go to shopping cart"
    >
      <BiCartAdd size={30} />

      <span>CART ({itemsCount})</span>
    </Link>
  );
};
