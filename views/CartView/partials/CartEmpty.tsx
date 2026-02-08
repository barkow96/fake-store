import { cn } from "@/utils";
import { BiCart } from "react-icons/bi";

export const CartEmpty = () => {
  return (
    <div
      className={cn(
        "rounded-radius-lg",
        "bg-card",
        "border border-border",
        "p-spacing-2xl",
        "text-center",
        "flex flex-col items-center justify-center",
      )}
    >
      <BiCart size={100} />
      <h2
        className={cn(
          "mt-spacing-lg",
          "text-xl font-semibold",
          "text-foreground",
        )}
      >
        Your cart is empty
      </h2>
      <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
        Add some products to get started
      </p>
    </div>
  );
};
