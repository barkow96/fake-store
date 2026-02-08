import { Button } from "@/components";
import { cn, formatMoney } from "@/utils";

type Props = {
  totalItems: number;
  totalPrice: number;
};

export const OrderSummary = ({ totalItems, totalPrice }: Props) => {
  return (
    <div
      className={cn(
        "sticky top-lg",
        "rounded-xl bg-card",
        "border-2 border-border",
        "p-md",
        "shadow-md",
        "top-[calc(140px+var(--spacing-lg))]",
      )}
    >
      <h2
        className={cn(
          "text-2xl font-bold text-foreground",
          "mb-xl pb-lg",
          "border-b-2 border-border",
        )}
      >
        Order Summary
      </h2>

      <div className={cn("space-y-lg mb-xl")}>
        <div className={cn("flex justify-between gap-md", "text-base")}>
          <span className={cn("text-muted-foreground")}>
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className={cn("font-semibold text-foreground text-right")}>
            {formatMoney(totalPrice)}
          </span>
        </div>

        <div className={cn("flex justify-between gap-md", "text-base")}>
          <span className={cn("text-muted-foreground")}>Shipping</span>
          <span className={cn("font-semibold text-success text-right")}>
            Free
          </span>
        </div>

        <div className={cn("flex justify-between gap-md", "text-base")}>
          <span className={cn("text-muted-foreground")}>Tax</span>
          <span className={cn("font-semibold text-foreground text-right")}>
            Calculated at checkout
          </span>
        </div>

        <div
          className={cn(
            "pt-lg mt-lg",
            "border-t-2 border-border",
            "flex justify-between items-center",
          )}
        >
          <span className={cn("text-xl font-bold text-foreground")}>Total</span>
          <span className={cn("text-3xl font-bold text-accent")}>
            {formatMoney(totalPrice)}
          </span>
        </div>
      </div>

      <Button variant="primary" size="md" className="px-sm" fullWidth>
        Proceed to Checkout
      </Button>

      <p className={cn("mt-lg text-center text-xs text-muted-foreground")}>
        Secure checkout powered by Stripe
      </p>
    </div>
  );
};
