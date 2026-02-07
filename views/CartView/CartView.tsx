"use client";
import { BackLink, CartItem } from "@/components";
import { ORoute } from "@/constants";
import { Cart, Product } from "@/types";
import { cn } from "@/utils";
import { BiCart } from "react-icons/bi";

type Props = {
  cart: Cart | null;
  isInitialized: boolean;
  isLoading: boolean;
  products: Product[];
  totalItems: number;
  totalPrice: number;
  onQuantityChange: (productId: number, quantityChange: number) => void;
  onRemove: (productId: number) => void;
};

export const CartView = ({
  cart,
  isInitialized,
  isLoading,
  products,
  totalItems,
  totalPrice,
  onQuantityChange,
  onRemove,
}: Props) => {
  if (!isInitialized || isLoading) {
    return (
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "px-spacing-lg py-spacing-2xl",
          "flex items-center justify-center",
        )}
      >
        <div className={cn("text-center", "text-muted-foreground")}>
          Loading cart...
        </div>
      </div>
    );
  }

  const isEmpty = !cart?.products.length;

  return (
    <main className={cn("mx-auto max-w-7xl", "px-spacing-lg py-spacing-2xl")}>
      <div className={cn("mb-spacing-xl")}>
        <BackLink href={ORoute.HOME}>Back to Home</BackLink>
      </div>

      <div className={cn("mb-spacing-xl")}>
        <h1 className={cn("text-3xl font-bold", "text-foreground")}>
          Shopping Cart
        </h1>
        <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
          {isEmpty
            ? "Your cart is empty"
            : `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`}
        </p>
      </div>

      {isEmpty ? (
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
      ) : (
        <div className={cn("grid gap-spacing-xl", "lg:grid-cols-3")}>
          {/* Cart Items */}
          <div className={cn("lg:col-span-2", "space-y-spacing-md")}>
            {cart.products.map((cartProduct) => {
              const product = products.find(
                (p) => p.id === cartProduct.productId,
              );
              if (!product) return null;

              return (
                <CartItem
                  key={cartProduct.productId}
                  product={product}
                  quantity={cartProduct.quantity}
                  onIncrease={() => onQuantityChange(cartProduct.productId, 1)}
                  onDecrease={() => onQuantityChange(cartProduct.productId, -1)}
                  onRemove={() => onRemove(cartProduct.productId)}
                />
              );
            })}
          </div>

          {/* Order Summary */}
          <div className={cn("lg:col-span-1")}>
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
                className={cn(
                  "text-xl font-bold",
                  "text-foreground",
                  "mb-spacing-lg",
                )}
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
                  <span className={cn("font-medium", "text-foreground")}>
                    Free
                  </span>
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
          </div>
        </div>
      )}
    </main>
  );
};
