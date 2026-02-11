import { ButtonAsLink } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";
import { BiCart } from "react-icons/bi";

export const CartEmpty = () => {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-col items-center justify-center",
        "min-h-[450px]",
        // Styling
        "rounded-2xl bg-card",
        "border-2 border-dashed border-border",
        "p-3xl",
        "text-center",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "w-40 h-40 rounded-full",
          "bg-secondary/50",
          "mb-xl",
        )}
      >
        <BiCart size={80} className={cn("text-muted-foreground")} />
      </div>

      <h2 className={cn("text-4xl font-bold", "text-foreground", "mb-md")}>
        Your cart is empty
      </h2>

      <p className={cn("text-lg text-muted-foreground", "w-full", "mb-xl")}>
        Looks like you haven&apos;t added anything to your cart yet. Start
        shopping to fill it up!
      </p>

      <ButtonAsLink href={ORoute.Home} variant="primary" size="md">
        Browse categories
      </ButtonAsLink>
    </div>
  );
};
