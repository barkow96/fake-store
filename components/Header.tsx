import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";

export function Header() {
  return (
    <header
      className={cn(
        "bg-card",
        "border-b border-border",
        "shadow-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "flex items-center justify-between",
          "px-spacing-lg py-spacing-lg",
        )}
      >
        <Link href={ORoute.HOME}>
          <h1
            className={cn(
              "text-2xl font-bold",
              "text-foreground",
            )}
          >
            Fake Store
          </h1>
        </Link>

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
          <span>Cart</span>
        </Link>
      </div>
    </header>
  );
}
