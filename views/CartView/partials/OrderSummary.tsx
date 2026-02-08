import { cn } from "@/utils";

type Props = {
  totalItems: number;
  totalPrice: number;
};

export const OrderSummary = ({ totalItems, totalPrice }: Props) => {
  return (
    <div
      className={cn(
        "sticky top-spacing-lg",
        "rounded-radius-lg",
        "bg-card",
        "border border-border",
        "p-spacing-xl",
        "shadow-sm",
      )}
    >
      <h2
        className={cn("text-xl font-bold", "text-foreground", "mb-spacing-lg")}
      >
        Order Summary
      </h2>

      <div className={cn("space-y-spacing-md", "mb-spacing-lg")}>
        <div className={cn("flex justify-between", "text-sm")}>
          <span className={cn("text-muted-foreground")}>
            Subtotal ({totalItems} items)
          </span>
          <span className={cn("font-medium", "text-foreground")}>
            ${totalPrice?.toFixed(2)}
          </span>
        </div>
        <div className={cn("flex justify-between", "text-sm")}>
          <span className={cn("text-muted-foreground")}>Shipping</span>
          <span className={cn("font-medium", "text-foreground")}>Free</span>
        </div>
        <div
          className={cn(
            "border-t border-border",
            "pt-spacing-md",
            "flex justify-between",
          )}
        >
          <span className={cn("text-lg font-bold", "text-foreground")}>
            Total
          </span>
          <span className={cn("text-lg font-bold", "text-foreground")}>
            ${totalPrice?.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        className={cn(
          "w-full",
          "rounded-radius-md",
          "bg-primary text-primary-foreground",
          "px-spacing-lg py-spacing-md",
          "text-base font-semibold",
          "transition-all hover:opacity-90",
          "shadow-sm hover:shadow-md",
        )}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};
