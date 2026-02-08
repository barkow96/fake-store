import { CartButton } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-card/95 backdrop-blur-sm",
        "border-b border-border",
        "shadow-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "flex items-center justify-between",
          "px-xl py-xl",
        )}
      >
        <Link
          href={ORoute.HOME}
          className={cn(
            "transition-all duration-fast ease-out",
            "hover:opacity-80",
          )}
        >
          <h1
            className={cn(
              "text-3xl font-bold",
              "text-foreground",
              "flex items-center",
            )}
          >
            <span className={cn("text-accent")}>Fake</span>
            <span>Store</span>
          </h1>
        </Link>

        <CartButton />
      </div>
    </header>
  );
}
