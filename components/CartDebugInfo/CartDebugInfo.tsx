"use client";
import { useCart } from "@/contexts";
import { cn } from "@/utils";

export function CartDebugInfo() {
  const { userId, cartId, isInitialized, clearCart, refreshCart } = useCart();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-spacing-md right-spacing-md",
        "rounded-radius-md",
        "bg-card",
        "border border-border",
        "p-spacing-md",
        "shadow-lg",
        "text-xs",
        "max-w-xs",
      )}
    >
      <h3
        className={cn(
          "font-bold text-sm mb-spacing-sm",
          "text-card-foreground",
        )}
      >
        Cart Debug Info
      </h3>
      <div className={cn("space-y-spacing-xs", "text-muted-foreground")}>
        <p>
          <span className="font-semibold">Initialized:</span>{" "}
          {isInitialized ? "✅" : "❌"}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {userId || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Cart ID:</span> {cartId || "N/A"}
        </p>
      </div>
      <div className={cn("mt-spacing-sm flex gap-spacing-xs")}>
        <button
          onClick={refreshCart}
          className={cn(
            "rounded-radius-sm",
            "bg-secondary text-secondary-foreground",
            "px-spacing-sm py-spacing-xs",
            "text-xs font-medium",
            "hover:opacity-80",
          )}
        >
          Refresh
        </button>
        <button
          onClick={clearCart}
          className={cn(
            "rounded-radius-sm",
            "bg-primary text-primary-foreground",
            "px-spacing-sm py-spacing-xs",
            "text-xs font-medium",
            "hover:opacity-80",
          )}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
