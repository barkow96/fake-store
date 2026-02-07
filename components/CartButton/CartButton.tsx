"use client";
import { ORoute } from "@/constants";
import { useCart } from "@/contexts";
import { cn, logInfo } from "@/utils";
import Link from "next/link";

export const CartButton = () => {
  const cart = useCart();

  logInfo("CartButton - cart: ", cart);

  return (
    <Link
      href={ORoute.CART}
      className={cn(
        "flex items-center gap-spacing-sm",
        "rounded-radius-md",
        "bg-primary text-primary-foreground",
        "px-spacing-lg py-spacing-sm",
        "text-sm font-medium",
        "shadow-sm",
        "transition-all hover:opacity-90 hover:shadow-md",
      )}
      aria-label="Go to shopping cart"
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
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      <span>CART</span>
    </Link>
  );
};
