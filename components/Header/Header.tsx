import { CartButton } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";

export function Header() {
  return (
    <header className={cn("bg-card", "border-b border-border", "shadow-sm")}>
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "flex items-center justify-between",
          "px-spacing-lg py-spacing-lg",
        )}
      >
        <Link href={ORoute.HOME}>
          <h1 className={cn("text-2xl font-bold", "text-foreground")}>
            Fake Store
          </h1>
        </Link>

        <CartButton />
      </div>
    </header>
  );
}
