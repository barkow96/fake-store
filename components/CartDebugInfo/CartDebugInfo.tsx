"use client";
import { Button } from "@/components";
import { useCart } from "@/contexts";
import { cn } from "@/utils";

export function CartDebugInfo() {
  const { cart, userId, cartId, isInitialized, clearCart, refreshCart } =
    useCart();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-md right-md z-50",
        "rounded-lg",
        "bg-card/95 backdrop-blur-sm",
        "border-2 border-accent",
        "p-md",
        "shadow-xl",
        "max-w-xs",
      )}
    >
      <h3
        className={cn(
          "text-sm font-bold mb-sm",
          "text-accent",
          "border-b border-border pb-xs",
        )}
      >
        🔍 Cart Debug
      </h3>

      <div className={cn("space-y-xs text-xs", "text-muted-foreground")}>
        <p className={cn("flex justify-between")}>
          <span className="font-semibold">Initialized:</span>
          <span>{isInitialized ? "✅" : "❌"}</span>
        </p>
        <p className={cn("flex justify-between")}>
          <span className="font-semibold">User ID:</span>
          <span className={cn("font-mono text-foreground")}>
            {userId || "—"}
          </span>
        </p>
        <p className={cn("flex justify-between")}>
          <span className="font-semibold">Cart ID:</span>
          <span className={cn("font-mono text-foreground")}>
            {cartId || "—"}
          </span>
        </p>
        <p className={cn("flex justify-between")}>
          <span className="font-semibold">Items:</span>
          <span className={cn("font-mono text-foreground")}>
            {cart?.products.length || 0}
          </span>
        </p>
      </div>

      <div className={cn("mt-md flex gap-xs")}>
        <Button variant="secondary" size="sm" onClick={refreshCart}>
          Refresh
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={clearCart}
          className="bg-error hover:bg-error"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
