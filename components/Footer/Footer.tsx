import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn("border-t border-border", "bg-card/50", "py-xl", "mt-auto")}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-xl",
          "flex flex-col items-center gap-md sm:flex-row sm:justify-between",
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-lg",
            "text-sm text-muted-foreground",
          )}
          aria-label="Footer navigation"
        >
          <Link
            href={ORoute.Home}
            className={cn(
              "transition-colors duration-fast ease-out",
              "hover:text-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href={ORoute.Cart}
            className={cn(
              "transition-colors duration-fast ease-out",
              "hover:text-foreground",
            )}
          >
            Cart
          </Link>
        </nav>

        <p className={cn("text-sm text-muted-foreground")}>
          © {currentYear} Fake Store
        </p>
      </div>
    </footer>
  );
};
